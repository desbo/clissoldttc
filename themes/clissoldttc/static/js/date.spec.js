import { seasonStartYear, winterSeasonString } from './date.js'
import { test } from 'uvu'
import * as assert from 'uvu/assert'

test('season start year', () => {
  const assertions = {
    '2023-09-22T00:00:00': 2023,
    '2024-01-22T00:00:00': 2023,
    '2024-12-12T00:00:00': 2024,
  }

  for (const date in assertions) {
    if (Object.hasOwnProperty.call(assertions, date)) {
      const expected = assertions[date]
      const actual = seasonStartYear(new Date(date))
      assert.is(expected, actual)
    }
  }
})

test('winter season string formatting', () => {
  const assertions = {
    '2023-09-22T00:00:00': 'Winter_2023-24',
    '2024-12-12T00:00:00': 'Winter_2024-25',
  }

  for (const date in assertions) {
    if (Object.hasOwnProperty.call(assertions, date)) {
      const expected = assertions[date]
      const actual = winterSeasonString(new Date(date))
      assert.is(expected, actual)
    }
  }
})

test.run()
