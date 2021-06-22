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
    expect(subject.valid?).to be_falsey
  end

  it 'email address should be returns truthy' do
    subject.email = FFaker::Internet.email
    expect(subject.valid?).to be_truthy
  end
end
