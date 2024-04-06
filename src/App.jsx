import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import { useState } from "react";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import userService from "./utils/userService";
import HomePage from "./pages/HomePage/HomePage";

function App() {
  const [user, setUser] = useState(userService.getUser());

  function handleSignUpOrLogin() {
    setUser(userService.getUser());
    console.log(user);
  }
  function handleLogout() {
    console.log(user, "logout happening");
    userService.logout();
    setUser(null);
  }
  if (user) {
    return (
      <Routes>
        <Route
          path="/"
          element={<HomePage loggedUser={user} handleLogout={handleLogout} />}
        />
        <Route
          path="/login"
          element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin} />}
        />
        <Route
          path="/signup"
          element={<SignupPage handleSignUpOrLogin={handleSignUpOrLogin} />}
        />
        {/* <Route
          path="/:username"
          element={
          <ProfilePage loggedUser={user} handleLogout={handleLogout} />
        }
      /> */}
      </Routes>
    );
  }

  return (
    <Routes>
      <Route
        path="/"
        element={<HomePage loggedUser={user} handleLogout={handleLogout} />}
      />
      <Route
        path="/login"
        element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin} />}
      />
      <Route
        path="/signup"
        element={<SignupPage handleSignUpOrLogin={handleSignUpOrLogin} />}
      />
      <Route path="/*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
