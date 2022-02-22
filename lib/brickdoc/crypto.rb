# frozen_string_literal: true
module Brickdoc
  module Crypto
    PREFIX = 'CYPHERPUNK'
    SUBKEY_MAPPING = {
      hash_salt: 1,
      data_encryption: 2,
      rails_master_key: 3
    }

    class << self
      def root_key
        @root_key ||= begin
          seed = ENV['SECRET_KEY_SEED']
          raise 'SECRET_KEY_SEED is not set' unless seed.present?
          raw = Base64.strict_decode64(seed)
          # Use Google Cloud KMS to decrypt the seed if it's available
          ENV['GOOGLE_CLOUD_PROJECT'].present? ? gcp_kms_decrypt(raw) : raw
        end
      end

      def derive_key(sub_key, context = 'unknown')
        key_id = SUBKEY_MAPPING[sub_key]
        raise 'Unknown sub key' unless key_id.present?
        Blake3.derive_key("#{PREFIX}://#{key_id}/#{context}",
          Brickdoc::Crypto.root_key)
      end

      def data_masking(data)
        Blake3::Hasher.hexdigest(data, key: derive_key(:data_encryption))
      end

      def gcp_kms_decrypt(ciphertext)
        client = Google::Cloud::Kms.key_management_service
        response = client.decrypt(name: ENV['GCP_KMS_FRN'], ciphertext: ciphertext)
        response.plaintext.strip
      end
    end
  end
end
