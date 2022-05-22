# typed: true
# frozen_string_literal: true

# Make Model is read-only.
module Protectable
  extend ActiveSupport::Concern

  def delete
    false
  end

  def destroy
    false
  end

  module ClassMethods
    def delete_all
      false
    end

    def destroy_all
      false
    end
  end
end
