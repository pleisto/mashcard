# frozen_string_literal: true
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

return if Rails.env.production?
require 'ffaker'

users = 5.times.map do |n|
  Accounts::User.create!(name: "ADMIN#{n}", password: "PASSWORD#{n}", email: "ADMIN#{n}@brickdoc.com", domain: "ADMIN#{n}").tap(&:confirm)
end

spaces = users.map { |u| u.spaces.first }

BLOCK_TYPE = 'doc'
COLLABORATOR_COUNT = 1..5
BLOCKS_COUNT = 5..5
SECOND_LEVEL_CHILDREN_COUNT = 50..10
THIRD_LEVEL_CHILDREN_COUNT = 5..10

BLOCK_SEEDS = [5..5, 50..100, 200..300]

def random_collaborators(space, spaces)
  (spaces.sample(COLLABORATOR_COUNT.to_a.sample) + [space]).map(&:id).uniq
end

def create_block(space, id, parent_id, spaces)
  params = {
    id: id,
    space: space,
    page: true,
    type: BLOCK_TYPE,
    collaborators: random_collaborators(space, spaces),
    meta: { title: FFaker::Lorem.phrase },
    data: {},
    parent_id: parent_id,
    root_id: parent_id,
    text: FFaker::Lorem.phrase,
    content: []
  }
  Docs::Block.create!(params)
end

parent_map = BLOCK_SEEDS.reduce([{}, []]) do |(result, prev), seed|
  uuids = seed.to_a.sample.times.to_a.map { SecureRandom.uuid }
  uuids.each { |uuid| result[uuid] = prev.sample }
  [result, uuids]
end.first

ROOT_space = spaces.last

parent_map.each do |k, v|
  create_block(ROOT_space, k, v, spaces)
end

#### Snapshot and history

root_block = Docs::Block.find_by!(parent_id: nil)

## Automatic save history when edit
root_block.update!(meta: root_block.meta.merge('changed' => true))

## Manual save snapshot
root_block.save_snapshot!

### Stafftools Role
unless Stafftools::Role.exists?(name: 'super_admin')
  super_admin = Stafftools::Role.create!(name: 'super_admin', permissions: [:root])
  default_user = Accounts::User.first
  default_user.stafftools_roles << super_admin
  default_user.save
end
