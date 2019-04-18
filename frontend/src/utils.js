export const parseDjangoErrorsToNotificationMessages = errorBody => {
  console.log(errorBody);
  let errorMessage = "Error: ";
  for (var key in errorBody) {
    if (errorBody.hasOwnProperty(key)) {
      errorMessage += "\n";
      errorMessage += `${key}: `;
      errorBody[key].forEach(e => {
        errorMessage += `${e}`;
      });
    }
  }
  return errorMessage;
};
