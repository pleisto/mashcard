# frozen_string_literal: true

module Mutations
  module Pods
    class CreateOrUpdate < ::Mutations::BaseMutation
      # TODO: rename to podCreateOrUpdate
      graphql_name 'CreateOrUpdatePod'
      argument :avatar_signed_id, String, 'Avatar signed id', required: false
      argument :bio, String, 'bio', required: false
      argument :domain, String, 'domain', required: true
      argument :invite_enable, Boolean, 'invite enable', required: false
      argument :invite_secret, String, 'invite secret', required: false
      argument :name, String, 'pod name', required: false
      argument :type, Types::Pods::OperationType, required: true
      field :pod, Types::OldPod, null: true

      # TODO：split create and update to different mutation
      def resolve(attrs)
        domain = attrs.fetch(:domain)
        type = attrs.fetch(:type)
        # TODO: permission check
        pod = current_user.own_pods.find { |p| p.username == domain }

        extra = {
          avatar: attrs[:avatar_signed_id],
          bio: attrs[:bio],
          display_name: attrs[:name],
          invite_secret: attrs[:invite_secret],
          invite_enable: attrs[:invite_enable],
        }.compact

        case type
        when 'CREATE'
          return { errors: [I18n.t('accounts.errors.pod_exist')] } if pod

          pod = current_user.create_own_group!(
            extra.merge(username: domain)
          )
        when 'UPDATE'
          return { errors: [I18n.t('accounts.errors.pod_not_exist')] } if pod.nil?

          pod.update!(extra)
        else
          return { errors: [I18n.t('accounts.errors.invalid_operation_type')] }
        end

        {
          pod: pod,
        }
      end
    end
  end
end
