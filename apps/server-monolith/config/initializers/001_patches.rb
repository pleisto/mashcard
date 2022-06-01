# frozen_string_literal: true

require_relative '../../lib/patches/action_dispatch/draw_route'
require_relative '../../lib/patches/active_record/postgresql_drop_database'

# Rails Monkey patch
Rails.application.reloader.to_prepare do
  ActiveRecord::Tasks::PostgreSQLDatabaseTasks.prepend Patches::ActiveRecord::PostgresqlDropDatabase
  ActionDispatch::Routing::Mapper.prepend Patches::ActionDispatch::DrawRoute

  ActiveStorage::Blob.class_eval do
    def real_url(params = {})
      Brickdoc::Storage.real_url(self, params)
    end
  end

  ActiveStorage::Blob::Analyzable.module_eval do
    def analyze_later
    end

    def analyzed?
      true
    end
  end
end
