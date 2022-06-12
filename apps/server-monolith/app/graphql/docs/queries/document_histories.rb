# frozen_string_literal: true

module Docs
  module Queries
    class DocumentHistories < BrickGraphQL::BaseResolver
      type Docs::Objects::DocumentHistories, null: true

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
end
