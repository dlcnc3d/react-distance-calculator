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
import useStyles from "./UpdateUserData.styles";
import { useAuthData } from "../../context/auth.context";
import Alert from "@material-ui/lab/Alert";
import { useHistory } from "react-router-dom";

type FormValues = {
  email: string;
  password: string;
  confirmPassword: string;
};

type Props = {
  onClose: () => void;
};

export const UpdateUserData: React.FC<Props> = (props) => {
  const classes = useStyles();
  const { handleSubmit, control } = useForm<FormValues>();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const { currentUser } = useAuthData();
  const { updateEmail, updatePassword } = useAuthData();

  const history = useHistory();

  const submitHandler = (data: FormValues) => {
    const { confirmPassword, email, password } = data;

    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    const promises = [];
    setError("");
    setLoading(true);
    setMessage("");
    if (email !== currentUser.email && !password) {
      promises.push(updateEmail(email));
      setError("");
      setMessage("Email has been updated");
    }

    if (password && email === currentUser.email) {
      promises.push(updatePassword(password));
      setError("");
      setMessage("Password has been updated");
    }

    if (password && email !== currentUser.email) {
      setError("login and password can't be changed together");
    }

    Promise.all(promises)
      .then(() => {
        history.push("/");
      })
      .catch(() => {
        setError("Failed to update an account");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <Paper className={classes.root}>
        <Grid>
          <div className={classes.titlemain}>
            <Typography className={classes.title}>
              Update User Information{" "}
            </Typography>
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
              {message && !error && (
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
              defaultValue={currentUser.email !== null ? currentUser.email : ""}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  className={classes.input}
                  variant="outlined"
                  label="email"
                  type="email"
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error ? error.message : null}
                  id="age"
                />
              )}
              rules={{ required: "email is required" }}
            />
            <Box p={1} />

            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  className={classes.input}
                  variant="outlined"
                  type="password"
                  label="password"
                  placeholder="do not type if you want to keep same data"
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error ? error.message : null}
                  id="password"
                />
              )}
              rules={{
                minLength: {
                  value: 4,
                  message: "Password must have at least 4 characters",
                },
              }}
            />

            <Box p={1} />
            <Controller
              name="confirmPassword"
              control={control}
              defaultValue=""
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  className={classes.input}
                  variant="outlined"
                  type="password"
                  label="confirm password"
                  placeholder="do not type if you want to keep same data"
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error ? error.message : null}
                  id="confirmPassword"
                />
              )}
              rules={{
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
              UPDATE
            </Button>
          </form>
        </Grid>
      </Paper>
    </div>
  );
};
