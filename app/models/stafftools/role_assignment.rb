# frozen_string_literal: true
# == Schema Information
#
# Table name: stafftools_role_assignments
#
#  id                 :integer          not null, primary key
#  accounts_user_id   :integer          not null
#  stafftools_role_id :integer          not null
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#
# Indexes
#
#  index_stafftools_role_assignments_on_accounts_user_id    (accounts_user_id)
#  index_stafftools_role_assignments_on_stafftools_role_id  (stafftools_role_id)
#

class Stafftools::RoleAssignment < ApplicationRecord
  belongs_to :accounts_user, class_name: 'Accounts::User', foreign_key: :accounts_user_id
  belongs_to :stafftools_role, class_name: 'Stafftools::Role', foreign_key: :stafftools_role_id
end
