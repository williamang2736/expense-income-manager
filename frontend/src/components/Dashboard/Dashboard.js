import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { Title } from "react-admin";

import Balance from "./Balance";
import TransactionDoughnuts from "./TransactionDoughnuts";

export default () => {
  return (
    <div style={{ flexGrow: 1, padding: "12px" }}>
      <Title title="Dashboard" />
      <Grid container spacing={24}>
        <Balance />
        <TransactionDoughnuts />
      </Grid>
    </div>
  );
};
