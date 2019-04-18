import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { TextField } from "final-form-material-ui";
import { Grid } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import { Form, Field } from "react-final-form";
import { userLogin, showNotification, Notification } from "react-admin";
import { connect } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";

import AuthLayout from "./AuthLayout";
import AuthFormStyles from "./AuthFormStyles";
import {
  parseDjangoErrorsToNotificationMessages,
  displayErrorMessagesWithToastify
} from "../../utils";

class Register extends Component {
  render() {
    const { classes } = this.props;
    return (
      <AuthLayout title={"Sign Up"}>
        <Form
          onSubmit={values => {
            axios
              .post("/api/auth/register", values)
              .then(() => {
                this.props.userLogin(values);
              })
              .catch(error => {
                displayErrorMessagesWithToastify(error.response.data);
              });
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
                    label="Username"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    fullWidth
                    required
                    name="email"
                    component={TextField}
                    type="email"
                    label="Email"
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
                    Sign Up
                  </Button>
                </Grid>
                <Grid
                  item
                  xs={12}
                  style={{ marginTop: "16px", textAlign: "center" }}
                >
                  <Typography>
                    <Link to="/login" className={classes.switchAuthFormText}>
                      Sign In
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
  if (!values.email) {
    errors.email = "Required";
  }
  return errors;
}

export default connect(
  undefined,
  { userLogin, showNotification }
)(withStyles(AuthFormStyles)(Register));
