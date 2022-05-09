import b from 'benny'
import { faker } from '@faker-js/faker'
import { genSlug } from '../index'

void b.suite(
  'genSlug',
  b.add('genSlug Rust Array', () => genSlug(faker.name.findName())),
  b.cycle(),
  b.complete()
)
