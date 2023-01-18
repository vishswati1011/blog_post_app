
import { useState ,useContext,useEffect} from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { FaList, FaRegHeart ,FaBlog} from "react-icons/fa";
import { FiHome, FiLogOut, FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
import { RiPencilLine } from "react-icons/ri";
import { BiCog } from "react-icons/bi";
import {BsFillPersonLinesFill,BsPersonFill} from 'react-icons/bs'
import {MdGroups} from 'react-icons/md'
import {AiOutlineAppstoreAdd} from 'react-icons/ai'
import {HiUserGroup} from 'react-icons/hi'
import { Link } from 'react-router-dom';
import {DrawerContext} from '../../store/context/sidebarContext'
 
function SidebarComponent() {

    const sideCtx=useContext(DrawerContext);

    const drawer=sideCtx.show
    const [show,setShow]=useState();

    useEffect(()=>{
        setShow(drawer)
    },[drawer])
    const openDrawer =()=>{
        sideCtx.openDrawer();
    }
    return (

        <Sidebar defaultCollapsed={show} onClick={()=>openDrawer()}>
            <div className="closemenu" onClick={()=>openDrawer()}>
            </div>
            <Menu iconShape="square">
              <MenuItem   routerLink={<Link to="/map" />} icon={<FiHome />}>
                Dashboard1
              </MenuItem>
              <MenuItem   routerLink={<Link to="/map" />} icon={<FiHome />}>
                Map
              </MenuItem>
              <MenuItem routerLink={<Link to="/profile" />} icon={<BsPersonFill />}>Profile</MenuItem>
              <MenuItem routerLink={<Link to="/employee" />} icon={<MdGroups />}>Employee</MenuItem>
              <MenuItem routerLink={<Link to="/project" />} icon={<RiPencilLine />}>Project</MenuItem>
              <MenuItem routerLink={<Link to="/addBlog" />} icon={<AiOutlineAppstoreAdd/>}>AddBlog</MenuItem>

              <MenuItem routerLink={<Link to="/blog" />} icon={<FaBlog />}>Blog</MenuItem>
            </Menu>
        </Sidebar>
    )
}
export default SidebarComponent;