import { useState } from "react";
import { getStorage, ref, uploadBytes } from "firebase/storage";

function UploadImage  (){

    const [image,setImage]=useState();
    
    const handleUpload  =(e)=> {
        console.log(e.target.files,"valuess")
            setImage(e.target.files[0]);
    }
    console.log(image,"image")

    const handleSubmit=()=>{

        const storage = getStorage();
        const storageRef = ref(storage, `images/blog.jpg`);

        // 'file' comes from the Blob or File API
        uploadBytes(storageRef, image).then((snapshot) => {
        console.log('Uploaded a blob or file!');
        });
       
        // const storage = getStorage();
        // const storageRef = ref(storage, `images/${image.name}`)
       
        
        // // Upload the file and metadata
        // const uploadTask = uploadBytes(storageRef, metadata);
        // console.log("uploadTask",uploadTask)
    }
    return (
        <div>
            <input type="file" className="primary"  onChange={(e)=>handleUpload(e)}/>
            <button className="btn btn-primary" onClick={()=>handleSubmit()}>Submit</button>

        </div>
    )


}

export default UploadImage;