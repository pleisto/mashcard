# frozen_string_literal: true

require 'rails_helper'

describe Mashcard::Validators::UUIDValidator do
  subject do
    Class.new do
      include ActiveModel::Model
      include ActiveModel::Validations
      include Mashcard::Validators
      attr_accessor :uuid

      validates :uuid, uuid: true
    end.new
  end

  it 'invalid uuid should be returns falsey' do
    subject.uuid = 'aaa-3444-22-3'
    expect(subject).not_to be_valid
    expect(subject.errors[:uuid][0]).to eq(I18n.t('errors.messages.uuid_invalid'))
  end

  it 'correct uuid should be returns truthy' do
    subject.uuid = '61270c77-0714-492b-86c0-c6250ee6baab'
    expect(subject).to be_valid
  end
end
