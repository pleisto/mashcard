# frozen_string_literal: true

module Docs
  module Mutations
    class FormulaCommit < BrickGraphQL::BaseMutation
      argument :commit_formulas, [Inputs::FormulaModifyInput], required: true
      argument :delete_formulas, [Inputs::FormulaDeleteInput], required: true

      def resolve(commit_formulas:, delete_formulas:)
        Docs::Formula.transaction do
          preload_formulas = Docs::Formula.where(id: commit_formulas.pluck(:id) + delete_formulas.pluck(:id)).to_a.index_by(&:id)

          commit_formulas.each do |args|
            formula = preload_formulas[args[:id]]
            if formula
              update_params = {
                name: args[:name],
                meta: args[:meta],
                type: args[:type],
                definition: args[:definition],
                cache_value: args[:cache_value],
                version: args[:version],
              }.compact
              formula.update!(update_params)
            else
              Docs::Formula.create!(args.to_h)
            end
          end

          delete_formulas.each do |args|
            preload_formulas[args[:id]]&.destroy
          end
        end

        nil
      rescue => e
        raise BrickGraphQL::Errors::ArgumentError, e.message
      end
    end
  end
end
