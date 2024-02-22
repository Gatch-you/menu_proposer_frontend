import React, {useState, KeyboardEventHandler} from 'react';
import Modal from 'react-modal';
import DatePicker from 'react-datepicker'
import { Food } from '../../models/Food';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css"
import { customStyles } from '../Design/modalDesign';


type ModalProps = {
  showRegistModal: boolean;
  closeRegisterModal: () => void;
};

const RegisterFoodModal: React.FC<ModalProps> = ({ 
  showRegistModal, 
  closeRegisterModal, 
}) => {
  const Today = new Date();

  const [name, setName] = useState<Food["name"]>("");
  const [quantity, setQuantity] = useState<Food["quantity"]>(0.0);
  const [unit, setUnit] = useState<Food["unit_id"]>();
  const [expiration_date, setExpirationDate] = useState<Food["expiration_date"] | null>(null);
  const [type, setType] = useState<Food["type_id"]>();
  const [nameError, setNameError] = useState('')
  const [quantityError, setQuantityError] = useState('')

  const isInputValid = name && !quantityError

  const handleKeyDown: KeyboardEventHandler<HTMLFormElement> = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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


    axios.post('/api/user/foods', {
      ...foodData
    })
      .then((response) => response.data)
      .then((data) => {
        console.log('Food registration sucsessfull:', data);
        closeRegisterModal();
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
    closeRegisterModal();
    setName('');
    setQuantity(0.0);
    setUnit(0);
    setExpirationDate(null);
    setType(0);
  }

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
    console.log(e.target.value, typeof(e.target.value))

    if (!e.target.value) {
      setNameError('食品名を入力してください');
    } else {
      setNameError("");
    }
  }

  const handleChangeUnit = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    setUnit(parseInt(value, 10));
  };

  const handleChangeType = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value = e.target.value
    setType(parseInt(value, 10));
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
      isOpen={showRegistModal}
      style={customStyles}
      onRequestClose={closeRegisterModal}
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
            <option value="0">-</option>
            <option value="1">個</option>
            <option value="2">本</option>
            <option value="3">匹</option>
            <option value="4">g</option>
            <option value="5">ml</option>
            </select>
        <h3>賞味期限</h3>
        <DatePicker
          dateFormat="yyyy/MM/dd"
          selected={expiration_date}
          onChange={(date: Date | null) => setExpirationDate(date)}
          />
        <label htmlFor="type_id">種類:</label>
          <select
            id="type_id"
            name="type_id"
            value={type}
            onChange={handleChangeType} 
          >
            <option value="0">-</option>
            <option value="1">穀物</option>
            <option value="2">肉</option>
            <option value="3">魚</option>
            <option value="4">野菜</option>
            <option value="5">乳製品</option>
            <option value="6">果物</option>
            <option value="7">卵</option>
          </select>
        <ul>
          <button type="button" onClick={handleCancell}>キャンセル</button>
          <button type="submit" disabled={!isInputValid}>登録</button>
        </ul>
      </form>
    </Modal>
  );
};

export default RegisterFoodModal;