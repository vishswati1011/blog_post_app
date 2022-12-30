import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './AddProject.css'
import { ProjectContext } from "../../store/context/projects.context";
import { useContext ,useState} from 'react';
function AddBlog () {
    const proCtx=useContext(ProjectContext);

    const [inputValue,setInputValue] = useState({
        name:"",
        title:"",
        desc:"",
        attachment:""
      })

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
    const addProject = (data) =>{
        console.log("call context",inputValue)
        proCtx.addProject(inputValue)
      }
    return(
        <div className='col-lg-10 blogform'>
          <div className='inner_blog_from'>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Project Name</Form.Label>
              <Form.Control
                name="name"
                type="text"
                onChange={handleChange.bind()}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Project Title</Form.Label>
              <Form.Control
                type="text" 
                name="title"
                onChange={handleChange.bind()}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Description</Form.Label>
              <Form.Control
                name="desc"
                type="text"
                onChange={handleChange.bind()}
                autoFocus
                as="textarea" rows={3}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Attachment</Form.Label>
              <Form.Control
                name="attachment"
                type="file"
                onChange={handleChange.bind()}
                autoFocus
              />
            </Form.Group>
            <Button variant="light" 
            onClick={addProject}
            >
            Add Project
          </Button>
          </Form>
          </div>
        </div>
    )
}

export default AddBlog;