import React from 'react'
import Modal from 'react-modal'
import { Recipe } from '../../models/Recipe';
import axios from 'axios';
import { customStyles } from '../../modalDesign';

type ModalProps = {
    showDeleteModal: boolean;
    closeDeleteModal: () => void;
    recipe: Recipe;
}

const DeleteRecipeModal: React.FC<ModalProps> = ({
    showDeleteModal,
    closeDeleteModal,
    recipe,
    }) => {

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
    
      try {
        const response = await axios.delete(`/api/user/recipes/${recipe.id}`);
        console.log("Delete recipe success:", response.data);
        closeDeleteModal();
      } catch (error) {
        console.log("Delete recipe failed:", error)
        closeDeleteModal();
      }
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
      <p>削除項目: {recipe.name}</p>

      <form onSubmit={handleSubmit}>
        <ul>
          <button type="button" onClick={handleCancell}>キャンセル</button>

          <button type="submit">削除する</button>
        </ul>
      </form>      
    </Modal>
  );
};

export default DeleteRecipeModal