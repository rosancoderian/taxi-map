// @ts-nocheck

import { readCache, writeCache } from '$lib/server/utils/cache'
import fs from 'fs'

/** @type {import('./$types').PageLoad} */
export async function load(event) {
	const date = event.url.searchParams.get('date')

	let taxiAvailability = []

	if (date) {
		async function getTaxiAvailability() {
			const cache = await readCache(date)
			if (cache) {
				console.log('using cache')
				return cache
			}
			const data = await (await event.fetch(`/api/taxi/availability?date=${date}`)).json()
			writeCache(data, date)
			return data
		}

		taxiAvailability = getTaxiAvailability()
	}

	return { taxiAvailability }
}
