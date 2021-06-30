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
  default_scope { order(sort: :desc) }

  belongs_to :pod
  belongs_to :parent, class_name: 'Docs::Block', optional: true
  has_many :children, class_name: 'Docs::Block', foreign_key: :parent_id, dependent: :restrict_with_exception
  has_many :histories, dependent: :restrict_with_exception
  has_many :snapshots, dependent: :restrict_with_exception

  validates :meta, presence: true, allow_blank: true
  validates :data, presence: true
  validates :pod, presence: true
  validates :collaborators, presence: true

  before_save do
    self.collaborators = collaborators.uniq
    ## TODO add redis lock
    self.history_version = history_version + 1 if meta_changed? || data_changed? || sort_changed? || parent_id_changed?
  end

  after_save do
    histories.create! if history_version_previously_changed? || id_previously_changed?
    snapshots.create! if snapshot_version_previously_changed?
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
      where: nil
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

    ## TODO save this query!
    Docs::Block.where(id: ActiveRecord::Base.connection.execute(manager.to_sql).field_values('id'))
  end

  def ancestors(opts = {})
    cte(:ancestors, opts)
  end

  def descendants(opts = {})
    cte(:descendants, opts)
  end

  def path_cache
    return [id] if parent_id.nil?

    ## TODO read path cache from Current module
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

  def latest_history
    histories.find_by!(history_version: history_version)
  end

  def save_snapshot!
    ## TODO add redis lock
    update!(snapshot_version: snapshot_version + 1)
  end

  def current_histories
    Docs::History.from_version_meta(children_version_meta)
  end

  def children_version_meta
    descendants(columns: %w[id history_version parent_id]).pluck(:id, :history_version).to_h
  end
end
