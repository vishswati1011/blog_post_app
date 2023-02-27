import { useEffect } from "react"
import io from "socket.io-client";
import calUserActivity from '../UserActivity'

// var socket = io("http://localhost:8000");

var mouseMovementCount = 0;
function Profile () {

const abc=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q'];

  const myFunction =() =>{
    console.log("remove mouse")
  }
    useEffect(()=>{
        const myDiv = document.getElementById("profile");
            myDiv.addEventListener('mousemove', () => {
                console.log(mouseMovementCount,"mouse move")
            mouseMovementCount += 1.8;  }
        );
        return () => {
            console.log( "removeEventListener");
            myDiv.removeEventListener("mousemove",myFunction) 
            calUserActivity('profile',mouseMovementCount)
        } 
      },[])
    return(
        
        <div id="profile">
            This is profile page
            {abc && abc.map((item)=>{
                return(
                <p key={item}>hello<br/></p>
            )})}
           
        </div>
    )
}

export default Profile;