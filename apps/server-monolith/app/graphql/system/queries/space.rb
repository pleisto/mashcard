# frozen_string_literal: true

module System
  module Queries
    class Space < BrickGraphQL::BaseResolver
      description 'return current space for user.'

      argument :domain, GraphQL::Types::String, required: true
      type System::Objects::Space, null: false
      authenticate_user!

      def resolve(domain:)
        space = current_user.spaces.find_by(domain: domain)
        is_owner = space.owner_id == current_user.id
        space.as_json.merge({
          owned: is_owner,
          invite_secret: is_owner ? space.invite_secret : nil,
        })
      end
    end
  end
end
