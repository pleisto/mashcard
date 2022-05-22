# typed: strict
# frozen_string_literal: true

module Patches
  module String
    extend T::Sig
    # Desensitizing Private Data with the Hash Algorithm
    # Compliance `Directive 95/46/EC GDPR`
    sig { returns(String) }
    def to_data_masking
      Brickdoc::Crypto.data_masking(self)
    end
  end
end
