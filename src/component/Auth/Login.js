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
                localStorage.setItem("blog_user_uid",response.data.userId)
                localStorage.setItem("token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsic3RyaWN0TW9kZSI6dHJ1ZSwic2VsZWN0ZWQiOnt9LCJnZXR0ZXJzIjp7fSwiX2lkIjoiNWZiNzk1MmJiNzRjMDA2NTdhYTc4MzMyIiwid2FzUG9wdWxhdGVkIjpmYWxzZSwiYWN0aXZlUGF0aHMiOnsicGF0aHMiOnsiZW1haWwiOiJpbml0IiwiaXNQcmVtaXVtVXNlciI6ImluaXQiLCJ1c2VyVHlwZSI6ImluaXQiLCJzdG9yYWdlIjoiaW5pdCIsImxvZ2luVHlwZSI6ImluaXQiLCJhc3NvY2lhdGVkVXNlciI6ImluaXQiLCJzdGF0dXMiOiJpbml0Iiwicm9sZSI6ImluaXQiLCJ2b3RlU3RhdHVzIjoiaW5pdCIsIl9pZCI6ImluaXQiLCJwYXNzd29yZCI6ImluaXQiLCJ1c2VybmFtZSI6ImluaXQiLCJjb21wYW55IjoiaW5pdCIsIm1vYmlsZSI6ImluaXQiLCJjb21wYW55TmFtZSI6ImluaXQiLCJwYXltZW50IjoiaW5pdCIsIl9fdiI6ImluaXQiLCJsYXN0RWRpdGVkIjoiaW5pdCIsInRvdGFsQXNzb2NpYXRlZFVzZXIiOiJpbml0IiwiZm9yZ290UGFzc3dvcmRDb2RlIjoiaW5pdCIsImZvcmdvdFBhc3N3b3JkRXhwIjoiaW5pdCIsImlzTG9nZ2VkaW4iOiJpbml0IiwibG9nZ2VkSW5UaW1lIjoiaW5pdCJ9LCJzdGF0ZXMiOnsiaWdub3JlIjp7fSwiZGVmYXVsdCI6e30sImluaXQiOnsiX2lkIjp0cnVlLCJpc1ByZW1pdW1Vc2VyIjp0cnVlLCJ1c2VyVHlwZSI6dHJ1ZSwic3RvcmFnZSI6dHJ1ZSwibG9naW5UeXBlIjp0cnVlLCJhc3NvY2lhdGVkVXNlciI6dHJ1ZSwic3RhdHVzIjp0cnVlLCJyb2xlIjp0cnVlLCJ2b3RlU3RhdHVzIjp0cnVlLCJlbWFpbCI6dHJ1ZSwicGFzc3dvcmQiOnRydWUsInVzZXJuYW1lIjp0cnVlLCJjb21wYW55Ijp0cnVlLCJtb2JpbGUiOnRydWUsImNvbXBhbnlOYW1lIjp0cnVlLCJwYXltZW50Ijp0cnVlLCJfX3YiOnRydWUsImxhc3RFZGl0ZWQiOnRydWUsInRvdGFsQXNzb2NpYXRlZFVzZXIiOnRydWUsImZvcmdvdFBhc3N3b3JkQ29kZSI6dHJ1ZSwiZm9yZ290UGFzc3dvcmRFeHAiOnRydWUsImlzTG9nZ2VkaW4iOnRydWUsImxvZ2dlZEluVGltZSI6dHJ1ZX0sIm1vZGlmeSI6e30sInJlcXVpcmUiOnt9fSwic3RhdGVOYW1lcyI6WyJyZXF1aXJlIiwibW9kaWZ5IiwiaW5pdCIsImRlZmF1bHQiLCJpZ25vcmUiXX0sInBhdGhzVG9TY29wZXMiOnt9LCJjYWNoZWRSZXF1aXJlZCI6e30sInNlc3Npb24iOm51bGwsIiRzZXRDYWxsZWQiOnt9LCJlbWl0dGVyIjp7Il9ldmVudHMiOnt9LCJfZXZlbnRzQ291bnQiOjAsIl9tYXhMaXN0ZW5lcnMiOjB9LCIkb3B0aW9ucyI6eyJza2lwSWQiOnRydWUsImlzTmV3IjpmYWxzZSwid2lsbEluaXQiOnRydWUsImRlZmF1bHRzIjp0cnVlfX0sImlzTmV3IjpmYWxzZSwiJGxvY2FscyI6e30sIiRvcCI6bnVsbCwiX2RvYyI6eyJpc1ByZW1pdW1Vc2VyIjp0cnVlLCJ1c2VyVHlwZSI6Ik5vcm1hbCBTdGFydHVwIiwic3RvcmFnZSI6MTAyNCwibG9naW5UeXBlIjoibm9ybWFsIiwiYXNzb2NpYXRlZFVzZXIiOlsiNjAzNWYyNDZmYTg5MjU2MDI4NWRjMmYwIiwiNjA0MjQ5MjBiZGI4YmM3MmI5MDliMTY3IiwiNjA0MjQ5NWNiZGI4YmM3MmI5MDliMTY5IiwiNjA0MjQ5YmFiZGI4YmM3MmI5MDliMTZiIiwiNjA0YjRkMmZhNWZjMTExNDM5MzNiOGYxIiwiNjA0ZjE3MWVhNWZjMTExNDM5MzNjOGMyIiwiNjExNGI3NDdhZTg5MGI3ZGY2ZjAyMjlkIiwiNjFkMmVhNzAwNTJmZDI0ZTY3ZjdjY2EwIiwiNjFkMmViMzQwNTJmZDI0ZTY3ZjdjY2EzIiwiNjNmNzM5M2UxZGQzYjQ3OTJiNjMzMWNlIl0sInN0YXR1cyI6MSwicm9sZSI6IlN1cGVydXNlciIsInZvdGVTdGF0dXMiOlt7ImlkZWFJZCI6IjVmZDk4NTU0ZjdjMjdkN2I5YTM2NzI4ZiIsInZvdGUiOiIxIn0seyJpZGVhSWQiOiI1ZmQ5ODUzNGY3YzI3ZDdiOWEzNjcyOGUiLCJ2b3RlIjoiMSJ9LHsiaWRlYUlkIjoiNjAzNjI0ZDlmYTg5MjU2MDI4NWRjNWVkIiwidm90ZSI6IjEifSx7ImlkZWFJZCI6IjYwNDYwOWYwYmRiOGJjNzJiOTA5ZTBhNyIsInZvdGUiOiIwIn0seyJpZGVhSWQiOiI2MDQ2MDlmMGJkYjhiYzcyYjkwOWUwYTciLCJ2b3RlIjoiMSJ9XSwiX2lkIjoiNWZiNzk1MmJiNzRjMDA2NTdhYTc4MzMyIiwiZW1haWwiOiJDaGl0cmFuc2hAZWR1bm9taWNzLmluIiwicGFzc3dvcmQiOiIkMmIkMTAkR1dDeVo0RkhDaXlENG5NTjRnd1RadVFlUFpkMGg2dGFubmtsak1kNy9qQnRQbGpzbS9BS0MiLCJ1c2VybmFtZSI6IkNoaXRyYW5zaCIsImNvbXBhbnkiOiI1ZmI3OTUyYmI3NGMwMDY1N2FhNzgzMzEiLCJtb2JpbGUiOjk2Njk5MTExMDEsImNvbXBhbnlOYW1lIjoiRWR1bm9taWNzIFRlY2ggU29sIiwicGF5bWVudCI6W10sIl9fdiI6MjQsImxhc3RFZGl0ZWQiOiIyMDIwLTAyLTE2VDExOjM4OjM4LjEyM1oiLCJ0b3RhbEFzc29jaWF0ZWRVc2VyIjo1MSwiZm9yZ290UGFzc3dvcmRDb2RlIjoiIiwiZm9yZ290UGFzc3dvcmRFeHAiOiIyMDIxLTAzLTI4VDA1OjQyOjQyLjM5NVoiLCJpc0xvZ2dlZGluIjoiMSIsImxvZ2dlZEluVGltZSI6IjIwMjMtMDItMjRUMDg6NDI6MjAuMzkyWiJ9LCIkaW5pdCI6dHJ1ZSwiaWF0IjoxNjc3MjI5MDA2fQ.YdwkV3LyhiS1RNGoMscQEt7YfkUgXB7vZBHwzMOGUmI");
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


