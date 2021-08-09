# frozen_string_literal: true

module BrickdocSettings
  module AccessorBase
    def respond_to_missing?(method_name, *_)
      method_name = method_name[0..-2] if ['=', '?'].include?(method_name[-1])
      defined_keys.include? method_name.to_s
    end

    def method_missing(method_name, *args, **options)
      if method_name[-1] == '='
        set(method_name[0..-2], *args, **options)
      elsif method_name[-1] == '?'
        get(method_name[0..-2], *args, **options).present?
      else
        get(method_name, *args, **options)
      end
    end
  end
end
