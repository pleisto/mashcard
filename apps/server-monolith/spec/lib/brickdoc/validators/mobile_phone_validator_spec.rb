# frozen_string_literal: true

require 'rails_helper'

describe Brickdoc::Validators::MobilePhoneValidator do
  subject do
    Class.new do
      include ActiveModel::Model
      include ActiveModel::Validations
      include Brickdoc::Validators
      attr_accessor :phone

      validates :phone, mobile_phone: true
    end.new
  end

  it 'invalid phone number should be returns falsey' do
    subject.phone = '8623012340000'
    expect(subject).not_to be_valid
    expect(subject.errors[:phone][0]).to eq(I18n.t('errors.messages.mobile_phone_invalid'))
    subject.phone = '1234'
    expect(subject).not_to be_valid
    expect(subject.errors[:phone][0]).to eq(I18n.t('errors.messages.mobile_phone_invalid'))
  end

  it 'e164 numbers should be returns truthy' do
    subject.phone = '110086'
    expect(subject).to be_valid
    subject.phone = FFaker::PhoneNumberCU.e164_mobile_phone_number
    expect(subject).to be_valid
    subject.phone = '8618312344321'
    expect(subject).to be_valid
  end
end
