import React from "react";
import { Card } from 'platyplex_ui';
import { Table } from "antd";
import { getColor } from "../utils/color";
import { getKeys } from "../utils/points";

export default ({ points, legend }: { points: any, legend?: { label: string } }) => {
  const tableProps = {
    loading: points && points.length > 0 ? false : true,
    style: { width: '100%' },
    dataSource: getKeys(points).map((key: string, i: number) => ({ label: key, key: i, color: getColor(i) })),
    columns: [
      {
        title: legend?.label,
        dataIndex: 'label',
        key: 'label',
        render: (item: string) => <span className='capitalize'>{item}</span>
      },
      {
        title: 'Color',
        dataIndex: 'color',
        key: 'color',
        render: (color: string) => <span className='round' style={{ background: color }}></span>
      }
    ]
  }

  if (!legend) return null;
  return (
    <Card shadow width="100%" >
      <Table
        pagination={false}
        {...tableProps}
      />
    </Card>
  )
};