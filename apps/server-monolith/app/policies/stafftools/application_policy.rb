# frozen_string_literal: true

module Stafftools
  class ApplicationPolicy < ::ApplicationPolicy
    protected

    def required_permission(permission)
      user.has_stafftools_permission?('root') || user.has_stafftools_permission?(permission)
    end
  end
end
