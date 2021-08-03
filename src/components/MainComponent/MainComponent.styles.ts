import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      paddingTop: "60px",
      width: "100%",
      minWidth: "800px",
    },
    LeftPanel: {
      height: "calc(100vh - 110px)",
      backgroundColor: "#a1dffb30",
      elevation: "100",
      paddingLeft: "20px",
      paddingRigt: "20px",
    },
    mainForm: {
      height: "calc(100vh - 110px)",
      display: "flex",
      backgroundColor: "#a1dffb30",
      flexDirection: "column",
      elevation: "0",
    },
  })
);

export default useStyles;
