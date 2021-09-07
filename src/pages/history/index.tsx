import React, { useState } from "react";
import { Grid, Modal, Switch, Button, Text, Card } from "platyplex_ui";
import Layout from "../../layout";
import {
  disabledTxtColor,
  primaryColor,
  primaryTxtColor,
} from "../../config";
import { Table, Input, Select, } from "antd";
import { Client } from "../../store/reducer/clients";
import img from "../../assets/MtnView_Logo.png_4006cf7409645b4b8a805958617cd046.png";
enum HistoryState {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED"
};

const History = () => {
  const [state, setter] = useState<any>({
    type: HistoryState.PENDING,
    checked: false,
    department: "All",
  });
  
  const setState = (props: any) => setter({ ...state, ...props });

  return (
    <Layout sidebar style={{ gridTemplateRows: "1fr auto" }} avatarImg={img}>
    <Layout.Top>
      <span />
    </Layout.Top>
    <Layout.Bottom>
      <Grid
        placeItems="start stretch"
        padding=".5em"
        height="100%"
        style={{
          width: 1100,
          paddingTop: "1em",
          height: "calc(99vh - 7em)",
          gridTemplateRows: "1fr auto",
          maxWidth: "100vw",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
     <Card
      shadow={true}
      grid
      placeItems="stretch"
      className="noselect slide-up"
      margin={0}
      style={{ padding: "2em 1.5em 3em 1.5em" }}
      gridGap={"1.25em"}
     >
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
        style={{overflowX: 'auto'}}
        dataSource={[
          {ePermit: "45ES3456",
        
        firstName: 'Emma',
      lastName: 'Watson',
      liscensePlate: '456Y567',
      ends: 'Tue, Sep 7, 2021 - Tue, Oct 5, 2021',
    email: 'emma.watson@gmail.com'}
        ]}
        columns={columns(
          (e: any) => {},
          [],
 
        )}
      />
    </Card>
    </Grid>
    </Layout.Bottom>
  </Layout>
  );
};


const columns = (
  openBooking: any,
  clients: Client[],
) => [

    {
      title: () => (
        <Grid placeItems="center start">
          Application Number
          <Input prefix={<i className="fa fa-search" />} style={{ width: 80 }} />
        </Grid>
      ),
      dataIndex: "ePermit",
    },
    {
      title: () => (
        <Grid placeItems="center start">
          First Name
          <Input prefix={<i className="fa fa-search" />} style={{ width: 80 }} />
        </Grid>
      ),
      dataIndex: "firstName",
    },
    {
      title: () => (
        <Grid placeItems="center start">
          Last Name
          <Input prefix={<i className="fa fa-search" />} style={{ width: 80 }} />
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
          License Plate #
          <Input prefix={<i className="fa fa-search" />} style={{ width: 100 }} />
        </Grid>
      ),
      dataIndex: "liscensePlate",
    },
  
    {
      title: () => (
        <Grid placeItems="center start">
          Duration
          <Input
            prefix={<i className="fa fa-search" />}
            style={{ maxWidth: 100 }}
          />
        </Grid>
      ),
      dataIndex: "ends",
    },
    {
      title: "Actions",
      render: (i: any) => (
        <>
          <Button rounded onClick={() => openBooking(i)}>
            Approve
        </Button>
          <Button rounded bg="red">
            Reject
        </Button>
        </>
      ),
    },
  ];

export default History;
