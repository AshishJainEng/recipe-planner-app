<script lang="ts">
	import { onMount } from 'svelte';
	import { appState } from '$lib/store.svelte';
	import { goto } from '$app/navigation';

	let recipes = $state<any[]>([]);
	let isLoading = $state(true);
	let searchQuery = $state('');
	let activeFilter = $state('');

	async function fetchRecipes(query = 'chicken') {
		isLoading = true;
		try {
			const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
			const data = await response.json();
			recipes = data.meals || [];
		} catch (error) {
			console.error(error);
		} finally {
			isLoading = false;
		}
	}

	onMount(() => {
		fetchRecipes();
	});

	function handleSearch() {
		fetchRecipes(searchQuery);
	}

	function handleFilter(category: string) {
		activeFilter = category;
		fetchRecipes(category);
	}

	function toggleFav(recipe: any) {
		const isFav = appState.favorites.some((f) => f.idMeal === recipe.idMeal);
		if (isFav) {
			appState.favorites = appState.favorites.filter((f) => f.idMeal !== recipe.idMeal);
		} else {
			appState.favorites = [...appState.favorites, recipe];
		}
	}

</script>

<div class="page-container">
	<h1>Discover Recipes</h1>

	<div class="controls">
		<div class="search-bar">
			<input type="text" bind:value={searchQuery} placeholder="Search recipes..." />
			<button onclick={handleSearch}>Search</button>
		</div>

		<div class="filters">
			<button class={activeFilter === 'Vegan' ? 'active' : ''} onclick={() => handleFilter('Vegan')}
				>Vegan</button
			>
			<button class={activeFilter === 'Beef' ? 'active' : ''} onclick={() => handleFilter('Beef')}
				>Beef</button
			>
			<button
				class={activeFilter === 'Seafood' ? 'active' : ''}
				onclick={() => handleFilter('Seafood')}>Seafood</button
			>
			<button onclick={() => fetchRecipes('chicken')}>Clear</button>
		</div>
	</div>

	{#if isLoading}
		<div class="loading">Loading...</div>
	{:else if recipes.length === 0}
		<p>No recipes found.</p>
	{:else}
		<div class="recipe-grid">
			{#each recipes as recipe}
				<recipe-card
					recipe-title={recipe.strMeal}
					image-url={recipe.strMealThumb}
					is-favorite={appState.favorites.some((f) => f.idMeal === recipe.idMeal) ? 'true' : 'false'}
					ontoggleFavorite={() => toggleFav(recipe)}
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
	.controls {
		display: flex;
		flex-direction: column;
		gap: 15px;
		margin-bottom: 30px;
		background: white;
		padding: 20px;
		border-radius: 10px;
	}
	.search-bar {
		display: flex;
		gap: 10px;
	}
	.search-bar input {
		flex: 1;
		padding: 10px;
		border: 1px solid #ccc;
		border-radius: 6px;
	}
	.search-bar button {
		padding: 10px 20px;
		background: #e11d48;
		color: white;
		border: none;
		border-radius: 6px;
		cursor: pointer;
	}
	.filters {
		display: flex;
		gap: 10px;
	}
	.filters button {
		padding: 6px 15px;
		border: 1px solid #e11d48;
		background: white;
		color: #e11d48;
		border-radius: 20px;
		cursor: pointer;
	}
	.filters button.active {
		background: #e11d48;
		color: white;
	}
	.recipe-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 24px;
	}
</style>
