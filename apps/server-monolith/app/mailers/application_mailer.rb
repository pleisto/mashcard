# frozen_string_literal: true

class ApplicationMailer < ActionMailer::Base
  default from: BrickdocConfig.mailer[:from]
  layout 'mailer'
end
