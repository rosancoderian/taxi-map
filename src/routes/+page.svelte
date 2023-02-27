<script>
	// @ts-nocheck

	import { goto } from '$app/navigation'
	import Map from '$lib/components/Map/Map.svelte'
	import { DatePicker, DatePickerInput, Slider, ToastNotification } from 'carbon-components-svelte'
	import { page } from '$app/stores'
	import * as dateUtils from '$lib/utils/date'
	import { isDataExist } from '$lib/utils/api'

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

<div class="my-4 absolute left-1/2 -translate-x-1/2 z-[400] shadow-lg border">
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
	class="my-4 p-2 absolute bottom-4 left-1/2 -translate-x-1/2 z-[400] bg-white shadow-lg border rounded"
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

{#if isDataExist(taxiAvailabilityData)}
	<div class="my-4 p-2 absolute right-0 z-[400]">
		<ToastNotification
			lowContrast
			kind="warning-alt"
			title="No results found."
			subtitle={`No data: ${date} at ${timeText}`}
		/>
	</div>
{/if}
