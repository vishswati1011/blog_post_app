import React from "react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./Pages/Navbar/Navbar";
import EmployeeContextProvider from "./store/context/employee.context";
import AuthRoute from "./Routes/AuthRoute";
import UnAuthRoute from './Routes/UnAuthRouts';
export default function App() {

  return (
    <div className="App">
      <EmployeeContextProvider>

      <BrowserRouter>
        {localStorage.getItem("user_uid") ?
          <>
            <Navbar />
            <div class="container-fluid" style={{ marginTop: "80px" }}>
              <AuthRoute/>
            </div>
          </>
          :
          <UnAuthRoute/>
        }
        </BrowserRouter>
      </EmployeeContextProvider>

    </div>
  );
}