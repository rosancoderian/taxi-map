<script>
	import NProgress from 'nprogress'
	import { navigating } from '$app/stores'
	import 'nprogress/nprogress.css'
	import '../app.postcss'
	import 'carbon-components-svelte/css/white.css'

	NProgress.configure({
		minimum: 0.16
	})

	$: {
		if ($navigating) NProgress.start()
		if (!$navigating) NProgress.done()
	}
</script>

<slot />
