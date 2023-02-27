import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Dashboard from "./component/Dashboard/Dashboard";
import EmployeeContextProvider from "./store/context/employee.context";
import ProjectContextProvider from "./store/context/projects.context";
import SidebarContextProvider from "./store/context/sidebarContext";
import UnAuthRoute from './Routes/UnAuthRouts';
import './App.css'
var mouseMovementCount = 0;

export default function App() {
  // const myFunction =() =>{
  //   console.log("remove mouse listener",mouseMovementCount)
  // }
  // useEffect(()=>{
  //   console.log(window.location.pathname,"window.location.pathname",window.location.pathname==='/profile')
            
  //             if(window.location.pathname==='/profile'){
  //           window.addEventListener('mousemove', () => {
  //               console.log("profile mouse move",mouseMovementCount.toFixed(2))
  //               mouseMovementCount += 1;  });
  //           }else{
  //             window.removeEventListener('mousemove',myFunction)
  //           }
  //           const date =new Date();
  //           const current_Date=date.toString().slice(4,15);
  //           const current_Time=date.toString().slice(16,24)
  //           var time =current_Time.split(":")
  //           const hours=Number(time[0]), min=Number(time[1]), sec=Number(time[2])
    
  //           // const data={ 
  //           //     VisitedDate:current_Date,
  //           //     TrackData : {
  //           //         UserId,
  //           //         VisitedPages:[{
  //           //             pagename:"home",
  //           //             visitedtime:{hours:hours,min:min,sec:sec }
  //           //         }]
  //           //     }
  //           // }
  //           // console.log("data",data) 
  //           return () => {
  //               console.log( "removeEventListener");
  //               window.removeEventListener("mousemove",myFunction)
  //               // componentwillunmount in functional component.
  //               // Anything in here is fired on component unmount.
  //               // socket.emit("update_status", data)
    
  //           }
    
            
  //         },[])
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