# frozen_string_literal: true

module Resolvers
  class DocumentHistories < BaseResolver
    type Types::DocumentHistories, null: true

    argument :id, GraphQL::Types::String, required: true, description: 'doc id'
    authenticate_user!

    def resolve(id:)
      # TODO: paginate
      histories = Docs::DocumentHistory.where(document_id: id).includes(:user).order('created_at DESC').limit(100).to_a
      users = histories.map(&:user).uniq(&:id)
      {
        histories: histories,
        users: users,
      }
    end
  end
end
