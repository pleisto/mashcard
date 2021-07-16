# frozen_string_literal: true

class Docs::BlockPolicy < ApplicationPolicy
  def show?
    record.collaborators.include?(user.id)
  end

  scope_for :active_record_relation, :collaborating do |relation|
    relation.where('? = ANY(collaborators)', user.id)
  end
end
