// @ts-nocheck
/** @type {import('./$types').PageLoad} */
export async function load(event) {
	const date = event.url.searchParams.get('date')

	let taxiAvailability = []

	if (date) {
		async function getTaxiAvailability() {
			return await (await event.fetch(`/api/taxi/availability?date=${date}`)).json()
		}

		taxiAvailability = getTaxiAvailability()
	}

	return { taxiAvailability }
}
