import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Food } from '../models/Food';
import axios from 'axios';

import DeleteFoodModal from '../components/FoodStorage/DeleteFoodModal';
import UpdateFoodModal from '../components/FoodStorage/UpdateFoodModal';
import ResistFoodModal from '../components/FoodStorage/ResistFoodModal';
import '../components/Design/FoodStorage.css';


const FoodList: React.FC = () => {
    const [foods, setFoods] = useState<Food[]>([]);
    const [selectedFood, setSelectedFood] = useState<Food>();
    const [showResistModal, setShowResistModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(() => {
        const fetchFoods = async () => {
            try {
                // 認証トークンを含める必要がある場合、ここでヘッダーに追加します。
                const response = await axios.get('api/user/foods');
                const jsonData = await response.data
                setFoods(jsonData);
                console.log(response.data)
            } catch (error) {
                console.error('データの取得中にエラーが発生しました:', error);
            }
        };

        fetchFoods();
    }, []);

    function openResistModal() {
      setShowResistModal(true);
    }
    function closeResistModal() {
      setShowResistModal(false);
    }

    function openUpdateModal(food: Food) {
        setShowUpdateModal(true);
        setSelectedFood(food);
    }
    function closeUpdateModal() {
        setShowUpdateModal(false);
    }

    function openDeleteModal(food: Food) {
        setShowDeleteModal(true);
        setSelectedFood(food);
    }
    function closeDeleteModal() {
        setShowDeleteModal(false);
    }


    return (
        <div className="container">
          <h1 className='logo'>Food Storage</h1>
          <div className='button-group'>
            <button className='button' onClick={()=> {setShowResistModal(true)}}>新しい食材の追加</button>
            <Link to={`/foods_with_expiration`}>
              <button className='button'>賞味期限が近い食材一覧</button>
            </Link>
          </div>
          {foods === null ? (
          <>
            <button onClick={openResistModal}>新しい食材の追加</button><ResistFoodModal showResistModal={showResistModal} closeResistModal={closeResistModal} />
            <p>Loading or Nothing...</p>
          </>
          ) : (
            <ul className='list'>
              <ResistFoodModal showResistModal={showResistModal} closeResistModal={closeResistModal} />
    
              {foods.map(food => (
                <li className="list-item"key={food.id}>
                  <p>{food.id}</p>
                  <p className='list-item-text'>材料名: {food.name}</p>
                  <p className='list-item-text'>量: {food.quantity} {food.unit.unit}</p>
                  <p className='list-item-text'>種類: {food.type?.type ?? '種別不明'}</p>
                  <p className='list-item-text'>賞味期限: {new Date(food.expiration_date).toLocaleDateString()}</p>
                  <button className="button delete-button" onClick={() => openDeleteModal(food)}>削除</button>
                  {selectedFood && (
                    <DeleteFoodModal
                      showDeleteModal={showDeleteModal}
                      closeDeleteModal={closeDeleteModal}
                      food={selectedFood}
                    />
                  )}
    
                  <button className="button update-button" onClick={() => openUpdateModal(food)}>食材情報の変更</button>
                  {selectedFood && (
                    <UpdateFoodModal 
                      showUpdateModal={showUpdateModal} 
                      closeUpdateModal={closeUpdateModal} 
                      food={selectedFood}
                      />
                    )}
                  <p>　</p>
                </li>
              ))}
            </ul>
          )}
        </div>
    );
};

export default FoodList;
