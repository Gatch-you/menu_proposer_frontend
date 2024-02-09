// import React, { useState, useEffect } from 'react';
// import { Food } from '../../models/Models';
// import RegisterFoodModal from './RegisterFoodModal';
// // import UpdateFoodModal from './UpdateFoodModal';
// // import DeleteFoodModal from './DeleteFoodModal';
// import { Link } from 'react-router-dom';
// // import './FoodStorage.css';
// import '../Design/FoodStorage.css';
// import axios from 'axios';
// import Header from '../Header';

// const FoodStorage: React.FC = () => {
//   const [foods, setFoods] = useState<Food[] | null>(null);
//   const [showRegistModal, setShowRegistModal] = useState(false);
//   const [showUpdateModal, setShowUpdateModal] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [FoodId, setFoodId] = useState<Food["id"] | null>(null);
//   const [FoodName, setFoodName] = useState<Food["name"]>("");
//   const [FoodQuantity, setFoodQuantity] = useState<Food["quantity"] | null>(null);
//   const [FoodUnit, setFoodUnit] = useState<Food["unit"] | null>(null);
//   const [FoodExpiratinData, setFoodExpirationDate] = useState<Food["expiration_date"] | null>(null);
//   const [FoodFormattedDate, setFoodFormattedDate] = useState<Food["formatted_date"] | null>(null);
//   const [FoodType, setFoodType] = useState<Food["type"] | null>(null);
  
//   function openRegistModal() {
//     setShowRegistModal(true);
//   }
//   function closeRegisterModal() {
//     setShowRegistModal(false);
//   }

//   function openUpdateModal(foodId: number, foodName: string, fooodQuantity: number,foodUnit: string, FoodExpiratinData: Food["expiration_date"], foodFormattedDate: string,foodType: string) {
//       setFoodId(foodId);
//       setFoodName(foodName);
//       setFoodQuantity(fooodQuantity)
//       setFoodUnit(foodUnit);
//       setFoodType(foodType);
//       setFoodExpirationDate(FoodExpiratinData)
//       setFoodFormattedDate(foodFormattedDate)
//       setShowUpdateModal(true);
//   }
//   function closeUpdateModal() {
//     setShowUpdateModal(false);
//   }

//   function openDeleteModal(foodId: number, foodName: string) {
//     setFoodId(foodId);
//     setFoodName(foodName);
//     setShowDeleteModal(true);
//   }
//   function closeDeleteModal() {
//     setShowDeleteModal(false);
//   }

//   useEffect(() => {
//     fetchFoods();
//   }, []);

//   async function fetchFoods() {
//     try {
//       const response = await axios.get('/api/user/foods');
//       const jsonData = await response.data
//       setFoods(jsonData);
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   // useEffect(() => {
//   //   console.log(foods);
//   // }, [foods]);

//   return (

//     <div className="container">
//       <h1 className='logo'>Food Storage</h1>
//       <div className='button-group'>
//         <button className='button' onClick={openRegistModal}>新しい食材の追加</button>
//         <Link to={`/foods_with_expiration`}>
//           <button className='button'>賞味期限が近い食材一覧</button>
//         </Link>
//       </div>
//       {foods === null ? (
//       <>
//         <button onClick={openRegistModal}>新しい食材の追加</button><RegisterFoodModal showRegistModal={showRegistModal} closeRegisterModal={closeRegisterModal} />
//         <p>Loading or Nothing...</p>
//       </>
//       ) : (
//         <ul className='list'>
//           <RegisterFoodModal showRegistModal={showRegistModal} closeRegisterModal={closeRegisterModal} />

//           {foods.map((food) => (
//             <li className="list-item"key={food.id}>
//               {/* <p>{food.id}</p> */}
//               <p className='list-item-text'>材料名: {food.name}</p>
//               <p className='list-item-text'>量: {food.quantity} {food.unit}</p>
//               <p className='list-item-text'>種類: {food.type}</p>
//               <p className='list-item-text'>賞味期限: {food.formatted_date}</p>
//               <button className="button delete-button" onClick={() => openDeleteModal(food.id, food.name)}>削除</button>
//               {/* <DeleteFoodModal
//                 showDeleteModal={showDeleteModal} 
//                 closeDeleteModal={closeDeleteModal}
//                 Food={food} /> */}

//               <button className="button update-button" onClick={() => openUpdateModal(food.id, food.name, food.quantity, food.unit, food.expiration_date, food.formatted_date, food.type)}>食材情報の変更</button>
//               {/* <UpdateFoodModal 
//                 showUpdateModal={showUpdateModal} 
//                 closeUpdateModal={closeUpdateModal} 
//                 FoodId={FoodId} 
//                 FoodName={FoodName} 
//                 FoodQuantity={FoodQuantity}
//                 FoodUnit={FoodUnit}
//                 FoodExpiratinDate={FoodExpiratinData}
//                 FoodFormattedDate={FoodFormattedDate}
//                 FoodType={FoodType}
//                 /> */}
//               <p>　</p>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default FoodStorage;
