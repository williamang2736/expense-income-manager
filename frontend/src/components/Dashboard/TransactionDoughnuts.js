import React, { Component, Fragment } from "react";
import { Query, Loading } from "react-admin";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { CardHeader, Typography, Card, CardContent } from "@material-ui/core";
import { VictoryPie, VictoryLabel } from "victory";

const styles = theme => ({
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
    return (
      <Fragment>
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
      </Fragment>
    );
  }
}

const TransactionChartGridItem = ({ resource, title, classes }) => {
  return (
    <Grid item xs={12} md={6}>
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
    return { x: t.name, y: t.amount_float };
  });
  return (
    <VictoryPie
      data={xy}
      height={225}
      innerRadius={50}
      colorScale={"qualitative"}
      labelRadius={95}
      labels={d => {
        return `${d.x}: ${d.y.toFixed(2)}`;
      }}
      style={{ labels: { fontSize: 12 } }}
    />
  );
};

export default withStyles(styles)(TransactionDoughnuts);
