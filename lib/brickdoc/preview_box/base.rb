# frozen_string_literal: true

module Brickdoc
  module PreviewBox
    class Base
      def initialize(url, doc)
        @url = url
        @doc = doc
        @base_url = URI.join(url, '/').to_s
      end

      def complete_path(path)
        if path.start_with?('/')
          URI.join(@base_url, path).to_s
        else
          path
        end
      end

      def matched?
        true
      end

      def data
        title = @doc.css('head > title').text
        description = @doc.css('head > meta').find { |e| e['name']&.downcase == 'description' }&.[]('content') || title
        cover_path = @doc.css('head > meta').map { |e| e['content'] }.compact
          .find { |u| ['jpg', 'png'].include?(u.downcase.split('.').last) }
        cover_url = cover_path ? complete_path(cover_path) : nil
        {
          title: title,
          description: description,
          cover: cover_url
        }
      end
    end
  end
end
