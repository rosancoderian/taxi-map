<script>
	// @ts-nocheck

	import { goto } from '$app/navigation';
	import Map from '$lib/components/Map/Map.svelte';
	import { getTimeText } from '$lib/utils/getTimeText';
	import { DatePicker, DatePickerInput, Slider } from 'carbon-components-svelte';
	import { page } from '$app/stores';

	export let data;

	let date = $page.url.searchParams.get('date') ?? '';
	let time = 0;

	$: timeLabel = getTimeText(time);

	function onDateChange() {
		if (date) goto(`/?date=${date}`);
	}
</script>

<Map />
<div class="my-4 absolute left-1/2 -translate-x-1/2 z-[400] shadow-lg border">
	<DatePicker
		name="date"
		bind:value={date}
		dateFormat="Y-m-d"
		datePickerType="single"
		on:change={onDateChange}
	>
		<DatePickerInput placeholder="Select Date" />
	</DatePicker>
</div>

<div
	class="my-4 p-2 absolute bottom-4 left-1/2 -translate-x-1/2 z-[400] bg-white shadow-lg border rounded"
>
	<Slider
		labelText={`Select time: (${timeLabel})`}
		min={0}
		max={24}
		minLabel="12 AM"
		maxLabel="12 PM"
		hideTextInput
		bind:value={time}
	/>
</div>
