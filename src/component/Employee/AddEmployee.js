import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const AddEmployee =({addEmployee})=> {
  const [show, setShow] = useState(false);

  const [inputValue,setInputValue] = useState({
    name:"",
    email:"",
    address:"",
    education:""
  })

  const [errorValue,setErrorValue] = useState({
    name:"",
    email:"",
    address:"",
    education:""
  })
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (evt) => {

            var name=evt.target.name;
            var value=evt.target.value;
            setInputValue((currentInputValue) =>{
                return {
                    ...currentInputValue,
                    [name]:value
                }
            })

  }
  const handleSave = () => {

        let errors = {
            ...errorValue
        }
        if(inputValue.name.length<=3){
          errors.name="name should be 5 charecter"
          errors.flag=true
        }
        if(inputValue.email===''){
          errors.email="email reuired"
          errors.flag=true
        }
        if(inputValue.address===''){
          errors.address='address required'
          errors.flag=true
        }
        if(inputValue.education===''){
          errors.education='education required'
          errors.flag=true
        }
        console.log(errors,"errors")
        if(errors.flag===true)
        {
          setErrorValue(errors)
        }else{
        addEmployee(inputValue) 
        setShow(false);
        }
  }

  return (
    <>
      <Button variant="warning" className='mb-2' onClick={handleShow}>
        Add Employee
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="name"
                type="text"
                onChange={handleChange.bind()}
                autoFocus
                isInvalid={errorValue.name!=''?true: false}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email" 
                name="email"
                onChange={handleChange.bind()}
                isInvalid={errorValue.email!=''?true: false}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Address</Form.Label>
              <Form.Control
                name="address"
                type="text"
                onChange={handleChange.bind()}
                required
                isInvalid={errorValue.address!=''?true: false}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Eduncation</Form.Label>
              <Form.Control
                name="education"
                type="text"
                onChange={handleChange.bind()}
                isInvalid={errorValue.education!=''?true: false}
              />
            </Form.Group>
            {/* <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Example textarea</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group> */}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddEmployee;