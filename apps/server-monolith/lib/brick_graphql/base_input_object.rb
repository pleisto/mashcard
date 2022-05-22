# typed: false
# frozen_string_literal: true

module BrickGraphQL
  class BaseInputObject < ::GraphQL::Schema::InputObject
    description "InputObject type of #{self.class.name.demodulize}"

    include BrickGraphQL::Concerns::CopyFieldDescription
  end
end
