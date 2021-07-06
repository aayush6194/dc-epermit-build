
import React from 'react';
import styled from 'styled-components';
import { Avatar, Text as Txt , Header, Grid} from 'platyplex_ui';
import { mobileWidth,  gradient, disabledTxtColor } from '../../config';
import { useLocation } from "react-router";
import logo from '../../assets/parkstash_logo.svg';
import { Popover, Menu, Badge } from 'antd';

const TopNavBar = () => {
  const location = useLocation().pathname;
  return (
    <MiniNav>
      <Text className="capitalize bold txt-md txt-left" style={{ minWidth: "100px", width: "100%" }}>
        {location === "/" || location === "/overview" ? "Overview" : location.replace("/", "").replace(/-/g, " ")}
      </Text>

      <Popover
        placement="bottomRight"
        content={
          <Menu style={{ zIndex: 1000 }}>
            <Menu.Item key="0" className="noselect">
              <Grid customCols='auto 1fr' onClick={() => {}}>
                <i className='fas fa-sign-in-alt txt-md'></i>
                <span>Logout</span>
              </Grid>
            </Menu.Item>
          </Menu>
        }
        trigger="hover"
      >
        <div>
          <Avatar 
            className='avatar shadow' 
            style={{ background: "white", borderRadius: "50%", margin: "0 1em" }} 
            url={logo} 
          />
        </div>
      </Popover>
    </MiniNav>)
}


const Text = styled.div`
    padding-left: 9.5em;
    @media(max-width: ${mobileWidth}){
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
  height: 4.25em; 

  background: ${gradient};  
  color: white;
  display: grid;
  grid-gap: 1em;
  grid-template-columns: 1fr auto auto;
  grid-template-rows: 1fr;
  place-items: center end;
    @media(max-width: ${mobileWidth}){
      top : inherit;
      padding-left: 0
      grid-gap: .5em;
    } `;

export default TopNavBar;