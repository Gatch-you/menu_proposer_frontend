import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { RecipeFood } from './Models';
import DeleteFoodinRecipeModal from './DeleteFoodinRecipeModal';
import UpdateFoodinRecipeModal from './UpdateFoodinRecipeModal';
import ResistFoodinRecipeModal from './ResistFoodinRecipeModal';
import MakeDishModal from './MakeDishModal';

//送るリクエスト↓
// curl -X GET http://localhost:8080/backend/recipes/${recipeId}

const RecipeWithFood: React.FC = () => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState<RecipeFood[]>([]);
  const [RecipeId, setRecipeId] = useState<RecipeFood["recipe_id"] | null>(null);
  const [FoodId, setFoodId] = useState<RecipeFood["food_id"] | null>(null);
  const [FoodName, setFoodName] = useState<RecipeFood["food_name"] | null>(null)
  const [UseAmount, setUseAmount] = useState<RecipeFood["use_amount"] | null>(null);
  const [Unit, setUnit] = useState<RecipeFood["food_unit"] | null>(null)
  const [showResistModal, setShowResistModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showMakeModal, setShowMakeModal] = useState(false);

  useEffect(() => {
    fetchRecipe(recipeId);
  }, [recipeId]);

  async function fetchRecipe(recipeId: string | undefined) {
    try {
      const response = await fetch("http://localhost:8080/backend/recipes/" + recipeId);
      if (response.ok) {
        const jsonData = await response.json() 
        setRecipe(jsonData);
      } else {
        throw new Error('Request failed');
      }
    } catch (error) {
      console.log("Missing Catch jsondata." + recipeId);
      console.error(error);
    }
  }

  useEffect(() => {
    console.log(recipe);
  }, [recipe]);
  
  console.log(recipe);

  function openResistModal(recipe_id: number) {
    setShowResistModal(true);
    setRecipeId(recipe_id);
  }
  function closeResistModal() {
    setShowResistModal(false);
  }

  function openUpdateModal(foodId: number, foodName: string, useAmount: number, unit: string) {
    setRecipeId(RecipeId);
    setFoodId(foodId);
    setFoodName(foodName);
    setUseAmount(useAmount);
    setUnit(unit)
    setShowUpdateModal(true);
  }
  function closeUpdateModal() {
    setShowUpdateModal(false);
  }

  function openDeleteModal(recipe_id: number, food_id: number, food_name: string) {
    setRecipeId(recipe_id);
    setFoodId(food_id);
    setFoodName(food_name);
    setShowDeleteModal(true);
  }
  function closeDeleteModal() {
    setShowDeleteModal(false);
  }

  function openMakeModal(recipe_id: number) {
    setShowMakeModal(true);
    setRecipeId(recipe_id);
  }
  function closeMakeModal() {
    setShowMakeModal(false);
  }

  return (
    <div>
      <h1>Food Storage</h1>
      {recipe === null ? (
        <p>Loading...</p>
      ) : (
        <div>
          {recipe && recipe.length > 0 && (
          <>
            <p>Name: {recipe[0].recipe_name}</p>
            <p>Description: {recipe[0].recipe_description}</p>
            <p>Method: {recipe[0].recipe_making_method}</p>
          </>
          )}
          <ul>
          <button onClick={() => openResistModal(recipe[0].recipe_id)}>新しい食材の追加</button>
          <ResistFoodinRecipeModal 
            showResistModal={showResistModal} 
            closeResistModal={closeResistModal} 
            RecipeId={RecipeId}
            />
          <button onClick={ () => openMakeModal(recipe[0].recipe_id)}>この料理を作成する</button>
          <MakeDishModal showMakeModal={showMakeModal} closeMakeModal={closeMakeModal} RecipeId={RecipeId}/>
            {recipe &&
              recipe.map((item) => (
               <li key={item.food_id}>
                <p>UseingFoods:{item.food_name} {item.use_amount} {item.food_unit}</p>
                <button onClick={() => openDeleteModal(item.recipe_id, item.food_id, item.food_name)}>削除</button>
                <DeleteFoodinRecipeModal
                  showDeleteModal={showDeleteModal}
                  closeDeleteModal={closeDeleteModal}
                  RecipeId={RecipeId}
                  FoodId={FoodId}
                  FoodName={FoodName}
                />
                <button onClick={() => openUpdateModal(item.food_id, item.food_name, item.use_amount, item.food_unit)}>使用量の変更</button>
                <UpdateFoodinRecipeModal 
                  showUpdateModal={showUpdateModal} 
                  closeUpdateModal={closeUpdateModal} 
                  RecipeId = {recipe[0].recipe_id}
                  FoodId={FoodId} 
                  FoodName={FoodName} 
                  UseAmount={UseAmount}
                  Unit={Unit}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default RecipeWithFood
