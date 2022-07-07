# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Docs::Block, type: :model do
  describe '.basic' do
    let(:pod) { create(:pod) }
    let(:block) { create(:docs_block) }
    let(:child) { create(:docs_block_child) }
    let(:attrs) do
      {
        meta: { title: FFaker::Lorem.phrase },
        data: { text: '', content: []	},
      }
    end

    it 'relations' do
      parent = child.parent
      expect(parent.children.ids).to eq([child.id])
      expect(parent.ancestors.count).to eq(1)
      expect(child.ancestors.count).to eq(2)
      expect(parent.ancestors_raw.count).to eq(1)
      expect(child.ancestors_raw.count).to eq(2)
      expect(parent.descendants.count).to eq(2)
      expect(child.descendants.count).to eq(0)
      expect(child.descendants_raw.count).to eq(1)
      expect(child.root_id).to eq(child.parent_id)
      expect(parent.root_id).to eq(parent.id)
    end

    it 'create' do
      params = attrs.merge({ page: true, pod: pod, id: Mashcard::Utils::Encoding::UUID.gen_v4, collaborators: [pod.owner.id] })
      block = described_class.create!(params)
      expect(block.id).to eq(params[:id])
    end

    it 'modify' do
      block.update!(meta: { title: 'changed title' })
    end

    it 'order' do
      expect(block.sort).to eq(0)
      block.update!(sort: 101)
    end

    it 'child to child: move same parent' do
      child.move!(child.parent_id, 100)
      expect(child.sort).to eq(100)
    end

    it 'child to child: move different parent' do
      child.move!(block.id, 200)
      expect(child.sort).to eq(200)
      expect(child.parent_id).to eq(block.id)
    end

    it 'root to root' do
      block.move!(nil, 168)
      expect(block.sort).to eq(168)
      expect(block.parent_id).to be_nil
    end

    it 'error' do
      expect { block.move!(block.id, 171) }.to raise_error(ArgumentError)
      expect { child.parent.move!(child.id, 171) }.to raise_error(ArgumentError)
    end

    it 'root to child' do
      expect(block.type).to eq('doc')
      block.move!(child.id, 231)
      expect(block.sort).to eq(231)
      expect(block.parent_id).to eq(child.id)
      expect(block.type).to eq('doc')
    end

    it 'child to root' do
      expect(child.type).to eq('doc')
      child.move!(nil, 412)
      expect(child.sort).to eq(412)
      expect(child.parent_id).to be_nil
      expect(child.type).to eq('doc')
    end
  end

  describe 'class methods' do
    it 'can extract text from node' do
      text = Docs::Block.get_text_from_node({
        'content' => [
          {
            'type' => 'paragraph',
            'content' => [
              {
                'text' => '1',
              },
              {
                'text' => '2',
              },
              {
                'text' => '3',
              },
            ],
          },
          {
            'type' => 'paragraph',
            'content' => [
              {
                'text' => '4',
              },
              {
                'text' => '5',
              },
              {
                'text' => '6',
              },
            ],
          },
        ],
      })
      expect(text).to eq("123\n456\n")
    end
  end
end
