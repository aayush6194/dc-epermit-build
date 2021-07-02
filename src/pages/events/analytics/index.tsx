import React, { useMemo } from "react";
import Layout from '../../../layout';
import { Grid, Switch } from "platyplex_ui";
import Header from "./header";
import Chart from '../../../components/chart';
import { useMetricData } from '../../../hooks/metrics';
import { useSelectEnterpriseEvent } from '../model';


const Analytics = ({ switches }: { switches: JSX.Element }) => {
    const eId = '5f0387d7b029fcbd73a1b3cc';
    const { enterpriseEvent: activeEvent } = useSelectEnterpriseEvent();
    const downloads = ['event-revenue', 'event-transactions', 'event-reservations']
    const charts = (() => {
      const c = activeEvent.getAnalyticsCharts();
      return [c.revenue, c.transactions, c.reservations];
    })();

    const timeSeriesQueries = (() => {
      const f = (charts, i: number) => ({ timeSeriesQuery: charts[i].timeSeriesQuery, eId });
        return [f(charts, 0), f(charts, 1), f(charts, 2)];
    })();

    const metricDataStatuses = [
      useMetricData(timeSeriesQueries[0]),
      useMetricData(timeSeriesQueries[1]),
      useMetricData(timeSeriesQueries[2])
    ];
   
    useMemo(() => {
      [0, 1, 2].forEach(i => {
        metricDataStatuses[i].refresh(timeSeriesQueries[i].timeSeriesQuery);
      });
    }, [activeEvent.id]);

    return (
        <Layout sidebar>
            <Layout.Top >
                {switches}
                <Header />
            </Layout.Top>
            <Layout.Bottom>
                <Grid
                 placeItems="start stretch"
                 padding="1em"
                 height="100%"
                 gridGap='.5em'
                 style={{
                   width: 1400,
                   maxWidth: "100vw",
                   marginLeft: "auto",
                   marginRight: "auto",
                 }}>
                    <Grid cols={"3" } gridGap="0 1em">
                        {charts.map((chart: any, i) => <Chart
                            isPercent={false}
                            className='slide-up'
                            inChartLegend
                            metricDataStatus={metricDataStatuses[i].metricDataStatus}
                            {...chart}
                            download={downloads[i]}
                            eId={eId}
                            queries={{ timeSeriesQuery: charts[i].timeSeriesQuery }}
                        />)}
                    </Grid>
                </Grid>
            </Layout.Bottom>
        </Layout>
    );
};

export default Analytics;