// @ts-nocheck

export const ssr = false

import { readCache, writeCache } from '$lib/server/utils/cache'
import { isToday } from '$lib/utils/date'

/** @type {import('./$types').PageLoad} */
export async function load(event) {
  const date = event.url.searchParams.get('date')

  let taxiAvailability = []

  if (date) {
    async function getTaxiAvailability() {
      const cache = await readCache(date)
      if (cache && !isToday(date)) return cache
      const data = await (await event.fetch(`/api/taxi/availability?date=${date}`)).json()
      await writeCache(data, date)
      return data
    }

    taxiAvailability = getTaxiAvailability()
  }

  return { taxiAvailability }
}
