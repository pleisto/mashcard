# frozen_string_literal: true

module Docs
  module Objects
    class ShareLink < BrickGraphQL::BaseObject
      field :key, String, null: false
      field :policy, Enums::Policytype, null: false
      field :share_space_data, System::Objects::Space, null: false
      field :state, Enums::ShareLinkStateType, null: false
    end
  end
end
