import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Papa from "papaparse";

const AddEmployee =({handleImport})=> {
    const hiddenFileInput = React.useRef(null);
    // State to store parsed data
    const [parsedData, setParsedData] = useState([]);

    //State to store table Column name
    const [tableRows, setTableRows] = useState([]);
  
    //State to store the values
    const [values, setValues] = useState([]);
  const handleImportFile = (evt) => {
    const data=hiddenFileInput.current.click();
    console.log(data,"data")
  };
  
  const handleSelectFile =(event) =>{
    console.log("onchanges ")
    console.log(event.target.files[0]);
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const rowsArray = [];
        const valuesArray = [];

        // Iterating data to get column name and their values
        results.data.map((d) => {
          rowsArray.push(Object.keys(d));
          valuesArray.push(Object.values(d));
        });

        console.log("parseData",results.data)
        console.log('tobleRows',rowsArray[0])
        console.log('array',valuesArray)
        // Parsed Data Response in array format
        setParsedData(results.data);

        // Filtered Column Names
        setTableRows(rowsArray[0]);

        // Filtered Values
        setValues(valuesArray);
        handleImport(results.data)

      },
    });

  }

  

  
  return (
    <>
      <Button variant="warning" type="file" className='mb-2' onClick={handleImportFile}>
      Import User
      </Button>

      <input type="file" style={{ display: 'none' }}   accept=".csv" ref={hiddenFileInput} onChange={handleSelectFile} />
    </>
  );
}

export default AddEmployee;