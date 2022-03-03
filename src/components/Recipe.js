import React, { useContext } from 'react'
import IngredientList from './IngredientList';
import { RecipeContext } from './App';

export default function Recipe(props) {
    const { handleRecipeDelete, handleRecipeSelect } = useContext(RecipeContext);
    const {
        id,
        name,
        cookTime,
        servings,
        instructions,
        ingredients,
    } = props;
    
    return (
        <div className="recipe">
            <div className="recipe__header">
                <h1>{name}</h1>
                <div className="recipe__header-btn-container">
                    <button onClick={ () => handleRecipeSelect(id) } className="btn btn--primary">Edit</button>
                    <button onClick={ () => handleRecipeDelete(id) } className="btn btn--danger">Delete</button>
                </div>
            </div>
            <div className="recipe__text-row">
                <p>Cook time: </p>
                <span>{cookTime}</span>
            </div>
            <div className="recipe__text-row">
                <p>Servings: </p>
                <span>{servings}</span>
            </div>
            <div className="recipe__text-column">
                <p>Instructions: </p>
                <div className="recipe__instructions">{instructions}</div>
            </div>
            <p>Ingredients: </p>
            <div>
                <IngredientList ingredients={ingredients} />
            </div>
        </div>
    )
}
