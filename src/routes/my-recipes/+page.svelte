<script lang="ts">
	import { appState } from '$lib/store.svelte';

	function handleSave(event: CustomEvent) {
		const newRecipe = { ...event.detail, id: crypto.randomUUID() };
		appState.customRecipes = [...appState.customRecipes, newRecipe];
	}

	function deleteRecipe(id: string) {
		appState.customRecipes = appState.customRecipes.filter((r) => r.id !== id);
	}
</script>

<div class="page-container">
	<h1>My Custom Recipes</h1>

	<div class="form-wrapper">
		<recipe-form is-edit="false" onsaveRecipe={handleSave}></recipe-form>
	</div>

	{#if appState.customRecipes.length > 0}
		<h2>Saved Recipes</h2>
		<div class="recipe-grid">
			{#each appState.customRecipes as recipe}
				<recipe-card
					recipe-title={recipe.title}
					is-favorite="false"
				>
					<div slot="actions">
						<button onclick={() => deleteRecipe(recipe.id)} class="del-btn">Delete</button>
					</div>
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
	.form-wrapper {
		background-color: white;
		padding: 24px;
		border-radius: 12px;
		max-width: 600px;
		margin-bottom: 30px;
	}
	.recipe-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 24px;
	}
	.del-btn {
		background: red;
		color: white;
		border: none;
		padding: 8px 12px;
		border-radius: 6px;
		cursor: pointer;
		width: 100%;
		font-weight: 600;
	}
	.del-btn:hover {
		background: darkred;
	}
</style>
