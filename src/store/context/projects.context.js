
import { createContext, useState } from "react";

export const ProjectContext =createContext({
    projects:[],
    addProject: (data) => {},
    deleteProject: (id) => {},
    updateProject: (data,id) => {}
})

function ProjectContextProvider ({children}) {

    const [projects,setProject]=useState([]);

    function addProject (data) {

        console.log("function")
        // var id=new Date().toString().slice(0,15)+Math.random().toString();
        var id=Math.random().toString();

        const project_data = {
            id:id,
            name:data.name,
            title:data.title,
            desc:data.desc,
            attachment:data.attachment
        }
        console.log("projects page",project_data)
        setProject([...projects,project_data])    
    }
    function deleteProject(id){


    }
    function updateProject (data,id){

    }
 
    const value = {
        projects:projects,
        addProject:addProject,
        deleteProject:deleteProject,
        updateProject:updateProject,
    }
    return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
}

export default ProjectContextProvider;