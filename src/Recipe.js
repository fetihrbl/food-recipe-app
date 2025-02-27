import React from "react";
import style from './recipe.module.css';

const Recipe = ({title, calories, image, ingredients}) => {
    return (
        <div className={style.recipe}>
            <h1>{title}</h1>
            <ol>
                {ingredients.map((ingredient, index) => (
                    // Adding a 'key' prop to each item for uniqueness
                    <li key={index}>{ingredient.text}</li>
                ))}
            </ol>
            <p>Calories: {Math.round(calories)}</p>  {/* Rounding the calorie count */}
            <img className={style.image} src={image} alt={title} /> {/* Using the title as the alt text */}
        </div>
    );
}

export default Recipe;
