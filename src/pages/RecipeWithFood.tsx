import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import DeleteFoodinRecipeModal from '../components/Recipes/RecipeDetail/DeleteFoodinRecipeModal';
import UpdateFoodinRecipeModal from '../components/Recipes/RecipeDetail/UpdateFoodinRecipeModal';
import RegisterFoodinRecipeModal from '../components/Recipes/RecipeDetail/RegisterFoodinRecipeModal';
import MakeDishModal from '../components/Recipes/RecipeDetail/MakeDishModal';
import { Recipe } from '../models/Recipe';
import { Food } from '../models/Food'
import axios from 'axios';
import Layout from '../components/Layout';


const RecipeWithFood: React.FC = () => {
  const { recipeId, recipeName } = useParams();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [selectedFood, setSelectedFood] = useState<Food>()
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showMakeModal, setShowMakeModal] = useState(false);

  useEffect(() => {
    fetchRecipe(recipeId);
  }, [recipeId]);

  const fetchRecipe = async (recipeId: string | undefined) => {
    try {
      const response = await axios.get<Recipe>(`api/user/recipes/detail/${recipeId}`);
      const jsonData = response.data
      setRecipe(jsonData)
      console.log(response.data)
    } catch (error) {
      console.log("Missing Catch jsondata." + recipeId);
      console.error(error);
    }
  }

  function openRegisterModal(recipe_id: number | undefined) {
    const value = recipe_id
    setShowRegisterModal(true);
    console.log(value)
  }
  function closeRegisterModal() {
    setShowRegisterModal(false);
  }

  function openFirstRegistModal(recipeId: any) {
    setShowRegisterModal(true);
  }

  function openUpdateModal(food: Food) {
    setSelectedFood(food)
    setShowUpdateModal(true);
  }
  function closeUpdateModal() {
    setShowUpdateModal(false);
  }

  function openDeleteModal(food: Food) {
    setSelectedFood(food)
    setShowDeleteModal(true);
  }
  function closeDeleteModal() {
    setShowDeleteModal(false);
  }

  function openMakeModal(recipe: Recipe) {
    setShowMakeModal(true);
    setRecipe(recipe)
  }
  function closeMakeModal() {
    setShowMakeModal(false);
  }


  if (!recipe) return <div>Loading...</div>

  return (
    <Layout>
    <div className='body'>
         <h1 className='logo'>Recipes</h1>
       {recipe === null ? (
         <>
         <p>まず最初に{recipeName}に使用する食材を追加してください</p><button className='button' onClick={() => openFirstRegistModal(parseFloat(recipeId!))}>食材の追加</button>
         <RegisterFoodinRecipeModal
           showRegisterModal={showRegisterModal}
           closeRegisterModal={closeRegisterModal}
           recipeId={recipeId}
          />
        </>
       ) : (
        <><h1>Recipe Details</h1><h2>{recipeName}</h2><p>{recipe?.description}</p><p>{recipe?.making_method}</p><button className='button' onClick={() => openRegisterModal(recipe?.id)}>新しい食材の追加</button>
        <RegisterFoodinRecipeModal
            showRegisterModal={showRegisterModal}
            closeRegisterModal={closeRegisterModal}
            recipeId={recipeId} 
            />
            <button className='button' onClick={ () => openMakeModal(recipe)}>この料理を作成する</button>
             <h1>　</h1>
             <h1 className='logo'>{'<使用食材一覧>'}</h1>
              <MakeDishModal showMakeModal={showMakeModal} closeMakeModal={closeMakeModal} recipe={recipe}/>
            <h3>Ingredients:</h3><ul>
              {recipe.foods && recipe.foods.map(food => (
                <li className="list-item" key={food.id}>
                  <p className='list-item-text'>{food.name} - {food.use_amount} {food.unit}</p>
                  <button className='button delete-button' onClick={() => openDeleteModal(food)}>削除</button>
                  {selectedFood && (
                    <DeleteFoodinRecipeModal
                      showDeleteModal={showDeleteModal}
                      closeDeleteModal={closeDeleteModal}
                      recipeId={recipe.id}
                      food={selectedFood} />)}
                  <button className='button update-button' onClick={() => openUpdateModal(food)}>使用量の変更</button>
                  {selectedFood && (
                    <UpdateFoodinRecipeModal
                      showUpdateModal={showUpdateModal}
                      closeUpdateModal={closeUpdateModal}
                      recipeId={recipe.id}
                      food={selectedFood} />)}
                </li>
              ))}
            </ul></>
       )}
    </div>
    </Layout>
  );
}

export default RecipeWithFood
