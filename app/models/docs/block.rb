# frozen_string_literal: true

# == Schema Information
#
# Table name: docs_blocks
#
#  id                       :uuid             not null, primary key
#  collaborators            :bigint           default([]), not null, is an Array
#  content(node content)    :jsonb
#  data(data props)         :jsonb            not null
#  deleted_at               :datetime
#  deleted_permanently_at   :datetime
#  history_version          :bigint           default(0), not null
#  meta(metadata)           :jsonb            not null
#  page                     :boolean          default(FALSE), not null
#  snapshot_version         :bigint           default(0), not null
#  sort                     :bigint           default(0), not null
#  text(node text)          :text             default("")
#  type                     :string(32)
#  created_at               :datetime         not null
#  updated_at               :datetime         not null
#  parent_id                :uuid
#  pod_id                   :bigint           not null
#  root_id                  :uuid             not null
#
# Indexes
#
#  index_docs_blocks_on_collaborators  (collaborators) USING gin
#  index_docs_blocks_on_parent_id      (parent_id)
#  index_docs_blocks_on_pod_id         (pod_id)
#
class Docs::Block < ApplicationRecord
  self.inheritance_column = :_type_disabled

  include Redis::Objects
  include Sortable
  counter :patch_seq

  default_scope { where(deleted_permanently_at: nil) if has_attribute?(:deleted_permanently_at) }

  scope :pageable, -> { where(page: true) }
  scope :soft_deleted, -> { where.not(deleted_at: nil) }
  scope :non_deleted, -> { where(deleted_at: nil) }

  belongs_to :pod, optional: true
  belongs_to :parent, class_name: 'Docs::Block', optional: true
  has_many :children, class_name: 'Docs::Block', foreign_key: :parent_id, dependent: :restrict_with_exception
  has_many :histories, dependent: :restrict_with_exception
  has_many :snapshots, dependent: :restrict_with_exception
  has_many :share_links, dependent: :restrict_with_exception
  has_many :enabled_share_links, -> { enable }, class_name: "Docs::ShareLink", dependent: :restrict_with_exception

  validates :meta, presence: true, allow_blank: true
  # validates :data, presence: true
  validates :pod_id, presence: true
  validates :collaborators, presence: true

  attribute :next_sort, :integer, default: 0
  attribute :first_child_sort, :integer, default: 0
  attribute :parent_path_array_value

  ## Distance for expansion
  SORT_GAP = 2**32
  REBALANCE_GAP = 2**12
  DUPLICATE_SORT_GAP = 4
  has_many_attached :attachments

  def self.find_by_kind(id, kind, webid)
    case kind
    when 'p'
      o = find_by(id: id)
      return [o, {}]
    when 'a'
      pod = Pod.find_by(webid: webid)
      return [nil, {}] if pod.nil?
      a = Docs::Alias.enabled.find_by(pod_id: pod.id, alias: id)
      return [nil, {}] if a.nil?
      return [a.block, a.payload]
    end

    [nil, {}]
  end

  def create_alias!(a)
    Docs::Alias.create!(alias: a, block_id: id, pod_id: pod_id)
  end

  def title
    text
  end

  def root
    return self if id == root_id
    Docs::Block.find(root_id)
  end

  def blobs
    attachments.map do |blob|
      { blob_key: blob.key, url: blob.real_url, download_url: blob.real_url(disposition: "attachment") }
    end
  end

  def patch_seq_increment
    patch_seq.increment
  end

  def redis_counter_key(type)
    "#{type}_#{id}"
  end

  REDIS_EXPIRE_TIME = Rails.env.production? ? 1.day : 10.minutes

  COUNTER_META = {
    history_version: {
      key_f: ->(id) { "history_#{id}" },
      expire_time: REDIS_EXPIRE_TIME
    },
    snapshot_version: {
      key_f: ->(id) { "snapshot_#{id}" },
      expire_time: REDIS_EXPIRE_TIME
    }
  }

  def prepare_descendants
    data = descendants(unscoped: true)
    ids = data.map(&:id)
    keys = ids.flat_map { |id| ["snapshot_#{id}", "history_#{id}"] }
    persist_values = Hash[*data.flat_map { |b| ["snapshot_#{b.id}", b.snapshot_version.to_s, "history_#{b.id}", b.history_version.to_s] }]
    Brickdoc::Redis.with(:cache) do |redis|
      exist_values = redis.mapped_mget(*keys)
      rest_keys = exist_values.select { |_, v| v.nil? }.keys
      rest_hash = persist_values.slice(*rest_keys)

      redis.pipelined do
        rest_hash.each do |k, v|
          redis.setex(k, REDIS_EXPIRE_TIME, v)
        end
      end
      final_hash = exist_values.merge(rest_hash)
      Current.redis_values = final_hash
    end
    # data.each(&:prepare)
  end

  def dirty_patch
    return nil unless changed?

    payload = slice('id', 'type', 'parent_id', 'root_id').merge(
      changes.slice('meta', 'data', 'sort', 'content').transform_values(&:last)
    )
    path = if parent_id.nil?
      [id]
    else
      []
    end

    patch_type =
      if new_record?
        "ADD"
      else
        "UPDATE"
      end

    Rails.logger.info("DIRTY #{id} #{payload}")

    { id: id, patch_type: patch_type, payload: payload, parent_id: parent_id, path: path }
  end

  ## NOTE Prepare counter to prevent collision
  def prepare
    realtime_history_version_value
    realtime_snapshot_version_value
  end

  def realtime_version(type)
    meta = COUNTER_META.fetch(type)
    key = meta.fetch(:key_f).call(id)

    Brickdoc::Redis.with(:cache) do |redis|
      counter = Current.redis_values.to_h[key] || redis.get(key)
      return counter.to_i if counter

      value = send(type)

      redis.setex(key, meta.fetch(:expire_time), value)
      value
    end
  end

  def realtime_version_increment(type)
    ## NOTE ensure counter exists
    ## TODO remove this
    _prepare_version = realtime_version(type)

    meta = COUNTER_META.fetch(type)
    key = meta.fetch(:key_f).call(id)

    Brickdoc::Redis.with(:cache) do |redis|
      return redis.incr(key)
    end
  end

  def upsert_share_links!(target)
    exists_share_links = share_links.to_a.index_by(&:share_webid)
    transaction do
      target.each do |obj|
        exist = exists_share_links[obj[:webid]]
        params = { policy: obj[:policy], state: obj[:state] }
        if exist
          if exist.state == obj[:state]
            exist.update!(params)
          else
            exist.update!(state: obj[:state])
          end
        else
          share_links.create!(params.merge(share_webid: obj[:webid]))
        end
      end
    end
  end

  def realtime_history_version_value
    realtime_version(:history_version)
  end

  def realtime_snapshot_version_value
    realtime_version(:snapshot_version)
  end

  def realtime_history_version_increment
    realtime_version_increment(:history_version)
  end

  def realtime_snapshot_version_increment
    realtime_version_increment(:snapshot_version)
  end

  before_create do
    self.root_id ||= id
  end

  def important_field_changed?
    type_changed? || meta_changed? || data_changed? || sort_changed? ||
      parent_id_changed? || text_changed? || content_changed? || deleted_at_changed? || updated_at_changed?
  end

  before_save do
    raise("parent_id_cause_endless_loop") if parent_id == id
    self.collaborators = collaborators.uniq
    if important_field_changed?
      self.history_version = realtime_history_version_increment
    end
  end

  after_save do
    Docs::History.create!(history_attributes) if history_version_previously_changed? || id_previously_changed?
  end

  def block_attributes
    attributes.slice(*Docs::Block.column_names)
  end

  def history_attributes
    attributes.slice(*(Docs::History.column_names - ['id'])).merge('block_id' => id)
  end

  after_create :maybe_attach_attachments!
  before_save :update_meta_link

  def maybe_attach_attachments!
    Brickdoc::Redis.with(:cache) do |redis|
      key = "blob_#{id}"
      redis.smembers(key).each do |blob_id|
        attach_blob!(blob_id)
      end

      redis.del(key)
    end
  end

  def attach_blob!(blob_id)
    # Docs::Block.find(args[:block_id]).attachments.attach blob.signed_id
    ## HACK Create `ActiveStorage::Attachment` directly because blob is not persist yet.
    ActiveStorage::Attachment.create!(
      record_id: id,
      record_type: "Docs::Block",
      blob_id: blob_id,
      name: "attachments"
    )
  end

  def update_meta_link
    if meta['link'].present? && meta['link']['title'].blank?
      data = Brickdoc::PreviewBox.preview(meta['link']['key'])
      meta['link'].merge!(
        'title' => data[:title],
        'description' => data[:description],
        'cover' => data[:cover]
      )
    end
  end

  def self.broadcast(id, payload)
    BrickdocSchema.subscriptions.trigger(:newPatch, { doc_id: id }, payload)
  end

  def duplicate!
    transaction do
      preload_descendants = descendants_raw.to_a
      now = Time.current
      descendants_ids_map = preload_descendants.map(&:id).each_with_object({}) { |old_id, hash| hash[old_id] = SecureRandom.uuid }
      descendants_ids_map[parent_id] = parent_id
      new_root_id = descendants_ids_map.fetch(id)
      insert_data = preload_descendants.map do |block|
        new_block = block.dup
        if block.id == id
          new_block.text = I18n.t('docs.duplicate.new_title', title: block.text)
          new_block.meta = new_block.meta.merge('title' => new_block.text)
          new_block.id = new_root_id
          new_block.sort = block.sort + DUPLICATE_SORT_GAP
          new_block.root_id = new_root_id
        else
          new_block.id = descendants_ids_map.fetch(block.id)
          new_block.root_id = descendants_ids_map.fetch(block.root_id)
          new_block.parent_id = descendants_ids_map.fetch(block.parent_id)
        end

        new_block.block_attributes.merge('created_at' => now, 'updated_at' => now)
      end

      Docs::Block.insert_all(insert_data)

      Docs::Block.find(new_root_id).save_snapshot!

      new_root_id
    end
  end

  def soft_delete!
    raise 'already_soft_delete' unless deleted_at.nil?
    update!(deleted_at: Time.current)
    patch_seq.del
    self.class.broadcast(id, { state: "DELETED" })
  end

  def hard_delete!
    raise 'not_deleted' if deleted_at.nil?
    raise 'already_hard_delete' unless deleted_permanently_at.nil?
    ## update!(deleted_permanently_at: Time.current)
    ## NOTE Remove all descendants
    descendants_raw(unscoped: true).update_all(deleted_permanently_at: Time.current)
  end

  def restore!
    raise 'already_restored' if deleted_at.nil?
    update!(deleted_at: nil)
  end

  def check_target_descendants!(target_parent_id)
    return if target_parent_id.nil?
    return if target_parent_id == parent_id
    raise ArgumentError, "Invalid target" if target_parent_id == id

    raise ArgumentError, "Invalid target" if target_parent_id.in?(descendants.ids)
  end

  def move!(target_parent_id, new_sort)
    check_target_descendants!(target_parent_id)

    update!(sort: new_sort, parent_id: target_parent_id)
  end

  def create_sub_block!(title)
    max_sort = descendants_raw.where(parent_id: id).maximum(:sort) || 0
    Docs::Block.create!(
      id: SecureRandom.uuid,
      parent_id: id,
      page: true,
      type: 'doc',
      meta: { title: title },
      sort: max_sort + SORT_GAP,
      pod_id: pod_id,
      collaborators: collaborators,
      data: {},
      content: [],
      text: title
    )
  end

  # recursive CTE query
  # @param type [Symbol] `:descendants` or `:ancestors`
  # @param opts [Hash]
  #
  # @return Docs::Block[]
  #
  # See https://stackoverflow.com/a/30924648
  def cte(type, unscoped: false)
    select_columns = [:id, :parent_id, :deleted_at]
    hierarchy = self.class.arel_table
    recursive_table = Arel::Table.new(:recursive)
    select_manager = Arel::SelectManager.new(self).freeze

    non_recursive_term = select_manager.dup.tap do |m|
      m.from self.class.table_name
      m.project(*(select_columns.map { |col| hierarchy[col] }))
      m.where hierarchy[:id].eq(id)
    end

    recursive_term = select_manager.dup.tap do |m|
      m.from recursive_table
      m.project(*(select_columns.map { |col| hierarchy[col] }))
      m.join hierarchy
      m.where(hierarchy[:deleted_permanently_at].eq(nil)) if has_attribute?(:deleted_permanently_at)
      m.where(hierarchy[:deleted_at].eq(nil)) unless unscoped
      case type
      when :descendants
        m.on recursive_table[:id].eq(hierarchy[:parent_id])
      when :ancestors
        m.on recursive_table[:parent_id].eq(hierarchy[:id])
      else
        raise("Not supported!")
      end
    end

    union = non_recursive_term.union :all, recursive_term
    as_statement = Arel::Nodes::As.new recursive_table, union

    manager = select_manager.dup.tap do |m|
      m.with :recursive, as_statement
      m.from recursive_table
      m.project Arel.star
    end

    ids = ActiveRecord::Base.connection.execute(manager.to_sql).field_values('id')
    ## TODO save this query!
    Docs::Block.where(id: ids)
  end

  def descendants_raw(opts = {})
    cte(:descendants, **opts)
  end

  def ancestors_raw(opts = {})
    cte(:ancestors, **opts)
  end

  def descendants(opts = {})
    descendants_raw(opts).where(root_id: id)
  end

  def ancestors(opts = {})
    ancestors_raw(opts).where(root_id: root_id)
  end

  def clear_cache
    Current.paths = Current.paths.to_h.slice!(id)
  end

  def paths_cache
    data = Current.paths.to_h[id]
    return data unless data.nil?

    data = path_map
    Current.paths = Current.paths.to_h.merge(id => data)
    data
  end

  def icon
    meta['icon']
  end

  def path_object
    { id: id, text: text, icon: icon }.compact
  end

  def parent_path_array
    return [path_object] if parent_id.nil?

    preload = ancestors_raw(unscoped: true).all.index_by(&:id)
    result = [path_object]
    cursor = parent_id

    loop do
      try_block = preload[cursor]
      break if try_block.nil?

      result << try_block.path_object
      cursor = try_block.parent_id
    end

    result.reverse
  end

  def path_array
    return [] if parent_id.nil?
    parent_path_array_value || parent.parent_path_array
  end

  def path_map
    result = {}
    parent_ids = [parent_id]
    data = descendants(unscoped: true)

    loop do
      this_level = data.select { |b| b.parent_id.in?(parent_ids) }

      break if this_level.blank?

      this_level.each do |b|
        result[b.id] = result[b.parent_id].to_a + [b.id]
      end

      parent_ids = this_level.map(&:id)
    end

    result.tap do |map|
      raise("[ERROR] path is empty!") if map.blank?
    end
  end

  def tree
    self.class.make_tree(self)
  end

  def self.make_tree(parent, blocks = nil)
    blocks ||= parent.descendants
    children = blocks.select do |blk|
      blk.parent_id == parent.id
    end.sort_by(&:sort).map do |blk|
      make_tree(blk, blocks)
    end
    parent.attributes.slice("id", "type", "sort", "meta", "data").merge("children" => children)
  end

  def show_policy?(user)
    preload_enabled_share_links = nil

    ## Anonymous user
    if user.nil?
      preload_enabled_share_links ||= enabled_share_links.to_a.index_by(&:share_webid)

      anyone_share_link = preload_enabled_share_links[Pod::ANYONE_WEBID]

      return false if anyone_share_link.nil?

      return true
    end

    ## Collaborators
    return true if collaborators.include?(user.id)

    ## Fast check cache
    if user.current_pod_id
      return true if pod_id == user.current_pod_id
    end

    preload_pods = user.pods.to_a

    ## Owner
    return true if pod_id.in?(preload_pods.map(&:id))

    ## Share links
    webids = preload_pods.map(&:webid) + [Pod::ANYONE_WEBID]
    preload_enabled_share_links ||= enabled_share_links.to_a.index_by(&:share_webid)

    webids.each do |webid|
      return true if preload_enabled_share_links[webid]
    end

    false
  end

  def latest_history
    histories.find_by!(history_version: history_version)
  end

  SAVE_SNAPSHOT_SECONDS = 5

  def maybe_save_snapshot!
    throttle_key = "save_snapshot:#{id}"
    Brickdoc::Redis.with(:state) do |redis|
      bol = redis.get(throttle_key)
      return false if bol

      redis.setex(throttle_key, SAVE_SNAPSHOT_SECONDS, 1)
    end

    save_snapshot!
    true
  rescue => _e
    ## TODO handle error
    false
  end

  def save_snapshot!(params = {})
    transaction do
      update!(snapshot_version: realtime_snapshot_version_increment)
      snapshots.create!(params.merge(snapshot_version: snapshot_version))
    end
  end

  def current_histories
    Docs::History.from_version_meta(children_version_meta)
  end

  def children_version_meta
    descendants.pluck(:id, :history_version).to_h
  end
end
