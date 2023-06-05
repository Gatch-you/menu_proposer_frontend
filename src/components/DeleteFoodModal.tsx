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
  showDeleteModal: boolean;
  onCloseDeleteModal: () => void;
};

const DeleteFoodModal: React.FC<ModalProps> = ({ showDeleteModal, onCloseDeleteModal }) => {

    const [neme, setName] = useState("");
    const [quqntity, setQuantity] = useState(0.0);
    const [unit, setUnit] = useState("");
    const [expiration_date, setExpirationDate] = useState("")
    const [type, setType] = useState("")

    //またあとでAPIの実装を書く
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
        onCloseDeleteModal();

        setName("")
        setQuantity(0.0)
        setUnit("")
        setExpirationDate("")
        setType("")
  };
  
//Delete処理時にはいらない？
//   const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setName(e.target.value)
//   }

//   const handleQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = parseFloat(e.target.value);
//     setQuantity(value);
//   }

//   const handleUnit = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setUnit(e.target.value)
//   }

//   const handleExpirationData = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setExpirationDate(e.target.value)
//   }

//   const handleType = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setType(e.target.value)
//   }


  return (
    <Modal
      contentLabel="Example Modal"
      isOpen={showDeleteModal}
      style={customStyles}
      onRequestClose={onCloseDeleteModal}
    >
      <h2>食材の削除</h2>
      <div>削除した場合は新しく登録し直さなければいけませんがよろしいですか？</div>
      <h3>本当に削除しますか？</h3>

      <form onSubmit={(e) => handleSubmit(e)}>
        <ul>
          <button onClick={onCloseDeleteModal}>キャンセル</button>
          <button onClick={onCloseDeleteModal}>削除する</button>
        </ul>
      </form>
    </Modal>
  );
};

export default DeleteFoodModal;
