
import React from 'react';
import { Tooltip } from "antd";
const LIMIT = 20;

export const overflowTxt = (txt: string) => `${txt?.substring(0, LIMIT)}${txt?.length > LIMIT ? '...' : ''}`;

export const overflow = (txt: string, limit = LIMIT) =>{
if(txt?.length <= limit) return txt;
return(
<Tooltip title={txt}>
  <span className="cursor capitalize">
      { `${txt?.substring(0, limit)}${txt?.length > limit ? '...' : ''}`}
 </span>
</Tooltip>)
}