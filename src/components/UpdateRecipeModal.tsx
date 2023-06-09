import React, { useState } from 'react'
import Modal from 'react-modal'
import {Recipe} from './Models'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

type ModalProps = {
    showUpdateModal: boolean,
    closeUpdateModal: () => void,
    RecipeId: number | null,
    RecipeName: string | null,
    RecipeDescription: string | null,
    RecipeImage: string | null,
    RecipeMethod: string | null,
}

const UpdateRecipeModal: React.FC<ModalProps> = ({
    showUpdateModal,
    closeUpdateModal,
    RecipeId,
    RecipeName,
    RecipeDescription,
    RecipeImage,
    RecipeMethod,
  }) => {

  const [name, setName] = useState<Recipe["name"] | null>(null);
  const [description, setDescription] = useState<Recipe["description"] | null>(null);
  const [image, setImage] = useState<Recipe["image"] | null>(null);
  const [making_method, setMethod] = useState<Recipe["making_method"] | null>(null);


const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const recipeData ={
    id: RecipeId,
    name: name,
    description: description,
    image: image,
    making_method: making_method,
  };

  fetch('http://localhost:8080/backend/update_recipe', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Acsess-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(recipeData)
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Update recipe sucsessfury:', data);
      closeUpdateModal();
      setName('');
      setDescription('');
      setImage('');
      setMethod('');
    })
      .catch((erorr) => {
        console.error('Update recipe failed', erorr);
        closeUpdateModal();
      })
    console.log(recipeData)
};

const handleCancell = (e: any) => {
  closeUpdateModal();
  setName('');
  setDescription('');
  setImage('');
  setMethod('');
}

const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
  setName(e.target.value);
}

const handleDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
  setDescription(e.target.value);
}

const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
  setImage(e.target.value);
}

const handleMethod = (e: React.ChangeEvent<HTMLInputElement>) => {
  setMethod(e.target.value);
}

  return (
    <Modal
    contentLabel="Example Modal"
    isOpen={showUpdateModal}
    style={customStyles}
    onRequestClose={closeUpdateModal}
  >
    <h2>登録内容変更: No.</h2>
    <div>食材の変更部分を入力してください</div>

    <form onSubmit={handleSubmit}>
      <h3>レシピ名: {RecipeName}</h3>
      <input type="name" onChange={handleName}/>
      <h3>レシピの説明</h3>
      <input type="description" onChange={handleDescription}/>
      <h3>料理の画像</h3>
      <input type="img" onChange={handleImage}/>
      <h3>つくりかた</h3>
      <input type="making_method" onChange={handleMethod}/>
      
      {/* <input>食材の種類: </input> */}
      <ul>
        <button type="button" onClick={handleCancell}>キャンセル</button>
        <button type="submit">更新</button>
      </ul>
    </form>
  </Modal>
);
}

export default UpdateRecipeModal