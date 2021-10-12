# frozen_string_literal: true

module System
  class Queries::PodMembers < BrickGraphQL::BaseResolver
    description 'return all pod users'
    type [System::Objects::PodMember], null: true
    # authenticate_user!

    def resolve
      webid = current_pod.fetch('webid')
      pod = Pod.find_by(webid: webid)
      raise BrickGraphQL::Errors::ArgumentError, :invalid_pod if pod.nil?

      pod.members.includes(user: [personal_pod: :avatar_attachment])
    end
  end
end
