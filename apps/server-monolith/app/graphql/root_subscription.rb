# typed: strict
# frozen_string_literal: true

class RootSubscription < BrickGraphQL::BaseObject
  include AutoGraphQLFields

  add_fields_for BrickGraphQL::Component.subscription_modules(BrickdocSchema::NAMESPACES), :subscription
end
