import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Dashboard from "./component/Dashboard/Dashboard";
import EmployeeContextProvider from "./store/context/employee.context";
import ProjectContextProvider from "./store/context/projects.context";
import SidebarContextProvider from "./store/context/sidebarContext";
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
            <Dashboard />
            {/* <div className="container-fluid" style={{ marginTop: "70px" }}>

            <AuthRoute/>
            </div> */}
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

//https://codesandbox.io/s/material-ui-responsive-dashboard-forked-l91tfk