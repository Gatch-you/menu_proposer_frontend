import React from 'react';
import Modal from 'react-modal';
import { Food } from '../../../models/Food';
import axios from 'axios';
import { customStyles } from '../../../modalDesign';
// import { Food } from './Models'

// curl -X DELETE -d '{"recipe_id": 1, "food_id": 14}' http://localhost:8080/backend/delete_using_food
//　一応完成！

type ModalProps = {
  showDeleteModal: boolean;
  closeDeleteModal: () => void;
  recipeId: number
  food: Food | undefined
};

const DeleteFoodinRecipeModal: React.FC<ModalProps> = ({ 
  showDeleteModal, 
  closeDeleteModal,
  recipeId,
  food
  }) => {

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const deleteFoodData = {
      recipe_id: recipeId,
      food_id: food?.id,
    };
    axios.delete(`/api/user/recipes/detail/controllfood/${recipeId}/${food?.id}`)
      .then((response) => response.data)
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
      <p>削除する食材名:{food?.name}{food?.quantity} </p>

      <form onSubmit={handleSubmit}>
        <ul>
          <button type="button"onClick={handleCancell}>キャンセル</button>
          <button type="submit">削除する</button>
        </ul>
      </form>
    </Modal>
  );
};

export default DeleteFoodinRecipeModal;
