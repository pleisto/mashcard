# frozen_string_literal: true

# == Schema Information
#
# Table name: docs_document_histories
#
#  id          :uuid             not null, primary key
#  created_at  :datetime         not null
#  document_id :uuid             not null
#  space_id    :bigint           not null
#  user_id     :bigint           not null
#
class Docs::DocumentHistory < ApplicationRecord # rubocop:disable Style/ClassAndModuleChildren
  belongs_to :space
  belongs_to :user, class_name: 'Accounts::User'
  has_many :histories, class_name: 'Docs::DocumentHistory', dependent: :restrict_with_exception, foreign_key: :history_id,
    inverse_of: :history
end
