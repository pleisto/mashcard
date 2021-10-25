# frozen_string_literal: true

module System
  class Queries::Pods < BrickGraphQL::BaseResolver
    description 'return all pods for user.'
    type [System::Objects::Pod], null: false
    authenticate_user!

    def resolve
      pods = current_user.pods.with_attached_avatar.to_a
      pods.map do |pod|
        pod.attributes.merge(email: current_user.email)
      end
    end
  end
end
