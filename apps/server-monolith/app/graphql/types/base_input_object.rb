# frozen_string_literal: true

module Types
  class BaseInputObject < ::GraphQL::Schema::InputObject
    description "InputObject type of #{self.class.name.demodulize}"
    prepend Mashcard::GraphQL::CopyFieldDescription
  end
end
