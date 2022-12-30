import { signingOut } from '../../firebase';
import {FiLogOut,FiSearch} from 'react-icons/fi';
import './Navbar.css'
function Navbar() {

    const logout =async () =>{
        var res=await signingOut();
        if(res){
            localStorage.removeItem("user_uid");
            window.location.replace('/login')
        }
    }
    return (
        <nav class="navbar navbar-expand-sm  navbar-dark fixed-top navbar_css">
            <div class="container-fluid">
            <a class="navbar-brand" href="/home">
                <img src={require('../../images/download.jfif')} alt="Avatar Logo" className="rounded-pill logo_css" /> 
            </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="mynavbar">
                    <ul class="navbar-nav me-auto mid_nav">
                        <li class="nav-item">
                            <a class="nav-link" href="/home">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/employee">Blog</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/#">Contact</a>
                        </li>
                    </ul>
                    <form class="d-flex">
                        <input class="form-control" type="text" placeholder="Search"/>
                           
                    </form>
                    <FiSearch className='icon_color'/>
                    {localStorage.getItem("user_uid")?  <FiLogOut className='icon_color' onClick={logout}/>:''}  
                </div>

            </div>
        </nav>
    )
}

export default Navbar;