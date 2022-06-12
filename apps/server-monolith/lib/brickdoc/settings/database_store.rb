# frozen_string_literal: true

module Brickdoc
  module Settings
    # @private
    # Provide database store for Brickdoc::Settings::Base
    module DatabaseStore
      # scope ltree path start with
      GLOBAL_SCOPE = 'G'

      # Get value from database
      #
      # @param key [String]
      # @param namespace [String]
      # @param pod_id [Integer]
      # @param user_id [Integer]
      def _find_field(key, namespace:, belongs_to:, pod_id:, user_id:)
        # If table does not exist, return default static value
        # This may be triggered when `db:create` is executed, but `db:migrate` is not.
        unless _table_exists?
          full_key = _full_key(namespace, key)
          Rails.logger.warn "Table #{table_name} not found, #{full_key} will fallback to returns the default value"
          return nil
        end

        # nlevel will returns number of labels in path. e.g. 'a.b.c' will return 3
        select('value', 'nlevel(scope::ltree) as depth')
          # ltree @> ltree → boolean.  Is left argument an ancestor of right (or equal)?
          .where('key = :key and scope @> :scope',
            key: _full_key(namespace, key),
            scope: scope_path(belongs_to, pod_id: pod_id, user_id: user_id))
          .order('depth desc')
          .first&.value
      end

      # Save value to database
      #
      # @param key [String]
      # @param value [Object]
      # @param namespace [String]
      # @param pod_id [Integer]
      # @param user_id [Integer]
      def _update_field(key, value, namespace:, belongs_to:, pod_id:, user_id:)
        record = where(
          key: _full_key(namespace, key),
          scope: scope_path(belongs_to, pod_id: pod_id, user_id: user_id)
        ).first_or_initialize
        record.value = value
        record.save
      end

      # Calculate ltree path based on belongs_to, pod_id and user_id
      # @example
      # scope_path(:global, pod_id: 1, user_id: 1) #=> 'G'
      # scope_path(:pod, pod_id: 1, user_id: 2) #=> 'G.P1.U2'
      # scope_path(:pod, pod_id: 1, user_id: nil) #=> 'G.P1'
      # scope_path(:pod, pod_id: nil, user_id: 2) #=> 'G'
      # scope_path(:user, pod_id: 1, user_id: 2) #=> 'G.U2.P1'
      def scope_path(belongs_to, pod_id:, user_id:)
        pod_label = pod_id.present? ? "P#{pod_id.to_s(36)}" : nil
        user_label = user_id.present? ? "U#{user_id.to_s(36)}" : nil
        scope = [GLOBAL_SCOPE]
        case belongs_to
        when :pod
          scope.push pod_label if pod_label.present?
          scope.push user_label if pod_label.present? && user_label.present?
        when :user
          scope.push user_label if user_label.present?
          scope.push pod_label if user_label.present? && pod_label.present?
        end
        scope.join('.')
      end

      # Check database table exists or not
      def _table_exists?
        table_exists?
      rescue
        false
      end

      # Calculate the full key with namespace for database access
      def _full_key(namespace, key)
        namespace.blank? ? key : "#{namespace}.#{key}"
      end
    end
  end
end
