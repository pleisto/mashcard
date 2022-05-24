# frozen_string_literal: true

module Docs
  class BlockPolicy < ApplicationPolicy
    scope_matcher :array, Array

    def show?
      record.show_policy?(user)
    end

    # scope_for :active_record_relation, :collaborating do |relation|
    #   relation.where('? = ANY(collaborators)', user.id)
    # end

    scope_for :array, :collaborating do |array|
      array.select { |block| block.show_policy?(user) }
    end
  end
end
