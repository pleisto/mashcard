# frozen_string_literal: true

module Resolvers
  class Notifications < BaseResolver
    type [Types::Notification], null: true

    authenticate_user!

    def resolve
      ::Notification.where(user_id: current_user.id).includes(:source)
    end
  end
end
