# typed: strict
# frozen_string_literal: true

module Patches
  module Hash
    extend T::Sig
    # Converting a nested Ruby hash to an un-nested one
    # @example `({"a" => {"b" => {"c" => 4}, "f" => 5}}).unnest` === `{"a-b-c"=>4, "a-f"=>5}`
    sig { params(prefix: ::String).returns(T::Hash[::String, T.untyped]) }
    def unnest(prefix: '-')
      T.bind(self, T::Hash[T.any(Symbol, ::String), T.untyped])
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

    sig { params(prefix: ::String).returns(T::Hash[::String, T.untyped]) }
    def prefix_keys(prefix)
      T.bind(self, T::Hash[T.any(Symbol, ::String), T.untyped])
      ::Hash[map { |key, val| [prefix + key.to_s, val] }].unnest
    end
  end
end
