# frozen_string_literal: true

module Types
  class ShareLinkInput < BaseInputObject
    argument :domain, String, 'block unique id', required: true
    argument :policy, Types::Policytype, 'policy', required: true
    argument :state, Types::ShareLinkStateType, 'state type', required: true
  end
end
