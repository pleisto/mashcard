# frozen_string_literal: true

module Brickdoc
  module Database
    module MigrationHelper
      def create_extension(extension)
        enable_extension
        execute("CREATE EXTENSION IF NOT EXISTS #{extension}")
      rescue ActiveRecord::StatementInvalid => e
        dbname = Database.database_name
        user = Database.username

        warn(<<~MSG) if /permission denied/.match?(e.to_s)
          Brickdoc requires the PostgreSQL extension '#{extension}' installed in database '#{dbname}', but
          the database user is not allowed to install the extension.

          You can either install the extension manually using a database superuser:

            CREATE EXTENSION IF NOT EXISTS #{extension}

          Or, you can solve this by logging in to the Brickdoc
          database (#{dbname}) using a superuser and running:

              ALTER #{user} WITH SUPERUSER

          This query will grant the user superuser permissions, ensuring any database extensions
          can be installed through migrations.

        MSG

        raise
      end

      # Note this should only be used with very small tables
      def backfill_iids(table)
        sql = <<-END
          UPDATE #{table}
          SET iid = #{table}_with_calculated_iid.iid_num
          FROM (
            SELECT id, ROW_NUMBER() OVER (PARTITION BY project_id ORDER BY id ASC) AS iid_num FROM #{table}
          ) AS #{table}_with_calculated_iid
          WHERE #{table}.id = #{table}_with_calculated_iid.id
        END

        execute(sql)
      end
    end
  end
end
