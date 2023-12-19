// import React, {useState, KeyboardEventHandler} from 'react'
// import Modal from 'react-modal';
// import DatePicker from 'react-datepicker'
// import { Food } from '../Models'
// import "react-datepicker/dist/react-datepicker.css"

// const customStyles = {
//   content: {
//     top: '50%',
//     left: '50%',
//     right: 'auto',
//     bottom: 'auto',
//     marginRight: '-50%',
//     transform: 'translate(-50%, -50%)',
//   },
// };

// type ModalProps = {
//     showResistExistiveFoodModal: boolean;
// }

// const ResistExistiveFoodModal: React.FC<ModalProps> = (
//     showResistExistiveFoodModal,
// ) => {

// const [expiration_date, setExpirationDate] = useState<Food[] | null>(null)
// const [use_amountError, setuse_AmountError] = useState('');

// const isInputValid = !use_amountError

// function handleSubmit() {

// }

// function handleKeyDown() {

// }

// function handleCancell() {

// }

// function handleQuantity() {

// }
  
//   return (
//     <Modal
//       contentLabel="Example Modal"
//       isOpen={showResistExistiveFoodModal}
//       style={customStyles}
//       // onRequestClose={closeResistExistiveFoodModal}
//     >
//       <h2>食材登録</h2>
//       <div>仕入れた食材を追加してください</div>
//       <form 
//         onSubmit={handleSubmit} 
//         onKeyDown={handleKeyDown}
//       >
//         <h3>数量</h3>
//         <input 
//           type="quantity" 
//           onChange={handleQuantity}
//           placeholder='数量を入力してください'
//           />
//           {quantityError && <p>{quantityError}</p>}

//         <h3>賞味期限</h3>
//         <DatePicker
//           dateFormat="yyyy/MM/dd"
//           selected={expiration_date}
//           onChange={(date: Date | null) => setExpirationDate(date)}
//           />
//         {/* <input>食材の種類: </input> */}
//         <ul>
//           <button 
//             type="button" 
//             onClick={handleCancell}>キャンセル</button>
//           <button 
//             type="submit" 
//             disabled={!isInputValid}>登録</button>
//         </ul>
//       </form>
//     </Modal>

//   )
// }

// export default ResistExistiveFoodModal

