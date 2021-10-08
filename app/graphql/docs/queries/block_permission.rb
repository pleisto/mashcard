# frozen_string_literal: true

module Docs
  class Queries::BlockPermission < BrickGraphQL::BaseResolver
    type Docs::Objects::ShareLink, null: true

    argument :id, GraphQL::Types::String, required: true

    def resolve(id:)
      return nil if id.blank?
      base_query = Docs::Block.non_deleted.find(id).share_links

      if current_pod.fetch('webid') == Pod::ANONYMOUS_WEBID
        base_query.find_by(share_webid: Pod::ANYONE_WEBID)
      else
        share_links = base_query.where(share_webid: [current_pod.fetch('webid'), Pod::ANYONE_WEBID]).all
        return nil if share_links.blank?
        return share_links.first if share_links.one?

        share_links.find { |s| s.share_webid == current_pod.fetch('webid') }
      end
    end
  end
end
