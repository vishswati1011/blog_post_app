import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Dashboard from "./component/Dashboard/Dashboard";
import EmployeeContextProvider from "./store/context/employee.context";
import ProjectContextProvider from "./store/context/projects.context";
import SidebarContextProvider from "./store/context/sidebarContext";
import UnAuthRoute from './Routes/UnAuthRouts';
import './App.css'
import io from "socket.io-client";

// var socket = io("http://localhost:8000");

const socket = io('http://localhost:8000', {
    reconnectionDelay: 1000,
    reconnection: true,
    reconnectionAttemps: 10,
    transports: ['websocket'],
    agent: false,
    upgrade: false,
    rejectUnauthorized: false
});
export default function App() {

  useEffect(()=>{
    console.log("App.js funciton emit")
    socket.emit("connection");

    const data={date:new Date,userid:"asdhfjhadskjf",visit:[{pagename:"home",visitedtime:"15:30:00"}]}
    socket.emit("update_status", data)
  },[])
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