<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { appState } from '$lib/store.svelte';

	let recipe = $state<any>(null);
	let isFav = $derived(appState.favorites.some((f) => f.idMeal === recipe?.idMeal));

	onMount(async () => {
		const id = $page.params.id;
		const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
		const data = await res.json();
		if (data.meals) recipe = data.meals[0];
	});

	function toggleFavorite() {
		if (!recipe) return;
		if (isFav) {
			appState.favorites = appState.favorites.filter((f) => f.idMeal !== recipe.idMeal);
		} else {
			appState.favorites = [...appState.favorites, recipe];
		}
	}
</script>

<div class="page-container">
	{#if !recipe}
		<p>Loading details...</p>
	{:else}
		<recipe-card
			recipe-title={recipe.strMeal}
			image-url={recipe.strMealThumb}
			is-favorite={isFav ? 'true' : 'false'}
			ontoggleFavorite={toggleFavorite}
		>
		</recipe-card>
		<div class="content">
			<h3>Instructions</h3>
			<p>{recipe.strInstructions}</p>
		</div>
	{/if}
</div>

<style>
	.page-container {
		max-width: 800px;
		margin: 0 auto;
		padding: 32px 20px;
	}
	.content {
		background: white;
		padding: 20px;
		border-radius: 12px;
		line-height: 1.6;
		margin-top: 20px;
	}
</style>
