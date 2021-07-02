import React, { useState } from 'react'
import { Grid, List, Text, Empty, Header } from 'platyplex_ui';
import { invertedTxtColor } from '../../config';
import { overflow } from "../../utils/text";
import { moment } from '../../utils/time';
import useInterval from '../../hooks/interval';
import { useScoreCards   } from "../../hooks/widget";
import * as D from "../../model/domain/dashboard";
import { disabledTxtColor } from "../../config";
import CountUp from "react-countup";
import { Progress, Tooltip } from "antd";

interface ScoreCards2Props {
  style?: React.CSSProperties,
  refreshInterval?: number,
  enterpriseId: string,
  userId: string
  scoreCardNames: string[],
}

//TODO(Abhaya): Implement refreshInterval
export function ScoreCards({ style, refreshInterval, enterpriseId, userId,  scoreCardNames }: ScoreCards2Props) {
  const [time, setTime ] = useState(moment().format('hh:mm A'))



  const { loading, scoreCardRenderData } = useScoreCards(enterpriseId, userId, scoreCardNames);

  return (
    <div className="slide-up"
      style={{ width: "100%", gridColumn: "1/-1", padding: ".9em .5em", ...(style || {}) }}>
      {!loading && <Text
        style={{ gridColumn: '1/-1', fontSize: '.8em' }}
        textAlign='right'
        color={invertedTxtColor}
      >
       &nbsp; Updated at: {time}
      </Text>}
      <Grid 
        cols={loading ? 1 : 5} 
        mobileCols='1fr 1fr' 
        placeItems={loading ? 'center' : 'stretch'} 
        style={{ minHeight: "9em" }}>
        <List
          list={scoreCardNames}
          loading={loading}
          map={(item: any, index: number) => {
            const scoreCardRenderDatum = scoreCardRenderData[index];
            const scoreCard2Props: Partial<ScoreCard2Props> = { borderRight: index < scoreCardNames.length - 1 };
            
            return (
              <ScoreCardRenderer 
                renderDatum={scoreCardRenderDatum} 
                scoreCard2Props={scoreCard2Props}/>
            );
          }}
        />
      </Grid>

    </div>);
}

function ScoreCardRenderer({ renderDatum, scoreCard2Props }: { renderDatum: D.ScoreCardRenderDataItem, scoreCard2Props: Partial<ScoreCard2Props> }) {
  let component: any = null;

  if (!renderDatum.isAvailable) {
    return render_notAvailable(renderDatum, scoreCard2Props);
  }

  switch(renderDatum.descriptor.name) {
    case D.SCD_PARKED_VEHICLES_PERCENT: {
      component = render_totalParkedVehiclesPercent(renderDatum, scoreCard2Props);
    } break;
    case D.SCD_PARKED_VEHICLES_COUNT: {
      component = render_totalParkedVehiclesCount(renderDatum, scoreCard2Props);
    } break;
    case D.SCD_ACTIVE_GARAGES: {
      component = render_activeGarages(renderDatum, scoreCard2Props);
    } break;
    case D.SCD_GARAGE_OCCUPANCIES: {
      component = render_garageOccupancies(renderDatum, scoreCard2Props);
    } break;
    case D.SCD_ACTIVE_ANNOUNCEMENTS: {
      component = render_activeAnnouncements(renderDatum, scoreCard2Props);
    } break;
    case D.SCD_UPCOMING_ANNOUNCEMENTS: {
      component = render_upcomingAnnouncements(renderDatum, scoreCard2Props);
    } break;
    case D.SCD_CITATION_REVENUE: {
      component = render_citationRevenue(renderDatum, scoreCard2Props);
    } break;
    case D.SCD_CITATION_TRANSACTION_COUNT: {
      component = render_citationTransactionCount(renderDatum, scoreCard2Props);
    } break;
    case D.SCD_CITATION_APPEAL_ATTEMPT: {
      component = render_citationAppealAttempt(renderDatum, scoreCard2Props);
    } break;
    case D.SCD_CITATION_PARKSTASH_MATCH: {
      component = render_citationParkstashMatch(renderDatum, scoreCard2Props);
    } break;
    case D.SCD_PENDING_USERS: {
      component = render_pendingUsers(renderDatum, scoreCard2Props);
    } break;
    case D.SCD_ACCEPTED_USERS: {
      component = render_acceptedUsers(renderDatum, scoreCard2Props);
    } break;
    case D.SCD_TOTAL_USERS: {
      component = render_totalUsers(renderDatum, scoreCard2Props);
    } break;
  }

  return component;
}

