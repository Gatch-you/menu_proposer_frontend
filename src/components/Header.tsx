import React from 'react'
import {Link} from "react-router-dom"

const Header = () => {
  return (
    <header>
        <div>
            <h3>Portforio-Recpe-food-app</h3>
        </div>

        <nav>
            <ul>
                <li>
                    <Link to="/">ホーム</Link>
                </li>
                <li>
                    <Link to="/foods_strage">食材ストレージ</Link>
                </li>
                <li>
                    <Link to="/recipes">レシピ</Link>
                </li>
            </ul>
        </nav>
    </header>
  )
}

export default Header


// とりあえず以下にmodal置いとく




// import React, {useState} from 'react'

// type ModalProps = {
//     showModal: boolean;
//     onClose: () => void;
//     onRegister: () => void;
// }


// const SubmitResistFoodModal; React.FC<ModalProps> = ({ showModal, onClose, onRegister }) => {
//     const [neme, setName] = useState("");
//     const [quqntity, setQuantity] = useState(0.0);
//     const [unit, setUnit] = useState("");
//     const [expiration_date, setExpirationDate] = useState("")
//     const [type, setType] = useState("")

//     const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
//         // console.log(e.target.value)
//         setName(e.target.value)
//     }

//     const handleQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const value = parseFloat(e.target.value);
//         setQuantity(value);
//     }

//     const handleUnit = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setUnit(e.target.value)
//     }

//     const handleExpirationData = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setExpirationDate(e.target.value)
//     }

//     const handletype = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setType(e.target.value)
//     };

//     const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         onClose();

//         setName("")
//         setQuantity(0.0)
//         setUnit("")
//         setExpirationDate("")
//         setType("")
//         //curlのクエリを送る処理はここに書くのかな？
//     };

//     if (!showModal) {
//         return null;
//     }

//     return (
//         <div>
//         <form onSubmit={(e) => handleSubmit(e)}>
//             <input 
//               type="text" 
//               onChange={(e) => handleName(e)}/>
//             <input
//               type="quantity"
//               onChange={(e) => handleQuantity(e)}
//             />
//             <input
//               type="unit"
//               onChange={(e) => handleUnit(e)}
//             />
//             <input
//               type="expirationData"
//               onChange={(e) => handleExpirationData(e)}
//             />
//             <input
//               type="type"
//               onChange={(e) => handletype(e)}
//             />
//             <input type="submit" value="登録"onClick={() => {}}/>
//         </form>
//         </div>
//     );
// }

// export default SubmitResistFoodModal;

// import React, { useState } from 'react';

// // type ModalProps = {
// //   showModal: boolean;
// //   onClose: () => void;
// //   onRegister: () => void;
// // };

// // const SubmitResistFoodModal: React.FC<ModalProps> = ({ showModal, onClose, onRegister }) => {
// //   const [name, setName] = useState('');
// //   const [quantity, setQuantity] = useState(0.0);
// //   const [unit, setUnit] = useState('');
// //   const [expirationDate, setExpirationDate] = useState('');
// //   const [type, setType] = useState('');

// //   const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     setName(e.target.value);
// //   };

// //   const handleQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const value = parseFloat(e.target.value);
// //     setQuantity(value);
// //   };

// //   const handleUnit = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     setUnit(e.target.value);
// //   };

// //   const handleExpirationDate = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     setExpirationDate(e.target.value);
// //   };

// //   const handleType = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     setType(e.target.value);
// //   };

// //   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
// //     e.preventDefault();
// //     onClose(); // モーダルを閉じる処理

// //     const foodData = {
// //       name,
// //       quantity,
// //       unit,
// //       expiration_date: expirationDate,
// //       type,
// //     };

// //     // バックエンドへのPOSTリクエストを行う処理を実装
// //     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
// //         e.preventDefault();
      
// //         const response = await fetch('http://localhost:8080/backend/insert_food', {
// //           method: 'POST',
// //           headers: {
// //             'Content-Type': 'application/json',
// //           },
// //           body: JSON.stringify({
// //             name: name,
// //             quantity: quantity,
// //             unit: unit,
// //             expiration_date: expirationDate,
// //             type: type,
// //           }),
// //         });
      
// //         if (response.ok) {
// //           console.log('Food registered successfully');
// //           onClose(); // モーダルを閉じる処理などを行う
// //         } else {
// //           console.log('Failed to register food');
// //           // エラーハンドリングなどを行う
// //         }
// //       };
      
// //     // データを送信するためのfetchなどのAPI呼び出しをここに追加

// //     // 登録後、フォームをリセットする
// //     setName('');
// //     setQuantity(0.0);
// //     setUnit('');
// //     setExpirationDate('');
// //     setType('');
// //   };

// //   if (!showModal) {
// //     return null;
// //   }

// //   return (
// //     <div>
// //       <form onSubmit={handleSubmit}>
// //         <input type="text" value={name} onChange={handleName} />
// //         <input type="number" value={quantity} onChange={handleQuantity} />
// //         <input type="text" value={unit} onChange={handleUnit} />
// //         <input type="date" value={expirationDate} onChange={handleExpirationDate} />
// //         <input type="text" value={type} onChange={handleType} />
// //         <input type="submit" value="登録" />
// //         <button onClick={onClose}>キャンセル</button>
// //       </form>
// //     </div>
// //   );
// // };

// // export default SubmitResistFoodModal;