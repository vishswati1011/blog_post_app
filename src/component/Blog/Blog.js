import './Blog.css'
import { useEffect } from 'react'
function Blog () {

    const task =["A","B","C","D","E"]

    useEffect(()=>{
        localStorage.setItem("log",new Date())
    
      },[])
      

    return(
        <div className='blog_wrapper'>
        {task && task.map((item,key)=>
        <div className='board_outer_wrapper'>
                
           <label> {item} Pending Tasks</label>
           <div className='board_wrapper'>
               
               <div className='card_wrapper'>
                    <label> Card Title</label><br/>
                    <label> Card Title</label>
                   
               </div>
           </div>
           </div>
           )}
           <div className='board_outer_wrapper2'>
                
                <label>Pending Tasks</label>
                {/* <div className='board_wrapper'>
                    
                    <div className='card_wrapper'>
                      
                    </div>
                </div> */}
                </div>
           
        </div>
    )
}

export default Blog;