import React, {useState, KeyboardEventHandler} from 'react'
import  Modal  from 'react-modal';
import { Recipe } from './Models';

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
}

const ResistRecipeModal: React.FC<ModalProps> = ({
    showResistModal, closeResistModal, }) => {

  const [name, setName] = useState<Recipe["name"] | null>(null);
  const [description, setDescription] = useState<Recipe["description"] | null>(null);
  const [image, setImage] = useState<Recipe["image"] | null>(null);
  const [making_method, setMethod] = useState<Recipe["making_method"] | null>(null);

  const handleKeyDown: KeyboardEventHandler<HTMLFormElement> = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      // ここでEnterキーが押された後の処理を実行する
    }
  };


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const recipeData = {
        name: name,
        description: description,
        image: image,
        making_method: making_method,
    };

    fetch('http://localhost:8080/backend/insert_recipe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(recipeData)
    })
      .then((response) => response.json)
      .then((data) => {
        console.log('Recipe resistrarion sucsessfull:', data);
        closeResistModal();

        setName("");
        setDescription("");
        setImage("")
        setMethod("")
      })
      .catch((error) => {
        console.error('Reccipe resistration failed:', error);
      })
    console.log(recipeData)
  };
// 使用食材の登録を行う際のsubmit処理後ほど
  // const handleSubmitWithFood = (e: React.FormEvent<HTMLFormElement>) => {
  //   const recipeData = {
  //       name: name,
  //       description: description,
  //       image: image,
  //       making_method: making_method,
  //   };

  //   fetch('http://localhost:8080/backend/insert_recipe', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Access-Control-Allow-Origin': '*',
  //       },
  //       body: JSON.stringify(recipeData)
  //   })
  //     .then((response) => response.json)
  //     .then((data) => {
  //       console.log('Recipe resistrarion sucsessfull:', data);
  //       closeResistModal();

  //       setName("");
  //       setDescription("");
  //       setImage("")
  //       setMethod("")
  //     })
  //     .catch((error) => {
  //       console.error('Reccipe resistration failed:', error);
  //     })
  //   console.log(recipeData)
  // };

  const handleCancell = (e: any) => {
    closeResistModal();
    setName('');
    setDescription('');
    setImage('');
    setMethod('');
  }

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }

  const handleDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  }
  
  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImage(e.target.value);
  }

  const handleMethod = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMethod(e.target.value);
  }

  return (
    <Modal
      contentLabel='Example Modal'
      isOpen={showResistModal}
      style={customStyles}
      onRequestClose={closeResistModal}
    >
      <h2>レシピの登録</h2>
      <div>以下のフォームにレシピを追加してください</div>

      <form onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
        <h3>レシピ名</h3>
        <input type="name" onChange={handleName}/>
        <h3>レシピの説明</h3>
        <input type="description" onChange={handleDescription} />
        <h3>レシピの画像</h3>
        <input type="img" onChange={handleImage} />
        <h3>つくりかた</h3>
        <input type="method" onChange={handleMethod}/>

        <ul>
          <button type="button" onClick={handleCancell}>キャンセル</button>
          <button type="submit">登録</button>
        </ul>
      </form>
      {/* 使用食材の登録を行うフォームの作成 */}
      {/* <form onSubmit={handleSubmitWithFood} onKeyDown={handleKeyDown}>

      </form> */}
    </Modal>

  )
}

export default ResistRecipeModal