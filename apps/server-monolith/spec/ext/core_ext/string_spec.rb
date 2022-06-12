# frozen_string_literal: true

require 'rails_helper'

describe String do
  describe '.to_ascii?' do
    it 'unicodes string could convert to ascii' do
      [
        ['Kõik-ἀνθρώπῳ', 'Koik-anthropo'],
        ['◐";╃╞말❤️㊎يَّة', '*";++Mal:heart:Jinyah'],
        ['我能吞下玻璃而不伤身体-私はガラスを食べられます', 'WoNengTunXiaBoLiErBuShangShenTi-SihagarasuoShiberaremasu'],
        ['', ''],
        ['🐶', ':dog:'],
      ].each do |input, output|
        expect(input.to_ascii).to eq(output)
      end
    end
  end
end
