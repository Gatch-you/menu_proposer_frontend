import React, { useEffect, useState } from 'react';
import { Food } from '../Models';
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
  FoodExpiratinDate: Food["expiration_date"] | null;
  FoodFormattedDate: string | null;
  FoodType: string | null;
};

const UpdateFoodModal: React.FC<ModalProps> = ({
  showUpdateModal,
  closeUpdateModal,
  FoodId,
  FoodName,
  FoodQuantity,
  FoodUnit,
  FoodExpiratinDate,
  FoodFormattedDate,
  FoodType,
}) => {
  const Today = new Date();

  const [name, setName] = useState<Food["name"]>(FoodName || "");
  const [quantity, setQuantity] = useState<Food["quantity"] | null>(FoodQuantity || null);
  const [unit, setUnit] = useState<Food["unit"] | null>(FoodUnit || null);
  const [expiration_date, setExpirationDate] = useState<Food["expiration_date"] | null>(FoodExpiratinDate || null)
  const [formatted_date, setFormattedDate] = useState<Food["formatted_date"] | null>(FoodFormattedDate || "")
  const [type, setType] = useState<Food["type"] | null>(FoodType || null)
  // const [nameError, setNameError] = useState('');
  // const [quantityError, setQuantityError] = useState('')

  // const isInputValid = name && !quantityError

  const { 
    register, 
    handleSubmit, 
    setValue, 
    watch,
   } = useForm({
    defaultValues: {
      name: FoodName || "",
      quantity: FoodQuantity || null,
      unit: FoodUnit || "",
      formatted_date: FoodFormattedDate || "",
      type: FoodType || "",
    },
  });

  useEffect(() => {
    if (FoodName) setValue('name', FoodName);
    if (FoodQuantity) setValue('quantity', FoodQuantity);
    if (FoodUnit) setValue('unit', FoodUnit);
    // if (FoodFormattedDate) setValue('formatted_date', FoodFormattedDate)
    if (FoodType) setValue('type', FoodType);
  }, [FoodName, FoodQuantity, FoodUnit, FoodFormattedDate, FoodType, setValue]);

  const onSubmit = (data: any) => {
    const selectDate = expiration_date || Today;

    const foodData = {
      id: FoodId,
      name: data.name, // react-hook-formの値を使用する
      quantity: +data.quantity,
      unit: data.unit,
      expiration_date: selectDate.toISOString(),
      formatted_date: data.formatted_date,
      type: data.type,
    };

    if (!data.name || !data.quantity) {
      return;
    }

    fetch(process.env.REACT_APP_API_ENDPOINT+'/backend/update_food', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(foodData)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Update food successful:', data);
        closeUpdateModal();
        setName('');
        setQuantity(null);
        setUnit('');
        setExpirationDate(null);
        setFormattedDate('');
        setType('');
      })
      .catch((error) => {
        console.error('Update food failed:', error);
      });
    console.log(foodData)
    window.location.reload();
  };

  const handleCancell = (e: any) => {
    closeUpdateModal();
    setName('');
    setQuantity(null);
    setUnit('');
    setExpirationDate(null);
    setFormattedDate('');
    setType('');
  }

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);

    // if (!e.target.value) {
    //   setNameError('食品名を記入してください')
    // } else {
    //   setNameError('')
      setValue('name', e.target.value); 

    
// react-hook-formの値を更新
  }
  
  const handleQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setValue('quantity', value);  // react-hook-formの値を更新
    
    
 // react-hook-formの値を更新
  }
  
  const handleUnit = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUnit(e.target.value);
    setValue('unit', e.target.value); // react-hook-formの値を更新
  }
  
  const handleType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setType(e.target.value);
    setValue('type', e.target.value); // react-hook-formの値を更新
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3>食品名: {FoodName}</h3>
        <input type="name" {...register('name')} onChange={handleName} value={watch('name') || ""} placeholder={FoodName} />
        {/* {nameError && <p>{nameError}</p>} */}
        <h3>数量: {FoodQuantity}</h3>
        <input type="quantity" {...register('quantity')} onChange={handleQuantity} value={watch('quantity') || ""} />
        {/* {quantityError && <p>{quantityError}</p>} */}
        <h3>単位: {FoodUnit}(個, g, mL等...)</h3>
        <input type="unit" {...register('unit')} onChange={handleUnit} value={watch('unit') || ""} />
        <h3>賞味期限: {FoodFormattedDate}</h3>
        <DatePicker
          dateFormat="yyyy/MM/dd"
          selected={expiration_date}
          onChange={(date: Date | null) => setExpirationDate(date)}
        />
        <h3>種類: {FoodType}</h3>
        <input type="unit" {...register('type')} onChange={handleType} value={watch('type') || ""} />
        <ul>
          <button type="button" onClick={handleCancell}>キャンセル</button>
          <button type="submit">更新</button>
        </ul>
      </form>
    </Modal>
  );
}

export default UpdateFoodModal;
