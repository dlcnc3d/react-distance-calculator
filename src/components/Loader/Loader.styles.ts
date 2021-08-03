import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: "absolute",
      display: "flex",
      paddingTop: "35vh",
      paddingLeft: "35vw",
      alig: "center",
    },
  })
);

export default useStyles;
