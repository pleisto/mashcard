# frozen_string_literal: true

require 'rails_helper'

describe Brickdoc::Logger do
  let(:msg) { 'logger-test' }
  let(:log) { StringIO.new }
  let(:logger) { described_class.new(log) }
  it 'output should be json format' do
    logger.info msg
    log.rewind
    expect(JSON.parse(log.read)).to include('message' => msg, 'event' => 'logger.call')
  end
end
