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
    expect(subject.valid?).to be_falsey
    subject.phone = '1234'
    expect(subject.valid?).to be_falsey
  end

  it 'e164 numbers should be returns truthy' do
    subject.phone = '110086'
    expect(subject.valid?).to be_truthy
    subject.phone = FFaker::PhoneNumberCU.e164_mobile_phone_number
    expect(subject.valid?).to be_truthy
    subject.phone = '8618312344321'
    expect(subject.valid?).to be_truthy
  end
end
