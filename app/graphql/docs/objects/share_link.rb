# frozen_string_literal: true
module Docs
  module Objects
    class ShareLink < BrickGraphQL::BaseObject
      field :policy, Enums::Policytype, null: false
      field :state, Enums::ShareLinkStateType, null: false
      field :key, String, null: false
      field :share_pod_data, System::Objects::Pod, null: false
    end
  end
end
