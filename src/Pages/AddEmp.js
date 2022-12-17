import React from "react";

const AddEmp = (props) => {
    console.log(props)
    return (
        <>
        {
  props.employees && props.employees.map(
        persons => (
            <tr>
            <td> {persons.uname}</td>
            <td> {persons.email}</td>
            <td> {persons.subject}</td>
            </tr>
        )
    )
} 
 

           
        </>
    ) 
}
 export default AddEmp;