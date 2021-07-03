import React, { useState, useEffect } from "react";
import { Header, Card, Text, Button, Grid } from "platyplex_ui";
import { DatePicker, TimePicker, Divider, Select } from "antd";
import { moment, Moment, FORMAT_TIME } from "../utils/time";
import { Garage } from "../model/domain/garage";
import Label from "./label";
import { TimeSeries, IntervalPreset_E } from "../model/domain/metrics";
import useTimeSeriesQuery from "../hooks/timeseries";

export interface FilterProps {
  open: boolean;
  toggle: () => any;
  filterWidth: number;
  loading: boolean;
  submit: (timeSeriesQuery: TimeSeries.Query) => void;
  reset?: () => void;
  timeSeriesQuery: TimeSeries.Query;
  options: {
    timeframes: any /*TODO:  mommy all my friends have type except me*/;
    aggregations: any /*TODO:  mommy all my friends have type except me*/;
    metrics?: any /*TODO:  mommy all my friends have type except me*/;
    resources?: any /*TODO:  mommy all my friends have type except me*/;
  };
  hideTimeSelection?: boolean;
}

const defaultCustomInterval = {
  startTime: moment().add(-1, "day"),
  endTime: moment(),
};

const Filter = (fprops: FilterProps) => {
  const { timeframes, aggregations, metrics, resources } = fprops.options;
  const loadingTimeSeries = fprops.loading;

  const { timeSeriesQuery: tempQuery, actions } = useTimeSeriesQuery(
    fprops.timeSeriesQuery
  );

  const [customInterval, setCustomInterval] = useState(
    tempQuery.customInterval
      ? {
          startTime: moment(tempQuery.customInterval.startTime),
          endTime: moment(tempQuery.customInterval.endTime),
        }
      : { ...defaultCustomInterval }
  );
  const shouldDisableCustomPickers =
    tempQuery.intervalPreset !== IntervalPreset_E.custom;

  const [timeframeLabel, setTimeframeLabel] = useState("");
  const disabledDate = (cur: Moment | null) => (cur ? cur > moment() : false);

  const style = {
    height: "calc(100% - 4em)",
    width: fprops.filterWidth,
    position: "fixed",
    zIndex: 5,
    top: "4em",
    right: 0,
  };

  const props = { style: { width: "100%" }, disabled: loadingTimeSeries };

  const dividerStyle = {
    marginBottom: ".5em",
    fontSize: ".95em",
    color: "gray",
  };

  const gridProps = fprops.hideTimeSelection
    ? { customCols: "1fr", gridGap: 0, maxHeight: "100%" }
    : { cols: 2, gridGap: "0 1em" };
  const reverse = {
    points: ["bl", "tl"], // align dropdown bottom-left to top-left of input element
    offset: [0, -4], // align offset
    overflow: {
      adjustX: 0,
      adjustY: 0, // do not auto flip in y-axis
    },
  };

  useEffect(() => {

    setTimeframeLabel(getTimeframeLabel(timeframes, tempQuery))
  }, [
    tempQuery,
  ]);

  useEffect(() => {
    actions.refresh(fprops.timeSeriesQuery)
  }, [
    fprops.timeSeriesQuery?.alignment?.alignmentPeriod,
    fprops.timeSeriesQuery?.alignment?.alignmentReducer
  ]);

  if (!fprops.open) return null;

  return (
    <Card
      grid
      shadow
      style={style}
      margin="0"
      placeItems="stretch"
      gridGap="0"
      className="slide-in"
    >
      <Header textAlign="left" className="slide-up">
        <i className="fa fa-times pointer" onClick={() => fprops.toggle()}></i>
        <span className="pad">Filters</span>
      </Header>
      {timeframes && (
        <div>
          <Divider style={dividerStyle}>Timeframe </Divider>
          <div className="slide-up">
            <Text textAlign="left" bold>
              Presets
              <Label label={"Interval for the graph data"} />
            </Text>
            <Select
              onChange={actions.setIntervalPreset}
              {...props}
              value={timeframeLabel}
            >
              {timeframes.map(({ label, enteries }: any) => (
                <Select.OptGroup label={label}>
                  {enteries.map((entry: any) => (
                    <Select.Option value={entry.value}>
                      {entry.label}
                    </Select.Option>
                  ))}
                </Select.OptGroup>
              ))}
            </Select>
          </div>

          <div className="slide-up" style={{ marginTop: "1em" }}>
            <Text textAlign="left" bold>
              From
            </Text>
            <Grid {...gridProps} mobileLayout={false}>
              <DatePicker
                disabled={shouldDisableCustomPickers}
                clearIcon={false}
                disabledDate={disabledDate}
                style={{ borderRadius: 8, width: "100%" }}
                onChange={(startTime) => {
                  setCustomInterval({ ...customInterval, startTime });
                }}
                value={customInterval.startTime}
              />
              {!fprops.hideTimeSelection && (
                <TimePicker
                  disabled={shouldDisableCustomPickers}
                  clearIcon={false}
                  disabledDate={disabledDate}
                  use12Hours
                  format={FORMAT_TIME}
                  minuteStep={15}
                  style={{ borderRadius: 8, width: "100%" }}
                  onChange={(startTime) => {
                    setCustomInterval({ ...customInterval, startTime });
                  }}
                  value={customInterval.startTime}
                />
              )}
            </Grid>
          </div>

          <div className="slide-up" style={{ marginTop: "1em" }}>
            <Text textAlign="left" bold>
              To
            </Text>
            <Grid {...gridProps} gridGap="0 1em" mobileLayout={false}>
              <DatePicker
                clearIcon={false}
                disabled={shouldDisableCustomPickers}
                disabledDate={disabledDate}
                style={{ borderRadius: 8, width: "100%" }}
                onChange={(endTime) => {
                  setCustomInterval({ ...customInterval, endTime });
                }}
                value={customInterval.endTime}
              />

              {!fprops.hideTimeSelection && (
                <TimePicker
                  disabledDate={disabledDate}
                  use12Hours
                  clearIcon={false}
                  format={FORMAT_TIME}
                  disabled={shouldDisableCustomPickers}
                  style={{ borderRadius: 8, width: "100%" }}
                  onChange={(endTime) => {
                    setCustomInterval({ ...customInterval, endTime });
                  }}
                  value={customInterval.endTime}
                />
              )}
            </Grid>
          </div>
        </div>
      )}
      {metrics && (
        <div className="slide-up">
          <Divider style={dividerStyle}>Metric</Divider>
          <Text bold textAlign="left">
            Select Measurement
            <Label label={"Metric Type"} />
          </Text>
          <Select
            {...props}
            placeholder="Select"
            value={tempQuery.metricType}
            onChange={actions.setMetric}
          >
            {metrics.map(({ label, value }: any) => (
              <Select.Option className="capitalize" value={value}>
                {label}
              </Select.Option>
            ))}
          </Select>
        </div>
      )}

      {resources && (
        <div className="slide-up">
          <Divider style={dividerStyle}>Resources</Divider>
          <Text bold textAlign="left">
            Select Garages
          </Text>
          <Select
            {...props}
            mode="multiple"
            placeholder="All Garages"
            value={tempQuery.resourceIds}
            onChange={actions.setGarages}
          >
            {resources.map(({ name, id }: Garage) => (
              <Select.Option value={id}>{name}</Select.Option>
            ))}
          </Select>
        </div>
      )}

      {aggregations && (
        <div className="slide-up">
          <Divider style={dividerStyle}>Aggregation</Divider>
          <Text bold textAlign="left">
            {aggregations.label}
            <Label
              label={"Time period for the data(Min/Max) to be aggregated"}
            />
          </Text>
          <Select
            onChange={(e: any) => {
            
              const parsedValue = JSON.parse(e);

              actions.setDayFilter(
                parsedValue.timeSelection ? undefined : null
              );
              actions.setAlignment(parsedValue.value);
            }}
            {...props}
            value={getAlignment(tempQuery.alignment, tempQuery.dayFilter)}
            defaultValue={"None"}
            dropdownAlign={reverse}
          >
            {aggregations.values.map((props: any) => (
              <Select.Option value={JSON.stringify(props)}>
                {props.label}
              </Select.Option>
            ))}
          </Select>
        </div>
      )}


      {tempQuery?.dayFilter && (
        <div className="slide-up">
          <Text bold textAlign="left">
            {aggregations.label}
            <Label
              label={"Time period for the data(Min/Max) to be aggregated"}
            />
          </Text>
          <Grid {...gridProps} gridGap="0 1em" mobileLayout={false}>
            <TimePicker
              use12Hours
              clearIcon={false}
              format={FORMAT_TIME}
              showMinute={false}
              style={{ borderRadius: 8, width: "100%" }}
              onChange={(e) =>
                actions.setDayFilter({
                  hours: [e?.hour(), tempQuery.dayFilter.hours[1]],
                })
              }
              value={moment()
                .set("hour", tempQuery.dayFilter.hours[0])
                .set("minute", 0)}
              dropdownAlign={reverse}
            />

            <TimePicker
              use12Hours
              clearIcon={false}
              showMinute={false}
              format={FORMAT_TIME}
              style={{ borderRadius: 8, width: "100%" }}
              onChange={(e) =>
                actions.setDayFilter({
                  hours: [tempQuery.dayFilter.hours[0], e?.hour()],
                })
              }
              value={moment()
                .set("hour", tempQuery.dayFilter.hours[1])
                .set("minute", 0)}
              dropdownAlign={reverse}
            />

            <Text
              bold
              textAlign="right"
              style={{ gridColumn: "1/-1" }}
              width="100%"
            >
              {`${
                tempQuery.dayFilter.hours[1] - tempQuery.dayFilter.hours[0]
              } hours`}
            </Text>
          </Grid>
        </div>
      )}

      <Grid
        cols={fprops.reset ? 2 : 1}
        placeItems="stretch"
        placeSelf="end stretch"
      >
        <Button
          shadow
          onClick={() => {
            fprops.submit({
              ...tempQuery,
              ...(tempQuery.intervalPreset === "custom"
                ? { customInterval }
                : {}),
            });
          }}
          disabled={loadingTimeSeries}
        >
          Submit
        </Button>
        {fprops.reset && (
          <Button
            onClick={fprops.reset}
            disabled={loadingTimeSeries}
            noBorder
            invert
            shadow
          >
            Reset
          </Button>
        )}
      </Grid>
    </Card>
  );
};

const getAlignment = (
  alignment: { alignmentReducer: string; alignmentPeriod: string } | null,
  dayFilter: TimeSeries.DayFilterQuery
) => {
  if (!alignment) return "None";

  const period = !dayFilter ? "Daily" : "Hourly";
  const reducer = alignment.alignmentReducer === "MIN" ? "Min" : "Max";
  return `${period} ${reducer}`;
};

function getTimeframeLabel(timeframes: any, timeSeriesQuery: TimeSeries.Query) {
  for (let i = 0; i < timeframes.length; i++) {
    const enteries = timeframes[i].enteries;
    for (let j = 0; j < enteries.length; j++) {
      const timeframe = enteries[j];
      if (timeframe.value === timeSeriesQuery.intervalPreset) {
        return timeframe.label;
      }
    }
  }

  console.error("Hoi, something not right with filter options");
  return "Today";
}

export default Filter;
