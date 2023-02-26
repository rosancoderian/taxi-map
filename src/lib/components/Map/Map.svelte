<script>
	// @ts-nocheck

	import * as L from 'leaflet';
	import { LeafletLayer } from 'deck.gl-leaflet';
	import { MapView } from '@deck.gl/core';
	import { GeoJsonLayer, ArcLayer } from '@deck.gl/layers';
	import { onMount } from 'svelte';

	// source: Natural Earth http://www.naturalearthdata.com/ via geojson.xyz

	onMount(() => {
		const AIR_PORTS =
			'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_airports.geojson';

		const map = L.map(document.getElementById('map'), {
			center: [1.28967, 103.85007],
			zoom: 12,
			minZoom: 12
		});

		L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution:
				'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
		}).addTo(map);

		const deckLayer = new LeafletLayer({
			views: [
				new MapView({
					repeat: false
				})
			],
			layers: [
				new GeoJsonLayer({
					id: 'airports',
					data: AIR_PORTS,
					// Styles
					filled: true,
					pointRadiusMinPixels: 2,
					pointRadiusScale: 100,
					getPointRadius: (f) => 11 - f.properties.scalerank,
					getFillColor: [200, 0, 80, 180]
				})
				// new ArcLayer({
				// 	id: 'arcs',
				// 	data: AIR_PORTS,
				// 	dataTransform: (d) => d.features.filter((f) => f.properties.scalerank < 4),
				// 	// Styles
				// 	getSourcePosition: (f) => [1.28967, 103.85007], // London
				// 	getTargetPosition: (f) => f.geometry.coordinates,
				// 	getSourceColor: [0, 128, 200],
				// 	getTargetColor: [200, 0, 80],
				// 	getWidth: 1
				// })
			]
		});
		map.addLayer(deckLayer);
	});
</script>

<link
	rel="stylesheet"
	href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
	integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
	crossorigin=""
/>
<div id="map" class="w-full h-full absolute top-0 left-0" />
