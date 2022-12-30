import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './AddBlog.css'
function AddBlog () {

    return(
        <div className='col-lg-10 blogform'>
          <div className='inner_blog_from'>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Blog title</Form.Label>
              <Form.Control
                name="name"
                type="text"
                // onChange={handleChange.bind()}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="desc" 
                name="desc"
                as="textarea" rows={3}
                //    onChange={handleChange.bind()}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Content</Form.Label>
              <Form.Control
                name="content"
                type="text"
                //    onChange={handleChange.bind()}
                autoFocus
                as="textarea" rows={3}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Attachment</Form.Label>
              <Form.Control
                name="education"
                type="file"
                //    onChange={handleChange.bind()}
                autoFocus
              />
            </Form.Group>
            <Button variant="light" 
            // onClick={handleClose}
            >
            Add Blog
          </Button>
          </Form>
          </div>
        </div>
    )
}

export default AddBlog;