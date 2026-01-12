<script lang="ts">
	import { clampRating } from '$lib/utils/movie-math';
	import { validateMovieForm } from '$lib/utils/movie-validation';

	let {
		onCreate
	}: { onCreate?: (movie: { title: string; year: number; rating: number }) => void } = $props();

	let form = $state({
		title: '',
		year: new Date().getFullYear(),
		rating: 3
	});

	// tracking the touched fields so it doesnt scream errors immediatly
	let touched = $state({ title: false, year: false, rating: false });

	let errors = $derived(validateMovieForm(form));

	let isValid = $derived(Object.keys(errors).length === 0);

	function submit() {
		touched.title = true;
		touched.year = true;
		touched.rating = true;

		if (!onCreate) {
			console.error('MovieForm: onCreate prop not provided');
			return;
		}
		if (!isValid) return;

		onCreate({
			title: form.title,
			year: form.year,
			rating: form.rating
		});

		form.title = '';
		form.year = new Date().getFullYear();
		form.rating = 3;

		touched.title = false;
		touched.year = false;
		touched.rating = false;
	}

	function onYearInput(v: string) {
		const n = Number(v);
		form.year = Number.isFinite(n) ? n : form.year;
	}

	function onRatingInput(v: string) {
		const n = Number(v);
		if (!Number.isFinite(n)) return;
		form.rating = clampRating(n);
	}
</script>

<form
	class="card border border-base-300 bg-base-100 shadow-sm"
	onsubmit={(e) => {
		e.preventDefault();
		submit();
	}}
>
	<div class="card-body gap-4">
		<h2 class="card-title">Add a movie</h2>

		<div class="form-control">
			<label for="title" class="label">
				<span class="label-text">Title</span>
			</label>
			<input
				id="title"
				class="input-bordered input w-full"
				placeholder="eg., Batman"
				value={form.title}
				oninput={(e) => (form.title = (e.currentTarget as HTMLInputElement).value)}
				onblur={() => (touched.title = true)}
				aria-invalid={touched.title && !!errors.title}
				aria-describedby="title-help"
			/>
			<div id="title-help" class="label">
				<span class="label-text-alt opacity-70">Keep it short and searchable.</span>
				{#if touched.title && errors.title}
					<span class="label-text-alt text-error" aria-live="polite">{errors.title}</span>
				{/if}
			</div>
		</div>

		<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
			<div class="form-control">
				<label class="label" for="year">
					<span class="label-text">Year</span>
				</label>
				<input
					id="year"
					class="input-bordered input w-full"
					inputmode="numeric"
					value={String(form.year)}
					oninput={(e) => onYearInput((e.currentTarget as HTMLInputElement).value)}
					onblur={() => (touched.year = true)}
					aria-invalid={touched.year && !!errors.year}
					aria-describedby="year-help"
				/>
				<div id="year-help" class="label">
					<span class="label-text-alt opacity-70">Used for sorting and sanity checks.</span>
					{#if touched.year && errors.year}
						<span class="label-text-alt text-error" aria-live="polite">{errors.year}</span>
					{/if}
				</div>
			</div>

			<div class="form-control">
				<label class="label" for="rating">
					<span class="label-text">Rating (1-5)</span>
				</label>
				<input
					id="rating"
					class="input-bordered input w-full"
					inputmode="numeric"
					value={String(form.rating)}
					oninput={(e) => onRatingInput((e.currentTarget as HTMLInputElement).value)}
					onblur={() => (touched.rating = true)}
					aria-invalid={touched.rating && !!errors.rating}
					aria-describedby="rating-help"
				/>
				<div id="rating-help" class="label">
					<span class="label-text-alt opacity-70">Quick personal score</span>
					{#if touched.rating && errors.rating}
						<span class="label-text-alt text-error" aria-live="polite">{errors.rating}</span>
					{/if}
				</div>
			</div>
		</div>
		<div class="flex items-center justify-between gap-3">
			<p class="text-sm opacity-70">
				{#if isValid}
					Ready to add.
				{:else}
					Fix validation to continue
				{/if}
			</p>
			<button class="btn btn-primary" type="submit" disabled={!isValid}> Add</button>
		</div>
	</div>
</form>
