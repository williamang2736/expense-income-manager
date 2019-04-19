import React, { Component, Fragment } from "react";
import { Query, Loading } from "react-admin";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { CardHeader, Typography, Card, CardContent } from "@material-ui/core";
import {
  VictoryPie,
  VictoryLabel,
  VictoryTooltip,
  VictoryChart,
  VictoryLegend
} from "victory";

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
  let legendData = [];
  const xy = transactions.map(t => {
    legendData.push({ name: t.name });
    return {
      x: t.name,
      y: t.amount_float,
      label: `${t.name}: ${t.amount}`
    };
  });

  return (
    <svg width={"100%"} height={400}>
      <VictoryLegend
        standalone={false}
        colorScale={["tomato", "orange", "gold"]}
        gutter={20}
        x={10}
        centerTitle
        data={legendData}
        colorScale={"qualitative"}
      />
      <VictoryPie
        standalone={false}
        data={xy}
        height={300}
        innerRadius={80}
        padding={{ left: 120, top: 40, bottom: 40 }}
        colorScale={"qualitative"}
        labelRadius={95}
        style={{ labels: { fontSize: 12 } }}
        labelComponent={<VictoryTooltip style={{ fontSize: "12px" }} />}
      />
    </svg>
  );
};

export default withStyles(styles)(TransactionDoughnuts);
