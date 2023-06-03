import React, {useState, useEffect} from 'react'
import { Food } from './Models'

function FoodStrage() {

  const [foods, setFoods] = useState<Food[] | null>(null);

  useEffect(() => {
    fetchFoods();
  }, []);

  async function fetchFoods() {
    try {
      const response = await fetch('http://localhost:8080/backend/foods');
      const jsonData = await response.json();

      // const formattedData = jsonData.map((food: Food) => ({
      //   ...food,
      //   expiration_date: new Date(food.expiration_date),
      // }));

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
        {foods.map((food) => (
          <li key={food.id}>
            <p>Name: {food.name}</p>
            <p>Quantity: {food.quantity} {food.unit}</p>
            {/* <p>Expiration Date: {food.expiration_date.toLocaleDateString()}</p> */}
            <p>Type: {food.type}</p>
          </li>
        ))}
      </ul>
    )}
    </div>
  );
}

export default FoodStrage;
// const FoodStrage = () => {
//   return (
//     <div>FoodStrage</div>
//   )
// }

