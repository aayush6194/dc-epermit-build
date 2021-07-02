import React, { useState } from "react";
import Pie from "@vx/shape/lib/shapes/Pie";
import { Group } from "@vx/group";
import { getColor } from "../../utils/color";
import { Tooltip } from "antd";

const defaultMargin = { top: 0, right: 0, bottom: 0, left: 0 };

export type PieProps = {
    width: number;
    height: number;
    data: any[];
    text: any;
    margin?: typeof defaultMargin;
};

export default function PieChart({
    width,
    height,
    text,
    data,
    margin = defaultMargin,
}: PieProps) {

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    const radius = Math.min(innerWidth, innerHeight) / 2;
    const centerY = innerHeight / 2;
    const centerX = innerWidth / 2;
    const donutThickness = 10;
    const [selected, setSelected] = useState(-1);
    const event = (i = -1) => ({
        onTouchStart: () => setSelected(i),
        onTouchMove: () => setSelected(i),
        onMouseMove: () => setSelected(i),
        onMouseLeave: () => setSelected(-1)
    })

    return (
        <svg width={width} height={height}>
            <rect
                rx={14}
                width={width}
                height={height}
                fill="transparent"
            />
            <g>
                <text
                    fill="white"
                    x={centerX}
                    fontWeight='bold'
                    textAnchor="middle"
                    dy='8px'
                    y={centerY}
                    fontSize={24}
                >  {text}
                </text>
            </g>
            <Group top={centerY + margin.top} left={centerX + margin.left}>
                <Pie
                    data={data}
                    fill='#5578D6'
                    pieValue={(d: any) => d.value}
                    outerRadius={radius}
                    innerRadius={radius - donutThickness}
                    cornerRadius={3}
                    padAngle={0.005}
                    children={(pie: any) => (
                        pie.arcs.map((item: any, i: number) => (
                            <g key={0}>
                                {item.data.label ?
                                    <Tooltip title={item.data.label}>
                                        <path
                                            d={pie.path(item)}
                                            fill={getColor(i) + (selected === -1 ? 'FF' : selected === i ? 'BB' : '50')}
                                            {...event(i)}
                                        />
                                    </Tooltip> :

                                    <path d={pie.path(item)} fill={getColor(i)} />}
                            </g>
                        ))
                    )}
                />
            </Group>
        </svg>
    );
}