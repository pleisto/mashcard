# frozen_string_literal: true

module Brickdoc
  module SaaS
    def self.root
      Brickdoc.root.join('packages', 'saas')
    end
  end
end
