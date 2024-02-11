import React, { useState, useEffect }from 'react'
import { Food } from '../models/Food'
import { Recipe } from '../models/Recipe'
import axios from 'axios'

const FoodswithExpiration: React.FC = () => {

    const [foods, setFoods] = useState<Food[]>([]);

    useEffect(() => {
        const fetchFoods = async () => {
            try {
                const response = await axios.get('api/user/foods/expiration');
                const jsonData = response.data;
                console.log(jsonData)
                setFoods(jsonData);
            } catch (error) {
                console.log(error);
            }
        }
        fetchFoods();
    }, [])

    return (
        <div>
        <div className='container'>
            <h1 className="logo">Food Storage</h1>
            {foods && foods.length > 0 ? (
                <ul className="list">
                    {foods.map((food) => (
                        <li className="list-item" key={food.id}>
                            <p className="list-item-text">食材: {food.name} {food.quantity}{food.unit_obj.unit}</p>
                            <p className="list-item-text">賞味期限: {new Date(food.expiration_date).toDateString()}</p>
                            {food.recipes && food.recipes.map((recipe: Recipe) => (
                                <li key={recipe.id}>
                                    <p className="list-item-text">提案するレシピ: {recipe.name}, 使用量: {recipe.use_amount} {food.unit_obj.unit}</p>
                                </li>
                            ))}
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text">現在賞味期限の近い食材はありません</p>
            )}
        </div>
        </div>
    );

}

export default FoodswithExpiration

