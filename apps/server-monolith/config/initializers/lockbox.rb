# frozen_string_literal: true

Lockbox.master_key = Mashcard::Crypto.derive_key :data_encryption
Lockbox.default_options = { algorithm: 'xsalsa20' }
