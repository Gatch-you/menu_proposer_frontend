import React, {useState, useEffect, KeyboardEventHandler} from 'react';
import Modal from 'react-modal';
import "react-datepicker/dist/react-datepicker.css"
import { RecipeFood } from './Models';


// 送りたいリクエスト↓
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
  RecipeId: number | null;
};

interface FoodOption {
  id: number;
  name: string;
}

const ResistFoodinRecipeModal: React.FC<ModalProps> = ({ 
  showResistModal, closeResistModal, RecipeId, }) => {


  //useStateでのリアルタイムフィードバック
  const [recipe_id, setRecipe_id] = useState<RecipeFood["recipe_id"]>();
  const [food_id, setFood_id] = useState<RecipeFood["food_id"]>();
  const [use_amount, setUseAmount] = useState<RecipeFood["use_amount"]>();
  const [foodOptions, setFoodOptions] = useState<FoodOption[]>([]);
  const [selectedFood, setSelectedFood] = useState('');
  const [use_amountError, setuse_AmountError] = useState('');

  const isInputValid = !use_amountError

  useEffect(() => {
    // 食材データを取得するAPIを呼び出し、データを取得します
    fetchFoodOptions()
      .then((data) => setFoodOptions(data))
      .catch((error) => console.error('Failed to fetch food options:', error));
  }, []); // このフックはマウント時にのみ実行するため、依存関係の配列は空にします

  async function fetchFoodOptions() {
    try {
      const response = await fetch('http://localhost:8080/backend/foods');
      const jsonData = await response.json();
      return jsonData;
    } catch (error) {
      console.error(error);
    }
  }

  const handleFoodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFood(e.target.value);
  };

  const handleKeyDown: KeyboardEventHandler<HTMLFormElement> = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      // ここでEnterキーが押された後の処理を実行する
    }
  };
  
  //フォームの入力に対して
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(selectedFood);
    // jsonの型を設定

    const foodData = {
      recipe_id: RecipeId,
      food_id: +selectedFood,
      use_amount: use_amount,
    };

    if (!+selectedFood) {
      return;
    }

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

  // const handleFoodId = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = parseFloat(e.target.value);
  //   setFood_id(value);
  // }

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
      isOpen={showResistModal}
      style={customStyles}
      onRequestClose={closeResistModal}
    >
      <h2>食材登録</h2>
      <div>レシピに登録する食材を記述してください。</div>
      <form onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
        {/* <h3>resipe_id: </h3>
        <input type="name" onChange={handleRecipeId}/> */}
        <select value={selectedFood} onChange={handleFoodChange}>
        <option value="">選択してください</option>
        {foodOptions.map((food) => (
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
          <button type="submit" disabled={!isInputValid}>登録: recipe_id:{RecipeId}, food_id{selectedFood}</button>
        </ul>
      </form>
    </Modal>
  );
};

export default ResistFoodinRecipeModal;
