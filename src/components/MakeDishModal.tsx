import React from 'react'
import Modal from 'react-modal';

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
    showMakeModal: boolean;
    closeMakeModal: () => void;
    RecipeId: number | null;
}

const MakeDishModal: React.FC<ModalProps> = ({
    showMakeModal,
    closeMakeModal,
    RecipeId

}) => {
  
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        // 実際にPUTクエリを送る
        fetch(`http://localhost:8080/backend/recipe_food/update_food_storage/${RecipeId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Acsess-Control-Allow-Origin': '*',
          },
        })
          .then((response) => response.json())
          .then((data) => {
            console.log('Update food sucsessfull:', data);      
          })
          .catch((error) => {
            console.error('Update food failed:', error);
          });
          closeMakeModal(); 
      };

      const handleCancell = (e: any) => {
        closeMakeModal();
      }

  return (
    <Modal
      contentLabel="Example Modal"
      isOpen={showMakeModal}
      style={customStyles}
      onRequestClose={closeMakeModal}
    >
      <h2>この料理を作成しますか？</h2>

      <form onSubmit={handleSubmit}>
        <ul>
          <button type="button"onClick={handleCancell}>キャンセル</button>
          <button type="submit">作成する</button>
        </ul>
      </form>
    </Modal>
  )
}

export default MakeDishModal;