import React, { useState } from "react";
import AddEmployee from '../component/Employee/AddEmployee'
const EmployeeTable = () => {
  return (
    <>

      <div>
        <AddEmployee />
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
              <tr>
                <td>John</td>
                <td>john@example.com</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Mary</td>
                <td>mary@example.com</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>July</td>
                <td>july@example.com</td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default EmployeeTable;