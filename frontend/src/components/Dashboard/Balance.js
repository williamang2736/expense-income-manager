import React, { Component, Fragment } from "react";
import { Query, Loading } from "react-admin";
import { Typography, Card, CardContent } from "@material-ui/core";

class Balance extends Component {
  render() {
    return (
      <Query type="GET_ONE" resource="balance">
        {({ data, loading, error }) => {
          if (loading) {
            return <Loading />;
          }
          if (error) {
            return <p>{JSON.stringify(error)}</p>;
          }
          return (
            <Fragment>
              <BalanceGridItem title={"Incomes"} value={data.income_sum} />
              <BalanceGridItem title={"Expenses"} value={data.expense_sum} />
              <BalanceGridItem title={"Balance"} value={data.balance} />
            </Fragment>
          );
        }}
      </Query>
    );
  }
}

const BalanceGridItem = ({ title, value }) => {
  return (
    <Grid item sm={12} md={4}>
      <Card>
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            {title}
          </Typography>
          <Typography variant="headline">{value}</Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Balance;
