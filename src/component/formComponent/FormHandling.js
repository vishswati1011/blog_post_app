import { useState } from "react";

const FormHandling = (initialValue) => {
  const [studentData, setStudentData] = useState(initialValue);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setStudentData({
      ...studentData,
      [name]: value
    });
  };

  return {
    studentData,
    setStudentData,
    handleChange
  };
};

export default FormHandling;
