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
  showResistModal: boolean;
  onCloseResistModal: () => void;
};

const ResistFoodModal: React.FC<ModalProps> = ({ showResistModal, onCloseResistModal }) => {
//useStateでのリアルタイムフィードバック
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0.0);
  const [unit, setUnit] = useState("");
  const [expirationDate, setExpirationDate] = useState(new Date());
  const [type, setType] = useState("");
  
  // 今日の日付を定義
  const Today = new Date();
  const [date, setDate] = React.useState(Today);

  //フォームの入力に対して
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // jsonの型を設定
    const foodData = {
      name: name,
      quantity: quantity,
      unit: unit,
      expiration_date: expirationDate.toISOString(),
      type: type,
    };

    // 実際にPOSTクエリを送る
    fetch('http://localhost:8080/backend/insert_food', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(foodData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Food registration sucsessfull:', data);
        onCloseResistModal();
        //stateの初期化
        setName("")
        setQuantity(0.0)
        setUnit("")
        setExpirationDate(new Date())
        setType("")
      })
      .catch((error) => {
        console.error('Food registration failed:', error);
      });
  console.log(foodData)
  };


  const handleCancell = (e: any) => {
    onCloseResistModal();
    // ステートを初期化
    setName('');
    setQuantity(0.0);
    setUnit('');
    setExpirationDate(new Date());
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
      isOpen={showResistModal}
      style={customStyles}
      onRequestClose={onCloseResistModal}
    >
      <h2>食材登録</h2>
      <div>仕入れた食材を追加してください</div>

      <form onSubmit={handleSubmit}>
        <h3>食品名</h3>
        <input type="name" onChange={handleName}/>
        <h3>数量</h3>
        <input type="quantity" onChange={handleQuantity}/>
        <h3>単位(個, g, mL等...)</h3>
        <input type="unit" onChange={handleUnit}/>
        <h3>賞味期限</h3>
        <DatePicker
          dateFormat="yyyy/MM/dd"
          selected={date}
          onChange={selectedDate => {setDate(selectedDate || Today)}}
          />
        {/* <input type="expiration" onChange={handleExpirationData}/> */}
        <h3>種類(野菜, 肉等...)</h3>
        <input type="unit" onChange={handleType}/>
        
        {/* <input>食材の種類: </input> */}
        <ul>
          <button type="button"onClick={handleCancell}>キャンセル</button>
          <button type="submit">登録</button>
        </ul>
      </form>
    </Modal>
  );
};

export default ResistFoodModal;
