import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { TextField } from "final-form-material-ui";
import { Grid } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import { Form, Field } from "react-final-form";
import { userLogin, Notification } from "react-admin";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import AuthLayout from "./AuthLayout";
import AuthFormStyles from "./AuthFormStyles";

class Login extends Component {
  render() {
    const { classes } = this.props;
    return (
      <AuthLayout>
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
                <Grid
                  item
                  xs={12}
                  style={{ marginTop: "16px", textAlign: "center" }}
                >
                  <Typography>
                    <Link to="/register" className={classes.switchAuthFormText}>
                      Sign Up
                    </Link>
                  </Typography>
                </Grid>
              </Grid>
            </form>
          )}
        />
        <Notification />
      </AuthLayout>
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

export default connect(
  undefined,
  { userLogin }
)(withStyles(AuthFormStyles)(Login));
