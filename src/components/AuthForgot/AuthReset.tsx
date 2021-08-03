import React, { useState } from "react";

import {
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { Controller, useForm } from "react-hook-form";
import useStyles from "./AuthReset.styles";
import { useAuthData } from "../../context/auth.context";
import Alert from "@material-ui/lab/Alert";

type FormValues = {
  email: string;
  password: string;
};

type Props = {
  onClose: () => void;
};

export const AuthReset: React.FC<Props> = (props) => {

  const EMAIL_REGEXP = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  const classes = useStyles();
  const { handleSubmit, control } = useForm<FormValues>();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { resetPassword } = useAuthData();

  const submitHandler = async (data: FormValues) => {
    const { email } = data;

    try {
      setError("");
      setMessage("");
      setLoading(true);
      await resetPassword(email);
      setMessage("Please chech yor email for further instructions");      
      setTimeout(() => {
        props.onClose();
      }, 1500);
    } catch {
      setError("Failed to reset password");
    }
    setLoading(false);
  };

  return (
    <div>
      <Paper className={classes.root}>
        <Grid>
          <div className={classes.titlemain}>
            <Typography className={classes.title}>Forgot Password </Typography>
            <Box p={1}>
              {error && (
                <Alert
                  className={classes.input}
                  variant="filled"
                  severity="error"
                >
                  {error}
                </Alert>
              )}
              {message && (
                <Alert
                  className={classes.input}
                  variant="filled"
                  severity="success"
                >
                  {message}
                </Alert>
              )}
            </Box>
          </div>

          <form className={classes.form} onSubmit={handleSubmit(submitHandler)}>
            <Box p={1} />

            <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    variant="outlined"
                    label="email"
                    type="email"
                    error={!!error}
                    helperText={error ? error.message : null}
                    id="email"
                  />
                )}
                rules={{ required: "email is required", pattern: {
                  value: EMAIL_REGEXP,
                  message: 'Email format is not correct'
                } }}
              />
            <Box p={1} />

            <Box p={1} />

            <Button
              className={classes.button}
              type="button"
              variant="outlined"
              color="primary"
              onClick={props.onClose}
            >
              close
            </Button>
            <Button
              className={classes.button}
              disabled={loading}
              type="submit"
              variant="outlined"
              color="primary"
            >
              RESET PASSWORD
            </Button>
          </form>
        </Grid>
      </Paper>
    </div>
  );
};
