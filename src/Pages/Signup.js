import { useState } from "react";
import { signUp } from "../firebase";
const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, seterror] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setEmail("");
        setPassword("");
        const res = await signUp(email, password);
        console.log(res,"res")
        if (res.error) seterror(res.error)
        else{
            alert("User register successfully!")
            window.location.replace('/login')
        }
    };

    return (
        <>
            <div className="col-md-3 col-sm-3 col-xs-3 m-auto text-center text-warning mb-5">
                <b style={{fontSize:"24px"}} >Registration Form</b>
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
                    <input type="submit" className="btn btn-primary" value="Register" />
                    </div>
                    <div className="mt-3 mb-2">
                    <p> already registered? Go to <a href="/login">login</a></p>    
                    </div>
                </div>
                </form>
            </div>
        </>
    );
};

export default Signup;