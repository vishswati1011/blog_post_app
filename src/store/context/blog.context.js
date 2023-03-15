
import { createContext, useState } from "react";

export const BlogContext =createContext({
    blog:[],
    addBlog: (data) => {},
    deleteBlog: (id) => {},
    updateblog: (data,id) => {}
})

function BlogContextProvider ({children}) {

    const [blog,setBlog]=useState([]);

    function addBlog (data) {

        console.log("function")
        // var id=new Date().toString().slice(0,15)+Math.random().toString();
        var id=Math.random().toString();

        const blog_data = {
            id:id,
            name:data.name,
            email:data.email,
            address:data.address,
            education:data.education
        }
        console.log("Employee page",blog_data)
        setBlog([...blog,blog_data],console.log("employee update",blog))    
    }
   
 
    const value = {
        blog:blog,
        addBlog:addBlog,
    }
    return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>
}

export default BlogContextProvider;