# frozen_string_literal: true
module Docs
  class Objects::TextBlock < Objects::BlockBaseObject
    description "text blocks"

    def self.data_object
      create_object do
        graphql_name 'TextBlockData'
        field :content, String, 'Text Content', null: false
      end
    end

    field :data, data_object, null: false
  end
end
