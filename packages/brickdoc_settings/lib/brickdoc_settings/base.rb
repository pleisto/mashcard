# frozen_string_literal: true

module BrickdocSettings
  module Base
    extend ActiveSupport::Concern

    module ClassMethods
      include BrickdocSettings::AccessorBase

      def cached_values
        Thread.current[:"#{self.class.name.underscore}_values"] ||= {}
      end

      def cached_scopes
        Thread.current[:"#{self.class.name.underscore}_scopes"] ||= {}
      end

      def cached_domains
        Thread.current[:"#{self.class.name.underscore}_domains"] ||= {}
      end

      def cached_keys
        Thread.current[:"#{self.class.name.underscore}_keys"] ||= {}
      end

      def cached_records
        Thread.current[:"#{self.class.name.underscore}_records"] ||= {}
      end

      def scope(*scope, &block)
        scope = scope.join('.')
        cached_scopes[scope] ||= BrickdocSettings::Accessor.new(self, scope: scope)
        cached_scopes[scope].with_block(&block)
      end

      def at(*domain, &block)
        domain = domain.join('.')
        cached_domains[domain] ||= BrickdocSettings::Accessor.new(self, domain: domain)
        cached_domains[domain].with_block(&block)
      end

      def field(key, scope: '', type: :string, default: nil, read_only: false, **options)
        key = key.to_s
        @defined_fields ||= {}
        @defined_fields[scope] ||= {}
        options.delete(:domain)
        @defined_fields[scope][key] = {
          type: type,
          default: default,
          read_only: read_only,
          options: options
        }
      end

      def get_field(key, scope: '', **_)
        key = key.to_s
        @defined_fields[scope][key]
      end

      def defined_keys(scope: '', **_)
        @defined_fields[scope].keys
      end

      def get(key, scope: '', domain: '')
        key = key.to_s
        cache_key = "#{scope}.#{key}@#{domain}"
        unless cached_values[cache_key]
          field_config = @defined_fields.dig(scope, key) || {}
          value = _get_value(key, scope: scope, domain: domain)
          value = if !value.nil?
            case field_config[:type]
            when :boolean
              ['t', 'true', '1', 1, true].include?(value)
            when :integer
              value&.to_i
            when :float
              value&.to_f
            else
              value
            end
          else
            field_config[:default]
          end
          value = value.deep_symbolize_keys if field_config.dig(:options, :symbolize_keys)
          cached_values[cache_key] = value
        end
        cached_values[cache_key]
      end

      def set(key, value, scope: '', domain: '')
        raise ReadOnlyField.new(self, key, scope: scope) if @defined_fields.dig(scope, key, :read_only)
        _save_value(key.to_s, value, scope: scope, domain: domain)
        touch(key, scope: scope, domain: domain)
      end

      def touch(key, scope: '', domain: '')
        cached_records.delete scope
        cached_values.delete "#{scope}.#{key}@#{domain}"
      end

      def _table_exists?
        table_exists?
      rescue
        false
      end

      def _get_value(key, scope: '', domain: '')
        return unless _table_exists?
        records = cached_records[scope] ||= where(scope: scope).order('domain_len ASC').to_a.group_by(&:key)
        if records[key].present?
          domain_len = domain.split('.').count
          records[key].select do |r|
            r.domain.blank? || (r.domain == domain) || ((r.domain_len <= domain_len) && domain.end_with?(".#{r.domain}"))
          end.last&.value
        end
      end

      def _save_value(key, value, scope: '', domain: '')
        record = where(key: key, scope: scope, domain: domain).first_or_initialize
        record.value = value
        record.domain_len = domain.split('.').count
        record.save
      end
    end
  end
end
