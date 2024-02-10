import React, { SyntheticEvent, useState, useEffect } from 'react';
import { Food } from '../../models/Food';
import Modal from 'react-modal';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import { customStyles } from '../../modalDesign';

import axios from 'axios';

type ModalProps = {
  showUpdateModal: boolean;
  closeUpdateModal: () => void;
  food: Food;
};

const UpdateFoodModal: React.FC<ModalProps> = ({
  showUpdateModal,
  closeUpdateModal,
  food,
}) => {
    const Today = new Date();

    // todo:とりま動いてるから後でリファクタリング
    const [objFood, setObjFood] = useState<Food>({
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
    })

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
      });
    }, [food]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
  
      const currentFood  = {
        id: objFood.id,
        name: objFood.name,
        quantity: objFood.quantity,
        unit_id: objFood.unit_id,
        expiration_date: objFood.expiration_date,
        type_id: objFood.type_id,
      }
  
      try {
        const response = await axios.put('api/user/foods', currentFood);
        console.log('Update food success:', response.data);
        closeUpdateModal();
      } catch (error) {
        console.log('Update food failed:', error)
        closeUpdateModal();
      }
      window.location.reload()
    };

  const handleCancell = (e: any) => {
    closeUpdateModal();
  }
  
  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setObjFood(prevFood => ({
      ...prevFood, // 更新をかけないものに対してはそのままの値にする。そのための記述
      name: value,
    }));  
  }
  const handleQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setObjFood(prevFood => ({
      ...prevFood, 
      quantity: value,
    }));  
  }

  const handleExpirationDate = (date: Date | null, event: SyntheticEvent<any, Event> | undefined) => {
    if (date) { // 日付が選択されている場合にのみ状態を更新
      setObjFood(prevFood => ({
        ...prevFood,
        expiration_date: date,
      }));
    }
  };

  const handleUnitId = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value }= e.target;
    if (name === "unit_id") {
      setObjFood(prevFood => ({
        ...prevFood,
        unit_id: parseInt(value, 10)
      }))
    }
  }

  const handleTypeId = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value }= e.target;
    if (name === "type_id") {
      setObjFood(prevFood => ({
        ...prevFood,
        type_id: parseInt(value, 10)
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
      <form onSubmit={handleSubmit}>
        <h3>食品名: {objFood.name}</h3>
        <input type="name"  onChange={handleName} value={objFood.name} placeholder={"直前の入力:"+objFood.name} />
        <h3>数量: {objFood.quantity}</h3>
        <input type="quantity" onChange={handleQuantity} value={objFood.quantity} placeholder={"直前の入力:"+objFood.quantity}/>
        <label htmlFor="unit_id">単位:</label>
          <select
            id="unit_id"
            name="unit_id"
            value={objFood.unit_id}
            onChange={handleUnitId} 
          >
            <option value="1">g</option>
            <option value="2">ml</option>
            </select>
        <h3>賞味期限: {objFood.expiration_date.getFullYear() + '/' +objFood.expiration_date.getMonth() +'/'+objFood.expiration_date.getDay()}</h3>
        <DatePicker
          dateFormat="yyyy/MM/dd"
          minDate={Today}
          selected={objFood.expiration_date}
          // value={food.expiration_date}
          onChange={handleExpirationDate}
        />
        <label htmlFor="type_id">種類:</label>
          <select
            id="type_id"
            name="type_id"
            value={objFood.type_id}
            onChange={handleTypeId} 
          >
            <option value="1">肉</option>
            <option value="2">野菜</option>
          </select>
        <ul>
          <button type="button" onClick={handleCancell}>キャンセル</button>
          <button type="submit">更新</button>
        </ul>
      </form>
    </Modal>
  );
}

export default UpdateFoodModal;