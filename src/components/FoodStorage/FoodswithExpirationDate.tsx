import { FoodwithExiration } from "../../models/Models";
import React, { useState, useEffect } from 'react';
import "../Design/FoodwithExpirationDate.css"

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
    <div className="container">
      <h1 className="logo">Food Storage</h1>
      {foods === null ? (
        <p className="text">現在賞味期限の近い食材はありません</p>
      ) : (
        <ul className="list">
          {foods.map((food) => (
            <li className="list-item" key={food.id}>
              <p className="list-item-text">食材: {food.food_name} {food.food_quantity}{food.food_unit}</p>
              <p className="list-item-text">賞味期限: {food.formatted_date}</p>
              <p className="list-item-text">提案するレシピ: {food.recipe_name}, 使用量{food.use_amount} {food.food_unit}</p>
              <p>　</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default FoodswithExpirationDate