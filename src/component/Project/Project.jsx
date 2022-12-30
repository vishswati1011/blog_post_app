import React, { useContext, useEffect ,useState} from "react";
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import { ProjectContext } from "../../store/context/projects.context";

const Project = () => {

  const proCtx=useContext(ProjectContext);
  const [allEmployee,setAllProject]=useState();
 
  var allprojects =proCtx.projects;

  useEffect(()=>{

    setAllProject(allprojects)
  },[allprojects])

     console.log(allprojects,"allprojects")
 
  return (
    <>

      <div className="mt-3">
      <Link to='/addProject'>
      <Button variant="warning" className='mb-2'>
        Add Project
      </Button>
      </Link>
      </div>
      <div className="container">
        <div className="row">
          <table className="table table-warning table-striped">
            <thead>
              <tr>
                <th>Project Name</th>
                <th>Project Title</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
             {allEmployee && allEmployee.map((item,key)=>{
             return(
              <tr key={key}>
                <td>{item.name}</td>
                <td>{item.title}</td>
                <td>{item.desc}</td>
                <td>{item.attachment}</td>
              </tr>
             )})} 
          
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Project;