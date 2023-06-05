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

  function openResistModal() {
    setShowResistModal(true);
  }
  function closeResistModal() {
    setShowResistModal(false);
  }

  function openUpdateModal() {
    setShowUpdateModal(true);
  }
  function closeUpdatetModal() {
    setShowUpdateModal(false);
  }

  function openDeleteModal() {
    setShowDeleteModal(true);
  }
  function closeDeleteModal() {
    setShowDeleteModal(false);
  }

  useEffect(() => {
    fetchFoods();
  }, []);

  //食品一覧取得部位
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
          <button onClick={openResistModal}>Resist New Food</button>
          <ResistFoodModal showResistModal={showResistModal} onCloseResistModal={closeResistModal}/>
          {/* 食材のリスト表示 */}
          {foods.map((food) => (
            <li key={food.id}>
              <p>Name: {food.name}</p>
              <p>Quantity: {food.quantity} {food.unit}</p>
              <p>Type: {food.type}</p>
              <button onClick={openDeleteModal}>削除</button>
              <DeleteFoodModal showDeleteModal={showDeleteModal} onCloseDeleteModal={closeDeleteModal}/>

              <button onClick={openUpdateModal}>変更</button>
              <UpdateFoodModal showUpdateModal={showUpdateModal} onCloseUpdateModal={closeUpdatetModal}/>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FoodStorage;
