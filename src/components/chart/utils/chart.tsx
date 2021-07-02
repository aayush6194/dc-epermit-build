import React from 'react';
import { Charts } from "../types";
import MultiLine from "../components/graph/multi-line";
import StackedArea from "../components/graph/stacked-area";
import StackedBar from "../components/graph/stacked-bar";
import Combined from '../components/graph/combined';

export const getChart = (chart:Charts | string, props: any) => {
    switch (chart) {
      case Charts.multiLine:
        return <MultiLine {...props} />;
  
      case Charts.stackedArea:
        return <StackedArea {...props} />;
  
      case Charts.stackedBar:
        return <StackedBar {...props} />;
      case Charts.combined:
        return <Combined {...props}/>;
      default:
        return "Error";
    }
  }