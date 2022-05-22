# typed: false
# frozen_string_literal: true

class ApplicationRecord < ActiveRecord::Base
  include Brickdoc::Validators
  primary_abstract_class
end
