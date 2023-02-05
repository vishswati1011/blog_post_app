import { Grid } from "@material-ui/core";
import { useState } from "react";
import DashboardAppbar from "./DashboardAppbar";
import dashboardStyle from "./DashboardStyle";
import MainContent from "./MainContent";
import MainDrawer from "./MainDrawer";
const Dashboard = () => {
  const classes = dashboardStyle();
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <Grid container className={classes.root}>
      <DashboardAppbar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <MainDrawer mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <MainContent />
    </Grid> 
  );
};
export default Dashboard;
