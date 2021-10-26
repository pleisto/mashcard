# frozen_string_literal: true

module Brickdoc
  module SaaS
    def self.root
      Brickdoc.root.join('gems', 'brickdoc-saas')
    end
  end
end
