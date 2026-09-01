<script lang="ts">
	import { appState } from '$lib/store.svelte';
	import { goto } from '$app/navigation';

	function removeFav(idMeal: string) {
		appState.favorites = appState.favorites.filter((f) => f.idMeal !== idMeal);
	}

</script>

<div class="page-container">
	<h1>My Favorites</h1>
	{#if appState.favorites.length === 0}
		<p>No favorites added yet.</p>
	{:else}
		<div class="recipe-grid">
			{#each appState.favorites as recipe}
				<recipe-card
					recipe-title={recipe.strMeal}
					image-url={recipe.strMealThumb}
					is-favorite="true"
					ontoggleFavorite={() => removeFav(recipe.idMeal)}
					onviewRecipe={() => goto(`/recipe/${recipe.idMeal}`)}
				>
				</recipe-card>
			{/each}
		</div>
	{/if}
</div>

<style>
	.page-container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 32px 20px;
	}
	h1 {
		color: #111827;
		margin-bottom: 20px;
	}
	.recipe-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 24px;
	}
</style>
