# frozen_string_literal: true

class ApplicationMailer < ActionMailer::Base
  default from: MashcardConfig.mailer[:from]
  layout 'mailer'
  helper :application
end
