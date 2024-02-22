import React, {useState, useEffect} from 'react';
import Modal from 'react-modal';
import "react-datepicker/dist/react-datepicker.css"
import { Food } from '../../../models/Food';
import axios from 'axios';
import { customStyles } from '../../Design/modalDesign';


type ModalProps = {
  showUpdateModal: boolean;
  closeUpdateModal: () => void;
  recipeId: number;
  food: Food
};

const UpdateFoodinRecipeModal: React.FC<ModalProps> = ({ 
    showUpdateModal,
    closeUpdateModal,
    recipeId,
    food
  }) => {

  const [objFood, setObjFood] = useState<Food>(food);
  const [useAmountError, setUseAmountError] = useState('');

  useEffect(() => {
    setObjFood({
      id: food.id,
      name: food.name,
      quantity: food.quantity,
      unit_id: food.unit_id,
      unit_obj: food.unit_obj,
      unit: food.unit,
      expiration_date: new Date(food.expiration_date),
      type_id: food.type_id,
      type: food.type,
      user_id: food.user_id,
      use_amount: food.use_amount,
      recipes: food.recipes,
    });
  }, [food]);

  const isInputVAlid = !useAmountError

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const foodData = {
      food_id: objFood?.id,
      use_amount: objFood?.use_amount,
    };

    if (useAmountError || objFood.use_amount === 0) {
      return;
    }

    axios.put(`api/user/recipes/detail/controllfood/${recipeId}`, {
      ...foodData
    })
      .then((response) => response.data)
      .then((data) => {
        console.log('Update food sucsessfull:', data);
        closeUpdateModal();
      })
      .catch((error) => {
        console.error('Update food failed:', error);
        closeUpdateModal();
      });

    console.log(foodData)
    window.location.reload();
  };

  const handleCancell = (e: any) => {
    closeUpdateModal();
  }

  const handleUseAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    
    if (!value) {
      setObjFood(prevFood => ({
        ...prevFood,
        use_amount: 0,
      }));
    } else {
      setUseAmountError('');
      setObjFood(prevFood => ({
        ...prevFood,
        use_amount: value,
      }))
    }
    
  }

  return (
    <Modal
      contentLabel="Example Modal"
      isOpen={showUpdateModal}
      style={customStyles}
      onRequestClose={closeUpdateModal}
    >
      <h2>登録内容変更</h2>
      <div>食材の変更部分を入力してください</div>
      <h3>食品名: {food?.id} {food?.name}</h3>
      <form onSubmit={handleSubmit}>

        <h3>現在の使用量: {food.use_amount} {food?.unit}</h3>
        <input type="quantity" onChange={handleUseAmount} value={objFood.use_amount}/>
        {useAmountError && <p>{useAmountError}</p>}

        <ul>
          <button type="button" onClick={handleCancell}>キャンセル</button>
          <button type="submit" disabled={!isInputVAlid}>更新</button>
        </ul>
      </form>
    </Modal>
  );
};

export default UpdateFoodinRecipeModal;
