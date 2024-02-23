import React from 'react';
import './App.css';
import FoodswithExpiration from './pages/FoodswithExpiration';
import RecipeWithFood from './pages/RecipeWithFood';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Users from './pages/Users'
import Register from './pages/Register'
import Login from './pages/Login'
import { RedirectToUsers } from './components/RedirectToUser';
import FoodList from './pages/Foods';
import Recipes from './pages/Recipes';
import UserProfile from './pages/UserProfile';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path={"/"} Component={RedirectToUsers} />
          <Route path={'/home'} Component={Users}/>
          <Route path={'/login'} Component={Login}/>
          <Route path={'/register'} Component={Register}/>
          <Route path={'/recipes'} Component={Recipes}/>
          <Route path={'/profile'} Component={UserProfile}/>

          {/* <Route path={'/reset_password'}/>*/}
          <Route path={'/foods_storage'} element={<FoodList />} />
          <Route path={'/foods_with_expiration'} Component={FoodswithExpiration}/>

          <Route path={"/recipes/:recipeId/:recipeName"} Component={RecipeWithFood} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


