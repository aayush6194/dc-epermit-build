import { Tooltip } from "antd";
import React from 'react';

export const Label = ({ label = 'placeholder' , icon = 'fa fa-info-circle'}) =>(
<Tooltip title={label}>
    <i className='fa fa-info-circle' style={{marginLeft: '7px'}}></i>
</Tooltip>)

export default Label;