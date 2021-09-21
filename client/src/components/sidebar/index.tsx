import React from "react";
import styled, { keyframes } from "styled-components";
import { NavLink } from "react-router-dom";
import { Avatar, Grid } from 'platyplex_ui';
import { useLocation } from "react-router";
import { disabledTxtColor, mobileWidth, primaryColor, primaryTxtColor } from "../../config";
import { Badge } from "platyplex_ui";
import { useSelector } from "react-redux";
import { Enterprise } from "../../model/domain/enterprise";
import logo from '../../assets/logo.png'
const Sidebar = ({ routes = [] }) => {
  const location = useLocation().pathname;

  const makeStr = (bool: boolean): string => String(bool);
  const activeStyle = {
    borderLeft: ".3em solid " + primaryColor,
    color: primaryColor,
  };

  return (
    <div>
      <LeftNav background={""}>
        <Grid.Item hideOnMobile>
          <HideHover>
            <Avatar src={logo}   style={{ fontSize: "2em" }}/>
          </HideHover>
          <ShowHover className={"txt-md txt-center grid "}>
            <Avatar
              medium
              style={{ fontSize: "0.9em" }}
              src={logo}
            />
            <div className="capitalize"> {'Hooman'}</div>
            <Badge
              style={{ fontSize: ".7em", padding: ".1em .4em", borderWidth: 2 }}
              inverted
              className={"shadow capitalize "}
            >
              {"member"}
            </Badge>
          </ShowHover>
        </Grid.Item>

        {routes.map(({ to, name, icon, displayName }: any, i) => {        
          return (
            <MyNavLink
              className={i > 4 ? "hide-mobile" : ""}
              key={name}
              style={
    
                to.includes(location) ? activeStyle : {}}
              to={to[0] || "/"}
            >
              <i
                style={{ fontSize: "1.6em", padding: "0 .3em" }}
                className={icon}
              ></i>
              <ShowHover className={"txt-center hide-mobile "}>
                {displayName || name}
              </ShowHover>
              <div style={{ height: "2px" }}></div>
              <div style={{ width: "100%", height: "2px" }}>
                {<Line />}
              </div>
            </MyNavLink>
          );
        })}
      </LeftNav>
    </div>
  );
};

const Line = styled.hr`
  transform: scaleX(0);
`;
const border = keyframes`from { transform: scaleX(0); } to { transform: scaleX(1);}`;

const ShowHover = styled.span`
  display: none;
`;

const HideHover = styled.span``;

const MyNavLink = styled(NavLink)`
  display: grid;
  text-decoration: none;
  place-items: center;
  color: ${primaryTxtColor};
  font-size: 1.35em;
  cursor: pointer;
  grid-template-columns: 1fr;
  padding: 0.8em 0.4em;

  @media (max-width: ${mobileWidth}) {
    border-left: 0 !important;
    grid-template-columns: 1fr;
    padding-left: 0.3em;
  }

  @media (min-width: ${mobileWidth}) {
    &:hover ${Line} {
      color: ${primaryColor};
      animation: ${border} 300ms ease-out;
      transform: scaleX(1);
    }
  }
`;

const LeftNav = styled.div<{ background: string }>`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  font-size: .8em;
  display: grid;
  padding: .3em;
  position: fixed;
  z-index: 100;
  left: 0;
  bottom: 0;
  top: 0;
  color: ${primaryColor};
  width: 6em;
  grid-template-rows: repeat(16, auto);
  align-items: center;
  justify-items: stretch;
  transition: 100ms ease-out;
  background-color: white;
  background-image: url(${(props) => props.background});
  background-attachment: fixed;
  @media (max-width: ${mobileWidth}) {
    height: 55px;
    width: 100vw;
    top: inherit;
    bottom: 0;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr;
  }
  &:hover {
    width: 17em;
  }

  &:hover ${HideHover} {
    display: none;
  }

  &:hover ${ShowHover} {
    display: block;
  }

  &:hover ${MyNavLink} {
    grid-template-columns: auto 1fr;
  }
}
`;

export default Sidebar;
