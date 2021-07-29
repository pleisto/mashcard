# frozen_string_literal: true

# == Schema Information
#
# Table name: docs_blocks
#
#  id                 :uuid             not null, primary key
#  collaborators      :bigint           default([]), not null, is an Array
#  data(data props)   :jsonb            not null
#  deleted_at         :datetime
#  history_version    :bigint           default(0), not null
#  meta(metadata)     :jsonb            not null
#  parent_type        :string(32)
#  snapshot_version   :bigint           default(0), not null
#  sort               :bigint           default(0)
#  type               :string(32)
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  parent_id          :uuid
#  pod_id             :bigint
#
# Indexes
#
#  index_docs_blocks_on_collaborators  (collaborators) USING gin
#  index_docs_blocks_on_deleted_at     (deleted_at)
#  index_docs_blocks_on_parent_id      (parent_id)
#  index_docs_blocks_on_pod_id         (pod_id)
#
class Docs::Block < ApplicationRecord
  self.inheritance_column = :_type_disabled

  include Redis::Objects
  counter :patch_seq

  default_scope { where(deleted_at: nil) }

  scope :pageable, -> { where(type: ['doc', 'paragraph', 'heading']) }

  belongs_to :pod
  belongs_to :parent, class_name: 'Docs::Block', optional: true
  has_many :children, class_name: 'Docs::Block', foreign_key: :parent_id, dependent: :restrict_with_exception
  has_many :histories, dependent: :restrict_with_exception
  has_many :snapshots, dependent: :restrict_with_exception

  validates :meta, presence: true, allow_blank: true
  # validates :data, presence: true
  validates :pod, presence: true
  validates :collaborators, presence: true

  attribute :next_sort, :integer, default: 0

  ## Distance for expansion
  SORT_GAP = 2**32
  REBALANCE_GAP = 2**12
  has_many_attached :attachments

  def blobs
    attachments.map do |blob|
      { key: blob.key, url: Brickdoc::Storage.blob_url(blob) }
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
    data = descendants_cache(unscoped: true)
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
    return nil if previous_changes.blank?

    changes = previous_changes.slice('id', 'meta', 'type', 'data', 'sort', 'parent_id')
    ## TODO track changes before
    payload = changes.transform_values(&:last)
    path = if parent_id.nil?
      [id]
    else
      []
    end

    patch_type =
      if id_previously_changed?
        "ADD"
      else
        "UPDATE"
      end

    Rails.logger.info("DIRTY #{id} #{changes}")

    { id: id, patch_type: patch_type, payload: payload.to_json, parent_id: parent_id, path: path }
  end

  ## NOTE Prepare counter to prevent collision
  def prepare
    realtime_history_version_value
    realtime_snapshot_version_value
  end

  def realtime_version(type)
    meta = COUNTER_META.fetch(type)
    Brickdoc::Redis.with(:cache) do |redis|
      key = meta.fetch(:key_f).call(id)
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
    prepare_version = realtime_version(type)

    meta = COUNTER_META.fetch(type)
    Brickdoc::Redis.with(:cache) do |redis|
      key = meta.fetch(:key_f).call(id)
      result = redis.incr(key)

      Rails.logger.info("DEBUG #{key} #{prepare_version} #{result}")

      return result
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

  before_save do
    self.collaborators = collaborators.uniq
    if type_changed? || meta_changed? || data_changed? || sort_changed? || parent_id_changed?
      self.history_version = realtime_history_version_increment
    end
  end

  after_save do
    histories.create!(history_version: history_version) if history_version_previously_changed? || id_previously_changed?
    snapshots.create!(snapshot_version: snapshot_version) if snapshot_version_previously_changed?
  end

  def self.broadcast(id, payload)
    BrickdocSchema.subscriptions.trigger(:newPatch, { doc_id: id }, payload)
  end

  def delete_pages!
    descendants.pageable.update_all(deleted_at: Time.current)
    patch_seq.del
    self.class.broadcast(id, { state: "DELETED" })
  end

  def check_target_descendants!(target_parent_id)
    return if target_parent_id.nil?
    return if target_parent_id == parent_id
    raise ArgumentError, "Invalid target" if target_parent_id == id

    raise ArgumentError, "Invalid target" if target_parent_id.in?(descendants.ids)
  end

  def move!(target_parent_id, new_sort)
    check_target_descendants!(target_parent_id)

    params = { sort: new_sort, parent_id: target_parent_id }
    if target_parent_id.nil? && parent_id.nil?
      ## Root
    elsif !target_parent_id.nil? && !parent_id.nil?
      ## Child
    elsif target_parent_id.nil? && !parent_id.nil?
      ## Child to parent
      params[:type] = 'doc'
    elsif !target_parent_id.nil? && parent_id.nil?
      ## Root to child, check its descendant
      params[:type] = 'paragraph'
    end

    update!(params)
  end

  # recursive CTE query
  # @param type [Symbol] `:descendants` or `:ancestors`
  # @param opts [Hash]
  #
  # @return Docs::Block[]
  #
  # See https://stackoverflow.com/a/30924648
  def cte(type, opts = {})
    opts = {
      columns: self.class.column_names, # select columns array
      where: nil,
      unscoped: false
    }.merge(opts)
    hierarchy = self.class.arel_table
    recursive_table = Arel::Table.new(:recursive)
    select_manager = Arel::SelectManager.new(ActiveRecord::Base).freeze

    non_recursive_term = select_manager.dup.tap do |m|
      m.from self.class.table_name
      m.project(*opts[:columns])
      m.where hierarchy[:id].eq(id)
    end

    recursive_term = select_manager.dup.tap do |m|
      m.from recursive_table
      m.project(*(opts[:columns].map { |col| hierarchy[col] }))
      m.join hierarchy
      m.where(Arel.sql(opts[:where])) if opts[:where].present?
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
    if opts[:unscoped]
      Docs::Block.unscoped.where(id: ids)
    else
      Docs::Block.where(id: ids)
    end
  end

  def ancestors(opts = {})
    cte(:ancestors, opts)
  end

  def descendants(opts = {})
    cte(:descendants, opts)
  end

  def descendants_cache(opts = {})
    data = Current.descendants.to_h[id]
    return data unless data.nil?

    data = descendants(opts).to_a
    Current.descendants = Current.descendants.to_h.merge(id => data)
    data
  end

  def clear_cache
    Current.paths = Current.paths.to_h.slice!(id)
    Current.descendants = Current.descendants.to_h.slice!(id)
  end

  def paths_cache
    data = Current.paths.to_h[id]
    return data unless data.nil?

    data = path_map
    Current.paths = Current.paths.to_h.merge(id => data)
    data
  end

  def path_map
    result = {}
    parent_ids = [parent_id]
    data = descendants_cache

    loop do
      this_level = data.select { |b| b.parent_id.in?(parent_ids) }

      break if this_level.blank?

      this_level.each do |b|
        result[b.id] = result[b.parent_id].to_a + [b.id]
      end

      parent_ids = this_level.map(&:id)
    end

    result.tap do |path_map|
      raise("[ERROR] path is empty!") if path_map.blank?
    end
  end

  def tree
    self.class.make_tree(self)
  end

  def self.make_tree(parent, blocks = nil)
    blocks ||= parent.descendants_cache
    children = blocks.select do |blk|
      blk.parent_id == parent.id
    end.sort_by(&:sort).map do |blk|
      make_tree(blk, blocks)
    end
    parent.attributes.slice("id", "type", "sort", "meta", "data").merge("children" => children)
  end

  def calculate_path
    hash = ancestors(columns: %w[id parent_id]).pluck(:id, :parent_id).to_h
    target = []
    i = id
    loop do
      target << i
      i = hash[i]
      break if i.nil?
    end

    target
  end

  def path_cache
    return [id] if parent_id.nil?

    ## TODO read path cache from Current module
    ## TODO add `root_id` to blocks
    calculate_path
  end

  def latest_history
    histories.find_by!(history_version: history_version)
  end

  def save_snapshot!
    update!(snapshot_version: realtime_snapshot_version_increment)
  end

  def current_histories
    Docs::History.from_version_meta(children_version_meta)
  end

  def children_version_meta
    # descendants(columns: %w[id history_version parent_id]).pluck(:id, :history_version).to_h
    descendants_cache.pluck(:id, :history_version).to_h
  end
end
