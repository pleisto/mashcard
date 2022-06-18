# frozen_string_literal: true

# rubocop:disable Naming/InclusiveLanguage

module Resolvers
  class BlockInfo < BaseResolver
    type Types::Blocks::Info, null: true

    argument :domain, GraphQL::Types::String, 'domain', required: true
    argument :id, GraphQL::Types::String, 'id', required: true

    def resolve(id:, domain:)
      return nil if id.blank?

      block, enabled_alias = Docs::Block.find_by_slug(id, domain, current_pod)
      return nil if block.nil?

      is_master = master?(block)
      permission = is_master ? nil : get_permission(block)

      return nil if !is_master && (permission.nil? || permission.disabled?)

      current_user&.save_last_position!(domain, id)

      result = {
        title: block.title,
        icon: block.icon,
        pin: fetch_pin(block),
        enabled_alias: enabled_alias || block.enabled_alias,
        id: block.id,
        is_deleted: !!block.deleted_at,
        path_array: block.path_array,
        collaborators: collaborators(block),
      }.compact

      result[:is_master] = is_master
      result[:permission] = permission

      result
    end

    def fetch_pin(block)
      return false if current_pod.fetch('domain') == ::Pod::ANONYMOUS_DOMAIN

      pin = Docs::Pin.find_by(user_id: current_user.id, pod_id: current_pod.fetch('id'), block_id: block.id)

      return false if pin.nil? || pin.deleted_at

      true
    end

    def master?(block)
      return false if current_user.nil?

      block.pod_id.in?(current_user.pods.ids)
    end

    def get_permission(block)
      base_query = block.share_links

      if current_pod.fetch('domain') == ::Pod::ANONYMOUS_DOMAIN
        base_query.find_by(share_pod_id: nil)
      else
        share_links = base_query.where(share_pod_id: [current_pod.fetch('id'), nil]).all
        return nil if share_links.blank?
        return share_links.first if share_links.one?

        share_links.find { |s| s.share_pod_id == current_pod.fetch('id') }
      end
    end

    def collaborators(block)
      return [] if block.collaborators.length <= 1

      Accounts::User.where(id: block.collaborators).includes(personal_pod: :avatar_attachment)
    end
  end
end
