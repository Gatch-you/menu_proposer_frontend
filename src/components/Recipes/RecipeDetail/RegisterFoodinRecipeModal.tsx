import React, {useState, useEffect, KeyboardEventHandler} from 'react';
import Modal from 'react-modal';
import "react-datepicker/dist/react-datepicker.css"
import { RecipeFoodRelation } from '../../../models/Recipe';
import { Food } from '../../../models/Food';
import axios from 'axios';
import { customStyles } from '../../../modalDesign';

type ModalProps = {
  showRegisterModal: boolean;
  closeRegisterModal: () => void;
  recipeId: string | undefined
};

const RegistFoodinRecipeModal: React.FC<ModalProps> = ({ 
  showRegisterModal, 
  closeRegisterModal, 
  recipeId, 
}) => {

  const [foods, setFoods] = useState<Food[]>([]);
  const [use_amount, setUseAmount] = useState<RecipeFoodRelation["use_amount"]>();
  const [selectedFood, setSelectedFood] = useState('');
  const [use_amountError, setuse_AmountError] = useState('');

  const isInputValid = !use_amountError

  useEffect(() => {
    const fetchFoods = async () => {
        try {
            const response = await axios.get('api/user/foods');
            const jsonData = await response.data
            setFoods(jsonData);
            console.log(response.data)
        } catch (error) {
            console.error('データの取得中にエラーが発生しました:', error);
        }
    };

    fetchFoods();
}, []);

  const handleFoodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFood(e.target.value);
  };

  const handleKeyDown: KeyboardEventHandler<HTMLFormElement> = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const foodData = {
      food_id: +selectedFood,
      use_amount: use_amount,
    };

    if (!+selectedFood) {
      return;
    }

    axios.post(`api/user/recipes/detail/controllfood/${recipeId}`, {
      ...foodData
    })
      .then((response) => response.data)
      .then((data) => {
        console.log('Food registration sucsessfull:', data);
        closeRegisterModal();
      })
      .catch((error) => {
        console.error('Food registration failed:', error);
      });
    console.log(foodData)
    window.location.reload();
  };

  const handleCancell = (e: any) => {
    closeRegisterModal();
  }

  const handleUseAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!value) {
      setuse_AmountError('無効な入力です(半角数字にて記入)')
    } else {
      setuse_AmountError('')
      setUseAmount(value);
    }
  }

  return (
    <Modal
      contentLabel="Example Modal"
      isOpen={showRegisterModal}
      style={customStyles}
      onRequestClose={closeRegisterModal}
    >
      <h2>食材登録</h2>
      <div>レシピに登録する食材を記述してください。</div>
      <form onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
        <select value={selectedFood} onChange={handleFoodChange}>
        <option value="" defaultValue={"選択してください"}>選択してください</option>
        {foods.map((food) => (
          <option key={food.id} value={food.id}>
            {food.name}
          </option>
        ))}
      </select>
        <h3>使用量</h3>
        <input type="quantity" onChange={handleUseAmount}/>
        {use_amountError && <p>{use_amountError}</p>}
        <ul>
          <button type="button" onClick={handleCancell}>キャンセル</button>
          <button type="submit" disabled={!isInputValid}>登録</button>
        </ul>
      </form>
    </Modal>
  );
};

export default RegistFoodinRecipeModal;
