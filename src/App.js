import React from "react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./component/Navbar/Navbar";
import EmployeeContextProvider from "./store/context/employee.context";
import ProjectContextProvider from "./store/context/projects.context";
import SidebarContextProvider from "./store/context/sidebarContext";
import AuthRoute from "./Routes/AuthRoute";
import UnAuthRoute from './Routes/UnAuthRouts';
import './App.css'

export default function App() {

  return (
    <div className="App">
      <SidebarContextProvider>
      <EmployeeContextProvider>
      <ProjectContextProvider>

      <BrowserRouter>
        {localStorage.getItem("user_uid") ?
          <>
            <Navbar />
            <div className="container-fluid" style={{ marginTop: "70px" }}>

            <AuthRoute/>
            </div>
          </>
          :
          <UnAuthRoute/>
        }
        </BrowserRouter>
      </ProjectContextProvider>

      </EmployeeContextProvider>
</SidebarContextProvider>
    </div>
  );
}