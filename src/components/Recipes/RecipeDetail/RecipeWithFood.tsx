import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { RecipeFood } from '../../Models';
import DeleteFoodinRecipeModal from './DeleteFoodinRecipeModal';
import UpdateFoodinRecipeModal from './UpdateFoodinRecipeModal';
import ResistFoodinRecipeModal from './ResistFoodinRecipeModal';
import MakeDishModal from './MakeDishModal';
import '../../Design/RecipeWithFood.css';


//送るリクエスト↓
// curl -X GET http://localhost:8080/backend/recipes/${recipeId}/${recipeName}

const RecipeWithFood: React.FC = () => {
  const { recipeId, recipeName } = useParams();
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
      const response = await fetch(process.env.REACT_APP_API_ENDPOINT+"/backend/recipes/" + recipeId + "/" +recipeName);
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
  const renderContextWithLineBreaks = (text: string | undefined) => {
    if (text === undefined){
      return
    }
    const lines = text.split('\n')
    return lines.map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ))
  };

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

  function openFirstResistModal(recipeId: any) {
    setShowResistModal(true);
    setRecipeId(+recipeId)
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
    <div className="body">
      <h1 className='logo'>Recipes</h1>
      {recipe === null ? (
        <><p>まず最初に{recipeName}に使用する食材を追加してください</p><button className='button' onClick={() => openFirstResistModal(parseFloat(recipeId!))}>食材の追加</button>
        <ResistFoodinRecipeModal
          showResistModal={showResistModal}
          closeResistModal={closeResistModal}
          RecipeId={RecipeId} /></>
      ) : (
        <div>
          {recipe && recipe.length > 0 && (
          <>
            <p className='list-item-text'>レシピ名: {recipe[0].recipe_name}</p>
            <p className='making_method_text'>概要: {recipe[0].recipe_description}</p>
            <p className='making_method_text'>つくりかた<br /> {renderContextWithLineBreaks(recipe[0].recipe_making_method)}</p>
          </>
          )}
          <ul style={{listStyle: 'none', padding: 0, margin: 0}} >
          <button className='button' onClick={() => openResistModal(recipe[0].recipe_id)}>新しい食材の追加</button>
          <ResistFoodinRecipeModal 
            showResistModal={showResistModal} 
            closeResistModal={closeResistModal}
            RecipeId={RecipeId}
            />
          <button className='button' onClick={ () => openMakeModal(recipe[0].recipe_id)}>この料理を作成する</button>
          <h1>　</h1>
          <h1 className='logo'>{'<使用食材一覧>'}</h1>
          <MakeDishModal showMakeModal={showMakeModal} closeMakeModal={closeMakeModal} RecipeId={RecipeId}/>
            {recipe &&
              recipe.map((item) => (
               <li className='list-item' key={item.food_id} style={{ marginBottom: '10px' }}>
                <p className='list-item-text'>{item.food_name} {item.use_amount} {item.food_unit}</p>
                <button className='button delete-button' onClick={() => openDeleteModal(item.recipe_id, item.food_id, item.food_name)}>削除</button>
                <DeleteFoodinRecipeModal
                  showDeleteModal={showDeleteModal}
                  closeDeleteModal={closeDeleteModal}
                  RecipeId={RecipeId}
                  FoodId={FoodId}
                  FoodName={FoodName}
                />
                <button className='button update-button' onClick={() => openUpdateModal(item.food_id, item.food_name, item.use_amount, item.food_unit)}>使用量の変更</button>
                <UpdateFoodinRecipeModal 
                  showUpdateModal={showUpdateModal} 
                  closeUpdateModal={closeUpdateModal} 
                  RecipeId = {recipe[0].recipe_id}
                  FoodId={FoodId} 
                  FoodName={FoodName} 
                  UseAmount={UseAmount}
                  Unit={Unit}
                />
                <p>　</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default RecipeWithFood
