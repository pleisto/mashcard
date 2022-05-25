# frozen_string_literal: true

# This file will manually require and could be used overide some methods from rust native extension.

module Brickdoc
  module Utils
    module Encoding
      module Base64
        # Returns the Base64-encoded version of bin.
        # This method complies with “Base 64 Encoding with URL and Filename Safe Alphabet'' in RFC 4648.
        # The alphabet uses '-' instead of '+' and '_' instead of '/'. Note that the result can still contain '='.
        # You can remove the padding by setting padding as false.
        def self.urlsafe_encode64(bin, padding: true)
          # wrap native method to implement optional padding parameter
          urlsafe_encode64_native(bin, padding)
        end
      end
    end
  end
end
