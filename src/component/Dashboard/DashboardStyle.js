import { makeStyles } from "@material-ui/core";

const drawerWidth = 240;
const dashboardStyle = makeStyles((theme) => ({
  menuButton: {
    root: {
      display: "flex"
      
    },
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },

  AppBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      backgroundColor:'gray',
      color:'#fff'
    },
    backgroundColor:'gray',
  },

  content: {
    flexGrow: 1,
    padding: theme.spacing(10), //margin from top
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth
    }
  },
  
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
     
    },
    "& ::-webkit-scrollbar": {
      display: "none"
    }
  },
  TemporaryDrawer: {
    "& ::-webkit-scrollbar": {
      display: "none"
    }
  },

  drawerPaper: {
    width: drawerWidth,
    backgroundColor:'gray',
    color:'#fff'

  },

  toolbar: theme.mixins.toolbar,
  toolbar:{
    backgroundColor:'gray',
  },

  navlinkcss :{
    textDecoration:'none',
    color:'#fff',
  }
 
}));

export default dashboardStyle;
