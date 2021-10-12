# frozen_string_literal: true

module System
  class Queries::Pod < BrickGraphQL::BaseResolver
    description 'return current pod for user.'

    argument :webid, GraphQL::Types::String, required: true
    type System::Objects::Pod, null: false
    authenticate_user!

    def resolve(webid:)
      current_user.pods.find_by(webid: webid)
    end
  end
end
