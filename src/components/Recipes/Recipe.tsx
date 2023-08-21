import React, { useState, useEffect } from 'react'
import { Recipe } from '../Models'
import ResistRecipeModal from './ResistRecipeModal'
import DeleteRecipeModal from './DeleteRecipeModal'
import UpdateRecipeModal from './UpdateRecipeModal'
import { Link } from "react-router-dom";
// import RecipeWithFood from './RecipeWithFood'
import '../Design/Recipe.css';

const RecipeIndex: React.FC = () => {
  const [recipes, setRecipe] = useState<Recipe[] | null>(null);
  const [RecipeId, setRecipeId] = useState<Recipe["id"] | null>(null);
  const [RecipeName, setRecipeName] = useState<string | null>(null);
  const [RecipeDecription, setRecipeDescription] = useState<Recipe["description"] | null>(null);
  const [RecipeImage, setRecipeImage] = useState<Recipe['image'] | null>(null);
  const [RecipeMethod, setRecipeMethod] = useState<Recipe['making_method'] | null>(null);
  const [showResistModal, setShowResistModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  useEffect(() => {
    fetchRecipes();
  }, []);

  async function fetchRecipes() {
    try {
      const response = await fetch(process.env.REACT_APP_API_ENDPOINT+'/backend/recipes');
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

  function openDeleteModal(recipeId: number, recipeName: string) {
    setRecipeId(recipeId);
    setRecipeName(recipeName);
    setShowDeleteModal(true);
  }
  function closeDeleteModal() {
    setShowDeleteModal(false);
  }

  useEffect(() => {
    console.log(recipes);
  }, [recipes]);

  return (
    <div className="container">
      <h1 className="logo">Recipes</h1>
      {recipes == null ? (
        <>        
          <button className="button" onClick={openResistModal}>新しいレシピの登録</button><ResistRecipeModal showResistModal={showResistModal} closeResistModal={closeResistModal} />
          <p>Loading or Nothing</p>
        </>
      ) : (
        <ul className="list">
          <button className='button' onClick={openResistModal}>新しいレシピの登録</button>
          <ResistRecipeModal showResistModal={showResistModal} closeResistModal={closeResistModal} />
          {recipes.map((recipe) => (
            <li className="list-item" key={recipe.id}>
                <p　className='list-item-text'>レシピ名: {recipe.name}</p>
                <p className='list-item-text'>概要: {recipe.description}</p>
                {/* <p>Imageurl: {recipe.image}</p> */}
                {/* <p className='list-item-text'>つくりかた: {recipe.making_method}</p> */}
                <Link 
                  to={`/recipes/${recipe.id}/${recipe.name}`}>
                  <button className="button detail-button">レシピの詳細</button>
                </Link>
                <button className="button delete-button" onClick={() => openDeleteModal(recipe.id, recipe.name)}>削除</button>
                <DeleteRecipeModal
                  showDeleteModal={showDeleteModal}
                  closeDeleteModal={closeDeleteModal}
                  RecipeId={RecipeId}
                  RecipeName={RecipeName}
                  />
                <button className="button update-button" onClick={() => openUpdateModal(recipe.id, recipe.name, recipe.description, recipe.image, recipe.making_method)}>レシピの変更</button>
                <UpdateRecipeModal
                  showUpdateModal={showUpdateModal}
                  closeUpdateModal={closeUpdateModal}
                  RecipeId={RecipeId}
                  RecipeName={RecipeName}
                  RecipeDescription={RecipeDecription}
                  RecipeImage={RecipeImage}
                  RecipeMethod={RecipeMethod}
                  />
                <p>　</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default RecipeIndex