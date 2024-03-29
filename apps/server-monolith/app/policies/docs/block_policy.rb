# frozen_string_literal: true

module Docs
  class BlockPolicy < ApplicationPolicy
    scope_matcher :array, Array
    pre_check :allow_owner

    def show?
      record.show_policy?(user)
    end

    def edit?
      record.share_links.exists?(share_pod_id: user.id, policy: 'edit', state: 'enabled')
    end

    # scope_for :active_record_relation, :collaborating do |relation|
    #   relation.where('? = ANY(collaborators)', user.id)
    # end

    scope_for :array, :collaborating do |array|
      array.select { |block| block.show_policy?(user) }
    end

    private

    def allow_owner
      if user && record.pod_id.in?(user.pods.map(&:id))
        allow!
      end
    end
  end
end
