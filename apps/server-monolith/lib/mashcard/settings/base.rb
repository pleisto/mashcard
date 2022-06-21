# frozen_string_literal: true

module Mashcard
  # Mashcard::Settings is a multi-scope settings module for Rails applications.
  # Multi-scope means that you can set different values in same key for for different session contexts.
  # session context is defined by `at` method, which accepts `user_id` and `pod_id` as arguments.
  #
  # @example
  #  class Config < ApplicationRecord
  #    include Mashcard::Settings::Base
  #    serialize :value
  #    field :admin_email
  #    # `belongs_to` can be `:user`, `:pod` or `:global`
  #    # If `belons_to` not specified, it will be `:global` by default
  #    field :language, default: 'en-US', belongs_to: :user
  #    field :first_day_of_week, default: 'Monday', belongs_to: :pod
  #
  #    namespace :mailer do
  #      field :host, default: 'localhost'
  #      # `type` can be `:string`, `:integer`, `:float`, `:boolean`, `:encrypted`.
  #      #  If `:encrypted` means that the value will be encrypted before saving to database.
  #      field :port, default: 25, type: :integer
  #    end
  #  end
  #
  #  # Set value for global field requires call `set_global` method
  #  Config.at(user_id: 1, pod_id: 1).set :admin_email, 'a@1.com' #=> ArgumentError
  #  Config.at(user_id: 1, pod_id: 1).set_global :admin_email, 'a@1.com' #=> OK
  #  # global field's value is completely independent from current session's context
  #  Config.at(user_id: 7, pod_id: 2).get :admin_email #=> 'a@1.com'
  #
  #  # When getting the value of user field, it will first try to get the value that matches both
  #  # `user_id` and `pod_id` and then fallback to `user_id` only. If no value is found, it will
  #  # fallback to global value.
  #  Config.at(user_id: 1, pod_id: 1).set :language, 'en-GB' #=> OK
  #  Config.at(user_id: 1, pod_id: 1).set_all_pods_in_user :language, 'en-SG' #=> OK
  #  # Same as above
  #  Config.at(user_id: 1, pod_id: 1).set :language, 'en-SG', pod_id: nil #=> OK
  #  Config.at(user_id: 1, pod_id: 1).get :language # => 'en-GB'
  #  Config.at(user_id: 1, pod_id: 2).get :language # => 'en-SG'
  #  Config.at(user_id: 3, pod_id: 3).get :language # => 'en-US'
  #
  #  # When getting the value of pod field, it will first try to get the value that matches both
  #  # `user_id` and `pod_id` and then fallback to `pod_id` only. If no value is found, it will
  #  # fallback to global value.
  #  Config.at(user_id: 1, pod_id: 1).set :first_day_of_week, 'Sunday' #=> OK
  #  Config.at(user_id: 1, pod_id: 1).set_all_users_in_pod :first_day_of_week, 'foo' #=> OK
  #  # Same as above
  #  Config.at(user_id: 1, pod_id: 1).set :first_day_of_week, 'foo', user_id: nil #=> OK
  #  Config.at(user_id: 1, pod_id: 1).get :first_day_of_week # => 'Sunday'
  #  Config.at(user_id: 1, pod_id: 2).get :first_day_of_week # => 'foo'
  #  Config.at(user_id: 3, pod_id: 3).get :first_day_of_week # => 'Monday'
  #
  #  # In addition, Mashcard::Settings also support nested settings with `namespace` method.
  #  Config.get :host # => nil
  #  Config.namespace(:mailer).get :host #=> 'localhost'
  #  Config.namespace :mailer do
  #    get :host #=> 'localhost'
  #    set_global :host, 'foo.com' #=> OK
  #  end
  module Settings
    module Base
      extend ActiveSupport::Concern
      module ClassMethods
        include Mashcard::Settings::AccessorBase
        include Mashcard::Settings::Types
        include Mashcard::Settings::DSL
        include Mashcard::Settings::DatabaseStore
        include Mashcard::Settings::Cache

        # Get the value of the field.
        # If `at` method is called, `pod_id` and `user_id` will be auto-injected.
        #
        # @param key [Symbol, String] the key of the field
        # @param :namespace [Symbol, String] the namespace of the field. set to nil if you want it to be global.
        # @param :pod_id [Integer, nil] the space id of current session.
        # @param :user_id [Integer, nil] the user id of current session.
        # @return [Object] the value of the field. If the field is not found, it will return nil.
        def get(key, namespace: '', pod_id: nil, user_id: nil, **_)
          field_config = _field_metadata(namespace, key, allow_blank: true)
          belongs_to = field_config[:belongs_to]
          cache_key = _cached_field_key(namespace, key, pod_id, user_id, belongs_to)
          return field_config[:default] if field_config[:read_only]

          unless _get_cached_values(cache_key)
            # Do not query database if the field is readonly
            value = _find_field(key, namespace: namespace, pod_id: pod_id, user_id: user_id, belongs_to: belongs_to)
            value = value.nil? ? field_config[:default] : decode_value(field_config[:type], value, cache_key: cache_key)
            value = value.deep_symbolize_keys if field_config.dig(:options, :symbolize_keys)
            _set_cached_values(cache_key, value)
          end
          _get_cached_values(cache_key)
        end

        # Set the value of the field.
        # If `at` method is called, `pod_id` and `user_id` will be auto-injected.
        #
        # @param key [Symbol, String] the key of the field
        # @param value [Object] the value of the field
        # @param :namespace [Symbol, String] the namespace of the field. set to nil if you want it to be global.
        # @param :pod_id [Integer, nil] the space id of current session.
        # @param :user_id [Integer, nil] the user id of current session.
        #
        # @raise [Errors::ReadOnlyField] if the field is read-only
        # @raise [Errors::ArgumentError] if trying to set a global value but `allow_global` is false
        # @raise [Errors::NotFoundField] if the field is not found
        def set(key, value, namespace: '', pod_id: nil, user_id: nil)
          # Get field metadata
          field_config = _field_metadata(namespace, key)

          # Raise error if the field is set to readonly
          raise Errors::ReadOnlyField.new(self, key, namespace: namespace) if field_config[:read_only]

          belongs_to = field_config[:belongs_to]

          # Encode typed value to database value
          value = encode_value(field_config[:type], value,
            cache_key: _cached_field_key(namespace, key, pod_id, user_id, belongs_to))

          # Set value to database
          _update_field(
            key,
            value,
            namespace: namespace, user_id: user_id, pod_id: pod_id, belongs_to: belongs_to
          )
          # Flush cache
          touch(key, namespace: namespace, user_id: user_id, pod_id: pod_id)
          value
        end

        # Set the value of the field in global scope.
        # This will ignore current session context, including `pod_id` and `user_id`.
        # (see #set)
        def set_global(key, value, namespace: '', pod_id: nil, user_id: nil)
          set(key, value, namespace: namespace, pod_id: nil, user_id: nil)
        end

        # Set the value of the field in all users in current pod.
        # This will ignore `user_id` in current session context.
        # (see #set)
        def set_all_users_in_pod(key, value, namespace: '', pod_id:, user_id: nil)
          set(key, value, namespace: namespace, pod_id: pod_id, user_id: nil)
        end

        # Set the value of the field in all pods for current user.
        # This will ignore `user_id` in current session context.
        # (see #set)
        def set_all_pods_in_user(key, value, namespace: '', pod_id: nil, user_id:)
          set(key, value, namespace: namespace, pod_id: nil, user_id: user_id)
        end

        # Flush the cache of the field.
        # If `at` method is called, `pod_id` and `user_id` will be auto-injected.
        #
        # @param key [Symbol, String] the key of the field
        # @param :namespace [Symbol, String] the namespace of the field. set to nil if you want it to be global.
        # @param :pod_id [Integer, nil] the space id of current session.
        # @param :user_id [Integer, nil] the user id of current session.
        def touch(key, namespace: '', user_id:, pod_id:)
          belongs_to = _field_metadata(namespace, key)[:belongs_to]
          _delete_cached_values(_cached_field_key(namespace, key, pod_id, user_id, belongs_to))
        end

        # Get all frontend fields in the namespace.
        def to_frontend(namespace: '')
          namespace = namespace.to_s
          frontend_fields[namespace]&.uniq&.index_with { |key| get(key, namespace: namespace) }
        end

        # Get field metadata.
        # @param key [Symbol, String] the key of the field
        # @param :namespace [Symbol, String] the namespace of the field. set to nil if you want it to be global.
        # @return [Hash] the metadata of the field.
        def get_field(key, namespace: '', **_)
          key = key.to_s
          defined_fields[namespace][key]
        end

        # List all defined fields in the namespace.
        # @param :namespace [Symbol, String] the namespace of the field. set to nil if you want it to be global.
        # @return [Array<Symbol>] the list of defined fields.
        def defined_keys(namespace: '', **_)
          defined_fields[namespace]&.keys
        end
      end
    end
  end
end
