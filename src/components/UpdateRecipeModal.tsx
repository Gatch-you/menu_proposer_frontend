import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import {Recipe} from './Models'
import { useForm } from 'react-hook-form';

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

  const {
    register,
    handleSubmit,
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      name: RecipeName || "",
      description: RecipeDescription || "",
      image: RecipeImage || "",
      making_method: RecipeMethod || "",
    }
  })

  useEffect(() => {
    if (RecipeName) setValue('name', RecipeName);
    if (RecipeDescription) setValue('description', RecipeDescription);
    if (RecipeImage) setValue('image', RecipeImage);
    if (RecipeMethod) setValue('making_method', RecipeMethod);
  }, [RecipeName, RecipeDescription, RecipeImage, RecipeMethod, setValue]);

  const onSubmit = (data: any) => {

    const recipeData ={
     id: RecipeId,
      name: data.name,
      description: data.description,
      image: data.image,
      making_method: data.making_method,
   };

    fetch(process.env.REACT_APP_API_ENDPOINT+'/backend/update_recipe', {
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
    setValue('name', e.target.value);
  }

  const handleDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
    setValue('description', e.target.value);
  }

  // const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setImage(e.target.value);
  //   setValue('image', e.target.value);
  // }

  const handleMethod = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMethod(e.target.value);
    setValue('making_method', e.target.value)
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

      <form onSubmit={handleSubmit(onSubmit)}>
        <h3>レシピ名: {RecipeName}</h3>
        <input type="name" {...register('name')} onChange={handleName} value={watch('name') || ""}/>
        <h3>レシピの説明</h3>
        <input 
          type="description" 
          {...register('description')} 
          onChange={handleDescription} 
          value={watch('description') || ""}
        />
        {/* <h3>料理の画像</h3>
        <input 
          type="img" 
          {...register('image')} 
          onChange={handleImage} 
          value={watch('image') || ""}
        /> */}
        <h3>つくりかた</h3>
        <input 
          type="making_method" 
          {...register('making_method')} 
          onChange={handleMethod} 
          value={watch('making_method') || ""}
        />
        <ul>
          <button type="button" onClick={handleCancell}>キャンセル</button>
          <button type="submit">更新</button>
        </ul>
      </form>
    </Modal>
  );
}

export default UpdateRecipeModal