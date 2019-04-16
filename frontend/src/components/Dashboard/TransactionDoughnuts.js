// in src/Dashboard.js
import React, { Component } from "react";
import { Query, Loading } from "react-admin";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { CardHeader, Typography, Card, CardContent } from "@material-ui/core";
import { VictoryPie } from "victory";

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

class TransactionDoughnuts extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <TransactionChartGridItem
            resource={"incomes"}
            title={"Incomes"}
            {...this.props}
          />
          <TransactionChartGridItem
            resource={"expenses"}
            title={"Expenses"}
            {...this.props}
          />
        </Grid>
      </div>
    );
  }
}

const TransactionChartGridItem = ({ resource, title, classes }) => {
  return (
    <Grid item sm={12} md={6}>
      <Card className={classes.chartCard}>
        <Typography variant="title" className={classes.chartTitle}>
          {title}
        </Typography>
        <Query type="GET_LIST" resource={resource}>
          {({ data, loading, error }) => {
            if (loading) {
              return <Loading />;
            }
            if (error) {
              return <p />;
            }
            return <TransactionChart transactions={data} chartTitle={title} />;
          }}
        </Query>
      </Card>
    </Grid>
  );
};

const TransactionChart = ({ transactions }) => {
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

export default withStyles(styles)(TransactionDoughnuts);
