# frozen_string_literal: true
# == Schema Information
#
# Table name: docs_formulas
#
#  id             :uuid             not null, primary key
#  pod_id         :integer          not null
#  block_id       :uuid             not null
#  name           :string           not null
#  view           :json             default("{}"), not null
#  definition     :text             not null
#  cache_value    :json             not null
#  dependency_ids :uuid             default("{}"), not null, is an Array
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  level          :integer          default("0"), not null
#  version        :integer          default("0"), not null
#  kind           :string           default("expression"), not null
#
# Indexes
#
#  index_docs_formulas_on_block_id_and_name  (block_id,name) UNIQUE
#  index_docs_formulas_on_dependency_ids     (dependency_ids)
#  index_docs_formulas_on_pod_id             (pod_id)
#

class Docs::Formula < ApplicationRecord
  self.inheritance_column = :_type_disabled

  belongs_to :block, class_name: 'Docs::Block'
  belongs_to :pod, optional: true

  before_create do
    self.pod_id = block.pod_id
  end

  after_save do
    circular_dependency_check! if dependency_ids_previously_changed?
  end

  def circular_dependency_check!
    return true if dependency_ids.blank?

    raise("circular_dependency_found_1") if dependency_ids.include?(id)

    raise("circular_dependency_found_2") if (manual_dependency_ids).include?(id)
  end

  def manual_dependency_ids(result = [])
    return [] if dependency_ids.blank?

    todo_ids = dependency_ids - result

    result += dependency_ids

    Docs::Formula.where(id: todo_ids).each do |formula|
      result = (result + formula.manual_dependency_ids(result)).uniq
    end

    result
  end

  # TODO: - has circular dependency issue
  def cte_dependency_ids
    select_columns = [:id, :dependency_ids]
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
      m.on hierarchy[:id].eq(Arel.sql('ANY("recursive"."dependency_ids")'))
    end

    union = non_recursive_term.union :all, recursive_term
    as_statement = Arel::Nodes::As.new recursive_table, union

    manager = select_manager.dup.tap do |m|
      m.with :recursive, as_statement
      m.from recursive_table
      m.project Arel.star
    end

    ActiveRecord::Base.connection.execute(manager.to_sql).field_values('id')
  end
end
