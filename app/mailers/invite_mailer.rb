# frozen_string_literal: true
class InviteMailer < ApplicationMailer
  def send_link
    @url = params.fetch(:url)
    @title = params.fetch(:title)
    @from = params.fetch(:from)
    mail(to: params.fetch(:email), subject: "[Invite] #{@title}")
  end
end
