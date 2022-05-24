# frozen_string_literal: true

require 'rails_helper'

describe Brickdoc::Validators::DomainValidator do
  subject do
    Class.new do
      include ActiveModel::Model
      include ActiveModel::Validations
      include Brickdoc::Validators
      attr_accessor :name

      validates :name, domain: true
    end.new
  end

  it 'invalid space name should be returns falsey' do
    subject.name = '-hello'
    expect(subject).not_to be_valid
    expect(subject.errors[:name][0]).to eq(I18n.t('errors.messages.domain_invalid'))
    subject.name = 'admin'
    expect(subject).not_to be_valid
    expect(subject.errors[:name][0]).to eq(I18n.t('errors.messages.domain_invalid'))
    subject.name = '.test'
    expect(subject).not_to be_valid
    expect(subject.errors[:name][0]).to eq(I18n.t('errors.messages.domain_invalid'))
  end

  it 'is returns truthy' do
    subject.name = 'oortcast'
    expect(subject).to be_valid
    subject.name = 'admin-external-corp'
    expect(subject).to be_valid
  end
end
