# frozen_string_literal: true

class RenameBrickdocConfig < ActiveRecord::Migration[7.0]
  def change
    rename_table 'brickdoc_configs', 'mashcard_configs'
  end
end
