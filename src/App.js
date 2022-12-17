import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './Pages/Login';
import Navbar from "./Pages/Navbar";
import Signup from './Pages/Signup'
import UploadImage from "./Pages/UploadImage";
import Employee from './Pages/Employee'
export default function App() {

  return (
    <div className="App">
      <BrowserRouter>
        {localStorage.getItem("user_uid") ?
          <>
            <Navbar />
            <div class="container-fluid" style={{ marginTop: "80px" }}>
              <Routes>
                <Route path="/home" element={<UploadImage />} />
                <Route path="/employee" element={<Employee />}/>
              </Routes>
            </div>
          </>
          :
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Signup />} />
          </Routes>
        }
      </BrowserRouter>
    </div>
  );
}