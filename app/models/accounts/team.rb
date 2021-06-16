# frozen_string_literal: true
class Accounts::Team < Accounts::Pod
  belongs_to :owner, class_name: 'Accounts::User', foreign_key: 'owner_id'
end
