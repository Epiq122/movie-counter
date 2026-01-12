<script lang="ts">
	import AppShell from '$lib/components/AppShell.svelte';
	import MovieForm from '$lib/components/MovieForm.svelte';
	import MovieList from '$lib/components/MovieList.svelte';
	import StatsBar from '$lib/components/StatsBar.svelte';
	import { createMovie, type Movie } from '$lib/domain/movie';

	let movies = $state<Movie[]>([
		createMovie({ title: 'Die Hard', year: 1988, rating: 5 }),
		createMovie({ title: 'Jurassic Park', year: 1993, rating: 5 })
	]);

	let watchedClicks = $state(0);

	function addMovie(input: { title: string; year: number; rating: number }) {
		movies.unshift(createMovie(input));
	}

	function toggleWatched(id: string) {
		const m = movies.find((x) => x.id == id);
		if (!m) return;
		m.status = m.status === 'watched' ? 'unwatched' : 'watched';
		watchedClicks += 1;
	}
	function removeMovie(id: string) {
		const idx = movies.findIndex((x) => x.id === id);
		if (idx === -1) return;
		movies.splice(idx, 1);
	}

	// Microtask demo: show order of operations.
	// This is intentionally "teaching code". You wouldn’t ship this in production.
	let log = $state<string[]>([]);

	function pushLog(msg: string) {
		// Keep log length reasonable so it doesn't grow forever.
		log.unshift(`${new Date().toLocaleTimeString()} · ${msg}`);
		log = log.slice(0, 6);
	}

	function microtaskDemo() {
		pushLog('click handler start');

		queueMicrotask(() => pushLog('queueMicrotask ran'));
		Promise.resolve().then(() => pushLog('promise microtask ran'));

		pushLog('click handler end');
	}

	// Effects run after DOM updates, and in a microtask batch. :contentReference[oaicite:10]{index=10}
	$effect(() => {
		// This runs whenever movies changes, because we read movies here.
		// Keep effects for observation / I/O, not state rewrites.
		pushLog(`effect: movies length is ${movies.length}`);
	});
</script>

<AppShell title="Epiq Watch" subtitle="Movie Counter & Watchlist">
	<div class="space-y">
		<StatsBar {movies} />

		<div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
			<MovieForm onCreate={addMovie} />

			<section class="card border border-base-300 bg-base-100 shadow-sm">
				<div class="card-body gap-4">
					<h2 class="card-title">Reactivity warmup</h2>

					<p class="text-sm opacity-70">
						This is intentionally small: it teaches the “event → state → derived UI” loop.
					</p>

					<div class="flex flex-wrap items-center gap-2">
						<button class="btn btn-outline" type="button" onclick={microtaskDemo}>
							Microtask demo
						</button>

						<div class="badge badge-neutral">Watched toggles: {watchedClicks}</div>
					</div>
					<div class="rounded-xl border border-base-300 bg-base-200 p-3">
						<p class="mb-2 text-sm font-medium">Log (observe timing)</p>
						<ul class="space-y-1 text-sm opacity-80">
							{#each log as item (item)}
								<li>{item}</li>
							{/each}
						</ul>
					</div>
					<p class="text-xs opacity-60">
						Effects run after DOM updates and are batched, so don’t expect them to behave like
						synchronous code.
					</p>
				</div>
			</section>
			<MovieList {movies} onToggleWatched={toggleWatched} onRemove={removeMovie} />
		</div>
	</div>
</AppShell>
