# frozen_string_literal: true

module Resolvers
  class ConversationComments < BaseResolver
    type [Types::Conversation], null: true

    argument :page_ids, [Scalars::UUID], required: true
    authenticate_user!

    def resolve(args)
      return [] if args[:page_ids].blank?

      Docs::Conversation.where(doc_id: args[:page_ids]).includes([
        comments: [creator: [personal_pod: :avatar_attachment]],
      ]).map(&:to_graphql)
    end
  end
end
