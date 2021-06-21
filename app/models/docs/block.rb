# frozen_string_literal: true
class Docs::Block < ApplicationRecord
  belongs_to :pod

  validates :meta, presence: true
  validates :data, presence: true
  validates :pod, presence: true
  validates :collaborators, presence: true
end
