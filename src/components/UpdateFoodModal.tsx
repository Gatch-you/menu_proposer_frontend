import React, {useState} from 'react';
import Modal from 'react-modal';
// import { Food } from './Models'

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
  onCloseUpdateModal: () => void;
};

const UpdateFoodModal: React.FC<ModalProps> = ({ showUpdateModal, onCloseUpdateModal }) => {

    const [neme, setName] = useState("");
    const [quqntity, setQuantity] = useState(0.0);
    const [unit, setUnit] = useState("");
    const [expiration_date, setExpirationDate] = useState("")
    const [type, setType] = useState("")

    //またあとでAPIの実装を書く
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
        onCloseUpdateModal();

        setName("")
        setQuantity(0.0)
        setUnit("")
        setExpirationDate("")
        setType("")
  };

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

  const handleExpirationData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExpirationDate(e.target.value)
  }

  const handleType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setType(e.target.value)
  }


  return (
    <Modal
      contentLabel="Example Modal"
      isOpen={showUpdateModal}
      style={customStyles}
      onRequestClose={onCloseUpdateModal}
    >
      <h2>登録内容変更</h2>
      <div>食材の変更部分を入力してください</div>

      <form onSubmit={(e) => handleSubmit(e)}>
        <h3>食品名:</h3>
        <input type="name" onChange={handleName}/>
        <h3>数量</h3>
        <input type="quantity" onChange={handleQuantity}/>
        <h3>単位(個, g, mL等...)</h3>
        <input type="unit" onChange={handleUnit}/>
        <h3>賞味期限</h3>
        <input type="expiration" onChange={handleExpirationData}/>
        <h3>種類(野菜, 肉等...)</h3>
        <input type="unit" onChange={handleType}/>
        
        {/* <input>食材の種類: </input> */}
        <ul>
          <button onClick={onCloseUpdateModal}>キャンセル</button>
          <button onClick={onCloseUpdateModal}>登録</button>
        </ul>
      </form>
    </Modal>
  );
};

export default UpdateFoodModal;
