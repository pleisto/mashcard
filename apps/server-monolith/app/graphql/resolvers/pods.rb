# frozen_string_literal: true

module Resolvers
  class Pods < BaseResolver
    description 'return all pods for user.'
    type [Types::OldPod], null: false
    authenticate_user!

    def resolve
      pods = current_user.pods([:owner, :avatar_attachment]).to_a
      pods.map { |pod| pod.pod_as_json_by_user(current_user) }
    end
  end
end
