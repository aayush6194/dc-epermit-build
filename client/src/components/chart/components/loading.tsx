import React from "react";
import {Header, Loader } from 'platyplex_ui';
const Loading = ({ style }: any) => (
    <div className="grid" style={style}>
      <div>
        <Loader.Spinner />
        <Header bold>Loading..</Header>
      </div>
    </div>
  );

export default Loading;