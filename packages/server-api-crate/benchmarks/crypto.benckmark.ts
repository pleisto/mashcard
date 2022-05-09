import b from 'benny'
import { faker } from '@faker-js/faker'
import { genericHash, generateKey } from '../index'

void b.suite(
  'genericHash',
  b.add('genericHash without Salt', () => genericHash(faker.random.words())),
  b.add('genericHash with Salt', () =>
    genericHash(faker.random.words(), 'c6f1fb2edd6fb5db8a1471c80c9f08e1dfaa566d18ea748c329d245b4141b2f6')
  ),
  b.add('generateKey', () => generateKey()),
  b.cycle(),
  b.complete()
)
