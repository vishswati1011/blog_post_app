import { useEffect } from "react"
import io from "socket.io-client";

const socket = io('http://localhost:8000', {
    reconnectionDelay: 1000,
    reconnection: true,
    reconnectionAttemps: 10,
    transports: ['websocket'],
    agent: false,
    upgrade: false,
    rejectUnauthorized: false
});
function Profile () {

    useEffect(()=>{
        console.log("Prifle.js funciton emit")
        // socket.emit("connection");
        
        const data={date:new Date,userid:"asdhfjhadskjf",visit:[{pagename:"home",visitedtime:"15:30:00"}]}
        socket.emit("update_status", data)
      },[])

    return(
        <div>
            this is Profile Page
            <button> Trigger Socket</button>
        </div>
    )
}

export default Profile;