# frozen_string_literal: true

module Brickdoc
  module Settings
    # @private
    # Provide database store for Brickdoc::Settings::Base
    module DatabaseStore
      # scope ltree path start with
      ROOT_SCOPE = 'R'

      # Get value from database
      #
      # @param key [String]
      # @param namespace [String]
      # @param space_id [Integer]
      # @param user_id [Integer]
      def _find_field(key, namespace:, belongs_to:, space_id:, user_id:)
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
            scope: scope_path(belongs_to, space_id: space_id, user_id: user_id))
          .order('depth desc')
          .first&.value
      end

      # Save value to database
      #
      # @param key [String]
      # @param value [Object]
      # @param namespace [String]
      # @param space_id [Integer]
      # @param user_id [Integer]
      def _update_field(key, value, namespace:, belongs_to:, space_id:, user_id:)
        record = where(
          key: _full_key(namespace, key),
          scope: scope_path(belongs_to, space_id: space_id, user_id: user_id)
        ).first_or_initialize
        record.value = value
        record.save
      end

      # Calculate ltree path based on belongs_to, space_id and user_id
      # @example
      # scope_path(:global, space_id: 1, user_id: 1) #=> 'R'
      # scope_path(:space, space_id: 1, user_id: 2) #=> 'R.space_1.user_2'
      # scope_path(:space, space_id: 1, user_id: nil) #=> 'R.space_1'
      # scope_path(:space, space_id: nil, user_id: 2) #=> 'R'
      # scope_path(:user, space_id: 1, user_id: 2) #=> 'R.user_2.space_1'
      def scope_path(belongs_to, space_id:, user_id:)
        space_label = space_id.present? ? "space_#{space_id.to_s(36)}" : nil
        user_label =  user_id.present? ? "user_#{user_id.to_s(36)}" : nil
        scope = [ROOT_SCOPE]
        case belongs_to
        when :space
          scope.push space_label if space_label.present?
          scope.push user_label if space_label.present? && user_label.present?
        when :user
          scope.push user_label if user_label.present?
          scope.push space_label if user_label.present? && space_label.present?
        end
        scope.join('.')
      end

      # Check database table exists or not
      def _table_exists?
        table_exists? &&
          # Fix old version of BrickdocSettings
          # TODO: remove this check berfore public release
          BrickdocConfig.column_names.exclude?('domain_len')
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
