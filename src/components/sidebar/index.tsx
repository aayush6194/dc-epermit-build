import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router";
import { Avatar, Grid } from "platyplex_ui";
import styled, { keyframes } from "styled-components";
import {  mobileWidth, primaryColor, primaryTxtColor } from "../../config";
import avatar from '../../assets/UCDavisHealth-color.png';

const Sidebar = ({ avatarImg }: { avatarImg: string }) => {
  const location = useLocation().pathname;
  const routes = [
    { to: [`/`], name: "New Application", icon: "fa fa-pencil" },
    { to: [`/history`], name: "History", icon: "fa fa-history" },
  ];

  return (
    <Sideba
      avatar={avatarImg || avatar}
      avatarStyle={{
        width: '100%',
        height: "auto",
        objectFit: 'fill'
      }}
      name={`Hi User`}
      active={location}
      routes={routes}
      Router={NavLink}
    />
  );
};

const Sideba = ({
  active = "",
  routes = [],
  avatar,
  role,
  name,
  Router,
  avatarStyle,
  message,
}: any) => {
  const [collapsed, setCollapsed] = useState(true);
  const location = active;

  const makeStr = (bool: boolean): string => String(bool);
  const activeStyle = {
    borderLeft: ".3em solid " + primaryColor,
  };

  const events = {
    onClick: () => setCollapsed(false),
  };

  const collapsedHidden = collapsed ? "hide" : "";
  const shouldShow = collapsed ? avatar : avatar || name || role;
  const iconStyle = {
    color: primaryColor,
    padding: "0 .75em",
    placeSelf: "center end",
  };
  return collapsed ? (
    <i {...events} className="fas fa-bars txt-md pointer" style={iconStyle} />
  ) : (
    <LeftNav
      background={""}
      collapsed={collapsed}
      className="noselect slide-left"
    >
      {shouldShow && (
        <Grid.Item style={{height: "100%", borderRadius: 0}} placeSelf='sretch'>
          <i
            className="fa fa-times pointer txt-md"
            onClick={() => setCollapsed(true)}
            style={{...iconStyle, color: primaryTxtColor}}
          />
          <Grid customCols="1fr" color='white' placeItems='center stretch' padding={'0 0 2.5em 1em'}>
            {avatar && <Avatar style={avatarStyle} medium src={avatar} />}
         
          </Grid>
        </Grid.Item>
      )}

      {routes.map(({ to, name, icon }: any) => {
        return (
          <Router key={name} to={to[0] || "/"}>
            <NavItem
              collapsed={collapsed}
              active={makeStr(
                to.reduce((acc: boolean, _: any) => acc || false, false)
              )}
              style={{
                gridTemplateColumns: collapsed ? "1fr" : "auto 1fr",
                ...(to.includes(location) ? activeStyle : {}),
              }}
            >
              <i
                style={{ fontSize: "1.6em", padding: "0 .3em" }}
                className={icon}
              ></i>
              <div className={"txt-center hide-mobile " + collapsedHidden}>
                {name}
              </div>
              <div style={{ height: "2px" }}></div>
              <div style={{ width: "100%", height: "2px" }}>
                <Line />
              </div>
            </NavItem>
          </Router>
        );
      })}
    </LeftNav>
  );
};

const Line = styled.hr`
  transform: scaleX(0);
`;
const border = keyframes`from { transform: scaleX(0); } to { transform: scaleX(1);}`;

const NavItem = styled.div<{ active: string; collapsed: boolean }>`
  display: grid;
  text-decoration: none;
  place-items: center;
  color: ${primaryTxtColor};
  font-size: 1.35em;
  cursor: pointer;
  padding: 0.8em 0.4em;

  @media (max-width: ${mobileWidth}) {
    border-left: 0 !important;
    grid-template-columns: 1fr;
    padding-left: 0.3em;
  }

  &:hover ${Line} {
    color: ${primaryColor};
    animation: ${border} 300ms ease-out;
    transform: scaleX(1);
  }
`;

const LeftNav = styled.div<{ background: string; collapsed: boolean }>`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  font-size: 0.8em;
  display: grid;
  position: fixed;
  left: 0;
  z-index: 20;
  bottom: 0;
  top: 0;
  color: ${primaryColor};
  ${({ collapsed }: any) => `width: ${collapsed ? "6em" : "180px"};`}
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
`;

export default Sidebar;
