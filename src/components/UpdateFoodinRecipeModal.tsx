import React, {useState} from 'react';
import Modal from 'react-modal';
import "react-datepicker/dist/react-datepicker.css"
import { RecipeFood } from './Models';

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
  showUpdateModal: boolean;
  closeUpdateModal: () => void;
  RecipeId: number | undefined;
  FoodId: number | null;
  FoodName: string | null;
  UseAmount: number | null;
  FoodUnit: string | null;
};

const UpdateFoodinRecipeModal: React.FC<ModalProps> = ({ 
   showUpdateModal,
   closeUpdateModal,
   RecipeId,
   FoodId, 
   FoodName,
   UseAmount,
   FoodUnit,

  }) => {
    // const [recipe_id, setRecipe_id] = useState<RecipeFood["recipe_id"]>();
    // const [food_id, setFood_id] = useState<RecipeFood["food_id"]>();
    const [use_amount, setUseAmount] = useState<RecipeFood["use_amount"]>();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const foodData = {
      recipe_id: RecipeId,
      food_id: FoodId,
      use_amount: use_amount,
    };

    // 実際にPUTクエリを送る
    fetch('http://localhost:8080/backend/recipe_food/update_using_food_quantity', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Acsess-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(foodData)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Update food sucsessfull:', data);
        closeUpdateModal();
        setUseAmount(0);
        
      })
      .catch((error) => {
        console.error('Update food failed:', error);
      });
  console.log(foodData)
  };

  const handleCancell = (e: any) => {
    closeUpdateModal();
    setUseAmount(0);
  }

  // const handleRecipeId = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = parseFloat(e.target.value);
  //   setRecipe_id(value);
  // }

  // const handleFoodId = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = parseFloat(e.target.value);
  //   setFood_id(value);
  // }

  const handleUseAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setUseAmount(value);
  }

  return (
    <Modal
      contentLabel="Example Modal"
      isOpen={showUpdateModal}
      style={customStyles}
      onRequestClose={closeUpdateModal}
    >
      <h2>登録内容変更: No.{RecipeId}</h2>
      <div>食材の変更部分を入力してください</div>
      <h3>食品名: {FoodId} {FoodName}</h3>
      <form onSubmit={handleSubmit}>

        <h3>現在の使用量: {UseAmount} {FoodUnit}</h3>
        <input type="quantity" onChange={handleUseAmount}/>

        {/* <input>食材の種類: </input> */}
        <ul>
          <button type="button" onClick={handleCancell}>キャンセル</button>
          <button type="submit">更新</button>
        </ul>
      </form>
    </Modal>
  );
};

export default UpdateFoodinRecipeModal;
