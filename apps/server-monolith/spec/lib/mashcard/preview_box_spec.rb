# frozen_string_literal: true

require 'rails_helper'

describe Mashcard::PreviewBox do
  context 'normal html page' do
    it 'is get preview data: google' do
      VCR.use_cassette('preview_box_google', record: :new_episodes) do
        data = described_class.preview('https://www.google.com')
        expect(data[:title]).to eq('Google')
      end
    end

    it 'is get preview data: w3schools' do
      VCR.use_cassette('preview_box_w3schools', record: :new_episodes) do
        data = described_class.preview('https://www.w3schools.com/')

        expect(data[:title]).to eq('W3Schools Free Online Web Tutorials')
        expect(data[:description]).to include('HTML')
      end
    end
  end

  context 'opengraph' do
    it 'is get preview data' do
      VCR.use_cassette('preview_box_github', record: :new_episodes) do
        data = described_class.preview('https://github.com/')
        expect(data[:title]).to start_with('GitHub')
        expect(data[:description]).to include('open source')
        expect(data[:cover]).to start_with('http')
        expect(data[:cover]).to end_with('png')
      end
    end
  end

  context 'file' do
    it 'is get preview data: image' do
      VCR.use_cassette('preview_box_image', record: :new_episodes) do
        data = described_class.preview('https://avatars.githubusercontent.com/u/41993484?s=120&v=4')
        expect(data[:type]).to include('image')
      end
    end

    it 'is get preview data: pdf' do
      VCR.use_cassette('preview_box_pdf', record: :new_episodes) do
        data = described_class.preview('https://pdftron.s3.amazonaws.com/downloads/pl/demo-annotated.pdf')
        expect(data[:title]).to end_with('pdf')
        expect(data[:type]).to include('pdf')
        expect(data[:size]).to be_present
      end
    end
  end
end
