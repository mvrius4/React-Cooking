import React, { useContext } from 'react'
import RecipeIngredientEdit from './RecipeIngredientEdit'
import { RecipeContext } from './App'
import { v4 as uuidv4 } from 'uuid'

export default function RecipeEdit({ recipe }) {
    const { handleRecipeChange, handleRecipeSelect } = useContext(RecipeContext) 

    function handleChange(changes) {
        handleRecipeChange(recipe.id, { ...recipe, ...changes })
    }

    function handleIngredientChange(id, ingredient) {
        const newIngredients = [...recipe.ingredients]
        const index = newIngredients.findIndex(i => i.id === id)
        newIngredients[index] = ingredient
        handleChange({ ingredients: newIngredients })
    }

    function handleIngredientAdd() {
        const newIngredient = {
            id: uuidv4(),
            name: '',
            amount: ''
        }
        handleChange({ ingredients: [...recipe.ingredients, newIngredient] })
    }

    function handleIngredientDelete(id) {
        handleChange({ ingredients: recipe.ingredients.filter(i => i.id !== id) })
    }

    return (
        <div className="recipe-edit">
            <div className="recipe-edit__btn-container">
                <button onClick={() => handleRecipeSelect(undefined)} className="btn btn--danger">&times;</button>
            </div>
            <div className="recipe-edit__grid-section">
                <label htmlFor="name">Name</label>
                <input name="name" type="text" id="name" 
                    onChange={e => handleChange({ name: e.target.value})}
                    value={recipe.name} 
                />
                <label htmlFor="cookTime">Cook time</label>
                <input name="cookTime" type="text" id="cookTime" 
                    onChange={e => handleChange({ cookTime: e.target.value})}
                    value={recipe.cookTime}
                />
                <label htmlFor="servings">Servings</label>
                <input name="servings" type="number" id="servings" 
                    onChange={e => handleChange({ servings: parseInt(e.target.value) || ''})}
                    value={recipe.servings}
                />
                <label htmlFor="instructions">Instructions</label>
                <textarea name="instructions" id="instructions" 
                    onChange={e => handleChange({ instructions: e.target.value})}
                    value={recipe.instructions}
                />
            </div>
            <br />
            <label>Ingredients</label>
            <div className="recipe-edit__grid-section-ingredients">
                <div>Name</div>
                <div>Amount</div>
                <div></div>
                {recipe.ingredients.map(ingredient => (
                    <RecipeIngredientEdit 
                        key={ingredient.id} 
                        ingredient={ingredient}
                        handleIngredientChange={handleIngredientChange}
                        handleIngredientDelete={handleIngredientDelete}
                    />
                ))}
            </div>
            <div className="recipe-edit__btn-container-ingredients">
                <button onClick={() => handleIngredientAdd()} className="btn btn--primary">Add ingredient</button>
            </div>
        </div>
    )
}
