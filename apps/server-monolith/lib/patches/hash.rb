# frozen_string_literal: true

module Patches
  module Hash
    # Converting a nested Ruby hash to an un-nested one
    # @example `({"a" => {"b" => {"c" => 4}, "f" => 5}}).unnest` === `{"a-b-c"=>4, "a-f"=>5}`
    def unnest(prefix: '-')
      new_hash = {}
      each do |key, val|
        if val.is_a?(::Hash)
          new_hash.merge!(val.prefix_keys("#{key}#{prefix}"))
        else
          new_hash[key] = val
        end
      end
      new_hash
    end

    def prefix_keys(prefix)
      ::Hash[map { |key, val| [prefix + key.to_s, val] }].unnest
    end
  end
end
