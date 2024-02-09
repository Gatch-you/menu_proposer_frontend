import React, { useEffect, useState } from 'react'
import { Recipe } from '../models/Recipe'
import axios from 'axios';

import RegisterRecipeModal from '../components/Recipes/RegisterRecipeModal';
import UpdateRecipeModal from '../components/Recipes/UpdateRecipeModal';
import DeleteRecipeModal from '../components/Recipes/DeleteRecipeModal';


const Recipes: React.FC = () => {
    const [recipes, setResipes] = useState<Recipe[]>([]);
    const [selectedRecipe, setSelectedRecipe] = useState<Recipe>();
    const [showRegistModal, setShowRegistModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    function openRegistModal() {
        setShowRegistModal(true);
    }
    function closeRegisterModal() {
        setShowRegistModal(false);
    }

    function openUpdateModal(recipe: Recipe) {
        setShowUpdateModal(true);
        setSelectedRecipe(recipe)
    }
    function closeUpdateModal() {
        setShowUpdateModal(false);
    }

    function openDeleteModal(recipe: Recipe) {
        setShowDeleteModal(true);
        setSelectedRecipe(recipe)
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

    <div>
        <button onClick={openRegistModal}>レシピの登録</button>
        <RegisterRecipeModal
            showRegistModal={showRegistModal}
            closeRegisterModal={closeRegisterModal}
            />
        {recipes.map(recipe => (
            <li className='list-item' key={recipe.id}>
                <p>{recipe.id}</p>
                <p>{recipe.name}</p>
                <p>{recipe.description}</p>
                <p>{recipe.making_method}</p>
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
    </div>
    )
}

export default Recipes

// import React, { useState, useEffect } from 'react'
// import { Recipe } from '../../models/Models'
// import RegistRecipeModal from './RegistRecipeModal'
// import DeleteRecipeModal from './DeleteRecipeModal'
// import UpdateRecipeModal from './UpdateRecipeModal'
// import { Link } from "react-router-dom";
// // import RecipeWithFood from './RecipeWithFood'
// import '../Design/Recipe.css';

// const RecipeIndex: React.FC = () => {
//   const [recipes, setRecipe] = useState<Recipe[] | null>(null);
//   const [RecipeId, setRecipeId] = useState<Recipe["id"] | null>(null);
//   const [RecipeName, setRecipeName] = useState<string | null>(null);
//   const [RecipeDecription, setRecipeDescription] = useState<Recipe["description"] | null>(null);
//   const [RecipeImage, setRecipeImage] = useState<Recipe['image'] | null>(null);
//   const [RecipeMethod, setRecipeMethod] = useState<Recipe['making_method'] | null>(null);
//   const [showRegistModal, setShowRegistModal] = useState(false);
//   const [showUpdateModal, setShowUpdateModal] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
  
//   useEffect(() => {
//     fetchRecipes();
//   }, []);

//   async function fetchRecipes() {
//     try {
//       const response = await fetch(process.env.REACT_APP_API_ENDPOINT+'/backend/recipes');
//       const jsonData = await response.json();

//       setRecipe(jsonData);
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   function openRegistModal() {
//     setShowRegistModal(true);
//   }
//   function closeRegisterModal() {
//     setShowRegistModal(false);
//   }

//   function openUpdateModal(recipeId: number, recipeName: string, recipeDescription: string, recipeImage: string, recipeMethod: string) {
//     setRecipeId(recipeId);
//     setRecipeName(recipeName);
//     setRecipeDescription(recipeDescription)
//     setRecipeImage(recipeImage)
//     setRecipeMethod(recipeMethod)
//     setShowUpdateModal(true);
//   }
//   function closeUpdateModal() {
//     setShowUpdateModal(false);
//   }

//   function openDeleteModal(recipeId: number, recipeName: string) {
//     setRecipeId(recipeId);
//     setRecipeName(recipeName);
//     setShowDeleteModal(true);
//   }
//   function closeDeleteModal() {
//     setShowDeleteModal(false);
//   }

//   useEffect(() => {
//     console.log(recipes);
//   }, [recipes]);

//   return (
//     <div className="container">
//       <h1 className="logo">Recipes</h1>
//       {recipes == null ? (
//         <>        
//           <button className="button" onClick={openRegistModal}>新しいレシピの登録</button><RegistRecipeModal showRegistModal={showRegistModal} closeRegisterModal={closeRegisterModal} />
//           <p>Loading or Nothing</p>
//         </>
//       ) : (
//         <ul className="list">
//           <button className='button' onClick={openRegistModal}>新しいレシピの登録</button>
//           <RegistRecipeModal showRegistModal={showRegistModal} closeRegisterModal={closeRegisterModal} />
//           {recipes.map((recipe) => (
//             <li className="list-item" key={recipe.id}>
//                 <p　className='list-item-text'>レシピ名: {recipe.name}</p>
//                 <p className='list-item-text'>概要: {recipe.description}</p>
//                 {/* <p>Imageurl: {recipe.image}</p> */}
//                 {/* <p className='list-item-text'>つくりかた: {recipe.making_method}</p> */}
//                 <Link 
//                   to={`/recipes/${recipe.id}/${recipe.name}`}>
//                   <button className="button detail-button">レシピの詳細</button>
//                 </Link>
//                 <button className="button delete-button" onClick={() => openDeleteModal(recipe.id, recipe.name)}>削除</button>
//                 <DeleteRecipeModal
//                   showDeleteModal={showDeleteModal}
//                   closeDeleteModal={closeDeleteModal}
//                   RecipeId={RecipeId}
//                   RecipeName={RecipeName}
//                   />
//                 <button className="button update-button" onClick={() => openUpdateModal(recipe.id, recipe.name, recipe.description, recipe.image, recipe.making_method)}>レシピの変更</button>
//                 <UpdateRecipeModal
//                   showUpdateModal={showUpdateModal}
//                   closeUpdateModal={closeUpdateModal}
//                   RecipeId={RecipeId}
//                   RecipeName={RecipeName}
//                   RecipeDescription={RecipeDecription}
//                   RecipeImage={RecipeImage}
//                   RecipeMethod={RecipeMethod}
//                   />
//                 <p>　</p>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

// export default RecipeIndex