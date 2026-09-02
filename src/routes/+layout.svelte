<script lang="ts">
  import { onMount } from 'svelte';
  import { appState } from '$lib/store.svelte.ts';

  let { children } = $props();
  let isLoaded = $state(false);

  onMount(() => {
    const storedData = localStorage.getItem('recipeMasterApp');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      appState.favorites = parsedData.favorites || [];
      appState.customRecipes = parsedData.customRecipes || [];
      if (parsedData.mealPlan) {
        appState.mealPlan = parsedData.mealPlan;
      }
    }
    isLoaded = true;
  });

  $effect(() => {
    if (isLoaded) {
      localStorage.setItem('recipeMasterApp', JSON.stringify({
        favorites: appState.favorites,
        customRecipes: appState.customRecipes,
        mealPlan: appState.mealPlan
      }));
    }
  });
</script>

<nav class="navbar">
  <div class="nav-content">
    <div class="logo">RecipeMaster</div>
    <div class="nav-links">
      <a href="/">Discover</a>
      <a href="/favorites">Favorites</a>
      <a href="/planner">Planner</a>
      <a href="/my-recipes">My Recipes</a>
    </div>
  </div>
</nav>

<main class="main-content">
  {#if isLoaded}
    {@render children()}
  {/if}
</main>

<style>
  :global(body) {
    margin: 0;
    background-color: #f9fafb;
    font-family: sans-serif;
  }
  .navbar {
    background-color: white;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    padding: 1rem 0;
    position: sticky;
    top: 0;
    z-index: 100;
  }
  .nav-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .logo {
    font-size: 1.5rem;
    font-weight: bold;
    color: #e11d48;
  }
  .nav-links {
    display: flex;
    gap: 20px;
  }
  .nav-links a {
    text-decoration: none;
    color: #4b5563;
    font-weight: 600;
    padding: 8px 12px;
    border-radius: 6px;
  }
  .nav-links a:hover {
    background-color: #f3f4f6;
    color: #e11d48;
  }
  .main-content {
    min-height: calc(100vh - 70px);
  }
</style>