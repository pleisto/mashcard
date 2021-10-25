# frozen_string_literal: true

require 'rails_helper'

describe Brickdoc::PreviewBox do
  context 'normal html page' do
    it 'should be get preview data: google' do
      VCR.use_cassette('preview_box_google') do
        data = Brickdoc::PreviewBox.preview('https://www.google.com')
        expect(data[:title]).to eq('Google')
        expect(data[:cover]).to start_with('http')
        expect(data[:cover]).to end_with('png')
      end
    end

    it 'should be get preview data: w3schools' do
      VCR.use_cassette('preview_box_w3schools') do
        data = Brickdoc::PreviewBox.preview('https://www.w3schools.com/')

        expect(data[:title]).to eq('W3Schools Free Online Web Tutorials')
        expect(data[:description]).to include('HTML')
      end
    end
  end

  context 'opengraph' do
    it 'should be get preview data' do
      VCR.use_cassette('preview_box_github') do
        data = Brickdoc::PreviewBox.preview('https://github.com/')
        expect(data[:title]).to start_with('GitHub')
        expect(data[:description]).to include('open source')
        expect(data[:cover]).to start_with('http')
        expect(data[:cover]).to end_with('png')
      end
    end
  end
end
