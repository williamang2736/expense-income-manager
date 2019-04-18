import { toast } from "react-toastify";
import React from "react";

export const parseDjangoErrorsToNotificationMessages = errorBody => {
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

const toastErrorContent = (key, errors) => {
  return (
    <div>
      <div>{key}</div>
      <ul style={{ margin: "8px 0px" }}>
        {errors.map((e, i) => {
          return <li key={i}>{e}</li>;
        })}
      </ul>
    </div>
  );
};

export const displayErrorMessagesWithToastify = errorBody => {
  for (var key in errorBody) {
    if (errorBody.hasOwnProperty(key)) {
      toast.error(toastErrorContent(key, errorBody[key]));
    }
  }
};

const capitalize = s => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};
