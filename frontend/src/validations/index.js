export const validateTransaction = values => {
  const errors = {};
  if (!values.name) {
    errors.name = ["Name is required"];
  }
  if (!values.amount) {
    errors.amount = ["Amount is required"];
  } else if (!parseInt(values.amount)) {
    errors.amount = ["Only numbers are allowed"];
  }
  return errors;
};

export const validateEmail = email => {
  // eslint-disable-next-line
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};
