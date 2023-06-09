import React, { useState, useEffect} from 'react'
import { Recipe } from './Models'
import ResistRecipeModal from './ResistRecipeModal'
import DeleteRecipeModal from './DeleteRecipeModal'
import UpdateRecipeModal from './UpdateRecipeModal'

const RecipeIndex: React.FC = () => {
  const [recipes, setRecipe] = useState<Recipe[] | null>(null);
  const [showResistModal, setShowResistModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [RecipeId, setRecipeId] = useState<number | null>(null);
  const [RecipeName, setRecipeName] = useState<string | null>(null);
  const [RecipeDecription, setRecipeDescription] = useState<string | null>(null);
  const [RecipeImage, setRecipeImage] = useState<string | null>(null);
  const [RecipeMethod, setRecipeMethod] = useState<string | null>(null);
  
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

  function openResistModal() {
    setShowResistModal(true);
  }
  function closeResistModal() {
    setShowResistModal(false);
  }

  function openUpdateModal(recipeId: number, recipeName: string, recipeDescription: string, recipeImage: string, recipeMethod: string) {
    setRecipeId(recipeId);
    setRecipeName(recipeName);
    setRecipeDescription(recipeDescription)
    setRecipeImage(recipeImage)
    setRecipeMethod(recipeMethod)
    setShowUpdateModal(true);
  }
  function closeUpdateModal() {
    setShowUpdateModal(false);
  }

  function openDeleteModal(recipeId: number) {
    setRecipeId(recipeId);
    setShowDeleteModal(true);
  }
  function closeDeleteModal() {
    setShowDeleteModal(false);
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
          <button onClick={openResistModal}>Resist New Recipe</button>
          <ResistRecipeModal showResistModal={showResistModal} closeResistModal={closeResistModal} />
          {recipes.map((recipe) => (
            <li key={recipe.id}>
              <p>Name: {recipe.name}</p>
              <p>Description: {recipe.description}</p>
              <p>Imageurl: {recipe.image}</p>
              <p>Method: {recipe.making_method}</p>
              <button onClick={() => openDeleteModal(recipe.id)}>削除</button>
              <DeleteRecipeModal
                showDeleteModal={showDeleteModal}
                closeDeleteModal={closeDeleteModal}
                RecipeId={RecipeId}
                RecipeName={RecipeName}
                />
              <button onClick={() => openUpdateModal(recipe.id, recipe.name, recipe.description, recipe.image, recipe.making_method)}>レシピの変更</button>
              <UpdateRecipeModal
                showUpdateModal={showUpdateModal}
                closeUpdateModal={closeUpdateModal}
                RecipeId={RecipeId}
                RecipeName={RecipeName}
                RecipeDescription={RecipeDecription}
                RecipeImage={RecipeImage}
                RecipeMethod={RecipeMethod}
                />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default RecipeIndex