<script lang="ts">
	import type { Movie, WatchStatus } from '$lib/domain/movie';
	import MovieListItem from './MovieListItem.svelte';

	let {
		movies = [],
		onToggleWatched,
		onRemove
	}: {
		movies?: Movie[];
		onToggleWatched: (id: string) => void;
		onRemove: (id: string) => void;
	} = $props();
	type FilterState = {
		query: string;
		status: 'all' | WatchStatus;
	};

	let filters = $state<FilterState>({
		query: '',
		status: 'all'
	});

	let filtered = $derived.by(() => {
		const q = filters.query.trim().toLowerCase();

		return movies.filter((m) => {
			const matchesQuery =
				q.length === 0 || m.title.toLowerCase().includes(q) || String(m.year).includes(q);

			const matchStatus = filters.status === 'all' ? true : m.status === filters.status;

			return matchesQuery && matchStatus;
		});
	});
</script>

<section class="card border border-base-300 bg-base-100 shadow-sm">
	<div class="card-body gap-4">
		<div class="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
			<div>
				<h2 class="care-title">Your Watchlist</h2>
				<p class="opactity-70 text-sm">Search and filter like a normal app.</p>
			</div>

			<div class="flex flex-col gap-2 sm:flex-row sm:items-center">
				<label class="form-control">
					<span class="label-text text-sm">Search</span>
					<input
						placeholder="title or year..."
						value={filters.query}
						oninput={(e) => (filters.query = (e.currentTarget as HTMLInputElement).value)}
						class="input-bordered input input-sm"
					/>
				</label>
				<label class="form-control">
					<span class="label-text text-sm">Status</span>
					<select
						value={filters.status}
						onchange={(e) => {
							const value = (e.currentTarget as HTMLSelectElement).value;
							filters.status = value === 'all' ? 'all' : (value as WatchStatus);
						}}
						class="select-bordered select select-sm"
					>
						<option value="all">All</option>
						<option value="unwatched">Unwatched</option>
						<option value="watched">Watched</option>
					</select>
				</label>
			</div>
		</div>

		{#if filtered.length === 0}
			<div class="text-cener rounded-xl border border-dashed border-base-300 p-6">
				<p class="font-medium">No matches</p>
				<p class="text-sm opacity-70">Try changing fileters or adding a movie.</p>
			</div>
		{:else}
			<ul class="space-y-2">
				{#each filtered as movie (movie.id)}
					<MovieListItem {movie} {onToggleWatched} {onRemove} />
				{/each}
			</ul>
		{/if}
	</div>
</section>
