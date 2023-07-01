import React from 'react';
import './App.css';
import Header from './components/Header';
import HomePage from './components/HomePage';
import FoodStrage from './components/FoodStrage';
import Recipe from './components/Recipe';
import RecipeWithFood from './components/RecipeWithFood';
import FoodswithExpirationDate from './components/FoodswithExpirationDate';
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
          <Route path="/foods_strage" element={<FoodStrage />} />
          <Route path='/foods_with_expiration' Component={FoodswithExpirationDate}/>
          <Route path="/recipes" element={<Recipe />} />
          <Route path="/recipes/:recipeId/:recipeName" Component={RecipeWithFood} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


