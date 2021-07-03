import React, { useEffect, useState } from "react";
import { Header, Grid, Notification } from 'platyplex_ui';
import { disabledTxtColor, primaryColor } from "../../../config";
import { overflow } from "../../../utils/text";
import { Charts } from "../types";
import charts from '../json/charts.json'
import api from "../../../api";
import logger from "../../../utils/logger";
import { TimeSeries } from '../../../model/domain/metrics';

type ReportQuery = {  [key: string]: TimeSeries.Query };

const createReport = (eId: string, reportType: string, queries: ReportQuery) => {
  const ts = Object.keys(queries)
  .reduce((acc, key, i) => acc + `${i > 0 ? '&' : ''}${key}=${JSON.stringify(queries[key])}`, '');

}

const ChartHeader = ({
  chartType,
  chartTypes,
  setChartType,
  title, filter,
  isPercent,
  loading = false,
  download,
  eId,
  queries
}: any) => {
  const [links, setLinks] = useState([])

  return (
    <Header
      className="grid"
      color={primaryColor}
      style={{
        gridColumn: "1/-1",
        width: "100%",
        gridTemplateColumns: "1fr auto auto",
        placeItems: "start ",
      }}
      bold
      size={4}
    >
      <Grid mobileLayout={false} customCols="auto 1fr auto" gridGap=".5em" padding=".2em .5em"
        width={'100%'}
        style={{
          placeItems: 'start',
          borderRadius: "1em",
          textTransform: "capitalize",
          placeSelf: "start",
        }}
      >
        <Header bold size={3.75} textAlign='left'>{overflow(title, 25)}</Header>
        <div style={{ placeSelf: "end" }}>
       
        </div>
        {filter}
      </Grid>
    </Header>
  )
};
export default ChartHeader;

function downloadFromLink(link: string)  {
  return new Promise((resolve: any, reject) => {
    const el = document.createElement('a');
    el.setAttribute('id', Math.random() + '');
    el.setAttribute('href', link); 
    el.setAttribute('download', '');
    el.setAttribute('style', 'width: 0px, height: 0px');
  
    document.body.appendChild(el); 
  
    el.click();
  
    setTimeout(() => {
      document.body.removeChild(el);
      resolve();
    }, 500);
  })
}