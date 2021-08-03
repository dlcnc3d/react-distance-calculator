import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const drawerWidth = 200;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      width: "100%",
    },
    appBar: {
      height: "60px",
      width: "100%",

      backgroundColor: "#596F87",
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    title: {
      flexGrow: 1,
    },

    menuButton: {
      marginleft: theme.spacing(1),
    },

    hide: {
      display: "none",
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
      justifyContent: "flex-end",
    },
    userSign: {
      marginRight: theme.spacing(3),
      flexFlow: "row",
      float: "right",
      marginright: "1",
      alignItems: "right",
      color: "inherit",
      variant: "h6",
    },
    "@keyframes blinker": {
      from: { opacity: 1 },
      to: { opacity: 0.5 },
    },
    userUnSign: {
      animationName: "$blinker",
      animationDuration: "1s",
      animationTimingFunction: "linear",
      animationIterationCount: "infinite",
      color: "#ff5e66",
    },
    contentShift: {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menubutton: {
      marginRight: theme.spacing(2),
    },
    buttonIcon: {
      marginRight: theme.spacing(2),
      display: "flex",
      cursor: "pointer",
    },
  })
);

export default useStyles;
