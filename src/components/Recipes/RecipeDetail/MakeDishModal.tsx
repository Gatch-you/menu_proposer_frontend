import React from 'react'
import Modal from 'react-modal';
import { Recipe } from '../../../models/Recipe';
import { customStyles } from '../../Design/modalDesign';
import axios from 'axios';

type ModalProps = {
    showMakeModal: boolean;
    closeMakeModal: () => void;
    recipe: Recipe;
}

const MakeDishModal: React.FC<ModalProps> = ({
    showMakeModal,
    closeMakeModal,
    recipe

}) => {
  
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        axios.put(`/api/user/recipes/cooking/${recipe.id}`)
          .then((response) => response.data)
          .then((data) => {
            console.log('Update food sucsessfull:', data);      
          })
          .catch((error) => {
            console.error('Update food failed:', error);
          });
          closeMakeModal(); 
          window.location.reload();
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