import dashboardStyle from "./DashboardStyle";
import {  Route, Routes } from "react-router-dom";
import Employee from "../Employee/Employee";
import Project from "../DataGridUI/ProjectTable";
import Blog from "../Blog/Blog";
import Profile from "../Profile/Profile";
import AddBlog from "../Blog/AddBlog";
import AddProject from '../Project/AddProject'
import Map from '../Map/Map3'
import UserEngagement from '../UserEngament'
import KanbanApp from "../Kanban/KanbanApp";
const MainContent = () => {
  const classes = dashboardStyle();
  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
        <Routes>
                    <Route path="/employee" element={<Employee />}/>
                    <Route path='/userengagement' element={<UserEngagement/>}/>
                    <Route path="/project" element={<Project />}/>
                    <Route path="/addProject" element={<AddProject />}/>
                    <Route path="/map" element={<Map />}/>
                    <Route path="/blog" element={<Blog />}/>
                    <Route path="/addblog" element={<AddBlog />}/>
                    <Route path="/profile" element={<Profile />}/>
                    <Route path="/kanban" element={<KanbanApp />}/>

              </Routes>
    </main>
  );
};
export default MainContent;


// import { Box, Paper } from "@material-ui/core";
// import dashboardStyle from "./DashboardStyle";
// import StudentResister from "./StudentRegister";

// const MainContent = () => {
//   const classes = dashboardStyle();
//   return (
//     <main className={classes.content}>
//       <div className={classes.toolbar} />
//       <Paper>
//         <Box p={3}>
//           <StudentResister />
//           <StudentResister />
//           <StudentResister />
//           <StudentResister />
//           <StudentResister />
//         </Box>
//       </Paper>
//     </main>
//   );
// };
// export default MainContent;
