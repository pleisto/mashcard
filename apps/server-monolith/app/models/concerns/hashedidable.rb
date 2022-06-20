# frozen_string_literal: true

# add hashed id method
module Hashedidable
  extend ActiveSupport::Concern

  def hashed_id
    Mashcard::Crypto.int_id_obfuscate(id)
  end
end
