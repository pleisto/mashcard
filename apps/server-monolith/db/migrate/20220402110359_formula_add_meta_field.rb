# frozen_string_literal: true

class FormulaAddMetaField < ActiveRecord::Migration[7.0]
  def change
    add_column :docs_formulas, :meta, :json, default: {}, null: false
  end
end