function render_totalParkedVehiclesPercent(renderData: D.ScoreCardRenderDataItem, scoreCard2Props: Partial<ScoreCard2Props>) {
  return <ScoreCard2
    {...scoreCard2Props}
    title={renderData.descriptor.displayName}
    faIcon={renderData.descriptor.faIcon}
    hoverLabel={renderData.descriptor.description}>
    <ScoreCardPercentCircle
      percent={renderData.value}
      useGradient={false} />
  </ScoreCard2>
}

function render_totalParkedVehiclesCount(renderData: D.ScoreCardRenderDataItem, scoreCard2Props: Partial<ScoreCard2Props>) {
  return <ScoreCard2
    {...scoreCard2Props}
    title={renderData.descriptor.displayName}
    faIcon={renderData.descriptor.faIcon}
    hoverLabel={renderData.descriptor.description}>
    <ScoreCard_a_over_b 
      a={renderData.value.occupiedCount}
      b={renderData.value.totalCount}  />
  </ScoreCard2>
}

function render_activeGarages(renderData: D.ScoreCardRenderDataItem, scoreCard2Props: Partial<ScoreCard2Props>) {
  return <ScoreCard2
    {...scoreCard2Props}
    title={renderData.descriptor.displayName}
    faIcon={renderData.descriptor.faIcon}
    hoverLabel={renderData.descriptor.description}>
    <ScoreCard_a_over_b 
      a={renderData.value.activeCount}
      b={renderData.value.totalCount}  />
  </ScoreCard2>
}

function render_garageOccupancies(renderData: D.ScoreCardRenderDataItem, scoreCard2Props: Partial<ScoreCard2Props>) {
  return <ScoreCard2
    {...scoreCard2Props}
    title={renderData.descriptor.displayName}
    faIcon={renderData.descriptor.faIcon}
    span={2}
    hoverLabel={renderData.descriptor.description}>
  <Grid placeSelf="start">
    <Grid
      customCols={"1fr  minmax(15em, auto)"}
      placeItems="stretch"
      width="100%"
      color="white"
      gridGap=".2em 1.5em"
    >
      <List
        empty={
          <div style={{ gridColumn: "1/-1" }}>
            <Empty
              text={"No Garage Occupancy"}
              color="white"
              style={{ width: "7em", margin: "0 auto" }}
            />
          </div>
        }
        pagination={{ items: 4 }}
        list={renderData.value}
        map={({ garageName, currentOccupancy, maxOccupancy, abnormalityBaselinePercent, isAbnormalityActive }) => {
          return (
            <>
              <Text size={3.75} textAlign="left" color={"white"}>
                <Tooltip
                  title={`
                    Abnormality is: ${
                      isAbnormalityActive
                        ? `ON. It is triggered on ${renderHelper_formatPercent(abnormalityBaselinePercent)}`
                        : "OFF"
                    }`}>
                  <span className="txt-overflow">
                    <i
                      style={{ color: isAbnormalityActive? "coral" : disabledTxtColor }}
                      className="fa fa-bell"
                    ></i>
                    &nbsp;&nbsp;{overflow(garageName, 23)}
                  </span>
                </Tooltip>
              </Text>
              <ScoreCardPercentBar
                percent={currentOccupancy / maxOccupancy}
                useGradient={true} />
            </>
          );
        }}
      />
    </Grid>
  </Grid>
  </ScoreCard2>
}

function render_activeAnnouncements(renderData: D.ScoreCardRenderDataItem, scoreCard2Props: Partial<ScoreCard2Props>) {
  return <ScoreCard2
    {...scoreCard2Props}
    title={renderData.descriptor.displayName}
    faIcon={renderData.descriptor.faIcon}
    hoverLabel={renderData.descriptor.description}>
    <ScoreCard_a_over_b 
      a={renderData.value.activeCount}
      b={renderData.value.totalCount}  />
  </ScoreCard2>
}

function render_upcomingAnnouncements(renderData: D.ScoreCardRenderDataItem, scoreCard2Props: Partial<ScoreCard2Props>) {
  return <ScoreCard2
    {...scoreCard2Props}
    title={renderData.descriptor.displayName}
    faIcon={renderData.descriptor.faIcon}
    hoverLabel={renderData.descriptor.description}>
    <ScoreCard_a_over_b 
      a={renderData.value.upcomingCount}
      b={renderData.value.totalCount}  />
  </ScoreCard2>
}

