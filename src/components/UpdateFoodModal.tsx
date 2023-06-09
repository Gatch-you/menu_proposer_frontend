import React, {useState} from 'react';
import Modal from 'react-modal';
import DatePicker from 'react-datepicker'
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
  showUpdateModal: boolean;
  closeUpdateModal: () => void;
  FoodId: number | null;
  FoodName: string | null;
  FoodQuantity: number | null;
  FoodUnit: string | null;
  FoodType: string | null;
};

const UpdateFoodModal: React.FC<ModalProps> = ({ 
  showUpdateModal,
   closeUpdateModal,
   FoodId, 
   FoodName,
   FoodQuantity,
   FoodUnit,
   FoodType,
  }) => {
  const Today = new Date();

  const [name, setName] = useState<string | null>(null);
  const [quqntity, setQuantity] = useState<number | null>(null);
  const [unit, setUnit] = useState<string | null>(null);
  const [expirationDate, setExpirationDate] = useState<Date | null>(null)
  const [type, setType] = useState<string | null>(null)

    //またあとでAPIの実装を書く
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const selectDate = expirationDate || Today;

    const foodData = {
      id: FoodId,
      name: name,
      quantity: quqntity,
      unit: unit,
      expiration_date: selectDate.toISOString(),
      type: type,
    };

    // 実際にPUTクエリを送る
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

      <form onSubmit={handleSubmit}>
        <h3>食品名: {FoodName}</h3>
        <input type="name" onChange={handleName}/>
        <h3>数量: {FoodQuantity}</h3>
        <input type="quantity" onChange={handleQuantity}/>
        <h3>単位: {FoodUnit}(個, g, mL等...)</h3>
        <input type="unit" onChange={handleUnit}/>
        <h3>賞味期限</h3>
        <DatePicker
          dateFormat="yyyy/MM/dd"
          selected={expirationDate}
          onChange={(date: Date | null) => setExpirationDate(date)}
          />
        <h3>種類: {FoodType}</h3>
        <input type="unit" onChange={handleType}/>
        
        {/* <input>食材の種類: </input> */}
        <ul>
          <button type="button" onClick={handleCancell}>キャンセル</button>
          <button type="submit">更新</button>
        </ul>
      </form>
    </Modal>
  );
};

export default UpdateFoodModal;
