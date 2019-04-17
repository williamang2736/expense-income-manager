import React, { Component } from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Lock from "@material-ui/icons/Lock";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { TextField } from "final-form-material-ui";
import { Grid } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import { Form, Field } from "react-final-form";
import { userLogin } from "react-admin";
import { connect } from "react-redux";

const styles = theme => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  }
});

class SignIn extends Component {
  render() {
    const { classes } = this.props;

    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <Lock />
          </Avatar>
          <Typography component="h1" variant="subheading">
            Sign in
          </Typography>
          <Form
            onSubmit={values => {
              this.props.userLogin(values);
            }}
            initialValues={{}}
            validate={validate}
            render={({ handleSubmit, reset, submitting, pristine, values }) => (
              <form onSubmit={handleSubmit} noValidate>
                <Grid container alignItems="flex-start" spacing={8}>
                  <Grid item xs={12}>
                    <Field
                      fullWidth
                      required
                      name="username"
                      component={TextField}
                      type="text"
                      label="username"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      fullWidth
                      required
                      name="password"
                      component={TextField}
                      type="password"
                      label="Password"
                    />
                  </Grid>
                  <Grid item style={{ marginTop: 16 }} xs={12}>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={submitting}
                      fullWidth
                    >
                      Sign In
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography onClick={() => this.props.openSignUpDialog()}>
                      Sign Up
                    </Typography>
                  </Grid>
                </Grid>
              </form>
            )}
          />
        </Paper>
      </main>
    );
  }
}

function validate(values) {
  const errors = {};
  if (!values.username) {
    errors.username = "Required";
  }
  if (!values.password) {
    errors.password = "Required";
  }
  return errors;
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  undefined,
  { userLogin }
)(withStyles(styles)(SignIn));
