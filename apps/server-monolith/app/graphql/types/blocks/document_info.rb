# frozen_string_literal: true

# rubocop:disable Naming/InclusiveLanguage, Naming/PredicateName, GraphQL/ResolverMethodLength

module Types
  module Blocks
    class DocumentInfo < Types::BaseObject
      graphql_name 'DocumentInfo'
      description 'MashCard DocumentInfo Scheme'

      field :id, Scalars::UUID, 'id', null: false
      # TODO: migrated from BlockInfo, need to  cleanup
      field :collaborators, [Types::PodBase], 'pod', null: false
      field :enabled_alias, Alias, 'alias', null: true
      field :icon, Icon, 'icon', null: true
      field :is_deleted, Boolean, 'is deleted', null: false
      field :is_master, Boolean, 'is master', null: false
      field :path_array, [Path], 'path', null: false
      field :permission, ShareLink, 'permission', null: true
      field :pin, Boolean, 'pin', null: false
      field :title, String, 'title', null: false

      def states_count
        object.states.count
      end

      def collaborators
        return [] if object.collaborators.length <= 1

        User.where(id: object.collaborators).includes(personal_pod: :avatar_attachment)
      end

      def is_master
        @is_master ||= !!(current_user && object.pod_id.in?(current_user.pods.map(&:id)))
      end

      def is_deleted
        !!object.deleted_at
      end

      def permission
        unless is_master
          base_query = object.share_links

          if current_pod.fetch('username') == ::Pod::ANONYMOUS_DOMAIN
            base_query.find_by(share_pod_id: nil)
          else
            share_links = base_query.where(share_pod_id: [current_pod.fetch('id'), nil]).all
            return nil if share_links.blank?
            return share_links.first if share_links.one?

            share_links.find { |s| s.share_pod_id == current_pod.fetch('id') }
          end
        end
      end

      def pin
        if current_pod&.fetch('username') != ::Pod::ANONYMOUS_DOMAIN
          Docs::Pin.exists?(user_id: current_user.id, pod_id: current_pod.fetch('id'), block_id: object.id, deleted_at: nil)
        else
          false
        end
      end
    end
  end
end
