<script lang="ts">
	import type { Snippet } from 'svelte';
	import MovieForm from './MovieForm.svelte';

	let {
		children,
		title = 'EpiqFilm',
		subtitle = 'An epic watchlist tracker'
	}: {
		children: Snippet;
		title?: string;
		subtitle?: string;
	} = $props();
</script>

<div class="min-h-dvh bg-base-200">
	<header class="navbar border-b border-base-300 bg-base-100">
		<div class="mx-auto flex w-full max-w-5xl items-center justify-between px-4">
			<div>
				<h1 class="text-lg font-semibold">{title}</h1>
				<p class="text-sm opacity-70">{subtitle}</p>
			</div>
			<div class="badge badge-outline">Project 1</div>
		</div>
	</header>
	<main class="mx-auto w-full max-w-5xl px-4 py-6">
		{#if children}
			{@render children()}
		{/if}
	</main>
	<MovieForm />
</div>
