# frozen_string_literal: true

module Docs
  module Inputs
    class ShareLinkInput < BrickGraphQL::BaseInputObject
      argument :domain, String, 'block unique id', required: true
      argument :policy, Enums::Policytype, 'policy', required: true
      argument :state, Enums::ShareLinkStateType, 'state type', required: true
    end
  end
end
