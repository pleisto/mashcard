# frozen_string_literal: true
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

return if Rails.env.production?

users = 5.times.map do |n|
  Accounts::User.create!(name: "ADMIN#{n}", password: "PASSWORD#{n}", email: "ADMIN#{n}@brickdoc.com", webid: "ADMIN#{n}")
end

users.first.confirm

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
    type: BLOCK_TYPE,
    collaborators: random_collaborators(pod, pods),
    meta: { title: FFaker::Lorem.phrase },
    data: { text: FFaker::Lorem.phrase, content: [] },
    parent_id: parent_id
  }
  params[:parent_type] = "paragraph" if params[:parent_id]
  Docs::Block.create!(params)
end

parent_map = BLOCK_SEEDS.reduce([{}, []]) do |(result, prev), seed|
  uuids = seed.to_a.sample.times.to_a.map { SecureRandom.uuid }
  uuids.each { |uuid| result[uuid] = prev.sample }
  [result, uuids]
end.first

ROOT_POD = pods.last

parent_map.each do |k, v|
  create_block(ROOT_POD, k, v, pods)
end

#### Snapshot and history

root_block = Docs::Block.find_by!(parent_id: nil)

## Automatic save history when edit
root_block.update!(meta: root_block.meta.merge('changed' => true))

## Manual save snapshot
root_block.save_snapshot!
