import React from 'react'
import { TooltipWithBounds } from '@vx/tooltip';
import { Text, Grid } from 'platyplex_ui';
import { primaryColor } from '../../../config';
import { Line } from '@vx/shape';

const Tooltip = ({ tooltipOpen, tooltipLeft, tooltipTop, tooltipData, isSelected}: any) => {
    if (!tooltipOpen && !tooltipData) return null;

    return (
        <TooltipWithBounds top={tooltipTop} left={tooltipLeft}>
            <Grid placeItems="start" customRows="auto 1fr" gridGap=".4em" style={{zIndex: 10000}}>
                <Text>{tooltipData.timestamp}</Text>
                {tooltipData.legend
                    .map(({ color, label, value, isMissing }: any, index: number) => (
                        isMissing || value === '-1'? null :
                            <div key={index} style={{ padding: 2, fontWeight: isSelected && isSelected(index)? 'bold': 'normal' }}>
                                <span className='round' style={{ background: color }}></span>&nbsp;
                                <span className='capitalize'><span dangerouslySetInnerHTML={{__html : label}}/>: &nbsp;{value}</span>
                            </div>
                    ))}
            </Grid>
        </TooltipWithBounds>
    );
}

Tooltip.Custom = ({ top, left, children}: any) => {
    return (
        <TooltipWithBounds top={top} left={left}>
            {children}
        </TooltipWithBounds>
    );
}


Tooltip.Line = ({ tooltipData, height, tooltipLeft: x }: any) => {
    if (!tooltipData) return null;
    return (
        <g>
            <Line
                from={{ x, y: 0 }}
                to={{ x, y: height }}
                stroke={primaryColor}
                strokeWidth={2}
                pointerEvents="none"
                strokeDasharray="5,"
            />
        </g>
    )
}

export default Tooltip;