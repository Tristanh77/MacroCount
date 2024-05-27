import React, { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage/LoginPage';
import SignupPage from './pages/SignupPage/SignupPage';
import userService from './utils/userService';
import HomePage from './pages/HomePage/HomePage';
import OverviewPage from './pages/OverviewPage/OverviewPage';
import GoalsPage from './pages/GoalsPage/GoalsPage';
import CreateProfilePage from './pages/CreateProfilePage/CreateProfilePage';
import ExercisePage from './pages/ExercisePage/ExercisePage';
import MealPage from './pages/MealPage/MealPage';
import DailyMeals from './pages/DailyMeals/DailyMeals';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import EditProfilePage from './pages/EditProfilePage/EditProfilePage';
import Footer from './components/footer/Footer';
import Header from './components/Header/Header'; // Import Header component
import './components/Footer/Footer.css';
import './components/Header/Header.css';

function App() {
  const [user, setUser] = useState(userService.getUser());

  function handleSignUpOrLogin() {
    setUser(userService.getUser());
    console.log(user);
  }

  function handleLogout() {
    console.log(user, 'logout happening');
    userService.logout();
    setUser(null);
  }

  return (
    <>
      <Header /> {/* Include Header component */}
      {user ? (
        <>
          <Routes>
            <Route path="/" element={<OverviewPage loggedUser={user} handleLogout={handleLogout} />} />
            <Route path="/login" element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin} />} />
            <Route path="/signup" element={<SignupPage handleSignUpOrLogin={handleSignUpOrLogin} />} />
            <Route path="/goals" element={<GoalsPage loggedUser={user} handleLogout={handleLogout} />} />
            <Route path="/create-profile" element={<CreateProfilePage loggedUser={user} handleLogout={handleLogout} />} />
            <Route path="/exercise" element={<ExercisePage loggedUser={user} handleLogout={handleLogout} />} />
            <Route path="/meal" element={<MealPage loggedUser={user} handleLogout={handleLogout} />} />
            <Route path="/daily" element={<DailyMeals loggedUser={user} handleLogout={handleLogout} />} />
            <Route path="/profile" element={<ProfilePage loggedUser={user} handleLogout={handleLogout} />} />
            <Route path="/edit-profile" element={<EditProfilePage loggedUser={user} handleLogout={handleLogout} />} />
          </Routes>
          <Footer /> {/* Include Footer component */}
        </>
      ) : (
        <Routes>
          <Route path="/" element={<HomePage loggedUser={user} handleLogout={handleLogout} />} />
          <Route path="/login" element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin} />} />
          <Route path="/signup" element={<SignupPage handleSignUpOrLogin={handleSignUpOrLogin} />} />
          <Route path="/*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </>
  );
}

export default App;
