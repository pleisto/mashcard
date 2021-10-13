# frozen_string_literal: true

module Docs
  class Queries::BlockInfo < BrickGraphQL::BaseResolver
    type Docs::Objects::BlockInfo, null: true

    argument :id, GraphQL::Types::String, required: true

    def resolve(id:)
      return nil if id.blank?
      block = Docs::Block.find_by(id: id)
      return nil if block.nil?

      {
        title: block.title,
        pin: fetch_pin(block),
        is_deleted: !!block.deleted_at,
        permission: permission(block)
      }
    end

    def fetch_pin(block)
      return false if current_pod.fetch('webid') == Pod::ANONYMOUS_WEBID

      pin = Docs::Pin.find_by(user_id: current_user.id, pod_id: current_pod.fetch('id'), block_id: block.id)

      return false if pin.nil? || pin.deleted_at

      true
    end

    def permission(block)
      base_query = block.share_links

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
