import { signingOut } from '../firebase';
function Navbar() {

    const logout =async () =>{
        var res=await signingOut();
        if(res){
            localStorage.removeItem("user_uid");
            window.location.replace('/login')
        }
    }
    return (
        <nav class="navbar navbar-expand-sm bg-warning navbar-dark fixed-top">
            <div class="container-fluid">
            <a class="navbar-brand" href="#">
                <img src={require('../images/logo.jpg')} alt="Avatar Logo" style={{width:"40px"}} class="rounded-pill" /> 
            </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="mynavbar">
                    <ul class="navbar-nav me-auto">
                        <li class="nav-item">
                            <a class="nav-link" href="/home">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/employee">Employee</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/#">Image</a>
                        </li>
                    </ul>
                    <form class="d-flex">
                        <input class="form-control me-2" type="text" placeholder="Search"/>
                            <button class="btn btn-primary" type="button">Search</button>
                    </form>
                    {localStorage.getItem("user_uid")?<button className="btn btn-primary ms-2" onClick={()=>logout()}>Logout</button>:''}
                </div>
            </div>
        </nav>
    )
}

export default Navbar;