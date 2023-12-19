import React, {useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import {Food} from '../Models'
import ResistFoodModal from './ResistFoodModal';
import UpdateFoodModal from './UpdateFoodModal';
import DeleteFoodModal from './DeleteFoodModal';
import {Link} from 'react-router-dom'
import '../Design/FoodStorage.css';

const SearchFood: React.FC = () => {
  const { searchWord } = useParams();
  const [foods, setFoods] = useState<Food[]>([])
  const [showResistModal, setShowResistModal] = useState(false);
  
//   useEffect(() => {
//     fetchFoods(searchWord);
//   }, [searchWord]);

    // async function fetchFoods(searchWord: string | undefined) {
    //   try {
    //     const response = await fetch( process.env.REACT_APP_API_ENDPOINT + `/backend/search_name?=肉`)
    //     const jsonData = await response.json();
    //     setFoods(jsonData);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // }


  function openResistModal() {
    setShowResistModal(true)
  }

  return (
    <div className='container'>
      <h1 className='logo'>Food Storage</h1>
      <div className='button-group'>
        <button className='button' onClick={openResistModal}>新しい食材の追加</button>
        <Link to={`/foods_with_expiration`}>
          <button className='button'>賞味期限が近い食材一覧</button>
        </Link>
      </div>
    </div>
  )
}

export default SearchFood