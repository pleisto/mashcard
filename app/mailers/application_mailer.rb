# frozen_string_literal: true
class ApplicationMailer < ActionMailer::Base
  prepend_view_path(Brickdoc::SaaS.root.join('app', 'views')) if Brickdoc.saas?
  default from: 'noreply@brickdoc.com'
  layout 'mailer'
end
