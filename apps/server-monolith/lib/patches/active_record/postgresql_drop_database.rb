# typed: false
# frozen_string_literal: true

module Patches
  module ActiveRecord
    module PostgresqlDropDatabase
      # Drop PostgreSQL Database if there are active connections
      # See {https://stackoverflow.com/questions/5408156/how-to-drop-a-postgresql-database-if-there-are-active-connections-to-it}
      def drop
        # rubocop:disable Naming/InclusiveLanguage
        establish_master_connection
        # rubocop:enable
        db = configuration_hash[:database]
        drop_sql = "select pg_terminate_backend(pg_stat_activity.pid) from pg_stat_activity where datname='#{db}' AND state='idle';"
        connection.select_all(drop_sql)
        connection.drop_database(db)
      end
    end
  end
end
