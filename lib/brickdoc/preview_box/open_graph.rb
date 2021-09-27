# frozen_string_literal: true

module Brickdoc
  module PreviewBox
    class OpenGraph < Base
      def matched?
        @doc.css("head > meta[property='og:title']").first.present?
      end

      def data
        {
          title: @doc.css("head > meta[property='og:title']").first['content'],
          description: @doc.css("head > meta[property='og:description']").first['content'],
          cover: @doc.css("head > meta[property='og:image']").first['content']
        }
      end
    end
  end
end
