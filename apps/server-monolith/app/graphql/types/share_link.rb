# frozen_string_literal: true

module Types
  class ShareLink < Types::BaseObject
    field :key, String, null: false
    field :policy, Types::Policytype, null: false
    field :share_pod_data, Types::Pod, null: false
    field :state, Types::ShareLinkStateType, null: false
  end
end
