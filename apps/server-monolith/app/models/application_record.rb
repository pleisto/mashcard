# frozen_string_literal: true

class ApplicationRecord < ActiveRecord::Base
  include Mashcard::Validators
  primary_abstract_class
end
