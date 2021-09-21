import React, { useState } from "react";
import { Grid, Modal, Switch, Card, Button, Text } from "platyplex_ui";
import { gradient, primaryColor, primaryTxtColor } from "../../../config";
import { Table, Input, Select,  Popconfirm } from "antd";
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

const History = ({ client }: { client?: Client }) => {
  const admin = !client;
  let { id } = useParams<{id: any}>();
  const [state, setter] = useState({
    type: HistoryState.ACTIVE,
    checked: false,
  });
  const { clients } = useSelector((state: any) => state.clients);
  const { vehiclePermits } = useSelector((state: any) => state.vehiclePermits);
  const { permits, loading } = useSelector((state: any) => state.permits);
  const setState = (props: any) => setter({ ...state, ...props });
  const checked = () => setState({ checked: true });
  const dispatch = useDispatch();
  const openPermit = async (permit: any, checked: any) => {
    const modal = Modal({
      title: "",
      modal: (
        <Modall 
          permit={permit} 
          second_vaccine={7}
          checked={checked} 
          close={() => modal.close()} 
        />
      ),
      hideCancel: true,
    });
    modal.open();
  };
 

  const flatPermits = (p: any[] )=>{
    let arr = [...p];
    arr.forEach((p: RootPermit)=> {
      arr = [...arr, ...p.residential]
      arr = [...arr, ...p.visitor]
    })

    return arr;

  }

  return (
    <>
      <Switch
        style={{ padding: 0 }}
        onClick={(type: any) => setState({ type })}
        color={primaryTxtColor}
        border={"2px solid " + primaryColor}
        items={Object.keys(HistoryState)}
        active={state.type}
      />
      <br />
        <Table
          bordered
          style={{ maxWidth: '100%', overflowX: 'scroll'}}
          pagination={{ pageSize: 25 }}
          loading={loading}
          dataSource={[...flatPermits(permits), ...vehiclePermits]}
          columns={
            permitColumns((e: any) => openPermit(e, checked), clients, (p: RootPermit)=> dispatch(removePermit(p)), id)}
        />
    </>
  );
};

const Modall = ({ close, checked, permit, second_vaccine }: any) => {
  const [done, setDone] = useState(false);
  const nextState = () => setDone(true);
  second_vaccine = Number(second_vaccine) || 7;

  return (
    <Grid height="100%" width="100%">
      <Card
        shadow
        grid
        placeItems="stretch"
        style={{ minWidth: "40vw", maxWidth: "95vw" }}
        customCols="auto 1fr"
        mobileLayout={false}
      >
        <i
          onClick={close}
          className="fa fa-times-circle txt-md pointer hoverr"
          style={{
            gridRow: done ? "span 1" : "span 7",
            padding: ".25em",
            placeSelf: "start",
            color: primaryColor,
          }}
        />
        {done ? (
          <Message
            generate
            user={{
              id: "CBL61W21",
              endDate: moment(permit.starts).add("days", second_vaccine).toISOString(),
            }}
            admin
            style={{ gridGap: "1em" }}
            confirm={() => {
            //  checked();
              close();
            }}
          />
        ) : (
          <>
            <Text bold style={{ marginTop: "1.5em" }}>
             E-Permit Extension
            </Text>
            <Text textAlign="left">
              E-Permit ID: <b>{permit._id?.substring(0,5)}</b>
            </Text>
            <Text textAlign="left">
              Extended Date & Time:{" "}
              <b>
                {moment(permit.starts)
                  .add("days", 3)
                  .format("ddd, MMM, DD, YYYY")}
              </b>
            </Text>
            <Button.Normal
              style={{
                borderRadius: "1.3em",
                padding: ".5em",
                marginTop: "1em",
                backgroundImage: `${gradient}`,
                color: "white",
                border: 0,
                placeSelf: "start",
                minWidth: "15vw",
              }}
              onClick={() => {
                nextState();
              }}
              type="submit"
            >
             Extend
            </Button.Normal>
          </>
        )}
      </Card>
    </Grid>
  );
};

export const permitColumns = (openBooking: any, clients: Client[], removePermit: (p : Permit)=> void, id: any) => [
  {
    title: () => (
      <Grid placeItems="center start">
        Permit Type
        <Select style={{ width: 65 }} defaultValue="All">
          <Select.Option value={"Residential"}>Residential</Select.Option>
          <Select.Option value={"Visitor"}>Visitor</Select.Option>
        </Select>
      </Grid>
    ),
    dataIndex: "type",
  },

  {
    title: () => (
      <Grid placeItems="center start">
      Address
        <Select style={{ width: 65 }} defaultValue="All">
          <Select.Option value={'Mountain View'}>Mountain View</Select.Option>
        </Select>
      </Grid>
    ),
    render: (c: Permit, a: any, i: number)=> 'Mountain View'
  },

  {
    title: () => (
      <Grid placeItems="center start">
        E-Permit ID
        <Input prefix={<i className="fa fa-search" />} style={{ width: 50 }} />
      </Grid>
    ),
    render: (p: Permit)=> p?._id? p?._id?.substring(p?._id?.length -5)?.toUpperCase() :   random(5)
  },
  {
    title: () => (
      <Grid placeItems="center start">
        First Name
        <Input prefix={<i className="fa fa-search" />} style={{ width: 50 }} />
      </Grid>
    ),
    render: (p: any) =>  !p?._id? 'N/A':  p.firstName || <span style={{color: 'coral'}}>Pending</span>,
  },
  {
    title: () => (
      <Grid placeItems="center start">
        Last Name
        <Input prefix={<i className="fa fa-search" />} style={{ width: 50 }} />
      </Grid>
    ),
    render: (p: any) =>  !p?._id? 'N/A': p.lastName || <span style={{color: 'coral'}}>Pending</span>,
  },
  {
    title: () => (
      <Grid placeItems="center start">
        Email
        <Input prefix={<i className="fa fa-search" />} style={{ width: 80 }} />
      </Grid>
    ),
    render: (p: any) =>  !p?._id? 'N/A': p.email || <span style={{color: 'coral'}}>Pending</span>,
  },

  {
    title: () => (
      <Grid placeItems="center start">
        Phone Number
        <Input prefix={<i className="fa fa-search" />} style={{ width: 80 }} />
      </Grid>
    ),
    render: (p: any) =>  !p?._id? 'N/A': (p.phone || <span style={{color: 'coral'}}>Pending</span>),
  },

  {
    title: () => (
      <Grid placeItems="center start">
        Zone
        <Select style={{ width: 60 }} defaultValue="All" />
      </Grid>
    ),
    dataIndex: "zone",
  },
  {
    title: () => (
      <Grid placeItems="center start">
        License Plate #
        <Input prefix={<i className="fa fa-search" />} style={{ width: 65 }} />
      </Grid>
    ),
    render: (i: any) => i.liscensePlate || <span style={{color: 'coral'}}>Pending</span>,
    
  },
  {
    title: () => (
      <Grid placeItems="center start">
       Start Date
        <Input prefix={<i className="fa fa-search" />} style={{ width: 100 }} />
      </Grid>
    ),
    dataIndex: "starts",
  },
  {
    title: () => (
      <Grid placeItems="center start">
        End Date
        <Input prefix={<i className="fa fa-search" />} style={{ width: 100 }} />
      </Grid>
    ),
    dataIndex: "ends",
  },


];

export default History;
