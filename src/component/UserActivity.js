const calUserActivity = (pagename,time_on_page)=>{
    
    const UserId =localStorage.getItem("blog_user_uid")
    console.log("time_on_page",time_on_page)
    const date =new Date();
    const current_Date=date.toString().slice(4,15);
    const current_Time=date.toString().slice(16,24)
    var time =current_Time.split(":")
    const hours=Number(time[0]), min=Number(time[1]), sec=Number(time[2])
    let time_on_pag=time_on_page/1000
    msToTime(time_on_pag,function(times){
        console.log("times",times)
    })
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
        // socket.emit("update_status", data)

}

function msToTime(s) {
    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;
  console.log("tims new",hrs + ':' + mins + ':' + secs + '.' + ms)
    return hrs + ':' + mins + ':' + secs + '.' + ms;
  }

export default calUserActivity;