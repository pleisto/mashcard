# frozen_string_literal: true

module Brickdoc
  module Settings
    module DSL
      # Enum of :belongs_to
      BELONG_TYPE = [:global, :user, :space]

      # Set namespace to current_context when chainning calls or defining fields.
      # @param namespace [String]
      # @param &block [Proc]
      # @example
      # Config.namespace(:foo).get :bar
      # Config.namespace(:foo) { get :bar }
      # Config.namespace(:foo) do
      #   field :bar
      # end
      def namespace(*namespace, &block)
        namespace = namespace.join('.')
        Brickdoc::Settings::Accessor.new(self, namespace: namespace).with_block(&block)
      end

      # Set session's context to current_context when chainning calls.
      # @param space_id [Integer, nil]
      # @param user_id [Integer, nil]
      # @param &block [Proc]
      # @example
      # Config.at(space_id: 1, user_id: 2).get :bar
      # Config.at(user_id: 1) { get :bar }
      def at(user_id: nil, space_id: nil, &block)
        Brickdoc::Settings::Accessor.new(self, user_id: user_id, space_id: space_id).with_block(&block)
      end

      # Define a field.
      # @param key [Symbol, String] the key of the field
      # @param namespace [Symbol, String] the namespace of the field. set to '' if you want it to be global.
      # @param belongs_to [Symbol, String] the type of the field. It can be :global, :user, :space. default to :global.
      # @param type [Symbol] the type of the field. It can be one of  `:string`, `:integer`, `:float`, `:boolean`,
      # `:encrypted`.
      # @param default [Object] the default value of the field.
      # @param read_only [Boolean] whether the field is read-only.
      # @param frontend [Boolean] whether the field is visible in frontend.
      # TODO: add rails validation support for type
      def field(key, namespace: '', belongs_to: :global, type: :string, default: nil, read_only: false, **options)
        key = key.to_s
        # belongs_to value must be a valid scope
        raise ArgumentError, "unsupported belongs_to: #{belongs_to}" unless BELONG_TYPE.include?(belongs_to)

        # Avoid dirty data, this attributes is not allowed static defined.
        options.delete(:user_id)
        options.delete(:space_id)

        @frontend_fields ||= {}
        if options[:frontend]
          frontend_fields[namespace] ||= []
          frontend_fields[namespace].push key
        end

        @defined_fields ||= {}
        @defined_fields[namespace] ||= {}
        @defined_fields[namespace][key] = {
          type: type,
          default: default,
          read_only: read_only,
          options: options,
          belongs_to: belongs_to,
        }
      end

      # @private
      def defined_fields
        @defined_fields
      end

      # find field metadata by key and namespace
      # @param key [Symbol, String] the key of the field
      # @param namespace [Symbol, String] the namespace of the field. set to '' if you want it to be global.
      # @param :allow_blank [Boolean] whether to allow blank value.
      # @raise [Errors::NotFoundField] if the field is not defined and :allow_blank is false.
      def _field_metadata(namespace, key, allow_blank: false)
        metadata = defined_fields.dig(namespace.to_s, key.to_s) || {}
        raise Errors::NotFoundField.new(self, key, namespace: namespace) if !allow_blank && metadata.empty?

        metadata
      end

      # @private
      def frontend_fields
        @frontend_fields
      end

      # @private
      # get current_context
      def current
        RequestCache.current_context || self
      end

      # @private
      # set current_context
      def current=(config)
        RequestCache.current_context = config
      end
    end
  end
end
