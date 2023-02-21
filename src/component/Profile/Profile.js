import { useEffect } from "react"
import io from "socket.io-client";

var socket = io("http://localhost:8000");
const userID =localStorage.getItem("userID")
function Profile () {

    useEffect(()=>{
        console.log("Prifle.js funciton emit")
        
        const data={VisitedDate:new Date,UserId:userID,VisitedPages:[{pagename:"home",visitedtime:"15:30:00"}]}
        socket.emit("update_status", data)
      },[])
    return(
        <div>
            this is Profile Page
           
        </div>
    )
}

export default Profile;