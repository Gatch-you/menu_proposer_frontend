import { FoodwithExiration } from "../../models/Models";
import React, { useState, useEffect } from 'react';
import ReactPaginate from "react-paginate";
import Layout from "../Layout";
import "../Design/FoodwithExpirationDate.css"

const FoodswithExpirationDate: React.FC = () => {

  const [foods, setFoods] = useState<FoodwithExiration[]>([]);

  const [currentPage, setCurrentPage] = useState(0);
  const foodsPerPage:number = 5;
  const indexOfLastFood = (currentPage + 1) * foodsPerPage;
  const indexOfFirstFood = indexOfLastFood - foodsPerPage;
  const currentFoods = foods.slice(indexOfFirstFood, indexOfLastFood);
  const handlePageClick = (data: { selected: React.SetStateAction<number>; }) => {
    setCurrentPage(data.selected);
  };

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
    <Layout>
    <div className="container">
      <h1 className="logo">Food Storage</h1>
      {foods === null ? (
        <p className="text">現在賞味期限の近い食材はありません</p>
      ) : (
        <ul className="list">
          {currentFoods.map((food) => (
            <li className="list-item" key={food.id}>
              <p className="list-item-text">食材: {food.food_name} {food.food_quantity}{food.food_unit}</p>
              <p className="list-item-text">賞味期限: {food.formatted_date}</p>
              <p className="list-item-text">提案するレシピ: {food.recipe_name}, 使用量{food.use_amount} {food.food_unit}</p>
              <p>　</p>
            </li>
          ))}
        </ul>
      )}
            <ReactPaginate
                previousLabel={'前'}
                nextLabel={'次'}
                breakLabel={'...'}
                pageCount={Math.ceil(foods.length / foodsPerPage)}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={'pagination'}
                // subContainerClassName={'pages pagination'}
                activeClassName={'active'}
            />
    </div>
    </Layout>
  )
}

export default FoodswithExpirationDate