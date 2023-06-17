import React, {useState, KeyboardEventHandler} from 'react';
import Modal from 'react-modal';
import "react-datepicker/dist/react-datepicker.css"
import {} from 'react-select'
import { RecipeFood } from './Models';

// curl -X POST -H "Content-Type: application/json" -d '[{"recipe_id": 5, "food_id": 20, "use_amount": 0.2},{"recipe_id": 5, "food_id": 21, "use_amount": 100}]' http://localhost:8080/backend/recipe_food/insert_use_food

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
  showResistModal: boolean;
  closeResistModal: () => void;
};

const ResistFoodinRecipeModal: React.FC<ModalProps> = ({ 
  showResistModal, closeResistModal, }) => {


  //useStateでのリアルタイムフィードバック
    const [recipe_id, setRecipe_id] = useState<RecipeFood["recipe_id"]>();
    const [food_id, setFood_id] = useState<RecipeFood["food_id"]>();
    const [use_amount, setUseAmount] = useState<RecipeFood["use_amount"]>();


  const handleKeyDown: KeyboardEventHandler<HTMLFormElement> = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      // ここでEnterキーが押された後の処理を実行する
    }
  };
  
  //フォームの入力に対して
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // jsonの型を設定

    const foodData = {
      recipe_id: recipe_id,
      food_id: food_id,
      use_amount: use_amount,
    };

    // 実際にPOSTリクストを送る
    fetch('http://localhost:8080/backend/recipe_food/insert_use_food', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(foodData)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Food registration sucsessfull:', data);
        closeResistModal();
        //stateの初期化
        setRecipe_id(0);
        setFood_id(0);
        setUseAmount(0);

      })
      .catch((error) => {
        console.error('Food registration failed:', error);
      });
  console.log(foodData)
  };


  const handleCancell = (e: any) => {
    closeResistModal();
    // ステートを初期化
    setRecipe_id(0);
    setFood_id(0);
    setUseAmount(0);
  }

  const handleRecipeId = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setRecipe_id(value);
  }

  const handleFoodId = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setFood_id(value);
  }

  const handleUseAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setUseAmount(value);
  }



  return (
    <Modal
      contentLabel="Example Modal"
      isOpen={showResistModal}
      style={customStyles}
      onRequestClose={closeResistModal}
    >
      <h2>食材登録</h2>
      <div>レシピに登録する食材を記述してください。</div>

      <form onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
        <h3>resipe_id: </h3>
        <input type="name" onChange={handleRecipeId}/>
        <h3>food_id: </h3>
        <input type="name" onChange={handleFoodId}/>
        <h3>使用量</h3>
        <input type="quantity" onChange={handleUseAmount}/>
        <ul>
          <button type="button" onClick={handleCancell}>キャンセル</button>
          <button type="submit">登録</button>
        </ul>
      </form>
    </Modal>
  );
};

export default ResistFoodinRecipeModal;
