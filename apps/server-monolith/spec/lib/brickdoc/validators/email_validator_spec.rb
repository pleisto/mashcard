# typed: false
# frozen_string_literal: true

require 'rails_helper'

describe Brickdoc::Validators::EmailValidator do
  subject do
    Class.new do
      include ActiveModel::Model
      include ActiveModel::Validations
      include Brickdoc::Validators
      attr_accessor :email

      validates :email, email: true
    end.new
  end

  it 'invalid address should be returns falsey' do
    subject.email = 'fake@163.com@'
    expect(subject).not_to be_valid
    expect(subject.errors[:email][0]).to eq(I18n.t('errors.messages.email_invalid'))
  end

  it 'email address should be returns truthy' do
    subject.email = FFaker::Internet.email
    expect(subject).to be_valid
  end
end
