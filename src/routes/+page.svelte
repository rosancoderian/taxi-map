<script>
  // @ts-nocheck

  import { goto } from '$app/navigation'
  import Map from '$lib/components/Map/Map.svelte'
  import { DatePicker, DatePickerInput, ToastNotification } from 'carbon-components-svelte'
  import Slider from 'svelte-range-slider-pips'
  import { page } from '$app/stores'
  import { getTimeText, isBeforeToday, getYesterday } from '$lib/utils/date'

  import '../app.postcss'
  import 'carbon-components-svelte/css/white.css'

  export let data

  let date = $page.url.searchParams.get('date')

  $: timeRange = [0, 24]
  $: taxiAvailabilityData = data.taxiAvailability.slice(timeRange[0], timeRange[1] + 1)

  function onDateChange(ev) {
    const { dateStr } = ev.detail
    if (isBeforeToday(dateStr)) goto(`/?date=${dateStr}`)
  }
</script>

<Map data={taxiAvailabilityData} />

<div class="my-4 absolute right-1/2 translate-x-1/2 z-[400] shadow-lg border">
  <DatePicker
    name="date"
    dateFormat="Y-m-d"
    datePickerType="single"
    maxDate={getYesterday()}
    bind:value={date}
    on:change={onDateChange}
  >
    <DatePickerInput placeholder="Select Date" />
  </DatePicker>
</div>

<div
  class="my-4 pt-2 px-4 absolute bottom-4 right-1/2 translate-x-1/2 z-[400] bg-white shadow-lg border rounded w-72"
>
  Select time: {getTimeText(timeRange[0])} to {getTimeText(timeRange[1])}
  <Slider
    pips
    range
    min={0}
    max={24}
    all="label"
    bind:values={timeRange}
    springValues={{
      stiffness: 1,
      damping: 1
    }}
    formatter={(v) => {
      if (v === 0) return '00:00'
      else if (v === 12) return '12:00'
      else if (v === 24) return '23:59'
      return ''
    }}
  />
</div>

{#if taxiAvailabilityData?.message}
  <ToastNotification
    lowContrast
    class="absolute top-16 lg:top-0 right-1/2 translate-x-[10rem] lg:right-0 lg:translate-x-0 z-[400] w-[22rem]"
    kind="warning-alt"
    title="No data found"
    subtitle={`No data is found on ${date}`}
  />
{/if}
