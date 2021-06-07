# frozen_string_literal: true
class ApplicationRecord < ActiveRecord::Base
  include Brickdoc::Validators
  self.abstract_class = true
end
