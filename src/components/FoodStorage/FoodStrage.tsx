import React, { useState, useEffect } from 'react';
import { Food } from '../Models';
import ResistFoodModal from './ResistFoodModal';
import UpdateFoodModal from './UpdateFoodModal';
import DeleteFoodModal from './DeleteFoodModal';
import { Link } from 'react-router-dom';

const FoodStorage: React.FC = () => {
  const [foods, setFoods] = useState<Food[] | null>(null);
  const [showResistModal, setShowResistModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [FoodId, setFoodId] = useState<Food["id"] | null>(null);
  const [FoodName, setFoodName] = useState<Food["name"]>("");
  const [FoodQuantity, setFoodQuantity] = useState<Food["quantity"] | null>(null);
  const [FoodUnit, setFoodUnit] = useState<Food["unit"] | null>(null);
  const [FoodExpiratinData, setFoodExpirationDate] = useState<Food["expirationDate"] | null>(null);
  const [FoodType, setFoodType] = useState<Food["type"] | null>(null);
  
  function openResistModal() {
    setShowResistModal(true);
  }
  function closeResistModal() {
    setShowResistModal(false);
  }

  function openUpdateModal(foodId: number, foodName: string, fooodQuantity: number,foodUnit: string, FoodExpiratinData: Food["expirationDate"], foodType: string) {
      setFoodId(foodId);
      setFoodName(foodName);
      setFoodQuantity(fooodQuantity)
      setFoodUnit(foodUnit);
      setFoodType(foodType);
      setFoodExpirationDate(FoodExpiratinData)
      setShowUpdateModal(true);
  }
  function closeUpdateModal() {
    setShowUpdateModal(false);
  }

  function openDeleteModal(foodId: number, foodName: string) {
    setFoodId(foodId);
    setFoodName(foodName);
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
      const response = await fetch( process.env.REACT_APP_API_ENDPOINT+'/backend/foods');
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
      <>
        <button onClick={openResistModal}>新しい食材の追加</button><ResistFoodModal showResistModal={showResistModal} closeResistModal={closeResistModal} />
        <p>Loading or Nothing...</p>
      </>
      ) : (
        <ul style={{listStyle: 'none', padding: 0, margin: 0}}>
          <button onClick={openResistModal}>新しい食材の追加</button>
          <ResistFoodModal showResistModal={showResistModal} closeResistModal={closeResistModal} />
          <Link
            to={`/foods_with_expiration`}>
            <button>賞味期限が近い食材一覧</button>
          </Link>
          {foods.map((food) => (
            <li key={food.id}>
              {/* <p>{food.id}</p> */}
              <p>材料名: {food.name}</p>
              <p>量: {food.quantity} {food.unit}</p>
              <p>種類: {food.type}</p>
              <button onClick={() => openDeleteModal(food.id, food.name)}>削除</button>
              <DeleteFoodModal
                showDeleteModal={showDeleteModal} 
                closeDeleteModal={closeDeleteModal}
                FoodId={FoodId}
                FoodName={FoodName} />

              <button onClick={() => openUpdateModal(food.id, food.name, food.quantity, food.unit, food.expirationDate, food.type)}>食材情報の変更</button>
              <UpdateFoodModal 
                showUpdateModal={showUpdateModal} 
                closeUpdateModal={closeUpdateModal} 
                FoodId={FoodId} 
                FoodName={FoodName} 
                FoodQuantity={FoodQuantity}
                FoodUnit={FoodUnit}
                FoodExpiratinDate={FoodExpiratinData}
                FoodType={FoodType}
                />
              <p>　</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FoodStorage;
