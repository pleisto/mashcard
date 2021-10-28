# frozen_string_literal: true

# See https://docs.gitlab.com/ee/development/migration_style_guide.html
# for more information on how to write migrations for GitLab.

class AdjustShareLinksWebidField < ActiveRecord::Migration[7.0]
  # Uncomment the following include if you require helper functions:
  # include Brickdoc::Database::MigrationHelper

  def up
    add_column :docs_share_links, :share_pod_id, :bigint
    add_index :docs_share_links, :share_pod_id

    Docs::ShareLink.reset_column_information

    Docs::ShareLink.find_each do |link|
      next if link.share_webid == Pod::ANYONE_WEBID

      pod = Pod.find_by!(webid: link.share_webid)
      link.update!(share_pod_id: pod.id)
    end

    remove_column :docs_share_links, :share_webid
  end

  def down
    add_column :docs_share_links, :share_webid, :string
    add_index :docs_share_links, :share_webid

    Docs::ShareLink.reset_column_information

    Docs::ShareLink.find_each do |link|
      webid = Pod.find_by(id: link.share_pod_id)&.webid || Pod::ANYONE_WEBID
      link.update!(share_webid: webid)
    end

    remove_column :docs_share_links, :share_pod_id
  end
end
