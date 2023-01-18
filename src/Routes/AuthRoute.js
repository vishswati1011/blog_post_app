import {  Route, Routes } from "react-router-dom";
import UploadImage from '../Pages/UploadImage';
import Employee from "../component/Employee/Employee";
import Project from "../component/Project/Project";
import Blog from "../component/Blog/Blog";
import Sidebar from "../component/Navbar/Sidebar";
import { DrawerContext } from "../store/context/sidebarContext";
import { useContext } from "react";
import Profile from "../component/Profile/Profile";
import AddBlog from "../component/Blog/AddBlog";
import Dashboard from "../component/Dashboard/Dashboard";
import AddProject from '../component/Project/AddProject'
import Map from '../component/Map/Map3'

function AuthRoute () {
    const drawer=useContext(DrawerContext);
    return (
      <div className="">
      <div className="row d-flex">
              <div className={drawer.show?"col-sm-2 col-md-2 col-xs-2 col-lg-2":"col-sm-3 col-md-3 col-lg-3 col-xs-3"}><Sidebar/></div>
              <div className={drawer.show?"col-sm-6 col-md-8 col-xs-8 col-lg-8":"col-sm-9 col-md-9 col-lg-9 col-xs-9"}>
              <Routes>
                    <Route path="/home" element={<Dashboard />} />
                    <Route path="/employee" element={<Employee />}/>
                    <Route path="/project" element={<Project />}/>
                    <Route path="/addProject" element={<AddProject />}/>
                    <Route path="/map" element={<Map />}/>


                    <Route path="/blog" element={<Blog />}/>
                    <Route path="/addblog" element={<AddBlog />}/>
                    <Route path="/profile" element={<Profile />}/>
              </Routes>
        </div>
        </div>
      </div>
        
    )
}

export default AuthRoute;