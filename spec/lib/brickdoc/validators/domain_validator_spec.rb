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
    expect(subject.valid?).to be_falsey
    expect(subject.errors[:name][0]).to eq(I18n.t("errors.messages.domain_invalid"))
    subject.name = 'admin'
    expect(subject.valid?).to be_falsey
    expect(subject.errors[:name][0]).to eq(I18n.t("errors.messages.domain_invalid"))
    subject.name = '.test'
    expect(subject.valid?).to be_falsey
    expect(subject.errors[:name][0]).to eq(I18n.t("errors.messages.domain_invalid"))
  end

  it 'should be returns truthy' do
    subject.name = 'oortcast'
    expect(subject.valid?).to be_truthy
    subject.name = 'admin-external-corp'
    expect(subject.valid?).to be_truthy
  end
end
