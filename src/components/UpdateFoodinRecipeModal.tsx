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
  Unit: string | null;
};

const UpdateFoodinRecipeModal: React.FC<ModalProps> = ({ 
   showUpdateModal,
   closeUpdateModal,
   RecipeId,
   FoodId, 
   FoodName,
   UseAmount,
   Unit,

  }) => {
  
  const [use_amount, setUseAmount] = useState<RecipeFood["use_amount"]>(0.0);
  const [useAmountError, setUseAmountError] = useState('');

  const isInputVAlid = !useAmountError

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const foodData = {
      recipe_id: RecipeId,
      food_id: FoodId,
      use_amount: use_amount,
    };

    if (useAmountError) {
      return;
    }

    // 実際にPUTクエリを送る
    fetch(process.env.REACT_APP_API_ENDPOINT+'/backend/recipe_food/update_using_food_quantity', {
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
        setUseAmount(0.0);
      })
      .catch((error) => {
        console.error('Update food failed:', error);
      });
  console.log(foodData)
  };

  const handleCancell = (e: any) => {
    closeUpdateModal();
    setUseAmount(0.0);
  }

  const handleUseAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    
    if (!value) {
      setUseAmountError("正しい入力ではありません(半角数字にて記入)");
    } else {
      setUseAmountError('');
      setUseAmount(value);
    }
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

        <h3>現在の使用量: {UseAmount} {Unit}</h3>
        <input type="quantity" onChange={handleUseAmount}/>
        {useAmountError && <p>{useAmountError}</p>}

        {/* <input>食材の種類: </input> */}
        <ul>
          <button type="button" onClick={handleCancell}>キャンセル</button>
          <button type="submit" disabled={!isInputVAlid}>更新</button>
        </ul>
      </form>
    </Modal>
  );
};

export default UpdateFoodinRecipeModal;
