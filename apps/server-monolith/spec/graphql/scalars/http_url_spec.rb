# frozen_string_literal: true

require 'rails_helper'

describe Scalars::HttpUrl do
  subject { described_class }

  it 'invalid uri should be raise error' do
    expect { subject.coerce_input('data:text/plain;Hello%2C%20World!', nil) }.to raise_error(GraphQL::CoercionError)
    expect { subject.coerce_input('ftp://example.org/test.jpg', nil) }.to raise_error(GraphQL::CoercionError)
  end

  it 'data uri and http url should be work' do
    expect { subject.coerce_input('data:image/png;base64,SGVsbG8sIFdvcmxkIQ', nil) }.not_to raise_error
    expect { subject.coerce_input('https://xn--7dv29ab1ak38b.cn/mock.webp', nil) }.not_to raise_error
  end
end
