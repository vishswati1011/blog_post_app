import {  Route, Routes } from "react-router-dom";
import Login from '../Pages/Login';
import Signup from "../Pages/Signup";
function AuthRoute () {
    return (
        <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Signup />} />
      </Routes>
    )
}

export default AuthRoute;