import React, { useEffect, useState } from 'react'
import { Recipe } from '../models/Recipe'
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import '../components/Design/FoodStorage.css';
import RegisterRecipeModal from '../components/Recipes/RegisterRecipeModal';
import UpdateRecipeModal from '../components/Recipes/UpdateRecipeModal';
import DeleteRecipeModal from '../components/Recipes/DeleteRecipeModal';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';


const Recipes: React.FC = () => {
    const [recipes, setResipes] = useState<Recipe[]>([]);
    const [selectedRecipe, setSelectedRecipe] = useState<Recipe>();
    const [showRegistModal, setShowRegistModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [filters, setFilters] = useState('');
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setFilters(value)
    }

    const [currentPage, setCurrentPage] = useState(0);
    const foodsPerPage:number = 10;
    const indexOfLastFood = (currentPage + 1) * foodsPerPage;
    const indexOfFirstFood = indexOfLastFood - foodsPerPage;
    const currentRecipes = recipes.slice(indexOfFirstFood, indexOfLastFood);
    const handlePageClick = (data: { selected: React.SetStateAction<number>; }) => {
        setCurrentPage(data.selected);
      };

    function openRegistModal() {
        setShowRegistModal(true);
    }
    function closeRegisterModal() {
        setShowRegistModal(false);
    }

    function openUpdateModal(recipe: Recipe) {
        setSelectedRecipe(recipe)
        setShowUpdateModal(true);
    }
    function closeUpdateModal() {
        setShowUpdateModal(false);
    }

    function openDeleteModal(recipe: Recipe) {
        setSelectedRecipe(recipe)
        setShowDeleteModal(true);
    }
    function closeDeleteModal() {
        setShowDeleteModal(false);
    }

    useEffect(() => {
        const fetchRecipes = async () => {
            const arr = [];
            
            if (filters) {
                arr.push(`s=${filters}`)
            }

            try{
                const response = await axios.get(`api/user/recipes?${arr.join('&')}`);
                const jsonData = await response.data;
                setResipes(jsonData);
            } catch (error) {
                console.log(error)
            }
        };

        fetchRecipes();
    }, [filters]);



    return (
        <Layout>

    <div className="container">
        <h1 className='logo'>Recipes</h1>
            <div className='button-group'>
                <button className='button' onClick={openRegistModal}>レシピの登録</button>
            </div>
        <RegisterRecipeModal
            showRegistModal={showRegistModal}
            closeRegisterModal={closeRegisterModal}
        />
        <div className="form-signin w-100 m-auto">
            <input type="text" className='form-contlol' placeholder='Search'
            onChange={handleSearch} />
        </div>
        <ul className='list'>
        {currentRecipes.map(recipe => (
            <li className='list-item' key={recipe.id}>
                <p className='list-item-text'>{recipe.name}</p>
                <p className='list-item-text'>{recipe.description}</p>
                <p className='list-item-text'>{recipe.making_method}</p>

                <Link
                    to={`/recipes/${recipe.id}/${recipe.name}`}
                    state={{id: recipe.id, name:recipe.name}}>
                    <button className="button detail-button">レシピの詳細</button>
                </Link>

                <button className="button update-button" onClick={() => openUpdateModal(recipe)}>食材情報の変更</button>
                {selectedRecipe && (
                <UpdateRecipeModal
                    showUpdateModal={showUpdateModal}
                    closeUpdateModal={closeUpdateModal}
                    recipe={selectedRecipe}
                />
                )}
                <button className="button delete-button" onClick={() => openDeleteModal(recipe)}>削除</button>
                {selectedRecipe && (
                    <DeleteRecipeModal
                        showDeleteModal={showDeleteModal}
                        closeDeleteModal={closeDeleteModal}
                        recipe={selectedRecipe}
                    />
                )}
                </li>
        ))
        }
        </ul>
            <ReactPaginate
                previousLabel={'前'}
                nextLabel={'次'}
                breakLabel={'...'}
                pageCount={Math.ceil(recipes.length / foodsPerPage)}
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

export default Recipes