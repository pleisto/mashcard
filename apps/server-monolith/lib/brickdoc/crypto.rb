# frozen_string_literal: true

module Brickdoc
  module Crypto
    PREFIX = 'CYPHERPUNK'
    SUBKEY_MAPPING = {
      hash_salt: 1,
      data_encryption: 2,
      rails_master_key: 3,
    }

    class << self
      def root_key
        @root_key ||= begin
          seed = ENV['SECRET_KEY_SEED']
          raise 'SECRET_KEY_SEED is not set' if seed.blank?

          raw = Base64.strict_decode64(seed)
          # Use Google Cloud KMS to decrypt the seed if it's available
          ENV['GCP_KMS_FRN'].present? ? gcp_kms_decrypt(raw) : raw
        end
      end

      def derive_key(sub_key, context = 'unknown')
        key_id = SUBKEY_MAPPING[sub_key]
        raise 'Unknown sub key' if key_id.blank?

        Digest::SHA256.hexdigest("#{PREFIX}://#{key_id}/#{context}?key=#{Brickdoc::Crypto.root_key}")
      end

      def data_masking(data)
        Digest::SHA256.hexdigest("#{data}#{derive_key(:data_encryption)}")
      end

      def gcp_kms_decrypt(ciphertext)
        client = Google::Cloud::Kms.key_management_service
        response = client.decrypt(name: ENV['GCP_KMS_FRN'], ciphertext: ciphertext)
        response.plaintext.strip
      end
    end
  end
end
