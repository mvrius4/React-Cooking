import React, { useState, useEffect } from 'react';
import RecipeList from './RecipeList';
import RecipeEdit from './RecipeEdit';
import '../css/App.css';
import { v4 as uuidv4 } from 'uuid';

export const RecipeContext = React.createContext();
const LOCAL_STORAGE_KEY = "cookingWithReact.recipes"

function App() {
  const [selectedRecipeId, setSelectedRecipeId] = useState();
  const [recipes, setRecipes] = useState(sampleRecipes);
  const [searchTerm, setSearchTerm] = useState("");
  const selectedRecipe = recipes.find(recipe => recipe.id === selectedRecipeId);
  const recipeContextValues = {
    handleRecipeAdd,
    handleRecipeDelete,
    handleRecipeSelect,
    handleRecipeChange
  };

  useEffect(() => {
    const recipeJSON = localStorage.getItem(LOCAL_STORAGE_KEY);
    if(recipeJSON != null) setRecipes(JSON.parse(recipeJSON));
  }, [])
  
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipes));
  }, [recipes])

  function handleRecipeSelect(id) {
    setSelectedRecipeId(id)
  }

  function handleRecipeAdd() {
    const newRecipe = {
      id: uuidv4(),
      name: '',
      cookTime: '',
      servings: 0,
      creator: '',
      instructions: '',
      ingredients: [
        { id: uuidv4(), name: '', amount: '' }
      ]
    }
    setSelectedRecipeId(newRecipe.id);
    setRecipes([...recipes, newRecipe]);
  }

  function handleRecipeDelete(id) {
    if(selectedRecipeId != null && selectedRecipeId === id) {
      setSelectedRecipeId(undefined);
    }
    setRecipes(recipes.filter(recipe => recipe.id !== id));
  }

  function handleRecipeChange(id, recipe) {
    const newRecipes = [...recipes];
    const index = newRecipes.findIndex(r => r.id === id);
    newRecipes[index] = recipe;
    setRecipes(newRecipes);
  }

  return (
      <RecipeContext.Provider value={recipeContextValues}>
        <input type="search" onChange={e => setSearchTerm(e.target.value.toLowerCase())} />
        <div className="main">
          <RecipeList recipes={recipes.filter(r => r.name.toLowerCase().includes(searchTerm))} />
          {selectedRecipe && <RecipeEdit recipe={selectedRecipe} />}
        </div>
      </RecipeContext.Provider>
  );
}

const sampleRecipes = [
  {
    id: 1,
    name: 'Plain Chicken',
    cookTime: '1:30',
    servings: 3,
    creator: 'Marius',
    instructions: "1. Cook the chicken.\n2. Eat the chicken.",
    ingredients:
    [
      {
        id: 1,
        name: "Chicken",
        amount: "2kg",
      },
      {
        id: 2,
        name: "Salt",
        amount: "20g",
      }
    ]
  },
  {
    id: 2,
    name: 'Plain Pork',
    cookTime: '1:45',
    servings: 5,
    creator: 'Marius',
    instructions: "1. Cook the pork.\n2. Eat the pork.",
    ingredients:
    [
      {
        id: 1,
        name: "Pork",
        amount: "3kg",
      },
      {
        id: 2,
        name: "Paprika",
        amount: "50g",
      }
    ]
  },
]

export default App;
