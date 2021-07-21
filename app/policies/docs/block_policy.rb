# frozen_string_literal: true

class Docs::BlockPolicy < ApplicationPolicy
  scope_matcher :array, Array

  def show?
    record.collaborators.include?(user.id)
  end

  scope_for :active_record_relation, :collaborating do |relation|
    relation.where('? = ANY(collaborators)', user.id)
  end

  scope_for :array, :collaborating do |array|
    array.select { |block| block.collaborators.include?(user.id) }
  end
end
