# frozen_string_literal: true

require 'rails_helper'

describe Resolvers::PreviewBox, type: :query do
  describe '#resolver' do
    query = <<-'GRAPHQL'
       query QueryPreviewBox($url: String!) {
        previewBox(url: $url) {
          url
          title
          description
          cover
        }
       }
    GRAPHQL

    it 'works' do
      # graphql_execute(query, { url: 'https://www.amazon.com/gp/product/B005T3GRNW/ref=s9_simh_gw_p147_d0_i2' })
      # expect(response.success?).to be true
      # expect(response.data['previewBox']['title']).to include('Seagate 1TB')
      # expect(response.data['previewBox']['description']).to include('FREE')

      VCR.use_cassette('preview_box_graphql_query_github') do
        graphql_execute(query, { url: 'https://github.com' })
      end

      expect(response.success?).to be true
      expect(response.data['previewBox']['description']).to start_with('GitHub')
      expect(response.data['previewBox']['cover']).to end_with('png')
    end
  end
end
