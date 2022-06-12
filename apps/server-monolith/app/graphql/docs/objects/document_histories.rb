# frozen_string_literal: true

module Docs
  module Objects
    class DocumentHistories < BrickGraphQL::BaseObject
      graphql_name 'documentHistories'

      field :histories, [DocumentHistory], 'History States', null: true
      field :users, [System::Objects::ThinUser], 'History Users', null: true
    end
  end
end
