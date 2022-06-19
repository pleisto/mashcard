# frozen_string_literal: true

module Types
  module Pods
    class Avatar < Types::BaseObject
      graphql_name 'Avatar'

      field :download_url, String, 'download url', null: false
      field :signed_id, String, 'signed id', null: false
      field :url, String, 'url', null: false
    end
  end
end
