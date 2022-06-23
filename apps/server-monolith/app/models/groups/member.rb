# frozen_string_literal: true

# == Schema Information
#
# Table name: groups_members
#
#  id         :bigint           not null, primary key
#  role       :integer          not null
#  state      :integer          default("enabled"), not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  group_id   :bigint           not null
#  user_id    :bigint           not null
#
# Indexes
#
#  index_accounts_members_on_group_id  (group_id)
#  index_accounts_members_on_user_id   (user_id)
#
module Groups
  class Member < ApplicationRecord
    belongs_to :group, class_name: 'Group', inverse_of: :members
    belongs_to :user, class_name: 'User', inverse_of: :group_members

    # delegate :domain, :name, :email, :avatar_data, to: :user

    enum role: {
      owner: 0,
      admin: 1,
      member: 5,
    }

    enum state: {
      enabled: 0,
      disabled: 10,
    }
  end
end
