import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},

    infoWindow: {
      marginRight: "20px",
      backgroundColor: "#a1dffb30",
      border: "5px",
    },
  })
);

export default useStyles;
