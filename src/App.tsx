import React from 'react';
import './App.css';
import Header from './components/Header';
import HomePage from './components/Home/HomePage';
import FoodStrage from './components/FoodStorage/FoodStorage';
import Recipe from './components/Recipes/Recipe';
import RecipeWithFood from './components/Recipes/RecipeDetail/RecipeWithFood';
import FoodswithExpirationDate from './components/FoodStorage/FoodswithExpirationDate';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Header/>
        
        <Routes>
          {/* 以下のRouteにてページのルーティングを行う。
          ボタンなどを押すときに遷移させるには、そのボタンに対して<Link>タグを使用する */}
          <Route path="/" element={<HomePage />} />
          <Route path="/foods_storage" element={<FoodStrage />} />
          <Route path='/foods_with_expiration' Component={FoodswithExpirationDate}/>
          <Route path="/recipes" element={<Recipe />} />
          <Route path="/recipes/:recipeId/:recipeName" Component={RecipeWithFood} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


