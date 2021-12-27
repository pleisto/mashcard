# frozen_string_literal: true
# == Schema Information
#
# Table name: accounts_members
#
#  id         :integer          not null, primary key
#  pod_id     :integer          not null
#  user_id    :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  role       :integer          not null
#  state      :integer          default("0"), not null
#
# Indexes
#
#  index_accounts_members_on_pod_id   (pod_id)
#  index_accounts_members_on_user_id  (user_id)
#

class Accounts::Member < ApplicationRecord
  belongs_to :user
  belongs_to :pod

  delegate :webid, :name, :email, :avatar_data, to: :user

  enum role: {
    admin: 0,
    member: 10
  }

  enum state: {
    enabled: 0,
    disabled: 10
  }
end
