import React from 'react';
import './App.css';
import Header from './components/Header';
import HomePage from './components/HomePage';
import FoodStrage from './components/FoodStrage';
import Recipe from './components/Recipe';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Header/>
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/foods_strage" element={<FoodStrage />} />
          <Route path="/recipes" element={<Recipe />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