function render_citationRevenue(renderData: D.ScoreCardRenderDataItem, scoreCard2Props: Partial<ScoreCard2Props>) {
  const { value, adjacentLabel } = renderHelper_thisMonthLastMonth_valueAndAdjacentLabel(
    renderData.value.thisMonthRevenue, renderData.value.lastMonthRevenue, 'revenue');

  return <ScoreCard2
    {...scoreCard2Props}
    title={renderData.descriptor.displayName}
    faIcon={renderData.descriptor.faIcon}
    hoverLabel={renderData.descriptor.description}
    adjacentLabel={adjacentLabel}>
    <ScoreCardDollars cents={value} />
  </ScoreCard2>;
}

function render_citationTransactionCount(renderData: D.ScoreCardRenderDataItem, scoreCard2Props: Partial<ScoreCard2Props>) {
  const { value, adjacentLabel } = renderHelper_thisMonthLastMonth_valueAndAdjacentLabel(
    renderData.value.thisMonthTransactionCount, renderData.value.thisMonthTransactionCount, 'transaction');

  return <ScoreCard2
    {...scoreCard2Props}
    title={renderData.descriptor.displayName}
    faIcon={renderData.descriptor.faIcon}
    hoverLabel={renderData.descriptor.description}
    adjacentLabel={adjacentLabel}>
    <ScoreCardNumber value={value} />
  </ScoreCard2>;
}

function render_citationAppealAttempt(renderData: D.ScoreCardRenderDataItem, scoreCard2Props: Partial<ScoreCard2Props>) {
  const { value, adjacentLabel } = renderHelper_thisMonthLastMonth_valueAndAdjacentLabel(
    renderData.value.thisMonthAppeal, renderData.value.lastMonthAppeal, 'appeal');

  return <ScoreCard2
    {...scoreCard2Props}
    title={renderData.descriptor.displayName}
    faIcon={renderData.descriptor.faIcon}
    hoverLabel={renderData.descriptor.description}
    adjacentLabel={adjacentLabel}>
    <ScoreCardNumber value={value} />
  </ScoreCard2>;
}

function render_citationParkstashMatch(renderData: D.ScoreCardRenderDataItem, scoreCard2Props: Partial<ScoreCard2Props>) {
  const { value, adjacentLabel } = renderHelper_thisMonthLastMonth_valueAndAdjacentLabel(
    renderData.value.thisMonthMatch, renderData.value.lastMonthMatch, 'ParkStash match');

  return <ScoreCard2
    {...scoreCard2Props}
    title={renderData.descriptor.displayName}
    faIcon={renderData.descriptor.faIcon}
    hoverLabel={renderData.descriptor.description}
    adjacentLabel={adjacentLabel}>
    <ScoreCardNumber value={value} />
  </ScoreCard2>;
}

function render_pendingUsers(renderData: D.ScoreCardRenderDataItem, scoreCard2Props: Partial<ScoreCard2Props>) {
  return <ScoreCard2
    {...scoreCard2Props}
    title={renderData.descriptor.displayName}
    faIcon={renderData.descriptor.faIcon}
    hoverLabel={renderData.descriptor.description}
    adjacentLabel={""}>
    <ScoreCardNumber value={renderData.value} />
  </ScoreCard2>
}

function render_acceptedUsers(renderData: D.ScoreCardRenderDataItem, scoreCard2Props: Partial<ScoreCard2Props>) {
  return <ScoreCard2
    {...scoreCard2Props}
    title={renderData.descriptor.displayName}
    faIcon={renderData.descriptor.faIcon}
    hoverLabel={renderData.descriptor.description}
    adjacentLabel={""}>
    <ScoreCardNumber value={renderData.value} />
  </ScoreCard2>
}

function render_totalUsers(renderData: D.ScoreCardRenderDataItem, scoreCard2Props: Partial<ScoreCard2Props>) {
  return <ScoreCard2
    {...scoreCard2Props}
    title={renderData.descriptor.displayName}
    faIcon={renderData.descriptor.faIcon}
    hoverLabel={renderData.descriptor.description}
    adjacentLabel={""}>
  <ScoreCardNumber value={renderData.value} />
</ScoreCard2>
}

function render_notAvailable(renderData: D.ScoreCardRenderDataItem, scoreCard2Props: Partial<ScoreCard2Props>) {
  return <ScoreCard2
  {...scoreCard2Props}
  title={renderData.descriptor.displayName}
  faIcon={renderData.descriptor.faIcon}
  hoverLabel={renderData.descriptor.description}
  adjacentLabel={""}>
    <div className="txt-lgx">
      N/A
    </div>  
</ScoreCard2>
}

