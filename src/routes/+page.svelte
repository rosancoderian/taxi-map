<script>
	import Map from '$lib/components/Map/Map.svelte';
	import { DatePicker, DatePickerInput } from 'carbon-components-svelte';
	let selectedDate = '';
</script>

<Map />
<div class="mapControl">
	<DatePicker bind:value={selectedDate} dateFormat="Y-m-d" datePickerType="single">
		<DatePickerInput placeholder="yyyy-mm-dd" />
	</DatePicker>
</div>

<style>
	.mapControl {
		position: absolute;
		top: 20px;
		left: 100px;
		z-index: 400;
	}
</style>
