# frozen_string_literal: true
class ApplicationMailer < ActionMailer::Base
  default from: 'noreply@brickdoc.com'
  layout 'mailer'
end
