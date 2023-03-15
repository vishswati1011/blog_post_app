import React, { useContext, useEffect ,useState,useRef} from "react";
import AddBlog from './AddBlog'
import { BlogContext } from "../../store/context/blog.context";
const EmployeeTable = () => {

  const blogCtx=useContext(BlogContext);
  const [allEmployee,setAllEmployee]=useState([]);
  const addBlog = (data) =>{
    console.log("call context",blogCtx)
    blogCtx.addBlog(data)
  }
  var allemployee =blogCtx.employee;

  useEffect(()=>{

    setAllEmployee(allemployee)
  },[allemployee])
  console.log("allemployee",blogCtx.blog,allEmployee)

     
  const handleImport = (inputValue) =>{
    console.log("handleImport",inputValue)
    addBlog(inputValue) 
    // hiddenFileInput.current.click();
  }

  // console.log("trackEvent",trackEvent())
  return (
    <>

      <div className="row ">
      <div className="col-lg-2">
        <AddBlog addBlog={addBlog} />
        </div>
       
      </div>
      <div className="container">
        <div className="row">
          <table class="table table-warning table-striped">
            <thead>
              <tr>
                <th>Blog title</th>
                <th>Blog Desc</th>
                <th>Blog Content</th>
                <th>PostedBy</th>
              </tr>
            </thead>
            <tbody>
             {allEmployee && allEmployee.map((item,key)=>{
             return(
              <tr key={key}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.address}</td>
                <td>{item.education}</td>
              </tr>
             )})} 
          
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default EmployeeTable;