import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      display: "flex",
      flexDirection: "row",
      width: "100%",
    },
    buttonClick: {
      color: "primary",
      size: "large",
    },
    button: {
      width: "30%",
      variant: "contained",
      backgroundColor: "#6e8399",

      size: "large",
      padding: "15px",
      marginRight: "20px",
      "&:hover": {
        backgroundColor: "#4e6278",
        borderColor: "black",
        boxShadow: "30px",
      },
    },
    input: {},

    errors: {
      marginRight: "20px",
      marginTop: "20px",
    },
    "@keyframes blinker": {
      from: { opacity: 1 },
      to: { opacity: 0.4 },
    },
    blinkElement: {
      animationName: "$blinker",
      animationDuration: "1s",
      animationTimingFunction: "linear",
      animationIterationCount: "infinite",
      color: "red",
    },

    ordinary: {
      backgroundColor: "",
    },
  })
);

export default useStyles;
