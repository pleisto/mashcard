# frozen_string_literal: true

# See https://docs.gitlab.com/ee/development/migration_style_guide.html
# for more information on how to write migrations for GitLab.

class SeparateDocsBlockTextAndContent < ActiveRecord::Migration[6.1]
  # Uncomment the following include if you require helper functions:
  # include Brickdoc::Database::MigrationHelper

  def up
    add_column :docs_blocks, :content, :jsonb, default: [], comment: 'node content'
    add_column :docs_blocks, :text, :text, default: '', comment: 'node text'

    add_column :docs_histories, :content, :jsonb, default: [], comment: 'node content'
    add_column :docs_histories, :text, :text, default: '', comment: 'node text'

    [Docs::Block, Docs::History].each do |model_class|
      model_class.find_each do |block|
        block.text = block.data.delete('text')
        block.content = block.data.delete('content')
        model_class.where(id: block.id).update_all(text: block.text, content: block.content, data: block.data)
      end
    end
  end

  def down
    [Docs::Block, Docs::History].each do |model_class|
      model_class.find_each do |block|
        block.data['text'] = block.text
        block.data['content'] = block.content
        model_class.where(id: block.id).update_all(text: block.text, content: block.content, data: block.data)
      end
    end

    remove_column :docs_blocks, :content
    remove_column :docs_blocks, :text

    remove_column :docs_histories, :content
    remove_column :docs_histories, :text
  end
end
