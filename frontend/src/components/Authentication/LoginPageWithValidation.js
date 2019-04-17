// With final form
class SignInForm extends React.Component {
  render() {
    return (
      <Form
        onSubmit={values => {
          // Submit credentials to provider
        }}
        initialValues={{}}
        validate={validate}
        render={({ handleSubmit, reset, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit} noValidate>
            <Typography
              variant="h6"
              style={{ marginBottom: "30px", textAlign: "center" }}
            >
              <span role="img" aria-label="recipe-book">
                📔
              </span>{" "}
              Sign In
            </Typography>
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
                style={{ position: "absolute", bottom: "10px" }}
                xs={12}
              >
                <Typography onClick={() => this.props.openSignUpDialog()}>
                  Sign Up
                </Typography>
              </Grid>
            </Grid>
          </form>
        )}
      />
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

export default SignInForm;
