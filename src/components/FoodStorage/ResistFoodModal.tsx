import React, {useState, KeyboardEventHandler} from 'react';
import Modal from 'react-modal';
import { Food } from '../Models';
import ResistNewFoodModal from './ResistNewFoodModal'
// import ResistExistiveFoodModal from './ResistExistiveFoodModal';

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
  // const Today = new Date();

  // //useStateでのリアルタイムフィードバック
  // const [name, setName] = useState<Food["name"]>("");
  // const [quantity, setQuantity] = useState<Food["quantity"]>(0.0);
  // const [unit, setUnit] = useState<Food["unit"]>("");
  // const [expiration_date, setExpirationDate] = useState<Food["expiration_date"] | null>(null);
  // const [type, setType] = useState<Food["type"]>("");
  const [showResistNewFoodModal, setShowResistNewFood] = useState(false);
  const [showResistExistiveFoodModal, setShowResistExistiveFoodModal] = useState(false);

  function openResistNewFoodModal() {
    setShowResistNewFood(true);
  }
  function closeResistNewFoodModal() {
    setShowResistNewFood(false);
  }

 function openResistExistiveFoodModal() {
  setShowResistExistiveFoodModal(true);
 }
 function closeResistExistiveFoodModal() {
  setShowResistExistiveFoodModal(false);
 }
  
  //フォームの入力に対して
  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   // jsonの型を設定
  //   const selectDate = expiration_date || Today;

  //   const foodData = {
  //     name: name,
  //     quantity: quantity,
  //     unit: unit,
  //     expiration_date: selectDate.toISOString(),
  //     type: type,
  //   };

  //   // 実際にPOSTリクストを送る
  //   fetch(process.env.REACT_APP_API_ENDPOINT+'/backend/insert_food', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(foodData)
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log('Food registration sucsessfull:', data);
  //       closeResistModal();
  //       //stateの初期化
  //       setName("");
  //       setQuantity(0.0);
  //       setUnit("");
  //       setExpirationDate(null);
  //       setType("");
  //     })
  //     .catch((error) => {
  //       console.error('Food registration failed:', error);
  //     });
  // console.log(foodData)
  // window.location.reload();
  // };
  
  return (
    <Modal
      contentLabel="Example Modal"
      isOpen={showResistModal}
      style={customStyles}
      onRequestClose={closeResistModal}
    >
      <h2>食材登録</h2>
      <div>以前使用した食材を登録しますか？それとも新しい食材を登録しますか？</div>
      <button className='button update-button' onClick={openResistNewFoodModal}>
      <ResistNewFoodModal
        showResistNewFoodModal={showResistNewFoodModal}
        closeResistNewFoodModal={closeResistNewFoodModal}
      />
      新規食材の追加
      </button>
      <button
      className='button'
      onClick={openResistExistiveFoodModal}
      >追加履歴のある食材の追加</button>
      {/* <ResistExistiveFoodModal
        showResistExistiveFoodModal={showResistExistiveFoodModal}
      /> */}
      <button
      className='button delete-button'
      onClick={closeResistExistiveFoodModal}
      >キャンセル</button>

    </Modal>
  );
};

export default ResistFoodModal;