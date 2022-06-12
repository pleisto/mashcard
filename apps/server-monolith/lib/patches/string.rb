# frozen_string_literal: true

module Patches
  module String
    # Desensitizing Private Data with the Hash Algorithm
    # Compliance `Directive 95/46/EC GDPR`
    def to_data_masking
      Brickdoc::Crypto.data_masking(self)
    end
  end
end
