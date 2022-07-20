# frozen_string_literal: true

require 'faraday'
require 'faraday/net_http'

module Mashcard
  module PreviewBox
    def self.add_connection
      @connection = Faraday.new(
        url: 'https://iframe.ly',
        params: { api_key: MashcardConfig.iframely_api_access_key },
      ) do |faraday|
        faraday.request :url_encoded
        faraday.response :json
        faraday.adapter :net_http
      end
    end

    # Extract the iframe src from the iframely html snippet
    def self.extract_iframe_url(html)
      dom = Nokogiri::HTML.parse(html).xpath('//iframe').first
      dom.present? ? dom['src'] : nil
    end

    def self.preview(url)
      response = @connection.get('/api/iframely', { url: url, omit_script: 1, omit_css: 1, media: 1, iframe: 0 })
      thumbnail = response.body.dig('links', 'thumbnail') || []
      icon = response.body.dig('links', 'icon') || []
      html = response.body.dig('html')
      medium = response.body.dig('meta', 'medium')

      iframe_url = html.present? ? extract_iframe_url(html) : nil

      if response.status == 200
        data = {
          title: response.body.dig('meta', 'title') || url,
          description: response.body.dig('meta', 'description'),
          cover: thumbnail[0]&.dig('href') || icon.find do |i|
                                                i['rel']&.include?('apple-touch-icon')
                                              end&.dig('href') || '',
          icon: icon.find { |i| i['rel']&.include?('shortcut') }&.dig('href') || '',
          type: 'website',
          iframe_url: iframe_url,
        }

        if medium == 'image'
          data[:type] = 'image'
        elsif medium == 'file'
          file = (response.body.dig('links', 'file') || []).detect { |f| f['href'] == url } || {}
          data[:type] = file['type'] || 'unknown'
          data[:size] = file['content_length']
        end
        data
      else
        {
          title: url,
          description: '',
          cover: nil,
          type: 'unknown',
        }
      end
    rescue => e
      Rails.logger.error(e)
      Rails.logger.error(e.backtrace.join("\n"))
      {
        title: url,
        description: '',
        cover: nil,
        type: 'unknown',
      }
    end

    add_connection
  end
end
