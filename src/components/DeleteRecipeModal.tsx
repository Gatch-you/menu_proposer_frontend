import React from 'react'
import Modal from 'react-modal'

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
    RecipeName: string | null;
}

const DeleteRecipeModal: React.FC<ModalProps> = ({
    showDeleteModal,
    closeDeleteModal,
    RecipeId,
    RecipeName,
}) => {

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const deleteRecipeData = {
        id: RecipeId
    };
    fetch('http://localhost:8080/backend/delete_recipe', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Acsess-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(deleteRecipeData)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Delete recipe sucsessfully:', data);
        closeDeleteModal();
      })
      .catch((error) => {
        console.error('Delete recipe failed:', error)
      });
      console.log(deleteRecipeData)
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
      <p>削除項目: {RecipeName}</p>

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