function renderHelper_thisMonthLastMonth_valueAndAdjacentLabel(thisMonth: number, lastMonth: number, kind: string) {
  let value: number, adjacentLabel: string;
  if (!thisMonth && !lastMonth) {
    value = 0;
    adjacentLabel = `<p>No ${kind} this or the previous month.</p>`;
  } else  if (!thisMonth) {
    value = lastMonth;
    adjacentLabel =  `<p>No ${kind} this month, showing for previous month.</p>`;
  } else  if (!lastMonth) {
    value = thisMonth;
    adjacentLabel = `<p>This month's ${kind}</p>`;
  } else {
    value = thisMonth;

    const diff = thisMonth - lastMonth;
    const diffPercent = renderHelper_formatPercent(diff / lastMonth);  
    adjacentLabel = diff == 0
      ? 'Same as last month'
      : diff < 0
        ? `<p><span style="font-size: 2em; color: red;">↓</span> ${diffPercent} vs last Month</p>`
        : `<p><span style="font-size: 2em; color: lightgreen;">↑</span> ${diffPercent} vs last Month</p>`;
  }

  return { value, adjacentLabel };
}

function renderHelper_formatPercent (n: number) {
  return (n * 100).toFixed(2) + '%';
}

interface ScoreCard2Props {
  title: string,
  faIcon: string,
  children: JSX.Element,
  span?: number,
  borderRight?: boolean,  
  adjacentLabel?: string,
  hoverLabel?: string,  
}

export const ScoreCard2 = ({
  title,
  faIcon,
  span,
  children,
  adjacentLabel,
  hoverLabel,
  borderRight,
}: ScoreCard2Props) => {
  const borderStyle = borderRight
    ? { borderRight: "1px solid " + disabledTxtColor, padding: "0 1em" }
    : {};
  span = span || 1;
  borderRight = borderRight || false;
  return (
    <Grid
      className={"noselect span-" + span}
      style={{ ...borderStyle, minHeight: "10em" }}
      placeSelf="stretch"
      gridGap=".5em"
      customRows="auto 1fr" >
      <Header
        size={3.5}
        color={"white"}
        placeSelf="start stretch"
        style={{ lineHeight: ".8em", height: "1.5em" }}
      >
        {title} &nbsp;
        {faIcon && (
          <Tooltip placement="topLeft" title={hoverLabel}>
            <i className={faIcon + " pointer"}></i>
          </Tooltip>
        )}
      </Header>
      <div style={{ color: "white", placeSelf: "start center" }}>
        <div style={{ height: "6em" }}>{children}</div>
        <div
          style={{ lineHeight: "1em" }}
          dangerouslySetInnerHTML={{ __html: adjacentLabel }}
        ></div>
      </div>
    </Grid>
  );
};

const ScoreCardPercentCircle = ({ percent, useGradient }: any) => {
  percent = Math.round(percent * 10000) / 100;
  const gradient =
    percent <= 50
      ? "#F2BE72"
      : `linear-gradient(to right, #F2BE72 ${50}%, #F76E49)`;
  return (
    <Progress
      percent={percent}
      strokeColor={useGradient? gradient: "#5578D6"}
      successPercent={0}
      type={"circle"}
      format={() => (
        <div className="bold" style={{ color: "white" }}>
          {percent + "%"}
        </div>
      )}
    />
  );
};

const ScoreCardPercentBar = ({ percent, useGradient }: any) => {
  percent = Math.round(percent * 10000) / 100;
  const gradient =
    percent <= 50
      ? "#F2BE72"
      : `linear-gradient(to right, #F2BE72 ${50}%, #F76E49)`;
  return (
    <Progress
      percent={percent}
      strokeColor={useGradient? gradient: "#5578D6"}
      successPercent={0}
      format={() => (
        <div className="bold" style={{ color: "white" }}>
          {percent + "%"}
        </div>
      )}
    />
  );
};

const ScoreCard_a_over_b = ({a, b}: any) => {
  return (
    <>
      <span className="txt-lgx">{a}</span>
      <span className="txt-md">/{b}</span>
    </>
  );
};

const ScoreCardNumber = ({ value }: any) => {  
  return (
    <div className="txt-lgx">
      <CountUp duration={2} start={0} end={value as number} />
    </div>
  );
};

const ScoreCardDollars = ({ cents }: any) => {
  const dollars = cents / 100;
  return (
    <div className="txt-lgx">
      {"$"}
      <CountUp duration={2} start={0} end={dollars as number} />
    </div>
  );
};