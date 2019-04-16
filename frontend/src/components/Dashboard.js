// in src/Dashboard.js
import React from "react";
import { Query, Loading } from "react-admin";
import Card from "@material-ui/core/Card";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { VictoryPie } from "victory";
import { CardHeader, Typography } from "@material-ui/core";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  chartCard: {
    textAlign: "center"
  },
  chartTitle: {
    margin: "16px",
    textAlign: "left"
  }
});

class GuttersGrid extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item sm={12} md={6}>
            <Card className={classes.chartCard}>
              <Typography variant="title" className={classes.chartTitle}>
                Expenses
              </Typography>
              <Query type="GET_LIST" resource="expenses">
                {({ data, loading, error }) => {
                  if (loading) {
                    return <Loading />;
                  }
                  if (error) {
                    return <p />;
                  }
                  return (
                    <TransactionChart
                      transactions={data}
                      chartTitle={"Expenses"}
                    />
                  );
                }}
              </Query>
            </Card>
          </Grid>
          <Grid item sm={12} md={6}>
            <Card className={classes.chartCard}>
              <Typography variant="title" className={classes.chartTitle}>
                Incomes
              </Typography>
              <Query type="GET_LIST" resource="incomes">
                {({ data, loading, error }) => {
                  if (loading) {
                    return <Loading />;
                  }
                  if (error) {
                    return <p />;
                  }
                  return (
                    <TransactionChart
                      transactions={data}
                      chartTitle={"Incomes"}
                    />
                  );
                }}
              </Query>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default () => {
  const GuttersGridWithStyle = withStyles(styles)(GuttersGrid);
  return <GuttersGridWithStyle />;
};

const TransactionChart = ({ transactions, chartTitle }) => {
  const xy = transactions.map(t => {
    return { x: t.name, y: t.amount };
  });
  return (
    <VictoryPie
      data={xy}
      height={250}
      innerRadius={50}
      colorScale={"qualitative"}
      labels={d => `${d.x}: ${d.y}`}
    />
  );
};
