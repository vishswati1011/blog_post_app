
import { createContext, useState } from "react";

export const EmployeeContext =createContext({
    employee:[],
    addEmployee: (data) => {},
    deleteEmployee: (id) => {},
    updateEmployee: (data,id) => {}
})

function EmployeeContextProvider ({children}) {

    const [employee,setEmployee]=useState([]);

    function addEmployee (data) {

        console.log("function")
        // var id=new Date().toString().slice(0,15)+Math.random().toString();
        var id=Math.random().toString();

        const employee_data = {
            id:id,
            name:data.name,
            email:data.email,
            address:data.address,
            education:data.education
        }
        console.log("Employee page",employee_data)
        setEmployee([...employee,employee_data],console.log("employee update",employee))    
    }
    function deleteEmployee(id){


    }
    function updateEmployee (data,id){

    }
 
    const value = {
        employee:employee,
        addEmployee:addEmployee,
        deleteEmployee:deleteEmployee,
        updateEmployee:updateEmployee,
    }
    return <EmployeeContext.Provider value={value}>{children}</EmployeeContext.Provider>
}

export default EmployeeContextProvider;