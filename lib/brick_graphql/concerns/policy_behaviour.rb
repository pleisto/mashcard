# frozen_string_literal: true

module BrickGraphQL
  module Concerns::PolicyBehaviour
    def self.included(base)
      base.include ActionPolicy::GraphQL::Behaviour
    end
  end
end
