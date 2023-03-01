import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Dashboard from "./component/Dashboard/Dashboard";
import EmployeeContextProvider from "./store/context/employee.context";
import ProjectContextProvider from "./store/context/projects.context";
import SidebarContextProvider from "./store/context/sidebarContext";
import UnAuthRoute from './Routes/UnAuthRouts';
import './App.css'
import findTime from "./component/UserActivity";
var mouseMovementCount = 0;

export default function App() {
  // window.addEventListener("beforeunload", function (e) {
  //                             //Webkit, Safari, Chrome
  //  
    
  // });

//   window.onbeforeunload = function () {
//     // return "Do you really want to close?";
//     const pagename=window.location.pathname.slice(1,window.location.pathname.length);
//     console.log("pathname",pagename)
//     //   alert("hello")
//       findTime(pagename)
// };

window.onbeforeunload = function(e) {
  var dialogText = 'are you sure?';
  e.returnValue = dialogText;
  const pagename=window.location.pathname.slice(1,window.location.pathname.length);
    console.log("pathname",pagename)
      alert("hello")
      // findTime(pagename)
  return dialogText;
};
  return (
    <div className="App">
      <SidebarContextProvider>
      <EmployeeContextProvider>
      <ProjectContextProvider>
      <BrowserRouter>
        {localStorage.getItem("blog_user_uid") ?
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