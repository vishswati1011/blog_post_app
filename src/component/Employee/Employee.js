import React, { useContext, useEffect ,useState} from "react";
import AddEmployee from './AddEmployee'
import { EmployeeContext } from "../../store/context/employee.context";
const EmployeeTable = () => {

  const empCtx=useContext(EmployeeContext);
  const [allEmployee,setAllEmployee]=useState();
  const addEmployee = (data) =>{
    console.log("call context",empCtx)
    empCtx.addEmployee(data)
  }
  var allemployee =empCtx.employee;

  useEffect(()=>{

    setAllEmployee(allemployee)
  },[allemployee])
  console.log("allemployee",empCtx.employee,allEmployee)

     
 
  return (
    <>

      <div className="mt-3">
        <AddEmployee addEmployee={addEmployee} />
      </div>
      <div className="container">
        <div className="row">
          <table class="table table-warning table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>Education</th>
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