
import React from "react";
import './Form.css'
const Form = () => {

    return (

        <div className="wrapper">
            <h1>Sign up</h1>
            <form>
                <input type="text" placeholder="Username" />
                <input type="text" placeholder="Username" />
                <input type="text" placeholder="Username" />
                <input type="text" placeholder="Username" />
            </form>
            <div className="terms">
                <input type="checkbox" id="checkbox" />
                <label for="checkbox">I agree to these <a href="#"> Terms & condition</a></label>

            </div>
            <button>Sign up</button>
            <div className="member"> Already a member? <a href="#">Login here</a></div>
        </div>
    )
}

export default Form;