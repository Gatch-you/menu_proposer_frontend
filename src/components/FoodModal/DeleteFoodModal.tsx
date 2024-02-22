import React from 'react';
import Modal from 'react-modal';
import { Food } from '../../models/Food'
import { customStyles } from '../Design/modalDesign';
import axios from 'axios';


interface ModalProps {
  showDeleteModal: boolean;
  closeDeleteModal: () => void;
  food: Food
};

const DeleteFoodModal: React.FC<ModalProps> = ({ 
  showDeleteModal, 
  closeDeleteModal,
  food
  }) => {

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
 
    
    const food_id = food.id.toString();

    try {
      const updateData = { quantity: 0 };
      const response = await axios.put(`/api/user/foods/sfdelete/${food_id}`,updateData);
      console.log('Delete food successful:', response.data);
      closeDeleteModal();
    } catch (error) {
      console.error('Delete food failed:', error);
      closeDeleteModal();
    }

    window.location.reload();
  };

  const handleCancel = (e: any) => {
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
      <p>削除項目:{food.name}</p>

      <form onSubmit={handleSubmit}>
        <ul>
          <button type="button"onClick={handleCancel}>キャンセル</button>
          <button type="submit">削除する</button>
        </ul>
      </form>
    </Modal>
  );
};

export default DeleteFoodModal;
