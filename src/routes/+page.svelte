<script>
	// @ts-nocheck

	import { goto } from '$app/navigation';
	import Map from '$lib/components/Map/Map.svelte';
	import { getTimeText } from '$lib/utils/getTimeText';
	import { DatePicker, DatePickerInput, Slider } from 'carbon-components-svelte';
	import { page } from '$app/stores';
	import { getYesterday, isBeforeToday } from '$lib/utils/date';

	export let data;

	let date = $page.url.searchParams.get('date');
	let time = 0;

	$: taxiAvailability = data.taxiAvailability[time] ?? undefined;
	$: timeText = getTimeText(time, false);

	function onDateChange(ev) {
		if (ev.detail.dateStr && isBeforeToday(ev.detail.dateStr)) goto(`/?date=${ev.detail.dateStr}`);
	}
</script>

<Map data={taxiAvailability} />
<div class="my-4 absolute left-1/2 -translate-x-1/2 z-[400] shadow-lg border">
	{getYesterday()}
	<DatePicker
		name="date"
		dateFormat="Y-m-d"
		datePickerType="single"
		maxDate={getYesterday()}
		bind:value={date}
		on:change={onDateChange}
	>
		<DatePickerInput placeholder="Select Date" onchange={() => console.log(123)} />
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
