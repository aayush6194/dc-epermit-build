import React, { useState, useEffect } from "react";
import { Grid, Header } from "platyplex_ui";
import CountUp from "react-countup";
import { Progress, Tooltip } from "antd";
import API from "../../api";
import { useSelector } from "react-redux";
import { disabledTxtColor } from "../../config";
import logger from "../../utils/logger";
import useInterval from "../../hooks/interval";

//NOTE(Abhaya): pages/events/*.tsx refer to this module still
//Render them inside score-card.tsx and then remove this module.
export const ScoreCard = ({
  title,
  faIcon,
  span = 1,
  color = "white",
  children,
  adjacentLabel,
  hoverLabel,
  borderRight,
}: any) => {
  const borderStyle = borderRight
    ? { borderRight: "1px solid " + disabledTxtColor, padding: "0 1em" }
    : {};
  return (
    <Grid
      className={"noselect span-" + span}
      style={{ ...borderStyle, minHeight: "10em" }}
      placeSelf="stretch"
      gridGap=".5em"
      customRows="auto 1fr"
    >
      <Header
        size={3.5}
        color={color}
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
      <div style={{ color, placeSelf: "start center" }}>
        <div style={{ height: "6em" }}>{children}</div>
        <div
          style={{ lineHeight: "1em" }}
          dangerouslySetInnerHTML={{ __html: adjacentLabel }}
        ></div>
      </div>
    </Grid>
  );
};

ScoreCard.PercentBar = ({
  percent,
  type,
  text,
  status = false,
  successPercent,
}: any) => {
  const gradient =
    percent <= 50
      ? "#F2BE72"
      : `linear-gradient(to right, #F2BE72 ${50}%, #F76E49)`;
  return (
    <Progress
      percent={percent}
      style={{width: 150}}
      strokeColor={status ? gradient : "#5578D6"}
      successPercent={successPercent || 0}
      type={type}
      format={() => (
        <div className="bold" style={{ color: "white" }}>
          {text || percent + "%"}
        </div>
      )}
    />
  );
};

const intoHeadings = (str: string) =>
  str.charAt(0).toUpperCase() + str.substring(1).replace(/ /g, " ");

const FlatValue = ({
  name,
  flatValueQuery,
  borderRight,
  refreshInterval = -1,
  refresh = true,
}: any) => {
  const [res, setRes] = useState({
    value: 0,
    hoverLabel: null,
    adjacentLabel: undefined,
    isPercent: false,
    unit: undefined,
    applicableResource: "",
  });
  const { value, hoverLabel, adjacentLabel, isPercent, unit } = res;
  const eId = useSelector((state: any) => state.user.enterprise.id);

  const getValue = (value: number, unit?: string) => {
    if (unit === "%" || unit === "cents") value /= 100;

    value = Math.round(value * 100) / 100;
    return value || 0;
  };

  const getIcon = (resource: string) => {
    switch (resource) {
      case "citation":
        return "fas fa-money-check-alt";

      case "announcement":
        return "fas fa-bullhorn";

      case "enterpriseUser":
        return "fa fa-user";

      default:
        return "fa fa-car";
    }
  };

  const loadValue = async () => {
    setRes({
      isPercent: unit == "%",
      hoverLabel: "",
      unit: "",
      adjacentLabel,
      value: 500,
      applicableResource: 'events',
    });
  };

  useEffect(() => {
    if (refresh) loadValue();
  }, [refresh]);
  return (
    <ScoreCard
      borderRight={borderRight}
      title={intoHeadings(name)}
      hoverLabel={hoverLabel}
      adjacentLabel={adjacentLabel}
      faIcon={getIcon(res.applicableResource)}
      unit={unit}
    >
      {isPercent ? (
        <ScoreCard.PercentBar type="circle" percent={Number(value)} />
      ) : (
        <div className="txt-lgx">
          {unit === "cents" && "$"}
          {typeof value === "number" ? (
            <CountUp duration={2} start={0} end={value as number} />
          ) : (
            value
          )}
        </div>
      )}
    </ScoreCard>
  );
};

ScoreCard.FlatValue = FlatValue;
export default ScoreCard;
