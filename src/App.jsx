/* import { useState } from "react"; */
import { BrowserRouter, Routes, Route } from "react-router-dom";

import DefaultLayout from "./layouts/DefaultLayout";

import { DataContextProvider } from "./context/dataContext";

import HomePage from "./pages/HomePage";
import AboutUsPage from "./pages/AboutUsPage";
import ShowPage from "./pages/ShowPage";
import AddPropertyPage from "./pages/AddPropertyPage";
import AdvanceSearchPage from "./pages/AdvanceSearchPage";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import UserProperties from "./pages/UserProperties";

function App() {
  return (
    <>
      <DataContextProvider>
        <BrowserRouter>
          <Routes>
            <Route Component={DefaultLayout}>
              <Route index Component={HomePage} />
              <Route path="/advanceSearch" Component={AdvanceSearchPage} />
              <Route path="/aboutUs" Component={AboutUsPage} />
              <Route path="/:id" Component={ShowPage} />
              <Route path="/store" Component={AddPropertyPage} />
              <Route path="/login" Component={LoginPage} />
              <Route path="/register" Component={RegistrationPage} />
              <Route path="/userproperties" Component={UserProperties} />
            </Route>
          </Routes>
        </BrowserRouter>
      </DataContextProvider>
    </>
  );
}

export default App;
