# frozen_string_literal: true

require_relative '../../lib/patches/action_dispatch/draw_route'
require_relative '../../lib/patches/active_record/postgresql_drop_database'
require_relative '../../lib/patches/action_view/template/handlers/mjml'

# Rails Monkey patch
Rails.application.reloader.to_prepare do
  ActiveRecord::Tasks::PostgreSQLDatabaseTasks.prepend Patches::ActiveRecord::PostgresqlDropDatabase
  ActionDispatch::Routing::Mapper.prepend Patches::ActionDispatch::DrawRoute

  ActionView::Template.register_template_handler :mjml, ActionView::Template::Handlers::MJML.new
  Mime::Type.register_alias 'text/html', :mjml

  ActiveStorage::Blob.class_eval do
    def real_url(params = {})
      Mashcard::Storage.real_url(self, params)
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
