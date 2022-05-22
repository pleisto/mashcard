# typed: strict
# frozen_string_literal: true

module System
  module Objects
    class Avatar < BrickGraphQL::BaseObject
      graphql_name 'avatar'

      field :download_url, String, 'download url', null: false
      field :signed_id, String, 'signed id', null: false
      field :url, String, 'url', null: false
    end
  end
end
