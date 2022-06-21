# frozen_string_literal: true

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

return if Rails.env.production?

users = Array.new(5) do |n|
  Accounts::User.create!(name: "Test#{n}", password: 'test1234', email: "test#{n}@example.com",
    domain: "test#{n}").tap(&:confirm)
end

pods = users.map { |u| u.pods.first }

BLOCK_TYPE = 'doc'
COLLABORATOR_COUNT = 1..5
BLOCKS_COUNT = 5..5
SECOND_LEVEL_CHILDREN_COUNT = 50..10
THIRD_LEVEL_CHILDREN_COUNT = 5..10

BLOCK_SEEDS = [5..5, 50..100, 200..300]

def random_collaborators(pod, pods)
  (pods.sample(COLLABORATOR_COUNT.to_a.sample) + [pod]).map(&:id).uniq
end

def create_block(pod, id, parent_id, pods)
  params = {
    id: id,
    pod: pod,
    page: true,
    type: BLOCK_TYPE,
    collaborators: random_collaborators(pod, pods),
    meta: { title: FFaker::Lorem.phrase },
    data: {},
    parent_id: parent_id,
    root_id: parent_id,
    text: FFaker::Lorem.phrase,
    content: [],
  }
  Docs::Block.create!(params)
end

parent_map = BLOCK_SEEDS.reduce([{}, []]) do |(result, prev), seed|
  uuids = seed.to_a.sample.times.to_a.map { Mashcard::Utils::Encoding::UUID.gen_v4 }
  uuids.each { |uuid| result[uuid] = prev.sample }
  [result, uuids]
end.first

ROOT_pod = pods.last

parent_map.each do |k, v|
  create_block(ROOT_pod, k, v, pods)
end

#### Snapshot and history

root_block = Docs::Block.find_by!(parent_id: nil)

## Automatic save history when edit
root_block.update!(meta: root_block.meta.merge('changed' => true))

## Manual save snapshot
root_block.save_snapshot!
