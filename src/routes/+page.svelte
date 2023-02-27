<script>
	// @ts-nocheck

	import { goto } from '$app/navigation'
	import Map from '$lib/components/Map/Map.svelte'
	import { DatePicker, DatePickerInput, Slider, ToastNotification } from 'carbon-components-svelte'
	import { page } from '$app/stores'
	import * as dateUtils from '$lib/utils/date'
	import { isDataEmpty } from '$lib/utils/api'

	import '../app.postcss'
	import 'carbon-components-svelte/css/white.css'

	export let data

	let date = $page.url.searchParams.get('date')
	let time = 0

	$: taxiAvailabilityData = data.taxiAvailability[time] ?? undefined
	$: timeText = dateUtils.getTimeText(time, false)

	function onDateChange(ev) {
		if (ev.detail.dateStr && dateUtils.isBeforeToday(ev.detail.dateStr)) {
			goto(`/?date=${ev.detail.dateStr}`)
		}
	}
</script>

<Map data={taxiAvailabilityData} />

<div class="my-4 absolute right-1/2 translate-x-1/2 z-[400] shadow-lg border">
	<DatePicker
		name="date"
		dateFormat="Y-m-d"
		datePickerType="single"
		maxDate={dateUtils.getYesterday()}
		bind:value={date}
		on:change={onDateChange}
	>
		<DatePickerInput placeholder="Select Date" />
	</DatePicker>
</div>

<div
	class="my-4 p-2 absolute bottom-4 right-1/2 translate-x-1/2 z-[400] bg-white shadow-lg border rounded"
>
	<Slider
		labelText={`Select time: (${timeText})`}
		min={0}
		max={24}
		minLabel="12 AM"
		maxLabel="12 PM"
		hideTextInput
		bind:value={time}
	/>
</div>

{#if date && isDataEmpty(taxiAvailabilityData)}
	<ToastNotification
		class="absolute top-16 lg:top-0 right-1/2 translate-x-[10rem] lg:right-0 lg:translate-x-0 z-[400] w-[22rem]"
		lowContrast
		kind="warning-alt"
		title="No results found."
		subtitle={`On ${date} at ${timeText}`}
	/>
{/if}
