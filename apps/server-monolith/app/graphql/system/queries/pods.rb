# frozen_string_literal: true

module System
  module Queries
    class Pods < BrickGraphQL::BaseResolver
      description 'return all pods for user.'
      type [System::Objects::Pod], null: false
      authenticate_user!

      def resolve
        pods = current_user.pods.with_attached_avatar.to_a
        pods.map do |pod|
          is_owner = pod.owner_id == current_user.id
          pod.pod_attributes.merge(email: current_user.email, owned: is_owner,
            invite_secret: is_owner ? pod.invite_secret : nil)
        end
      end
    end
  end
end
