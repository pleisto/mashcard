# frozen_string_literal: true
module Docs
  class Mutations::BlockSync < BrickGraphQL::BaseMutation
    argument :id, BrickGraphQL::Scalars::UUID, 'block unique id', required: true
    argument :type, String, description_same(Objects::BlockBaseObject, :type), required: true,
             validates: { Validators::BlockTypeValidator => {} }

    argument :parent_id, BrickGraphQL::Scalars::UUID, description_same(Objects::BlockBaseObject, :parent_id), required: false
    argument :parent_type, String, description_same(Objects::BlockBaseObject, :parent_type), required: false
    argument :sort, Int, description_same(Objects::BlockBaseObject, :sort), required: false
    argument :data, Scalars::BlockData, description_same(Scalars::BlockData), required: false
    argument :meta, Scalars::BlockMeta, description_same(Scalars::BlockMeta), required: false

    def resolve(args)
      block = Docs::Block.find_or_initialize_by(id: args[:id])
      # assign_attributes could update attributes without save
      block.assign_attributes(args.except(:id))
      block.collaborators << current_user.id
      puts block
      valid_payload(block)
      puts block.as_json
      nil
    end

    def valid_payload(block)
      block_type = Objects::Block.resolve_type(OpenStruct.new(type: block.type), {})
      %w(data meta).each do |payload_type|
        payload_defn = block_type.try("#{payload_type}_payload")
        # clean unsupported payload type
        if payload_defn.blank?
          block.send("#{payload_type}=", {})
          next
        end
        nonnull_payload_defn = payload_defn.select { |x| x[:opts][:null] == false }
        if nonnull_payload_defn.present? && block.send(payload_type).blank?
          raise BrickGraphQL::Errors::ArgumentError, "#{payload_type} is required"
        end
        # remove unpermitted keys
        params = ActionController::Parameters.new(block.send(payload_type))
        permit_keys = payload_defn.map { |x| x[:name] }
        block.send("#{payload_type}=", params.permit(permit_keys).as_json)

        nonnull_payload_defn.each do |f|
          if block.send(payload_type).try(:[], f[:name].to_s).blank?
            raise BrickGraphQL::Errors::ArgumentError, "#{payload_type}.#{f[:name]} is required"
          end
        end
      end
    end
  end
end
