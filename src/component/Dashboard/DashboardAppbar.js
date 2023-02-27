import { AppBar, IconButton, Toolbar, Typography } from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import dashboardStyle from "./DashboardStyle";

const DashboardAppbar = ({ mobileOpen, setMobileOpen }) => {
  const classes = dashboardStyle();
  const handleLogout = () =>{
    localStorage.clear();
    window.location.replace('/login')

  }
  return (
    <AppBar position="fixed" className={classes.AppBar}>
      <Toolbar>
        <IconButton
          onClick={() => setMobileOpen(!mobileOpen)}
          color="inherit"
          edge="start"
          className={classes.menuButton}
        >
          <Menu />
        </IconButton>
        <Typography variant="h6" onClick={()=>handleLogout()}>Logo</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default DashboardAppbar;
