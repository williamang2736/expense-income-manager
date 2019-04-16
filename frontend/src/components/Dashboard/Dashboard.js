import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import Balance from "./Balance";
import TransactionDoughnuts from "./TransactionDoughnuts";

export default () => {
  return (
    <div>
      <Balance />
      <TransactionDoughnuts />
    </div>
  );
};
