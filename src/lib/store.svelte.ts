export const appState = $state<{
    favorites: Record<string, any>[];
    customRecipes: Record<string, any>[];
    mealPlan: Record<string, any[]>;
}>({
    favorites: [],
    customRecipes: [],
    mealPlan: {
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
        Saturday: [],
        Sunday: []
    }
});