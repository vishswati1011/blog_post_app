import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "../firebase";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, seterror] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setEmail("");
        setPassword("");
        const res = await signIn(email, password);
        if (res.error) seterror(res.error);
        else {
            alert("User login successfully!")
            localStorage.setItem('user_uid', res)
            // navigate('/home');
            window.location.replace('/home')
        }
    };
    return (
        <>
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
                            name="email"
                            className="form-control p-auto "
                            value={email}
                            placeholder="Your Email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className=" mb-3 mt-3">
                        <input
                            type="password"
                            name="password"
                            value={password}
                            className="form-control"
                            placeholder="Your Password"
                            onChange={(e) => setPassword(e.target.value)}
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
        </>
    );
};

export default Login;


