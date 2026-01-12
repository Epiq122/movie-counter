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
</script>

<AppShell title="Epiq Watch" subtitle="Movie Counter & Watchlist">
	<div class="space-y">
		<StatsBar {movies} />

		<div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
			<MovieForm onCreate={addMovie} />

			<MovieList {movies} onToggleWatched={toggleWatched} onRemove={removeMovie} />
		</div>
	</div>
</AppShell>
