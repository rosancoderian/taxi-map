import * as dateUtils from '$lib/utils/date'
import { error, json } from '@sveltejs/kit'

/** @type {import('./$types').RequestHandler} */
export async function GET(event) {
	const date = event.url.searchParams.get('date')

	if (date) {
		const promises = []

		for (let i = 0; i <= 24; i++) {
			const timeText = dateUtils.getTimeText(i, false)
			const url = `https://api.data.gov.sg/v1/transport/taxi-availability?date_time=${date}T${timeText}`
			promises.push(event.fetch(url))
		}

		try {
			return json(
				await Promise.allSettled(promises).then(async (results) => {
					return await Promise.all(
						results.map(async (result) => {
							if (result.status === 'fulfilled') return await result.value.json()
							return undefined
						})
					)
				})
			)
		} catch (err) {
			throw error(500)
		}
	}

	throw error(404)
}
