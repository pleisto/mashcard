# frozen_string_literal: true

module System
  module Queries
    class Spaces < BrickGraphQL::BaseResolver
      description 'return all spaces for user.'
      type [System::Objects::Space], null: false
      authenticate_user!

      def resolve
        spaces = current_user.spaces.with_attached_avatar.to_a
        spaces.map do |space|
          is_owner = space.owner_id == current_user.id
          space.space_attributes.merge(email: current_user.email, owned: is_owner,
            invite_secret: is_owner ? space.invite_secret : nil)
        end
      end
    end
  end
end
