<script>
	import { onMount } from 'svelte'

	let text = randomizeNumber()

	function randomizeNumber() {
		return Math.random().toString().slice(2, 11)
	}

	onMount(() => {
		setInterval(() => {
			text = randomizeNumber()
		}, 375)
	})
</script>

<div class="container">
	<p>
		{text}
	</p>
	<button>CLick me!</button>
</div>

<style>
	* {
		margin: 0;
		padding: 0;
		border: 0;
	}

	html,
	body {
		height: 100%;
		width: 100%;
		background: black;
	}

	.container {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
	}

	p {
		text-align: center;
		font-weight: 900;
		font-size: 4rem;
	}

	button {
		height: 64px;
		width: 100%;
		background: white;
		color: black;
	}
</style>
