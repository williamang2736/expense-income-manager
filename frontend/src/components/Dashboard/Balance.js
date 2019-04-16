// in src/Dashboard.js
import React, { Component } from "react";
import { Query, Loading } from "react-admin";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Typography, Card, CardContent } from "@material-ui/core";

const styles = theme => ({
  root: {
    flexGrow: 1
  }
});

class Balance extends Component {
  render() {
    const { classes } = this.props;

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
            <div className={classes.root}>
              <Grid container spacing={24}>
                <Grid item sm={12} md={4}>
                  <Card>
                    <CardContent>
                      <Typography
                        className={classes.title}
                        color="textSecondary"
                        gutterBottom
                      >
                        Incomes
                      </Typography>
                      <Typography variant="headline">
                        {data.income_sum}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item sm={12} md={4}>
                  <Card>
                    <CardContent>
                      <Typography
                        className={classes.title}
                        color="textSecondary"
                        gutterBottom
                      >
                        Expenses
                      </Typography>
                      <Typography variant="headline">
                        {data.expense_sum}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item sm={12} md={4}>
                  <Card>
                    <CardContent>
                      <Typography
                        className={classes.title}
                        color="textSecondary"
                        gutterBottom
                      >
                        Balance
                      </Typography>
                      <Typography variant="headline">{data.balance}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default withStyles(styles)(Balance);
