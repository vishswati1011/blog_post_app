
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
            <Link to="/dashboard" >
              <MenuItem    icon={<FiHome />}>
                Dashboard1
              </MenuItem>
              </Link>
              <Link to="/map" >
              <MenuItem  icon={<FiHome />}>
                Map
              </MenuItem>
              </Link>
              <Link to="/profile">
              <MenuItem  icon={<BsPersonFill />}>Profile</MenuItem>
              </Link>
              <Link to="/employee">
              <MenuItem  icon={<MdGroups />}>Employee</MenuItem>
              </Link>
              <Link to="/project">
              <MenuItem icon={<RiPencilLine />}>Project</MenuItem>
              </Link>
              <Link to="/addBlog">
              <MenuItem  icon={<AiOutlineAppstoreAdd/>}>AddBlog</MenuItem>
              </Link>
              <Link to="/blog">
              <MenuItem  icon={<FaBlog />}>Blog</MenuItem>
              </Link>
            </Menu>
        </Sidebar>
    )
}
export default SidebarComponent;