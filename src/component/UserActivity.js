import io from "socket.io-client";

var socket = io("http://localhost:8000");
const calUserActivity = (pagename,time_on_page)=>{
    
    const UserId =localStorage.getItem("blog_user_uid")
    const date =new Date();
    const current_Date=date.toString().slice(4,15);
    var time =time_on_page.split(":")
    const hours=Number(time[0]), min=Number(time[1]), sec=Number(time[2])
    const data={ 
        VisitedDate:current_Date,
        TrackData : {
            UserId,
            VisitedPages:[{
                pagename:pagename,
                visitedtime:{hours:hours,min:min,sec:sec }
            }]
        }
    }
        socket.emit("update_status", data)

}

function msToTime(s) {
    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;
  console.log("tims new",hrs + ':' + mins + ':' + secs + '.' + ms)
    return hrs + ':' + mins + ':' + secs;
  }


const findTime =(pagename) =>{

console.log("local",localStorage.getItem("log"))
  var time_end = new Date();
var time_start=new Date(localStorage.getItem("log"));

console.log("------",time_start)
const value_start=time_start.toString().slice(16,24).split(":");

const  value_end=time_end.toString().slice(16,24).split(":");
    time_start.setHours(value_start[0], value_start[1], value_start[2], 0)
    time_end.setHours(value_end[0], value_end[1], value_end[2], 0)
    console.log(time_start,"========",time_end)
    let cal=time_end - time_start // millisecond 
    const result=msToTime(cal)
    calUserActivity(pagename,result)

  }
export default findTime;