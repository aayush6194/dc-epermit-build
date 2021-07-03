import { useState, useEffect } from "react";

export const useRect = ({ height, width }: { height: number; width: number; }): DrawAreaRect => {
  //if axis ticks get cutoff, increase the margin of appropriate direction
  const margin = {
    top: 10,
    right: 35,
    bottom: 40,
    left: 35
  };

  const calcRect = (width: any) =>({
    width,
    height,
    innerWidth: width - margin.left - margin.right,
    innerHeight: height - margin.top - margin.bottom,
    margin,
    xRange: [margin.left, width - margin.right],
    yRange: [height - margin.bottom, margin.top]
  })
  const [ rect, setRect ] = useState(calcRect(width));
  useEffect(()=>setRect(calcRect(width)), [width]);
  return rect as any;
}

//given the height and width of the graph i.e. the drawArea + axis, computes margins
export interface DrawAreaRect {
  readonly width: number;
  readonly height: number;
  readonly innerWidth: number;
  readonly innerHeight: number;
  readonly margin: {
    readonly left: number;
    readonly top: number;
    readonly right: number;
    readonly bottom: number;
  }
  readonly xRange: [number, number];
  readonly yRange: [number, number];
}