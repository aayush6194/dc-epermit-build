import React, { useState } from "react";
import styled from "styled-components";
import { Grid, Text as Textt } from "platyplex_ui";
import { mobileWidth, primaryTxtColor, top2 } from "../../config";
import { Popover, Menu } from "antd";
import user from "../../assets/user.svg";
import { useLocation } from "react-router";
import Sidebar from "../sidebar";
import Icon from "../../assets/AccountMenuIcon.png";
import Avatar from "../avatar";
const TopNavBar = ({ avatarImg }: { avatarImg: string }) => {
  const [visible, setVisible] = useState(false);
  const loggedIn = true;
  const location = useLocation();
  const path = location.pathname;
  return (
    <>
      <MiniNav>
        <Sidebar avatarImg={avatarImg}/>
        <Text
          className="capitalize bold txt-md txt-left"
          style={{ minWidth: "100px", width: "100%", color: primaryTxtColor }}
        >
          City of Mountain View SAFE Parking Program
        </Text>
        <Textt
          className="pointer"
          bold
          onClick={() => {
            window.location.href = "https://www.findparkstash.com";
          }}
          style={{ color: primaryTxtColor, marginRight: "3em" }}
        ></Textt>
        <Popover
          visible={visible}
          placement="bottomRight"
          content={
            <Menu style={{ zIndex: top2 }}>
              {loggedIn ? (
                <Menu.ItemGroup>
                  <Menu.Item className="noselect" key="0">
                    <Textt textAlign="left">Account</Textt>
                  </Menu.Item>

                  <Menu.Item className="noselect" key="1">
                    <Textt textAlign="left">Help</Textt>
                  </Menu.Item>

                  <Menu.Item className="noselect" key="2">
                    <Textt
                      textAlign="left"
                      onClick={() => {
                        setVisible(false);
                      }}
                    >
                      Logout
                    </Textt>
                  </Menu.Item>
                </Menu.ItemGroup>
              ) : (
                <Menu.Item key="0" className="noselect">
                  <Grid customCols="auto 1fr">
                    <i className="fas fa-user txt-md"></i>
                    <span>Login</span>
                  </Grid>
                </Menu.Item>
              )}
            </Menu>
          }
        >
          <Grid
            customCols="auto auto"
            className="shadow"
            style={{ borderRadius: "5em", padding: ".25em .5em" }}
            gridGap=".5em"
            onClick={() => setVisible(!visible)}
          >
            <img
              style={{ maxWidth: "30px", paddingLeft: "5px" }}
              alt="icon"
              src={Icon}
            />
            <Avatar
              style={{ borderRadius: "50%", background: "white" }}
              notCloudinaryImg
              src={user}
            />
          </Grid>
        </Popover>
      </MiniNav>
    </>
  );
};

const Text = styled.div`
  @media (max-width: ${mobileWidth}) {
    padding-left: 0;
    font-size: 1.2em;
  }
`;

const MiniNav = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  position: fixed;
  font-size: 15px;
  top: 0;
  right : 0;
  left: 0;
  padding: 0 1.5em 0 0;
  z-index: 9;
  width: 100vw;
  height: 4em; 
  background: white;  
  color: white;
  display: grid;
  grid-gap: 1em;
  grid-template-columns: auto 1fr auto auto;
  grid-template-rows: 1fr;
  place-items: center end;
    @media(max-width: ${mobileWidth}){
      top : inherit;
      padding-left: 0
      grid-gap: .5em;
    } `;

export default TopNavBar;
