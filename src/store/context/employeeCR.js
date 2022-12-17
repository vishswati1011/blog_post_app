
import { createContext, useState,useReducer } from "react";

const employee1 = [
    {
        name:"swati",
        email:"swati@gmail.com",
        address:"indore",
        education:"mca"
    }
]
export const EmployeeContext =createContext({
    allemployee:[],
    addEmployee: ({name,email,address,education}) => {},
    deleteEmployee: (id) => {},
    updateEmployee: (data,id) => {}
})


function expenseReducer (state,action) {
    switch (action.type) {
        case 'ADD':
            const id = new Date().toString().slice(0,15)+Math.random().toString();
            return [{...action.payload,id:id},...state];
        case 'UPDATE':
            const updatableExpenseIndex =state.findIndex((expense)=>
            expense.id===action.payload.id
            );
            const updatableExpense = state[updatableExpenseIndex];
            const updateItem = { ...updatableExpense,...action.payload.data};
            const updatedExpense = [...state];
            updatedExpense[updatableExpenseIndex] = updateItem;
            return updatedExpense;
        case "DELETE":  
            return state.filter((expense) => expense.id !== action.payload);
        default:
            return state;  
    }
}
function EmployeeContextProvider ({children}) {

    const [employeeState,dispatch]=useReducer(expenseReducer,employee1);

    function addEmployee (employeeData) {

        console.log("function called",employeeData)
        dispatch({type:'ADD',payload:employeeData})
        // var id=new Date().toString().slice(0,15)+Math.random().toString();
        // const employee_data = {
        //     id:id,
        //     name:data.name,
        //     email:data.email,
        //     address:data.address,
        //     education:data.education
        // }
        // console.log("Employee page",employee_data)
        // setEmployee([...employee,employee_data],console.log("employee update",employee)) 
        // return employee;   
    }
    function deleteEmployee(id){


    }
    function updateEmployee (data,id){

    }
   

    const value = {
        allemployee:employeeState,
        addEmployee:addEmployee,
        deleteEmployee:deleteEmployee,
        updateEmployee:updateEmployee,
    }
    return (
    <EmployeeContext.Provider value={value}>
        {children}
    </EmployeeContext.Provider>)
}

export default EmployeeContextProvider;