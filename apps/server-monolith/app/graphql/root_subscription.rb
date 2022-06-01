# frozen_string_literal: true

class RootSubscription < BrickGraphQL::BaseObject
  field :new_patch, subscription: Docs::Subscriptions::NewPatch
  field :ydoc, subscription: Docs::Subscriptions::Ydoc
end
