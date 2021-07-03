import React from 'react'
import { GridRows } from '@vx/grid';
const accentColor = "lightgray";

export default function Grid({ yScale, width }: any) {
    return <></>;
    return (
        <GridRows<any>
            scale={yScale}
            width={width}
            stroke={accentColor}
            strokeOpacity={0.5}
            pointerEvents="none"
        />
    );
}