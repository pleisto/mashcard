# frozen_string_literal: true

module System
  class Queries::Pods < BrickGraphQL::BaseResolver
    description 'return all pods for user.'
    type [System::Objects::Pod], null: false
    authenticate_user!

    def resolve
      current_user.pods
    end
  end
end
