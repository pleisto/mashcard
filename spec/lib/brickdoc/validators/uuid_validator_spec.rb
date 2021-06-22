# frozen_string_literal: true

require 'rails_helper'

describe Brickdoc::Validators::UUIDValidator do
  subject do
    Class.new do
      include ActiveModel::Model
      include ActiveModel::Validations
      include Brickdoc::Validators
      attr_accessor :uuid
      validates :uuid, uuid: true
    end.new
  end

  it 'invalid uuid should be returns falsey' do
    subject.uuid = 'aaa-3444-22-3'
    expect(subject.valid?).to be_falsey
  end

  it 'correct uuid should be returns truthy' do
    subject.uuid = "61270c77-0714-492b-86c0-c6250ee6baab"
    expect(subject.valid?).to be_truthy
  end
end
