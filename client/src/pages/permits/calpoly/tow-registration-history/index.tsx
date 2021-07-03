import React, { useState } from "react";
import { Grid, Modal, Switch, Card, Button, Text } from "platyplex_ui";
import { gradient, primaryColor, primaryTxtColor } from "../../../../config";
import { Table, Input, Popconfirm } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Notification } from "../../../../store/reducer/notifications";
import { removeNotification } from "../../../../store/actions/notifications";
import { useParams } from "react-router";

enum HistoryState {
  ACTIVE = "ACTIVE",
  CANCELLED = "CANCELED",
}

const TowRegistrationHistory = () => {
  let { id } = useParams<{id: any}>();
  const [state, setter] = useState({
    type: HistoryState.ACTIVE,
    checked: false,
  });

  const dispatch = useDispatch();
  const { notifications } = useSelector((state: any) => state.notifications);
  const { permits, loading } = useSelector((state: any) => state.permits);
  const setState = (props: any) => setter({ ...state, ...props });
 
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
      {(
        <Table
          bordered
          style={{ maxWidth: '100%'}}
          pagination={{ pageSize: 25 }}
          loading={loading}
          dataSource={notifications}
          columns={
            columns((e: any) => {}, notifications, (p: any)=> dispatch(removeNotification(p)), id)}
        />
      )}
    </>
  );
};

const columns = (openBooking: any, notifications: Notification[], removePermit: (p : Notification)=> void, id: any) => [

  {
    title: () => (
      <Grid placeItems="center start">
        E-Permit ID
        <Input prefix={<i className="fa fa-search" />} style={{ width: 50 }} />
      </Grid>
    ),
    dataIndex: "key",
  },
  {
    title: () => (
      <Grid placeItems="center start">
        First Name
        <Input prefix={<i className="fa fa-search" />} style={{ width: 50 }} />
      </Grid>
    ),
    dataIndex: "firstName",
  },
  {
    title: () => (
      <Grid placeItems="center start">
        Last Name
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
        <Input prefix={<i className="fa fa-search" />} style={{ width: 80 }} />
      </Grid>
    ),
    render: (i: any) => i.phone || "623-143-9124",
  },

  {
    title: () => (
      <Grid placeItems="center start">
        License Plate #
        <Input prefix={<i className="fa fa-search" />} style={{ width: 65 }} />
      </Grid>
    ),
    dataIndex: "liscensePlate",
  },
  {
    title: "Actions",
    render: (i: Notification) => (
 
        <Popconfirm
          title='Are you sure you want to cancel the permit?'
         onConfirm={() => removePermit(i)}
        >
        <Button rounded  bg='red'>
          Delete
        </Button>
        </Popconfirm>  
    ),
  },
];


export default TowRegistrationHistory;
