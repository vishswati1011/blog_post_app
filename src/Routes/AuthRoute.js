import {  Route, Routes } from "react-router-dom";
import UploadImage from '../Pages/UploadImage';
import Employee from "../Pages/Employee";
function AuthRoute () {
    return (
        <Routes>
        <Route path="/home" element={<UploadImage />} />
        <Route path="/employee" element={<Employee />}/>
      </Routes>
    )
}

export default AuthRoute;