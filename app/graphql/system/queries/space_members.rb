# frozen_string_literal: true

module System
  class Queries::SpaceMembers < BrickGraphQL::BaseResolver
    description 'return all space users'
    type [System::Objects::SpaceMember], null: true
    # authenticate_user!

    def resolve
      domain = current_space.fetch('domain')
      space = Space.find_by(domain: domain)
      raise BrickGraphQL::Errors::ArgumentError, :invalid_space if space.nil?

      space.members.includes(user: [personal_space: :avatar_attachment])
    end
  end
end
