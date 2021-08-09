# frozen_string_literal: true
module Docs
  class Mutations::BlockCreateShareLink < BrickGraphQL::BaseMutation
    argument :id, BrickGraphQL::Scalars::UUID, 'block unique id', required: true
    argument :policy, Enums::Policytype, 'policy', required: true
    argument :share_type, Enums::Sharetype, 'share type', required: true
    argument :expired_at, GraphQL::Types::ISO8601DateTime, 'expired time', required: false
    argument :webids, [String], 'webid', required: false
    argument :emails, [BrickGraphQL::Scalars::Email], 'email', required: false
    field :share_link, Objects::ShareLink, null: true

    def resolve(args)
      block = Docs::Block.find(args[:id])
      target_pod_ids = []

      case args[:share_type]
      when "POD"
        raise BrickGraphQL::Errors::ArgumentError, "Webid is empty!" if args[:webids].blank?
        target_pod_ids = Pod.where(webid: args[:webids]).to_a.map(&:id)
      when "USER"
        raise BrickGraphQL::Errors::ArgumentError, "Email is empty!" if args[:emails].blank?
        target_pod_ids = Accounts::User.where(email: args[:emails]).includes(:personal_pod).to_a.map { |u| u.personal_pod.id }
      when "ANONYMOUS", "EVERYONE"
      else
        raise BrickGraphQL::Errors::ArgumentError, "ShareType not supported"
      end

      target_pod_ids = target_pod_ids.uniq - [current_pod.fetch('id')]
      if target_pod_ids.blank?
        case args[:share_type]
        when "POD"
          return { errors: [I18n.t('accounts.errors.pod_not_exist')] }
        when "USER"
          return { errors: [I18n.t('accounts.errors.user_not_exist')] }
        end
      end

      params = {
        block_id: block.id,
        target_pod_ids: target_pod_ids,
        expired_at: args[:expired_at],
        policy: args[:policy],
        pod_id: current_pod.fetch('id'),
        user_id: current_user.id
      }

      share_link = Docs::ShareLink.create!(params)

      { share_link: share_link }
    end
  end
end
