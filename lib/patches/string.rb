# frozen_string_literal: true
module Patches
  module String
    # Desensitizing Private Data with the Hash Algorithm
    # Compliance `Directive 95/46/EC GDPR` & `GB/T 35273-2020 《中国国家标准：信息安全技术 个人信息安全规范》`
    def to_data_masking
      hash = CityHash.hash64(self, Brickdoc::Application.secret_key_base)
      "gdpr-#{hash.to_s(36)}"
    end
  end
end
