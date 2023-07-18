import { FoodwithExiration } from "../Models";
import React, { useState, useEffect } from 'react';

const FoodswithExpirationDate: React.FC = () => {

  const [foods, setFoods] = useState<FoodwithExiration[]>([]);

  useEffect(() => {
    fetchFoods();
  }, []);


  async function fetchFoods() {
    try {
      const response = await fetch( process.env.REACT_APP_API_ENDPOINT+'/backend/recipe_food/foods_expiration');
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
        <p>現在賞味期限の近い食材はありません</p>
      ) : (
        <ul style={{listStyle: 'none', padding: 0, margin: 0}}>
          {foods.map((food) => (
            <li key={food.id}>
              <p>食材: {food.food_name} {food.food_quantity}{food.food_unit}</p>
              <p>賞味期限: {food.expiration_date}</p>
              <p>提案するレシピ: {food.recipe_name}, 使用量{food.use_amount} {food.food_unit}</p>
              <p>　</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default FoodswithExpirationDate