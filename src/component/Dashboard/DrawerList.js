import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import {
  Dashboard,
  HouseTwoTone,
  StarHalf,
  SupervisedUserCircle,
  VerifiedUser,
  VerticalSplit
} from "@material-ui/icons";
import { Link, NavLink } from "react-router-dom";
import dashboardStyle from "./DashboardStyle";
const navList = [
  { id: 1, linkName: "Dashboard", icon: <Dashboard />, path: '/dashboard' },
  { id: 2, linkName: "Profile", icon: <SupervisedUserCircle />, path: '/profile' },
  { id: 3, linkName: "Employee", icon: <VerifiedUser />, path: '/Employee' },
  { id: 4, linkName: "Map", icon: <StarHalf />, path: 'map' },
  { id: 5, linkName: "blog", icon: <VerticalSplit />, path: 'blog' },
  { id: 6, linkName: "Project", icon: <HouseTwoTone />, path: '/project' },
  { id: 6, linkName: "User Engagement", icon: <HouseTwoTone />, path: '/userengagement' },


];

const DrawerList = () => {
  const classes = dashboardStyle();
  return (
    <List>
      {navList.map((items) => (
        <NavLink to={items.path}
          activeClassName={classes.navlinkcss} //this peoperty is important when navlink active
          className={classes.navlinkcss}
          style={({ isActive }) => ({
            color: isActive ? '#fff' : '#fff',
            background: isActive ? '#7600dc' : '#f0f0f0',
          })}
        >
          <ListItem key={items.id} button>
            <ListItemIcon style={{ color: '#fff' }}>{items.icon}</ListItemIcon>
            <ListItemText>{items.linkName}</ListItemText>
          </ListItem>
        </NavLink>
      ))}
    </List>
  );
};

export default DrawerList;
