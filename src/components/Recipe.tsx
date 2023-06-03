import React, { useState, useEffect} from 'react'
import { Recipe } from './Models'

function RecipeIndex() {
  const [recipes, setRecipe] = useState<Recipe[] | null>(null);

  useEffect(() => {
    fetchFoods();
  }, []);

  async function fetchFoods() {
    try {
      const response = await fetch('http://localhost:8080/backend/recipes');
      const jsonData = await response.json();

      setRecipe(jsonData);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    console.log(recipes);
  }, [recipes]);

  return (
    <div>
      <h1>Recipes</h1>
      {recipes == null ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {recipes.map((recipe) => (
            <li key={recipe.id}>
              <p>Name: {recipe.name}</p>
              <p>Description: {recipe.description}</p>
              <p>Imageurl: {recipe.image}</p>
              <p>Method: {recipe.making_method}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default RecipeIndex