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
import useStyles from "./LoginForm.styles";

import { useAuthData } from "../../context/auth.context";
import Alert from "@material-ui/lab/Alert";
import { useHistory } from "react-router-dom";
import { useMapData } from "../../context/map.context";

type FormValues = {
  email: string;
  password: string;
};

type Props = {
  onClose: () => void;
};

const EMAIL_REGEXP =
  /^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@(([^<>()[\]\\.,;:\s@\\"]+\.)+[^<>()[\]\\.,;:\s@\\"]{2,})$/i;

export const LoginForm: React.FC<Props> = (props) => {
  const classes = useStyles();
  const { handleSubmit, control } = useForm<FormValues>();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const { logIn } = useAuthData();

  const { setAuthReset } = useMapData();

  const handleClickAuthReset = () => {
    setAuthReset(true);
  };

  const submitHandler = async (data: FormValues) => {
    const { email, password } = data;

    try {
      setError("");
      setLoading(true);
      await logIn(email, password);
      history.push("/");
      props.onClose();
    } catch {
      setError("Failed to log in. Incorrect email or password");
    }
    setLoading(false);
  };

  return (
    <div>
      <Paper className={classes.root}>
        <Grid>
          <div
            className={
              error === "" ? classes.titlemain : classes.titlemainAlert
            }
          >
            <Typography className={classes.title}>Log in </Typography>
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
              rules={{
                required: "email is required",
                pattern: {
                  value: EMAIL_REGEXP,
                  message: "Email format is not correct",
                },
              }}
            />

            <Box p={1} />
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  variant="outlined"
                  type="password"
                  label="password"
                  error={!!error}
                  helperText={error ? error.message : null}
                  id="password"
                />
              )}
              rules={{
                required: "password is required",
                minLength: {
                  value: 4,
                  message: "Password must have at least 4 characters",
                },
              }}
            />

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
              Log In
            </Button>

            <Button
              className={classes.buttonfullWidth}              
              type="button"
              variant="outlined"
              color="secondary"
              onClick={handleClickAuthReset}
            >
              Reset password
            </Button>
          </form>
        </Grid>
      </Paper>
    </div>
  );
};
