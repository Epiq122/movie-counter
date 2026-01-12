<script lang="ts">
	import type { Movie } from '$lib/domain/movie';
	import { averageRating, countWatched } from '$lib/utils/movie-math';

	let { movies }: { movies: Movie[] } = $props();

	// recompute automatically when movue changes
	let total = $derived(movies.length);
	let watched = $derived(countWatched(movies));
	let avg = $derived(averageRating(movies));

	// display formatting, derived so the template is clean
	let avgLabel = $derived(avg === 0 ? '-' : avg.toFixed(1));
</script>

<section class="grid grid-cols-1 gap-3 sm:grid-cols-3">
	<div class="stat rounded-xl border border-base-300 bg-base-100">
		<div class="stat-title">Total Movies</div>
		<div class="stat-value text-primary">{total}</div>
	</div>

	<div class="stat rounded-xl border border-base-300 bg-base-100">
		<div class="stat-title">Watched</div>
		<div class="stat-value">{watched}</div>
		<div class="stat-desc">
			{total === 0 ? 'Add some movie' : `${Math.round((watched / total) * 100)}% complete`}
		</div>
	</div>

	<div class="stat rounded-xl border border-base-300 bg-base-100">
		<div class="stat-title">Avg rating</div>
		<div class="stat-value">{avgLabel}</div>
		<div class="stat-desc">Personal score (1-5)</div>
	</div>
</section>
