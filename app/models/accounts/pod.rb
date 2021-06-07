# frozen_string_literal: true
class Accounts::Pod < ApplicationRecord
  validates :webid, presence: true, pod_name: true

  def avatar
    avatar_key
  end
end
