import React, {useEffect, useState} from 'react';
import { Food } from './Models';
import Modal from 'react-modal';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import { useForm } from 'react-hook-form'

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
  FoodId: number | null;
  FoodName: string;
  FoodQuantity: number | null;
  FoodUnit: string | null;
  FoodExpiratinData: Food["expiration_date"] | null;
  FoodType: string | null;
};

const UpdateFoodModal: React.FC<ModalProps> = ({ 
  showUpdateModal,
   closeUpdateModal,
   FoodId, 
   FoodName,
   FoodQuantity,
   FoodUnit,
   FoodExpiratinData,
   FoodType,
  }) => {
  const Today = new Date();

  const [name, setName] = useState<Food["name"]>(FoodName || "");
  const [quantity, setQuantity] = useState<Food["quantity"] | null>(FoodQuantity || null);
  const [unit, setUnit] = useState<Food["unit"] | null>(FoodUnit || null);
  const [expirationDate, setExpirationDate] = useState<Food["expiration_date"]| null>(FoodExpiratinData || null)
  const [type, setType] = useState<Food["type"] | null>(FoodType || null)
  const { register, handleSubmit, setValue,} = useForm();

  useEffect(() => {
    if (FoodName) setValue('name', FoodName);
    if (FoodQuantity) setValue('quantity', FoodQuantity);
    if (FoodUnit) setValue('unit', FoodUnit);
    if (FoodType) setValue('type', FoodType);
  }, [FoodName, FoodQuantity, FoodUnit, FoodType, setValue])

  const onSubmit = (data: any) => {

    const selectDate = expirationDate || Today;

    const foodData = {
      id: FoodId,
      name: name,
      quantity: quantity,
      unit: unit,
      expiration_date: selectDate.toISOString(),
      type: type,
    };

    fetch('http://localhost:8080/backend/update_food', {
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
        setName('');
        setQuantity(0.0);
        setUnit('');
        setExpirationDate(null);
        setType('');
      })
      .catch((error) => {
        console.error('Update food failed:', error);
      });
  console.log(foodData)
  };

  const handleCancell = (e: any) => {
    closeUpdateModal();
    setName('');
    setQuantity(0.0);
    setUnit('');
    setExpirationDate(null);
    setType('');
  }

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const handleQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setQuantity(value);
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
      isOpen={showUpdateModal}
      style={customStyles}
      onRequestClose={closeUpdateModal}
    >
      <h2>登録内容変更: No.</h2>
      <div>食材の変更部分を入力してください</div>
      <form onSubmit={handleSubmit(onSubmit)} >
        <h3>食品名: {FoodName}</h3>
        <input type="name" {...register('name')} onChange={handleName} value={name} placeholder={FoodName} />
        <h3>数量: {FoodQuantity}</h3>
        <input type="quantity" {...register('quantity')} onChange={handleQuantity} />
        <h3>単位: {FoodUnit}(個, g, mL等...)</h3>
        <input type="unit" {...register('unit')} onChange={handleUnit} value={unit || ""}/>
        <h3>賞味期限</h3>
        <DatePicker
          dateFormat="yyyy/MM/dd"
          selected={expirationDate}
          // {...register('expiration_date')}
          onChange={(date: Date | null) => setExpirationDate(date)}
        />
        <h3>種類: {FoodType}</h3>
        <input type="unit" {...register('type')}onChange={handleType} value={type || ""}/>
        <ul>
          <button type="button" onClick={handleCancell}>キャンセル</button>
          <button type="submit">更新</button>
        </ul>
      </form>
    </Modal>
  );
};

export default UpdateFoodModal;
