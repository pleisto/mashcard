# typed: true
# frozen_string_literal: true

# == Schema Information
#
# Table name: stafftools_roles
#
#  id          :bigint           not null, primary key
#  name        :string           not null
#  permissions :string           default([]), is an Array
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
# Indexes
#
#  index_stafftools_roles_on_name  (name) UNIQUE
#

module Stafftools
  class Role < ApplicationRecord
    has_many :stafftools_role_assignments, dependent: :destroy, class_name: 'Stafftools::RoleAssignment'
    has_many :accounts_users, through: :stafftools_role_assignments, class_name: 'Accounts::User'

    PERMISSIONS_LIST = ['root', 'graphql.write', 'user.write', 'user.read', 'space.write', 'space.read'].freeze
    validates :permissions, inclusion: { in: PERMISSIONS_LIST }
  end
end
