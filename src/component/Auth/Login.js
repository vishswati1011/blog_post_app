import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "../../firebase";
import { API_URL } from "../service";
import axios from "axios";
import './Login.css'
const Login = () => {
    const [expertEmail, setexpertEmail] = useState("");
    const [expertPassword, setexpertPassword] = useState("");
    const [error, seterror] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const data={
                expertEmail,expertPassword
            }
            console.log(data,"data")
            const response = await axios.post(`${API_URL}expert/login`,data,{
                headers:{
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': '*',
                }
            })
            console.log("response",response)
            if(response.data.success)
            {
                alert(response.data.message)
                localStorage.setItem("user_uid",response.data.token)
                window.location.replace('/home')
            }
        }catch(error){
            console.log("errrp",error)
        }
       
    };
    return (
        // style={{backgroundColor:"#147CE3"}}
        <div className="loginback">
           <div className="col-md-3 col-sm-3 col-xs-3 m-auto text-center text-warning mb-5">
                <b style={{fontSize:"24px"}} >Login</b>
            </div> 
            <div className="col-md-3 col-sm-3 col-xs-3 bg-warning m-auto" style={{borderRadius:"15px"}}>
            <form onSubmit={handleSubmit}>
            {error ? <div>{error}</div> : null}
                <div className="p-4">
                    <div className=" mb-3 mt-3">
                        <input
                            type="text"
                            name="expertEmail"
                            className="form-control p-auto "
                            value={expertEmail}
                            placeholder="Your expertEmail"
                            onChange={(e) => setexpertEmail(e.target.value)}
                        />
                    </div>
                    <div className=" mb-3 mt-3">
                        <input
                            type="password"
                            name="password"
                            value={expertPassword}
                            className="form-control"
                            placeholder="Your Password"
                            onChange={(e) => setexpertPassword(e.target.value)}
                        />
                    </div>
                    <div className="mt-3 mb-2">
                    <input type="submit" className="btn btn-primary" value="Login" />
                    </div>
                    <div className="mt-3 mb-2">
                    <p> create new account ?<a href="/">register</a></p>    
                    </div>
                </div>
                </form>
            </div>
        </div>
    );
};

export default Login;


