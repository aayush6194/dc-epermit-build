
import React from 'react';
import { NavProvider } from './context/nav-context';
import { createGlobalStyle } from "styled-components";
import { disabledTxtColor,  primaryColor, primaryTxtColor } from './config';
import 'platyplex_ui/styles/main.css';
import 'antd/dist/antd.css';
import { Provider } from 'react-redux';
import store from './store';

const GlobalStyle = createGlobalStyle`

  html,body{
    font-size: 16px;
    font-family: 'Roboto', sans-serif;
  }
   .highlight:hover{
    transition: 500ms ease-out;
    box-shadow: 0 0.25em 0.3em ${primaryColor};
   }

  .ant-btn-primary, .ant-btn{
    border-radius: .3em;
    box-shadow: 0 .1em .1em rgba(0,0,0,.2);
  }
  ant-radio-input{
    border: 1px solid grey;
  }
  .ant-btn-primary, .ant-radio-checked .ant-radio-inner,  .ant-radio-inner:hover {
    border-color: ${primaryColor} !important;
  }

  .ant-btn-primary, .ant-radio-inner::after{
    background-color: ${primaryColor} !important;
  }

  .ant-pagination-item, .ant-pagination-item-active a, .ant-select-selector:hover{
    border-radius: .3em;
    color: black !important;
    border-color: ${primaryColor} !important;
  }

  .ant-select-selector{
    border-radius: .4em !important;
  }

  .ant-picker {
    border-color: #d9d9d9;
  }

  .ant-select-show-search.ant-select-multiple .ant-select-selector{
    height: 40px;
    overflow-y: auto;
  }

  input:focus, textarea:focus, .ant-picker-focused, input:hover, textarea:hover, .ant-picker:hover, .ant-input-number-input{
    border-color: transparent !important;
  }

   .ant-input-affix-wrapper, .ant-input:placeholder-shown, .ant-input, .ant-select-selector, .ant-input-number-input {
    border: 0 !important;
    border-radius: 0;
    border-bottom: 1px solid ${disabledTxtColor}!important;
  }

  input:focus, input:hover, .ant-input-affix-wrapper:hover, .ant-input-affix-wrapper-focused, .ant-input:placeholder-shown:focus, .ant-input:focus, .ant-input:hover, .ant-input:placeholder-shown:hover {
    border-color: ${primaryColor} !important;
  }

  .ant-input-affix-wrapper > .ant-input, .ant-picker{
    border: 0 !important;
  }
  
  .ant-btn-primary:hover, .ant-btn-primary:focus, .ant-btn-primary:active, .ant-btn:hover, .ant-btn:focus, .ant-btn:active {
    color: ${primaryColor} !important;
    border-color: ${primaryColor};
    background: white;
    transition: 200ms ease;
    box-shadow: 0 0 0;
  }
  
  .ant-table-cell{
    max-width: 300px;
    font-size: 15px;
  }
  
  .custom > button {
   border-radius: 1em !important;
  }
  
  .custom > button > div, .custom > button > span {
    padding: 5px 5px 5px 10px !important;
   }
   
   input, input:focus, input:hover {
    outline:none !important;
  }

  [type="tel"]{
    border: 1px solid ${primaryColor} !important;
  }
  .med{
    font-weight: 500;
  }
  .react-tel-input{
    width: auto;
  }
  .focus-show{
    display: none;
  } 
  .focus:focus + .focus-show, [type="password"]:focus + .focus-show{
    display: block !important;
  } 

  .ant-drawer-content-wrapper{
    max-width: 90vw !important;
  }
  .ant-menu-inline, .ant-menu-vertical, .ant-menu-vertical-left {
    border: 0 !important;
  }
  .ant-switch-checked{
    background: ${primaryColor}!important;
  }

  .ant-popover-placement-bottom{
    z-index: 1;
  }
  .ant-picker-calendar-header .ant-picker-calendar-mode-switch{
    display: none;
  }

  .ant-picker-calendar-mini .ant-picker-calendar-header {
      display: grid;
      grid-template-columns: 1fr 1fr;
  }
  .white-txt{
    color: white;
  }
  .disable{
    background: ${disabledTxtColor};
  }
  .hide{
    display: none !important;
  }

  .pop{
    transform: translateY(-10px);
    transition: 200ms ease;
  }

  .slide-left {
    animation: slide-left 300ms linear;
  }
  
  
  @keyframes slide-left {
    0% {
      transform: translate(-200px, 0%);
      opacity: (0);
    }
    100% {
      transform: translate(0, 0);
      opacity: (1);
    }
  }

.StripeElement--webkit-autofill {
  background: transparent !important;
}

.StripeElement {
  width: 100%;
  padding: 11px 15px 11px 0;
}

.ant-picker, .ant-picker-focused, .ant-picker:hover {
    border-bottom: 1px solid ${primaryTxtColor} !important;
}
.dates > .ant-picker, .dates > .ant-picker-focused, .dates > .ant-picker:hover{
  border: 0 !important;
}
   `;

const Main = ({ children }: any) => (
  <NavProvider>
  <Provider store={store}>
        <GlobalStyle />
        {children}
      </Provider>
  </NavProvider>
);

export default Main;