import React, { useEffect, useState } from 'react'
import { Recipe } from '../models/Recipe'
import ReactPaginate from 'react-paginate';
import axios from 'axios';

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
            try{
                const response = await axios.get('api/user/recipes');
                console.log(response.data)
                const jsonData = await response.data;
                setResipes(jsonData);
                console.log(response.data)
            } catch (error) {
                console.log(error)
            }
        };

        fetchRecipes();
    }, []);



    return (
        <Layout>

    <div>
        <button onClick={openRegistModal}>レシピの登録</button>
        <RegisterRecipeModal
            showRegistModal={showRegistModal}
            closeRegisterModal={closeRegisterModal}
            />
        {currentRecipes.map(recipe => (
            <li className='list-item' key={recipe.id}>
                <p>{recipe.id}</p>
                <p>{recipe.name}</p>
                <p>{recipe.description}</p>
                <p>{recipe.making_method}</p>

                <Link
                    to={`/recipes/${recipe.id}/${recipe.name}`}
                    state={{id: recipe.id, name:recipe.name}}
                    >
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