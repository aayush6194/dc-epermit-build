import React, { useEffect } from "react";
import styled from "styled-components";
import { mobileWidth, disabledTxtColor } from "./config";
import TopNavBar from "./components/topnav";
import { Grid, Text } from "platyplex_ui";
import { moment } from "./utils/time";
import ParkstashText from "./components/parkstash-text";

const Layout = ({ children, style, sidebar, background, admin, avatarImg }: any) => {
  useEffect(() => window.scrollTo(0, 0), []);
  return (
    <>
      <div>{sidebar && <TopNavBar/>}</div>
      <Wrapper background={background} style={style} sidebar={sidebar}>
        <div style={{ width: "100%", height: "100%" }}>{children}</div>
        <Grid placeSelf="center" gridGap='0'>
          <Text
            color={disabledTxtColor}
            style={{ placeSelf: "end center" }}
            className={sidebar ? "left-on-desktop" : ""}
          >
            This service is designed and maintained by <ParkstashText />
          </Text>
          <Text
            color={disabledTxtColor}
            style={{ placeSelf: "end center" }}
            className={sidebar ? "left-on-desktop" : ""}
          >
            © 2018-{moment().year().toString()} <ParkstashText />, All Rights
            Reserved
          </Text>
        </Grid>
      </Wrapper>
    </>
  );
};

interface Layout {
  className?: string;
  children: JSX.Element | JSX.Element[];
  maxWidth?: number | string;
  style?: React.CSSProperties;
}

interface Top extends Layout {
  customCols?: string;
  noBackground?: boolean;
}

interface Bottom extends Layout {
  shiftUp?: boolean;
}

Layout.Top = ({
  className,
  children,
  customCols = "auto 1fr auto",
  noBackground = false,
  maxWidth = "1500px",
  style = {},
}: Top) => {
  style = { ...style, maxWidth, minWidth: "85%" };
  return (
    <div
      className={className}
      style={{ paddingBottom: "10em", background: "#FFFFF", width: "100%" }}
    >
      <Grid
        mobileLayout={false}
        customCols={customCols}
        style={style}
        margin="auto"
      >
        {children}
      </Grid>
    </div>
  );
};

Layout.Bottom = ({
  className,
  shiftUp = true,
  children,
  maxWidth = "1500px",
  style = {},
}: Bottom) => {
  return (
    <Grid
      margin="auto"
      className={className}
      placeItems="start stretch"
      style={{
        ...style,
        marginTop: shiftUp ? "-10em" : "1em",
        maxWidth,
        minWidth: "85%",
      }}
    >
      {children}
    </Grid>
  );
};

const Wrapper = styled.div<{ background: string | any; sidebar: any }>`
  ${(props) => `
    padding-top: ${props.sidebar ? "4em" : 0};
    background: ${props.background ? `url(${props.background})` : "#F0F3F4"};`}
  margin: auto;
  min-height: 100vh;
  display: grid;
  place-items: start stretch;
  transition: all 0.5s ease-out;
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  @media (max-width: ${mobileWidth}) {
    width: 100vw;
  }
`;

export default Layout;
