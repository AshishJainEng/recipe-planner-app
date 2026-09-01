<script lang="ts">
	import { appState } from '$lib/store.svelte';

	let selectedDay = $state('Monday');
	let selectedRecipe = $state('');

	function handleAddMeal() {
		if (!selectedRecipe) return;
		const parsed = JSON.parse(selectedRecipe);
		const newMeal = { id: parsed.id, title: parsed.title };
		appState.mealPlan[selectedDay] = [...appState.mealPlan[selectedDay], newMeal];
		selectedRecipe = '';
	}

	function handleRemove(day: string, event: CustomEvent) {
		const mealIdToRemove = event.detail.recipeId;
		appState.mealPlan[day] = appState.mealPlan[day].filter((m) => m.id !== mealIdToRemove);
	}
</script>

<div class="page-container">
	<h1>Weekly Meal Planner</h1>

	<div class="planner-controls">
		<select bind:value={selectedDay} class="input-select">
			<option value="Monday">Monday</option>
			<option value="Tuesday">Tuesday</option>
			<option value="Wednesday">Wednesday</option>
			<option value="Thursday">Thursday</option>
			<option value="Friday">Friday</option>
			<option value="Saturday">Saturday</option>
			<option value="Sunday">Sunday</option>
		</select>

		<select bind:value={selectedRecipe} class="input-select">
			<option value="">Choose a recipe...</option>
			<optgroup label="Favorites">
				{#each appState.favorites as fav}
					<option value={JSON.stringify({ id: fav.idMeal, title: fav.strMeal })}
						>{fav.strMeal}</option
					>
				{/each}
			</optgroup>
			<optgroup label="Custom Recipes">
				{#each appState.customRecipes as custom}
					<option value={JSON.stringify({ id: custom.id, title: custom.title })}
						>{custom.title}</option
					>
				{/each}
			</optgroup>
		</select>

		<button onclick={handleAddMeal} class="add-btn">Add to Day</button>
	</div>

	<div class="planner-grid">
		{#each Object.entries(appState.mealPlan) as [day, meals]}
			<meal-plan-day {day} {meals} onremoveMeal={(e: CustomEvent) => handleRemove(day, e)}
			></meal-plan-day>
		{/each}
	</div>
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
	.planner-controls {
		display: flex;
		gap: 10px;
		margin-bottom: 30px;
		background: white;
		padding: 20px;
		border-radius: 10px;
	}
	.input-select {
		padding: 10px;
		border-radius: 6px;
		border: 1px solid #ccc;
		flex: 1;
	}
	.add-btn {
		padding: 10px 20px;
		background: #e11d48;
		color: white;
		border: none;
		border-radius: 6px;
		cursor: pointer;
	}
	.planner-grid {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}
</style>
