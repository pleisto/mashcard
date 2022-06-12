# frozen_string_literal: true

require 'set'

module Patches
  module Array
    # Find all duplicated elements in an array
    # @example [:a,:b,:c,:a,:c].duplicates => [:a,:c]
    def duplicates
      uniq_set = Set.new
      each_with_object(Set.new) { |x, dup_set| uniq_set.add?(x) || dup_set.add(x) }.to_a
    end
  end
end
