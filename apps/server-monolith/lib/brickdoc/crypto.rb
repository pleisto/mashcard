# frozen_string_literal: true

module Brickdoc
  module Crypto
    PREFIX = 'CYPHERPUNK'
    SUBKEY_MAPPING = {
      hash_salt: 1,
      data_encryption: 2,
      rails_master_key: 3,
      obfuscate_int_id: 4,
      data_masking: 5,
    }

    class << self
      def root_key
        @root_key ||= begin
          seed = ENV['SECRET_KEY_SEED']
          raise 'SECRET_KEY_SEED is not set' if seed.blank?

          raw = Utils::Encoding::Base64.strict_decode64(seed)
          # Use Google Cloud KMS to decrypt the seed if it's available
          ENV['GCP_KMS_FRN'].present? ? gcp_kms_decrypt(raw) : raw
        end
      end

      def derive_key(sub_key, context = nil)
        key_id = SUBKEY_MAPPING[sub_key]
        raise 'Unknown sub key' if key_id.blank?

        Utils::Crypto::Blake3.derive_key(root_key, key_id, context)
      end

      def data_masking(data)
        Utils::Crypto::Blake3.salted_hash(data, derive_key(:data_masking))
      end

      # Generic hash function that can be used for any purpose without password
      def generic_hash(data, salt = nil)
        if salt.blank?
          Utils::Crypto::Blake3.hash(data)
        else
          Utils::Crypto::Blake3.salted_hash(data, derive_key(:hash_salt, salt))
        end
      end

      def gcp_kms_decrypt(ciphertext)
        client = Google::Cloud::Kms.key_management_service
        response = client.decrypt(name: ENV['GCP_KMS_FRN'], ciphertext: ciphertext)
        response.plaintext.strip
      end

      # Obfuscate the integer id to avoid information leakage
      # based on block cipher
      def int_id_obfuscate(id)
        Utils::Crypto::Present.encrypt(id, derive_key(:obfuscate_int_id))
      end

      # Dencrypt the obfuscated integer id to get the original id
      def int_id_deobfuscate(id)
        Utils::Crypto::Present.decrypt(id, derive_key(:obfuscate_int_id))
      end
    end
  end
end
