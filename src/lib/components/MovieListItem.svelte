<script lang="ts">
	import type { Movie } from '$lib/domain/movie';
	let {
		movie,
		onToggleWatched,
		onRemove
	}: {
		movie: Movie;
		onToggleWatched: (id: string) => void;
		onRemove: (id: string) => void;
	} = $props();
	let isWatched = $derived(movie.status === 'watched');
</script>

<li
	class="flex items-center justify-between gap-3 rounded-xl border border-base-300 bg-base-100 p-3"
>
	<div class="min-w-0">
		<p class="truncate font-medium">
			{movie.title}
			{#if isWatched}
				<span class="ml-2 badge align-middle badge-success">watched</span>
			{/if}
		</p>
		<p class="text-sm opacity-70">{movie.year} - Rating: {movie.rating}/5</p>
	</div>
	<div class="flex items-center gap-2">
		<button
			class="btn btn-outline btn-sm"
			type="button"
			onclick={() => onToggleWatched(movie.id)}
			aria-pressed={isWatched}
		>
			{#if isWatched}Unwatch{:else}Watch{/if}
		</button>
		<button
			class="btn text-error btn-ghost btn-sm"
			type="button"
			onclick={() => onRemove(movie.id)}
			aria-label="Remove {movie.title}"
		>
			✕
		</button>
	</div>
</li>
