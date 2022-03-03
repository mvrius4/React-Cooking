import React, { useContext } from 'react'
import Recipe from './Recipe'
import { RecipeContext } from './App';

export default function RecipeList({ recipes }) {
    const { handleRecipeAdd } = useContext(RecipeContext);
    const recipeElements = recipes.map(recipe => {
        return <Recipe key={recipe.id} {...recipe} />
    })

    return (
        <div className="recipe-list">
            <div className="recipe-list__recipe">
                {recipeElements}
            </div>
            <div className="recipe-list__add-recipe-btn-container">
                <button onClick={handleRecipeAdd} className="btn btn--primary">Add recipe</button>
            </div>
        </div>
    )
}
