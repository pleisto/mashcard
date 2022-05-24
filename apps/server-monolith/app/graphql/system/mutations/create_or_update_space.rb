# frozen_string_literal: true

module System
  module Mutations
    class CreateOrUpdateSpace < BrickGraphQL::BaseMutation
      argument :avatar_signed_id, String, 'Avatar signed id', required: false
      argument :bio, String, 'bio', required: false
      argument :domain, String, 'domain', required: true
      argument :invite_enable, Boolean, 'invite enable', required: false
      argument :invite_secret, String, 'invite secret', required: false
      argument :name, String, 'space name', required: false
      argument :type, Enums::SpaceOperationType, required: true
      field :space, Objects::Space, null: true

      # TODO：split create and update to different mutation
      def resolve(attrs)
        domain = attrs.fetch(:domain)
        type = attrs.fetch(:type)
        # TODO: permission check
        space = current_user.own_spaces.find { |p| p.domain == domain }

        extra = { avatar: attrs[:avatar_signed_id] }.merge(attrs.slice(:bio, :name, :invite_secret,
          :invite_enable)).compact

        case type
        when 'CREATE'
          return { errors: [I18n.t('accounts.errors.space_exist')] } if space

          space = current_user.own_spaces.create!(extra.merge(domain: domain))
        when 'UPDATE'
          return { errors: [I18n.t('accounts.errors.space_not_exist')] } if space.nil?

          space.update!(extra)
        else
          return { errors: [I18n.t('accounts.errors.invalid_operation_type')] }
        end

        {
          space: space,
        }
      end
    end
  end
end
