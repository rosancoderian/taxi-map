<script>
	import Map from '$lib/components/Map/Map.svelte';
	import { DatePicker, DatePickerInput, Slider } from 'carbon-components-svelte';
	let date = '';
	let time = 0;
	$: timeLabel = getTimeLabel(time);

	const getTimeLabel = (/** @type {number} */ time) => {
		const meridiem = time >= 12 ? 'PM' : 'AM';
		const prefix = time < 10 ? '0' : '';
		return `${prefix}${time}:00 ${meridiem}`;
	};
</script>

<Map />
<div class="my-4 absolute left-1/2 -translate-x-1/2 z-[400] shadow-lg border">
	<DatePicker bind:value={date} dateFormat="Y-m-d" datePickerType="single">
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
