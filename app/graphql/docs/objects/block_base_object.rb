# frozen_string_literal: true
module Docs
  class Objects::BlockBaseObject < BrickGraphQL::BaseObject
    has_primary_key uuid: true
    field :type, String, 'block type', null: false
    field :parent_id, BrickGraphQL::Scalars::UUID, 'parent uuid', null: true
    field :parent_type, String, 'parent type', null: true
    field :sort, GraphQL::Types::BigInt, 'block sort', null: false
    field :collaborators, [Accounts::Objects::User], 'collaborators', null: true
    field :next_sort, GraphQL::Types::BigInt, 'block next sort', null: false

    expose_permissions_field :show?

    # def self.create_payload_object(payload_type)
    #   klass_name = graphql_name
    #   payload = public_send("#{payload_type}_payload")
    #   Class.new(BrickGraphQL::BaseObject) do
    #     graphql_name "#{klass_name}#{payload_type.camelize}"
    #     payload.each { |h| field h[:name], h[:type], h[:description], **h[:opts] }
    #   end
    # end

    # def self.data_object
    #   return BrickGraphQL::Scalars::Nil if data_payload.blank?
    #   @data ||= create_payload_object('data')
    # end

    # def self.meta_object
    #   return BrickGraphQL::Scalars::Nil if meta_payload.blank?
    #   @meta ||= create_payload_object('meta')
    # end
  end
end
