import React, { useState } from "react";
import { Grid, Modal, Switch, Card, Button, Text } from "platyplex_ui";
import { gradient, primaryColor, primaryTxtColor } from "../../../config";
import { Table, Input, Select, Progress, TimePicker, Popover, Popconfirm } from "antd";
import { Message } from "../../client/form";
import { moment } from "../../../utils/time";
import { Client } from "../../../store/reducer/clients";
import { useDispatch, useSelector } from "react-redux";
import { Permit, PermitType, RootPermit } from "../../../store/reducer/permit";
import { removePermit } from "../../../store/actions/permits";
import { useParams } from "react-router";
import random from "../../../utils/random";

enum HistoryState {
  ACTIVE = "ACTIVE",
  UPCOMING = "UPCOMING",
  EXPIRED = "EXPIRED",
  CANCELLED = "CANCELED",
}
export const electricPermits = [{
  id: random(5),
  vehicleId: '231',
  firstName: 'Lisa',
  lastName: 'Vu',
  phone: '421-454-9022',
  liscensePlate: '332DER',
  email: 'lisa.vu@co.pg.md.us',
  starts: moment().add('m', -15).add('h', -5).format("ddd, MMM DD, YYYY @ hh:mm A"),
  status: 100
},
{
  id: random(5),
  vehicleId: '642',
  firstName: 'Emma',
  lastName: 'Doe',
  phone: '344-137-7100',
  liscensePlate: '13DEF5',
  email: 'emma.doe@co.pg.md.us',
  starts: moment().add('m', -22).add('h', -4).format("ddd, MMM DD, YYYY @ hh:mm A"),
  status: 91
},
{
  id: random(5),
  vehicleId: '738',
  firstName: 'Harry',
  lastName: 'Chiala',
  phone: '412-671-1235',
  liscensePlate: '4EAF32',
  email: 'harry.chiala@co.pg.md.us',
  starts: moment().add('m', -48).add('h', -4).format("ddd, MMM DD, YYYY @ hh:mm A"),
  status: 67
},
{
  id: random(5),
  vehicleId: '765',
  firstName: 'John',
  lastName: 'Master',
  phone: '412-290-7845',
  liscensePlate: 'FRT789',
  email: 'john.master@co.pg.md.us',
  starts: moment().add('m', -43).add('h', -2).format("ddd, MMM DD, YYYY @ hh:mm A"),
  status: 52
},
{
  id: random(5),
  vehicleId: '788',
  firstName: 'Nick',
  lastName: 'Roman',
  phone: '412-627-1670',
  liscensePlate: '52VBQE',
  email: 'nick.roman@co.pg.md.us',
  starts: moment().add('m', -21).add('h', -2).format("ddd, MMM DD, YYYY @ hh:mm A"),
  status: 45
},
{
  id: random(5),
  vehicleId: '788',
  firstName: 'Sammy',
  lastName: 'Owens',
  phone: '412-520-2685',
  liscensePlate: 'D2IO9',
  email: 'sammy.owens@co.pg.md.us',
  starts: moment().add('m', -11).add('h', -2).format("ddd, MMM DD, YYYY @ hh:mm A"),
  status: 42
}


]
const ElectricTable = ({ client }: { client?: Client }) => {
  const admin = !client;
  let { id } = useParams<{id: any}>();
  const [state, setter] = useState({
    type: HistoryState.ACTIVE,
    checked: false,
  });
  const { clients } = useSelector((state: any) => state.clients);
  const setState = (props: any) => setter({ ...state, ...props });
  const checked = () => setState({ checked: true });
  const dispatch = useDispatch();


  return (
    <>
  <br/>
      { (
        <Table
          bordered
          style={{ maxWidth: '100%', overflowX: 'auto'}}
          pagination={{ pageSize: 25 }}
          loading={false}
          dataSource={electricPermits}
          columns={
            columns((e: any) => ()=>{}, clients, (p: RootPermit)=> dispatch(removePermit(p)), id)}
        />
      )}
    </>
  );
};

const columns = (openBooking: any, clients: Client[], removePermit: (p : Permit)=> void, id: any) => [
  {
    title: () => (
      <Grid placeItems="center start">
        Vehicle ID #
        <Select style={{ width: 45 }} defaultValue="All">
          <Select.Option value={"Residential"}>Residential</Select.Option>
          <Select.Option value={"Visitor"}>Visitor</Select.Option>
        </Select>
      </Grid>
    ),
    dataIndex: "vehicleId",
  },

 

  {
    title: () => (
      <Grid placeItems="center start">
        E-Permit ID
        <Input prefix={<i className="fa fa-search" />} style={{ width: 50 }} />
      </Grid>
    ),
    dataIndex: "id",
  },
  {
    title: () => (
      <Grid placeItems="center start">
        Officer First Name
        <Input prefix={<i className="fa fa-search" />} style={{ width: 50 }} />
      </Grid>
    ),
    dataIndex: "firstName",
  },
  {
    title: () => (
      <Grid placeItems="center start">
         Officer Last Name
        <Input prefix={<i className="fa fa-search" />} style={{ width: 50 }} />
      </Grid>
    ),
    dataIndex: "lastName",
  },
  {
    title: () => (
      <Grid placeItems="center start">
        Email
        <Input prefix={<i className="fa fa-search" />} style={{ width: 80 }} />
      </Grid>
    ),
    dataIndex: "email",
  },

  {
    title: () => (
      <Grid placeItems="center start">
        Phone Number
        <Input prefix={<i className="fa fa-search" />} style={{ width: 100 }} />
      </Grid>
    ),
    render: (i: any) => i.phone || "623-143-9124",
  },

  {
    title: () => (
      <Grid placeItems="center start">
        Fleet Space
        <Select style={{ width: 60 }} defaultValue="All" />
      </Grid>
    ),
    render:(i, j, k)=> 'Space #' + JSON.stringify(k + 1),
  },
  {
    title: () => (
      <Grid placeItems="center start">
        License Plate #
        <Input prefix={<i className="fa fa-search" />} style={{ width: 45 }} />
      </Grid>
    ),
    dataIndex: "liscensePlate",
  },
  {
    title: () => (
      <Grid placeItems="center start">
       Drop Off Time
        <Input prefix={<i className="fa fa-search" />} style={{ width: 100 }} />
      </Grid>
    ),
    dataIndex: "starts",
  },{
    title: () => (
      <Grid placeItems="center start">
      Charge Status
        <Input prefix={<i className="fa fa-search" />} style={{ width: 100 }} />
      </Grid>
    ),
    render: (a)=> <Progress percent={a.status|| 50}/>,
  },


  {
    title: "Actions",
    render: (i: any) => (
      <>
        <Button rounded onClick={() => openBooking(i)} disabled={i.status <= 90}>
          Ready for Pickup
        </Button>
         
      </>
    ),
  },
];

export default ElectricTable;
