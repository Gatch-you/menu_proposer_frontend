import React, { useState } from 'react'
import { Recipe, newRecipe } from '../../models/Recipe';
import Modal from 'react-modal'
import axios from 'axios';
import { customStyles } from '../../modalDesign';

type ModalProps = {
    showRegistModal: boolean;
    closeRegisterModal: () => void;
}

const RegisterRecipeModal: React.FC<ModalProps>  = ({
    showRegistModal,
    closeRegisterModal,
}) => {

    const [recipe, setRecipe] = useState<Recipe>(newRecipe);
    const [valueError, setValueError] = useState('')

    const isInputValid = recipe.name && recipe.description && recipe.making_method

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const recipeData = {
            name: recipe.name,
            description: recipe.description,
            making_method: recipe.making_method,
        }

        try {
            const response = await axios.post('/api/user/recipes', recipeData);
            console.log('Register recipe success:', response.data)
            closeRegisterModal();
        } catch (error) {
            console.log(error)
            closeRegisterModal();
        }
    window.location.reload();
    }

    const handleCancell = (e: React.MouseEvent<HTMLButtonElement>) => {
        setRecipe(newRecipe);
        closeRegisterModal();
    }

    const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\n/g, '\r\n');
        setRecipe(prevRecipe => ({
            ...prevRecipe,
            name: value
        }))
        if (!value) {
            setValueError('レシピ名を入力してください');
        } else {
            setValueError("");
        }
    }

    const handleDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setRecipe(prevRecipe => ({
            ...prevRecipe,
            description: value
        }))
    }

    const handleMakingMethod = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value.replace(/\n/g, '\r\n');
        setRecipe(prevRecipe => ({
            ...prevRecipe,
            making_method: value
        }))
    }

    return (
        <Modal
            contentLabel="Example Modal"
            isOpen={showRegistModal}
            style={customStyles}
            onRequestClose={closeRegisterModal}
        >
      <h2>レシピの登録</h2>
      <div>以下のフォームにレシピを追加してください</div>

      <form onSubmit={handleSubmit} >
        <h3>レシピ名</h3>
        <input type="name" onChange={handleName}/>
        {valueError && <p>{valueError}</p>}
        <h3>レシピの説明</h3>
        <input type="description" onChange={handleDescription} />
        <h3>つくりかた</h3>
        <textarea 
          onChange={handleMakingMethod}
          style={{ whiteSpace: 'pre-line' }}
        />
        <ul>
          <button type="button" onClick={handleCancell}>キャンセル</button>
          <button 
            type="submit" 
            disabled={!isInputValid}
          >
            登録
          </button>
        </ul>
      </form>
        </Modal>
    )
}

export default RegisterRecipeModal
