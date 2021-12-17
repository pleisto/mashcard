# frozen_string_literal: true
module Patches
  module String
    # Desensitizing Private Data with the Hash Algorithm
    # Compliance `Directive 95/46/EC GDPR` & `GB/T 35273-2020 《中国国家标准：信息安全技术 个人信息安全规范》`
    def to_data_masking
      Brickdoc::Crypto.data_masking(self)
    end
  end
end
