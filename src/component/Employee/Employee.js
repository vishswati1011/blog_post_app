import React, { useContext, useEffect ,useState,useRef} from "react";
import AddEmployee from './AddEmployee'
import ImportUserCSV from './ImportUserCSV'
import { EmployeeContext } from "../../store/context/employee.context";
import { useTracking } from "react-tracking";
const EmployeeTable = () => {

  const empCtx=useContext(EmployeeContext);
  // const hiddenFileInput = React.useRef(null);
  const {trackEvent} = useTracking()
  const [allEmployee,setAllEmployee]=useState([]);
  const addEmployee = (data) =>{
    console.log("call context",empCtx)
    empCtx.addEmployee(data)
  }
  var allemployee =empCtx.employee;

  useEffect(()=>{

    setAllEmployee(allemployee)
  },[allemployee])
  console.log("allemployee",empCtx.employee,allEmployee)

     
  const handleImport = (inputValue) =>{
    console.log("handleImport",inputValue)
    addEmployee(inputValue) 
    // hiddenFileInput.current.click();
  }

  // console.log("trackEvent",trackEvent())
  return (
    <>

      <div className="row ">
      <div className="col-lg-2">
        <AddEmployee addEmployee={addEmployee} />
        </div>
        <div className="col-lg-2">
        <ImportUserCSV handleImport={handleImport} />
        {/* <input type="file" style={{ display: 'none' }} ref={hiddenFileInput} /> */}
        </div>
        <div>
        <button onClick={()=> trackEvent({funComponent:'HookButton', event: "HookButton-Clicked"})}>Click Me!</button>

        </div>
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