import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Food } from '../models/Food';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import DeleteFoodModal from '../components/FoodModal/DeleteFoodModal';
import UpdateFoodModal from '../components/FoodModal/UpdateFoodModal';
import RegisterFoodModal from '../components/FoodModal/RegisterFoodModal';
import '../components/Design/FoodStorage.css';
import Layout from '../components/Layout';


const FoodList: React.FC = () => {
    const [foods, setFoods] = useState<Food[]>([]);
    const [selectedFood, setSelectedFood] = useState<Food>();
    const [showRegistModal, setShowRegistModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [filters, setFilters] = useState({
      s: ''
    });
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      setFilters({
        s: value,
      })
    } 

    //pagination settings
    const [currentPage, setCurrentPage] = useState(0);
    const foodsPerPage:number = 5;
    const indexOfLastFood = (currentPage + 1) * foodsPerPage;
    const indexOfFirstFood = indexOfLastFood - foodsPerPage;
    const currentFoods = foods.slice(indexOfFirstFood, indexOfLastFood);
    const handlePageClick = (data: { selected: React.SetStateAction<number>; }) => {
      setCurrentPage(data.selected);
    };


    useEffect(() => {
        const fetchFoods = async () => {
            const arr = [];

            if (filters.s) {
              arr.push(`s=${filters.s}`)
            }

            try {
                const response = await axios.get(`api/user/foods?${arr.join('&')}`);
                const jsonData = await response.data
                setFoods(jsonData);
                console.log(response.data)
            } catch (error) {
                console.error('データの取得中にエラーが発生しました:', error);
            }
        };

        fetchFoods();
    }, [filters]);

    function openRegistModal() {
      setShowRegistModal(true);
    }
    function closeRegisterModal() {
      setShowRegistModal(false);
    }

    function openUpdateModal(food: Food) {
        setSelectedFood(food);
        setShowUpdateModal(true);
    }
    function closeUpdateModal() {
        setShowUpdateModal(false);
    }

    function openDeleteModal(food: Food) {
        setSelectedFood(food);
        setShowDeleteModal(true);
    }
    function closeDeleteModal() {
        setShowDeleteModal(false);
    }


    return (
      <Layout>
        <div className="container">
          <h1 className='logo'>Food Storage</h1>
          <div className='button-group'>
            <button className='button' onClick={()=> {setShowRegistModal(true)}}>新しい食材の追加</button>
            <Link to={`/foods_with_expiration`}>
              <button className='button'>賞味期限が近い食材一覧</button>
            </Link>
          </div>
          {foods === null ? (
          <>
            <button onClick={openRegistModal}>新しい食材の追加</button>
            <RegisterFoodModal 
              showRegistModal={showRegistModal} 
              closeRegisterModal={closeRegisterModal} 
            />
            <p>Loading or Nothing...</p>
          </>
          ) : (
            <ul className='list'>
              <RegisterFoodModal 
                showRegistModal={showRegistModal} 
                closeRegisterModal={closeRegisterModal} 
              />
              <div className="form-signin w-100 m-auto">
              <input type="text" className="form-control" placeholder='Search'
                onChange={handleSearch} />
              </div>
              {currentFoods.map(food => (
                <li className="list-item"key={food.id}>
                  <p className='list-item-text'>材料名: {food.name}</p>
                  <p className='list-item-text'>量: {food.quantity} {food.unit_obj.unit}</p>
                  <p className='list-item-text'>種類: {food.type?.type ?? '種別不明'}</p>
                  <p className='list-item-text'>賞味期限: {new Date(food.expiration_date).toLocaleDateString()}</p>
                  <button className="button delete-button" onClick={() => openDeleteModal(food)}>削除</button>
                  {selectedFood && (
                    <DeleteFoodModal
                      showDeleteModal={showDeleteModal}
                      closeDeleteModal={closeDeleteModal}
                      food={selectedFood}
                    />)}
                  <button className="button update-button" onClick={() => openUpdateModal(food)}>食材情報の変更</button>
                  {selectedFood && (
                    <UpdateFoodModal 
                      showUpdateModal={showUpdateModal} 
                      closeUpdateModal={closeUpdateModal} 
                      food={selectedFood}
                      />
                    )}
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
    );
};

export default FoodList;
