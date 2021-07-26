# frozen_string_literal: true
module System
  class Mutations::CreateOrUpdatePod < BrickGraphQL::BaseMutation
    argument :webid, String, "webid", required: true
    argument :type, Enums::PodOperationType, required: true
    argument :name, String, "pod name", required: true
    argument :bio, String, "bio", required: false
    argument :avatar, String, "avatar", required: false
    field :pod, Objects::Pod, null: true

    def resolve(attrs)
      webid = attrs.fetch(:webid)
      type = attrs.fetch(:type)
      name = attrs.fetch(:name)
      pod = current_user.pods.find { |p| p.webid == webid }

      extra = { avatar_uri: attrs[:avatar], bio: attrs[:bio] }.compact

      case type
      when "CREATE"
        return { errors: [I18n.t('accounts.errors.pod_exist')] } if pod

        pod = Pod.create!(extra.merge(owner_id: current_user.id, name: name, webid: webid))
      when "UPDATE"
        return { errors: [I18n.t('accounts.errors.pod_not_exist')] } if pod.nil?

        pod.update!(extra.merge(name: name))
      else
        return { errors: [I18n.t('accounts.errors.invalid_operation_type')] }
      end

      {
        pod: pod
      }
    end
  end
end
