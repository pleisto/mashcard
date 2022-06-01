# frozen_string_literal: true

module Docs
  module Queries
    class ConversationComments < BrickGraphQL::BaseResolver
      type [Docs::Objects::Conversation], null: true

      argument :page_ids, [BrickGraphQL::Scalars::UUID], required: true
      authenticate_user!

      def resolve(args)
        return [] if args[:page_ids].blank?

        Docs::Conversation.where(doc_id: args[:page_ids]).includes([
          comments: [creator: [personal_space: :avatar_attachment]],
        ]).map(&:to_graphql)
      end
    end
  end
end
