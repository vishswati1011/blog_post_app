import { useEffect } from "react"
import io from "socket.io-client";
import moment from 'moment'

// var socket = io("http://localhost:8000");
const UserId =localStorage.getItem("blog_user_uid")
let timeSpentScrolling=0;
function Profile () {
 
    let abc=[{name:"A"},{name:"B"},{name:"C"}]
       useEffect(()=>{
        
        const date =new Date();
        const current_Date=date.toString().slice(4,15);
        const current_Time=date.toString().slice(16,24)
        var time =current_Time.split(":")
        const hours=Number(time[0]), min=Number(time[1]), sec=Number(time[2])

        const data={ 
            VisitedDate:current_Date,
            TrackData : {
                UserId,
                VisitedPages:[{
                    pagename:"home",
                    visitedtime:{hours:hours,min:min,sec:sec }
                }]
            }
        }
        console.log("data",data) 
        return () => {
            // componentwillunmount in functional component.
            // Anything in here is fired on component unmount.
            // socket.emit("update_status", data)

        }

        
      },[])
    return(
        
      <div>this is not profile page
      {
        abc && abc.map((item)=>{
            <p>hello</p>
        })
      }
      </div>
    )
}

export default Profile;