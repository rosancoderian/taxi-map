<script>
	import Map from '$lib/components/Map/Map.svelte';
	import { DatePicker, DatePickerInput } from 'carbon-components-svelte';
	let selectedDate = '';
</script>

<Map />
<div class="my-4 absolute left-1/2 -translate-x-1/2 z-[400] shadow-lg border">
	<DatePicker bind:value={selectedDate} dateFormat="Y-m-d" datePickerType="single">
		<DatePickerInput placeholder="Select Date" />
	</DatePicker>
</div>
