import React from 'react';
import Modal from 'react-modal';
// import { Food } from './Models'

// curl -X DELETE -d '{"recipe_id": 1, "food_id": 14}' http://localhost:8080/backend/delete_using_food
//　一応完成！

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
  RecipeId: number | null;
  FoodId: number | null;
  FoodName: string | null;
};

const DeleteFoodinRecipeModal: React.FC<ModalProps> = ({ 
  showDeleteModal, 
  closeDeleteModal,
  RecipeId,
  FoodId,
  FoodName,
  }) => {

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const deleteFoodData = {
      recipe_id: RecipeId,
      food_id: FoodId,
    };
    fetch('http://localhost:8080/backend/delete_using_food', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Acsess-Control-Allow-Origin': '*',
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
      <p>削除項目: レシピ番号:{RecipeId}, 食材番号:{FoodId}, 食材名:{FoodName} </p>

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
