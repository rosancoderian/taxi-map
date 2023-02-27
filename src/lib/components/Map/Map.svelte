<script>
	// @ts-nocheck

	import * as L from 'leaflet';
	import { LeafletLayer } from 'deck.gl-leaflet';
	import { MapView } from '@deck.gl/core';
	import { GeoJsonLayer } from '@deck.gl/layers';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	export let data;

	let map = null;
	let deckLayer = null;

	function createDeckLayer(data) {
		return new LeafletLayer({
			views: [
				new MapView({
					repeat: false
				})
			],
			layers: [
				new GeoJsonLayer({
					id: 'taxi',
					data,
					filled: true,
					pointRadiusMinPixels: 2,
					pointRadiusScale: 100,
					getPointRadius: (f) => 11 - f.properties.scalerank,
					getFillColor: [200, 0, 80, 180]
				})
			]
		});
	}

	function updateDeckLayer(data) {
		if (deckLayer) deckLayer.remove();
		if (map) {
			if (!data || data?.message === 'no results found') return;
			deckLayer = createDeckLayer(data);
			map.addLayer(deckLayer);
		}
	}

	$: {
		if (browser) requestAnimationFrame(() => updateDeckLayer(data));
		else updateDeckLayer(data);
	}

	onMount(() => {
		map = L.map(document.getElementById('map'), {
			center: [1.28967, 103.85007],
			zoom: 12,
			minZoom: 12
		});

		L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution:
				'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
		}).addTo(map);

		updateDeckLayer(data);
	});
</script>

<link
	rel="stylesheet"
	href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
	integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
	crossorigin=""
/>
<div id="map" class="w-full h-full absolute top-0 left-0" />
