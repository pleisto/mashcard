# frozen_string_literal: true

module Resolvers
  class Pods < BaseResolver
    description 'return all pods for user.'
    type [Types::Pod], null: false
    authenticate_user!

    def resolve
      current_user.pods([:owner, :avatar_attachment]).to_a
    end
  end
end
