import {  Route, Routes } from "react-router-dom";
import Login from '../component/Auth/Login';
import Signup from "../component/Auth/Signup";
function AuthRoute () {
    return (
        <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Signup />} />
      </Routes>
    )
}

export default AuthRoute;