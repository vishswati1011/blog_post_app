import { useState } from "react";
import { signUp } from "../../firebase";
import { API_URL } from "../service";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
const Signup = () => {
     const navigate=useNavigate()
     const [inputValue,setInputValue] = useState({
        expertName:"",
        expertEmail:"",
        expertAddress:"",
        expertMobileNo:"",
        expertPassword:""
      })
    
    const [error, seterror] = useState("");

    const handleChange = (evt) =>{
        var name=evt.target.name;
        var value=evt.target.value;
        setInputValue((currentInputValue) =>{
            return {
                ...currentInputValue,
                [name]:value
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post(`${API_URL}expert/signup`,inputValue)
            console.log("response",response)
            if(response.data.success)
            {
                alert(response.data.message)
                navigate("/login")
            }
        }catch(error){
            console.log("errrp",error)
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
                            name="expertName"
                            className="form-control p-auto "
                            placeholder="Your Name"
                            onChange={handleChange.bind()}
                        />
                    </div>
                    <div className=" mb-3 mt-3">
                        <input
                            type="text"
                            name="expertMobileNo"
                            className="form-control p-auto "
                            placeholder="Your Mobile no"
                            onChange={handleChange.bind()}
                        />
                    </div>
                    <div className=" mb-3 mt-3">
                        <input
                            type="text"
                            name="expertAddress"
                            className="form-control p-auto "
                            placeholder="Your Address"
                            onChange={handleChange.bind()}
                        />
                    </div>
                    <div className=" mb-3 mt-3">
                        <input
                            type="text"
                            name="expertEmail"
                            className="form-control p-auto "
                            placeholder="Your Email"
                            onChange={handleChange.bind()}
                        />
                    </div>
                    <div className=" mb-3 mt-3">
                        <input
                            type="password"
                            name="expertPassword"
                            className="form-control"
                            placeholder="Your Password"
                            onChange={handleChange.bind()}
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