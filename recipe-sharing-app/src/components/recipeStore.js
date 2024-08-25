import create from 'zustand';

const useRecipeStore = create(set => ({
  recipes: [],
  favorites: [],
  recommendations: [],
  searchTerm: '',

  updateRecipe: (recipeId) => set(state => ({
    favorites: [...state.favorites, recipeId]
  })),

  deleteRecipe: (recipeId) => set(state => ({
    favorites: state.favorites.filter(id => id !== recipeId)
  })),

  setRecipes: () => set(state => {
    const recommended = state.recipes.filter(recipe =>
      state.favorites.includes(recipe.id) && Math.random() > 0.5
    );
    return { recommendations: recommended };
  }),

  setSearchTerm: (term) => set({ searchTerm: term }),

  // Optional: Filter recipes based on searchTerm
  filteredRecipes: () => set(state => ({
    recipes: state.recipes.filter(recipe =>
      recipe.name.toLowerCase().includes(state.searchTerm.toLowerCase())
    )
  })),
}));

export default useRecipeStore;

