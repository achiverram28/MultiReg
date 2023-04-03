import React, { useState } from "react";
import FirstStep from "../components/FirstStep";
import Header from "../components/Header";
import SecondStep from "../components/SecondStep";
import ThirdStep from "../components/ThirdStep";
import { BrowserRouter, Route, Routes } from "react-router-dom";
const AppRouter = () => {
  const [user, setUser] = useState({});
  const updateUser = (data) => {
    setUser((preUser) => ({ ...preUser, ...data })); //implicit returning an object
    console.log(user);
  };
  const resetUser = () => {
    setUser({});
  };
  return (
    <BrowserRouter>
      <div className="container">
        <Header />
        <Routes>
          <Route
            element={<FirstStep user={user} updateUser={updateUser} />}
            path="/"
            exact={true}
          />
          <Route
            path="/second"
            element={<SecondStep user={user} updateUser={updateUser} />}
          />
          <Route
            path="/third"
            element={
              <ThirdStep
                user={user}
                updateUser={updateUser}
                resetUser={resetUser}
              />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};
export default AppRouter;
