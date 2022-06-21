# frozen_string_literal: true

module Mashcard
  module Logger
    class LogrageJsonFormatter
      def self.call(data)
        ::Oj.dump(data)
      end
    end
  end
end
