import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      alignItems: "center",
      padding: theme.spacing(0),
      minheight: "600px",
      maxWidth: "400px",

      "& .MuiTextField-root": {
        margin: theme.spacing(3),
        width: "350px",
        height: "35px",
      },
      "& .MuiButtonBase-root": {
        margin: theme.spacing(2),
      },
    },

    form: {
      backgroundColor: "#a1dffb20",
    },

    titlemain: {
      marginTop: "20",
      textAlign: "center",
      height: "110px",
      padding: theme.spacing(0),
      justifyContent: "center",
      backgroundColor: "#596F87",
    },

    title: {
      fontSize: 30,
      textAlign: "center",
      color: "white",
    },
    text: {
      fontSize: 15,
      textAlign: "center",
    },

    input: {
      width: "100%",
      height: "100%",
      variant: "outlined",
      justifyContent: "center",
    },
    button: {
      width: "41%",
      height: "100%",
      variant: "outlined",
      padding: "15px",
    },
  })
);

export default useStyles;
