import React from 'react';
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
  closeDeleteModal: () => void;
  FoodId: number | null,
  FoodName: string | null;
  
};

const DeleteFoodModal: React.FC<ModalProps> = ({ 
  showDeleteModal, 
  closeDeleteModal,
  FoodId,
  FoodName,
  }) => {

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const deleteFoodData = {
      id: FoodId,
    };
    fetch(process.env.REACT_APP_API_ENDPOINT+'/backend/delete_food', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(deleteFoodData)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Delete food sucsessfull:', data);
        closeDeleteModal();
      })
      .catch((error) => {
        console.error('Delete food failed:', error)
      });
      console.log(deleteFoodData)
      window.location.reload();
  };

  const handleCancell = (e: any) => {
    closeDeleteModal();
  }

  return (
    <Modal
      contentLabel="Example Modal"
      isOpen={showDeleteModal}
      style={customStyles}
      onRequestClose={closeDeleteModal}
    >
      <h2>食材の削除</h2>
      <div>削除した場合は新しく登録し直さなければいけませんがよろしいですか？</div>
      <h3>本当に削除しますか？</h3>
      <p>削除項目: {FoodName}</p>

      <form onSubmit={handleSubmit}>
        <ul>
          <button type="button"onClick={handleCancell}>キャンセル</button>
          <button type="submit">削除する</button>
        </ul>
      </form>
    </Modal>
  );
};

export default DeleteFoodModal;
