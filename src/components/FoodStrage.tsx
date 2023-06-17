import React, { useState, useEffect } from 'react';
import { Food } from './Models';
import ResistFoodModal from './ResistFoodModal';
import UpdateFoodModal from './UpdateFoodModal';
import DeleteFoodModal from './DeleteFoodModal';

const FoodStorage: React.FC = () => {
  const [foods, setFoods] = useState<Food[] | null>(null);
  const [showResistModal, setShowResistModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [FoodId, setFoodId] = useState<Food["id"] | null>(null);
  const [FoodName, setFoodName] = useState<Food["name"] | null>(null);
  const [FoodQuantity, setFoodQuantity] = useState<Food["quantity"] | null>(null);
  const [FoodUnit, setFoodUnit] = useState<Food["unit"] | null>(null);
  const [FoodType, setFoodType] = useState<Food["type"] | null>(null);
  
  function openResistModal() {
    setShowResistModal(true);
  }
  function closeResistModal() {
    setShowResistModal(false);
  }

  function openUpdateModal(foodId: number, foodName: string, fooodQuantity: number,foodUnit: string, foodType: string) {
      setFoodId(foodId);
      setFoodName(foodName);
      setFoodQuantity(fooodQuantity)
      setFoodUnit(foodUnit);
      setFoodType(foodType);
      setShowUpdateModal(true);
  }
  function closeUpdateModal() {
    setShowUpdateModal(false);
  }

  function openDeleteModal(foodId: number) {
    setFoodId(foodId);
    setShowDeleteModal(true);
  }
  function closeDeleteModal() {
    setShowDeleteModal(false);
  }

  useEffect(() => {
    fetchFoods();
  }, []);

  async function fetchFoods() {
    try {
      const response = await fetch('http://localhost:8080/backend/foods');
      const jsonData = await response.json();
      setFoods(jsonData);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    console.log(foods);
  }, [foods]);

  return (
    <div>
      <h1>Food Storage</h1>
      {foods === null ? (
        <p>Loading...</p>
      ) : (
        <ul>
          <button onClick={openResistModal}>新しい食材の追加</button>
          <ResistFoodModal showResistModal={showResistModal} closeResistModal={closeResistModal} />
          {foods.map((food) => (
            <li key={food.id}>
              <p>{food.id}</p>
              <p>Name: {food.name}</p>
              <p>Quantity: {food.quantity} {food.unit}</p>
              <p>Type: {food.type}</p>
              <button onClick={() => openDeleteModal(food.id)}>削除</button>
              <DeleteFoodModal
                showDeleteModal={showDeleteModal} 
                closeDeleteModal={closeDeleteModal}
                FoodId={FoodId}
                FoodName={FoodName} />

              <button onClick={() => openUpdateModal(food.id, food.name, food.quantity, food.unit, food.type)}>変更 {food.id}</button>
              <UpdateFoodModal 
                showUpdateModal={showUpdateModal} 
                closeUpdateModal={closeUpdateModal} 
                FoodId={FoodId} 
                FoodName={FoodName} 
                FoodQuantity={FoodQuantity}
                FoodUnit={FoodUnit}
                FoodType={FoodType}
                />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FoodStorage;
