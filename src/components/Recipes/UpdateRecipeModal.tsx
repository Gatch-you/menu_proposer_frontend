import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import { Recipe } from '../../models/Recipe'
import { customStyles } from '../Design/modalDesign';
import axios from 'axios';

type ModalProps = {
  showUpdateModal: boolean;
  closeUpdateModal: () => void;
  recipe: Recipe;
}

const UpdateRecipeModal: React.FC<ModalProps> = ({
    showUpdateModal,
    closeUpdateModal,
    recipe
    }) => {

    const [objRecipe, setObjRecipe] = useState<Recipe>({
      id: recipe.id,
      name: recipe.name,
      description: recipe.description,
      making_method: recipe.making_method,
      use_amount: recipe.use_amount,
      foods: recipe.foods,
    })
    const [valueError, setValueError] = useState('')

    const isInputValid = recipe.name && recipe.description && recipe.making_method

    useEffect(() => {
      setObjRecipe({
        id: recipe.id,
        name: recipe.name,
        description: recipe.description,
        making_method: recipe.making_method,
        use_amount: recipe.use_amount,
        foods: recipe.foods,
      })
    }, [recipe])

    const handleSubmit = async (data: React.FormEvent<HTMLFormElement>) => {

      const recipeData ={
        id: recipe.id,
        name: objRecipe.name,
        description: objRecipe.description,
        making_method: objRecipe.making_method,
      };

      try {
        const response = await axios.put('api/user/recipes', recipeData);
        console.log('update recipe success:', response.data);
        closeUpdateModal();
      } catch (error) {
        console.log('update recipe failed:', error);
        closeUpdateModal();
      }
      window.location.reload();
    };

  const handleCancell = (e: any) => {
    closeUpdateModal();
  }

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setObjRecipe(prevRecipe => ({
      ...prevRecipe,
      name: value,
    }));
    if (!value) {
      setValueError('レシピ名を入力してください');
    } else {
      setValueError("");
  }
  }

  const handleDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setObjRecipe(prevRecipe => ({
        ...prevRecipe,
        description: value
    }))
  }

  const handleMethod = (e: React.ChangeEvent<HTMLTextAreaElement> ) => {
    const value = e.target.value.replace(/\n/g, '\r\n');
    setObjRecipe(prevRecipe => ({
        ...prevRecipe,
        making_method: value
    }))
  }

  return (
    <Modal
      contentLabel="Example Modal"
      isOpen={showUpdateModal}
      style={customStyles}
      onRequestClose={closeUpdateModal}
    >
      <h2>登録内容変更</h2>
      <div>レシピの変更部分を入力してください</div>

      <form onSubmit={handleSubmit}>
        <h3>レシピ名: {objRecipe.name}</h3>
        <input 
          type="name" 
          onChange={handleName} 
          value={objRecipe.name} 
          placeholder={"直前の入力:"+recipe.name}
        />
        {valueError && <p>{valueError}</p>}

        <h3>レシピの説明</h3>
        <input 
          type="description" 
          onChange={handleDescription} 
          value={objRecipe.description}
        />

        <h3>つくりかた</h3>
        <textarea 
          onChange={handleMethod} 
          value={objRecipe.making_method}
          style={{ whiteSpace: 'pre-line' }}
        />

        <ul>
          <button type="button" onClick={handleCancell}>キャンセル</button>

          <button 
            type="submit"
            disabled={!isInputValid}  
          >更新</button>
        </ul>
      </form>
    </Modal>
  );
}

export default UpdateRecipeModal