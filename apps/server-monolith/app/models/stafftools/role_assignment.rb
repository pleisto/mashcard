# frozen_string_literal: true

# == Schema Information
#
# Table name: stafftools_role_assignments
#
#  id                 :bigint           not null, primary key
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  accounts_user_id   :bigint           not null
#  stafftools_role_id :bigint           not null
#
# Indexes
#
#  index_stafftools_role_assignments_on_accounts_user_id    (accounts_user_id)
#  index_stafftools_role_assignments_on_stafftools_role_id  (stafftools_role_id)
#
# Foreign Keys
#
#  fk_rails_...  (accounts_user_id => accounts_users.id)
#  fk_rails_...  (stafftools_role_id => stafftools_roles.id)
#

module Stafftools
  class RoleAssignment < ApplicationRecord
    belongs_to :accounts_user, class_name: 'Accounts::User'
    belongs_to :stafftools_role, class_name: 'Stafftools::Role'
  end
end
