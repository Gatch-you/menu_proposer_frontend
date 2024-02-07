import React, {useState, KeyboardEventHandler} from 'react';
import Modal from 'react-modal';
import DatePicker from 'react-datepicker'
// import { Food } from '../../models/Models';
import { Food } from '../../models/Food';
import axios from 'axios';

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
  showResistModal: boolean;
  closeResistModal: () => void;
};

const ResistFoodModal: React.FC<ModalProps> = ({ 
  showResistModal, 
  closeResistModal, 
}) => {
  const Today = new Date();

  //useStateでのリアルタイムフィードバック
  const [name, setName] = useState<Food["name"]>("");
  const [quantity, setQuantity] = useState<Food["quantity"]>(0.0);
  const [unit, setUnit] = useState<Food["unit_id"]>(0);
  const [expiration_date, setExpirationDate] = useState<Food["expiration_date"] | null>(null);
  const [type, setType] = useState<Food["type_id"]>(0);
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
      unit_id: unit,
      expiration_date: selectDate.toISOString(),
      type_id: type,
    };


    if (!name || quantityError) {
      return;
    }

    // 実際にPOSTリクストを送る
    axios.post('/api/user/foods', {
      ...foodData
    })
      .then((response) => response.data)
      .then((data) => {
        console.log('Food registration sucsessfull:', data);
        closeResistModal();
        //stateの初期化
        setName("");
        setQuantity(0.0);
        setUnit(0);
        setExpirationDate(null);
        setType(0);
      })
      .catch((error) => {
        console.error('Food registration failed:', error);
      });
  console.log(foodData)
  window.location.reload();
  };

  const handleCancell = (e: any) => {
    closeResistModal();
    // ステートを初期化
    setName('');
    setQuantity(0.0);
    setUnit(0);
    setExpirationDate(null);
    setType(0);
  }

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)

    if (!e.target.value) {
      setNameError('食品名を入力してください');
    } else {
      setNameError("");
    }
  }

  const handleChangeUnit = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "unit_id") {
      setUnit(parseInt(value, 10));
    }
  };

  const handleChangeType = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "type_id") {
      setType(parseInt(value, 10));
    }
  };

  const handleChangeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);

    if (!value) {
      setQuantityError('正しい入力ではありません(半角数字にて記入)');
    } else {
      setQuantityError("");
      setQuantity(value);
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
      <div>仕入れた食材を追加してください</div>
      <form onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
        <h3>食品名</h3>
        <input 
          type="name" 
          onChange={handleChangeName} 
          placeholder='食材名'
          />
          {nameError && <p>{nameError}</p>}
        <h3>数量</h3>
        <input 
          type="quantity" 
          onChange={handleChangeQuantity}
          placeholder='数量を入力してください'
          />
          {quantityError && <p>{quantityError}</p>}
          <label htmlFor="unit_id">単位:</label>
          <select
            id="unit_id"
            name="unit_id"
            value={unit}
            onChange={handleChangeUnit} 
          >
            <option value="1">g</option>
            <option value="2">ml</option>
            </select>
        <h3>賞味期限</h3>
        <DatePicker
          dateFormat="yyyy/MM/dd"
          selected={expiration_date}
          onChange={(date: Date | null) => setExpirationDate(date)}
          />

        {/* <input type="expiration" onChange={handleExpirationData}/> */}
        <label htmlFor="type_id">種類:</label>
          <select
            id="type_id"
            name="type_id"
            value={type}
            onChange={handleChangeType} 
          >
            <option value="1">肉</option>
            <option value="2">野菜</option>
          </select>
        {/* <input>食材の種類: </input> */}
        <ul>
          <button type="button" onClick={handleCancell}>キャンセル</button>
          <button type="submit" disabled={!isInputValid}>登録</button>
        </ul>
      </form>
    </Modal>
  );
};

export default ResistFoodModal;