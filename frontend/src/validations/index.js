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
