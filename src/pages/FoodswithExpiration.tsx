import React, { useState, useEffect }from 'react'
import { Food } from '../models/Food'
import { Recipe } from '../models/Recipe'
import ReactPaginate from 'react-paginate'
import axios from 'axios'
import Layout from '../components/Layout'
import { Link } from 'react-router-dom'
// import '../components/Design/RecipeWithFood.css'

const FoodswithExpiration: React.FC = () => {

    const [foods, setFoods] = useState<Food[]>([]);
    // 賞味期限の選択部
    const [expirationDate, setExpirationDate] = useState(5);
    const handleExpiration = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value)
        setExpirationDate(value)
    }   

    const [currentPage, setCurrentPage] = useState(0);
    const foodsPerPage:number = 10;
    const indexOfLastFood = (currentPage + 1) * foodsPerPage;
    const indexOfFirstFood = indexOfLastFood - foodsPerPage;
    const currentFoods = foods.slice(indexOfFirstFood, indexOfLastFood);
    const handlePageClick = (data: { selected: React.SetStateAction<number>; }) => {
      setCurrentPage(data.selected);
    };

    useEffect(() => {
        const fetchFoods = async () => {
            try {
                const response = await axios.get(`api/user/foods/expiration?expiration_date=${expirationDate}`,);
                const jsonData = response.data;
                setFoods(jsonData);
            } catch (error) {
                console.log(error);
            }
        }
        fetchFoods();
    }, [expirationDate])

    return (
        <Layout>
            <div>
        <div className='container'>
            <h1 className="logo">Food Storage</h1>
            <div className="input-container">
            <h5>期限が</h5>
            <input style={{width: '50px', height: '30px'}}　type="number" onChange={handleExpiration} defaultValue={expirationDate}/>
            <h5>日以内の食材</h5>
            </div>
            {foods && foods.length > 0 ? (
                <ul className="list">
                    {currentFoods.map((food) => (
                        <li className="list-item" key={food.id}>
                            <p className="list-item-text">食材: {food.name} {food.quantity}{food.unit_obj.unit}</p>
                            <p className="list-item-text">賞味期限: {new Date(food.expiration_date).toDateString()}</p>
                            {food.recipes && food.recipes.map((recipe: Recipe) => (
                                <li key={recipe.id}>
                                    <p className="list-item-text">
                                        提案するレシピ: {recipe.name}, 使用量: {recipe.use_amount} {food.unit_obj.unit}
                                        <Link className='link' to={`/recipes/${recipe.id}/${recipe.name}`}>レシピを見る</Link>
                                    </p>
                                </li>
                            ))}
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text">現在賞味期限の近い食材はありません</p>
            )}
        </div>
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
    );

}

export default FoodswithExpiration

