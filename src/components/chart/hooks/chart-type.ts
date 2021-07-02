import { useState, useEffect } from "react";
import { Charts } from "../types";

export const useChartType = ({ chartTypes, isPercent}: any) =>{
    const [chartType, setChartType] = useState<Charts>(chartTypes[0] || Charts.stackedBar);
    useEffect(() => {
      if (isPercent)
        setChartType(Charts.multiLine)
    }, [isPercent]);

    return { chartType, setChartType };
  }; 