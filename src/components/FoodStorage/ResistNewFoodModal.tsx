import React, {useState, KeyboardEventHandler} from 'react';
import Modal from 'react-modal';
import DatePicker from 'react-datepicker'
import { Food } from '../Models';
import "react-datepicker/dist/react-datepicker.css"

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
  showResistNewFoodModal: boolean;
  closeResistNewFoodModal: () => void;
};

const ResistFoodNewModal: React.FC<ModalProps> = ({ 
  showResistNewFoodModal, 
  closeResistNewFoodModal, 
}) => {
  const Today = new Date();

  //useStateでのリアルタイムフィードバック
  const [name, setName] = useState<Food["name"]>("");
  const [quantity, setQuantity] = useState<Food["quantity"]>(0.0);
  const [unit, setUnit] = useState<Food["unit"]>("");
  const [expiration_date, setExpirationDate] = useState<Food["expiration_date"] | null>(null);
  const [type, setType] = useState<Food["type"]>("");
  const [nameError, setNameError] = useState('')
  const [quantityError, setQuantityError] = useState('')

  // const isInputNameValid = !nameError
  const isInputValid = name && !quantityError


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
    const selectDate = expiration_date || Today;

    const foodData = {
      name: name,
      quantity: quantity,
      unit: unit,
      expiration_date: selectDate.toISOString(),
      type: type,
    };


    if (!name || quantityError) {
      return;
    }

    // 実際にPOSTリクストを送る
    fetch(process.env.REACT_APP_API_ENDPOINT+'/backend/insert_food', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(foodData)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Food registration sucsessfull:', data);
        closeResistNewFoodModal();
        //stateの初期化
        setName("");
        setQuantity(0.0);
        setUnit("");
        setExpirationDate(null);
        setType("");
      })
      .catch((error) => {
        console.error('Food registration failed:', error);
      });
  console.log(foodData)
  window.location.reload();
  };

  const handleCancell = (e: any) => {
    closeResistNewFoodModal();
    window.location.reload();
    setName('');
    setQuantity(0.0);
    setUnit('');
    setExpirationDate(null);
    setType('');
  }

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)

    if (!e.target.value) {
      setNameError('食品名を入力してください');
    } else {
      setNameError("");
    }
  }

  const handleQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);

    if (!value) {
      setQuantityError('正しい入力ではありません(半角数字にて記入)');
    } else {
      setQuantityError("");
      setQuantity(value);
    }
  }

  const handleUnit = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUnit(e.target.value)
  }

  const handleType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setType(e.target.value)
  }

  return (
    <Modal
      contentLabel="Example Modal"
      isOpen={showResistNewFoodModal}
      style={customStyles}
      onRequestClose={closeResistNewFoodModal}
    >
      <h2>食材登録</h2>
      <div>仕入れた食材を追加してください</div>
      <form 
        onSubmit={handleSubmit} 
        onKeyDown={handleKeyDown}
      >
        <h3>食品名</h3>
        <input 
          type="name" 
          onChange={handleName} 
          placeholder='食材名'
          />
          {nameError && <p>{nameError}</p>}
        <h3>数量</h3>
        <input 
          type="quantity" 
          onChange={handleQuantity}
          placeholder='数量を入力してください'
          />
          {quantityError && <p>{quantityError}</p>}
        <h3>単位</h3>
        <input 
          type="unit" 
          onChange={handleUnit} 
          placeholder='個, g, mL etc...'
        />
        <h3>賞味期限</h3>
        <DatePicker
          dateFormat="yyyy/MM/dd"
          selected={expiration_date}
          onChange={(date: Date | null) => setExpirationDate(date)}
          />

        {/* <input type="expiration" onChange={handleExpirationData}/> */}
        <h3>種類</h3>
        <input type="unit" onChange={handleType}　placeholder='精肉, 野菜, 果物 etc...'/>
        
        {/* <input>食材の種類: </input> */}
        <ul>
          <button 
            type="button" 
            onClick={handleCancell}>キャンセル</button>
          <button 
            type="submit" 
            disabled={!isInputValid}>登録</button>
        </ul>
      </form>
    </Modal>
  );
};

export default ResistFoodNewModal;