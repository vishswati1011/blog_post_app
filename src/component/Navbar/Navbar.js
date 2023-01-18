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
        <nav className="navbar navbar-expand-sm  navbar-dark fixed-top navbar_css">
            <div className="container-fluid">
            <a className="navbar-brand" href="/home">
                <img src={require('../../images/download.jfif')} alt="Avatar Logo" className="rounded-pill logo_css" /> 
            </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="mynavbar">
                    <ul className="navbar-nav me-auto mid_nav">
                        <li className="nav-item">
                            <a className="nav-link" href="/Dashboard">Dashboard</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/blog">Blog</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/#">Contaasdfnadsct</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/#">Map</a>
                        </li>
                    </ul>
                    <form className="d-flex">
                        <input className="form-control" type="text" placeholder="Search"/>
                           
                    </form>
                    <FiSearch className='icon_color'/>
                    {localStorage.getItem("user_uid")?  <FiLogOut className='icon_color' onClick={logout}/>:''}  
                </div>
            </div>
        </nav>
    )
}

export default Navbar;