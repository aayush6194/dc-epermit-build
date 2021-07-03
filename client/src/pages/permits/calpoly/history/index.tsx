import React, { useState } from "react";
import { Grid, Modal, Switch, Card, Button, Text } from "platyplex_ui";
import { gradient, primaryColor, primaryTxtColor } from "../../../../config";
import { Table, Input, Select, Progress, TimePicker, Popover, Popconfirm } from "antd";
import { Message } from "../../../client/form";
import { moment } from "../../../../utils/time";
import { Client } from "../../../../store/reducer/clients";
import { useDispatch, useSelector } from "react-redux";
import { Permit, PermitType, RootPermit } from "../../../../store/reducer/permit";
import { removePermit } from "../../../../store/actions/permits";
import { useParams } from "react-router";

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
      {state.type === HistoryState.UPCOMING ? (
        <Table
          bordered
          pagination={{ pageSize: 25 }}
          dataSource={permits.filter((c: any) => c.key === "1" )}
          columns={upcommingColumns(clients, id) as any}
        />
      ) : (
        <Table
          bordered
          style={{ maxWidth: '100%', overflowX: 'scroll'}}
          pagination={{ pageSize: 25 }}
          loading={loading}
          dataSource={permits}
          columns={
            columns((e: any) => openPermit(e, checked), clients, (p: RootPermit)=> dispatch(removePermit(p)), id)}
        />
      )}
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

const columns = (openBooking: any, clients: Client[], removePermit: (p : Permit)=> void, id: any) => [
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
          <Select.Option value={"Moderna"}>Beltville, MD</Select.Option>
        </Select>
      </Grid>
    ),
    render: (c: Permit, a: any, i: number)=> 'Beltville, MD'
  },

  {
    title: () => (
      <Grid placeItems="center start">
        E-Permit ID
        <Input prefix={<i className="fa fa-search" />} style={{ width: 50 }} />
      </Grid>
    ),
    render: (p: Permit)=> p?._id?.substring(0,5)
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
    dataIndex: "liscensePlate",
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


  {
    title: () => (
      <Grid placeItems="center start">
        Council Member
        <Input prefix={<i className="fa fa-search" />} style={{ width: 50 }} />
      </Grid>
    ),
    dataIndex: "parkingLot",
  },


  {
    title: "Actions",
    render: (i: Permit) => (
      <>
        <Button rounded onClick={() => openBooking(i)} disabled={i.type === PermitType.Visitor}>
          Extend
        </Button>
        <Popconfirm
          title='Are you sure you want to cancel the permit?'
         onConfirm={() => removePermit(i)}
        >
        <Button rounded  bg='red'>
          Cancel
        </Button>
        </Popconfirm>  
      </>
    ),
  },
];

const upcommingColumns = (clients: Client[], id: any) => [
  {
    title: () => (
      <Grid placeItems="center start">
       Permit Type
        <Select style={{ width: 65 }} defaultValue="All">
          <Select.Option value={"Moderna"}>Employee</Select.Option>
          <Select.Option value={"Pfizer"}>Handicap</Select.Option>
        </Select>
      </Grid>
    ),
    dataIndex: "type",
  },

  {
    title: () => (
      <Grid placeItems="center start">
      Employer
        <Select style={{ width: 65 }} defaultValue="All">
          <Select.Option value={"Moderna"}>Apple Store</Select.Option>
        </Select>
      </Grid>
    ),
    render: (c: Permit)=> {
      if(id && Number(id) >= 0){
        const index = Number(id) - 1;
        if(clients?.length > (index + 1)){
          return clients[index].name
        }
        return '10412 TULSA DRIVE'
      }
      return '10412 TULSA DRIVE'
    }
  },
  {
    title: () => (
      <Grid placeItems="center start">
        E-Permit ID
        <Input prefix={<i className="fa fa-search" />} style={{ width: 65 }} />
      </Grid>
    ),
    dataIndex: "ePermit",
  },
  {
    title: () => (
      <Grid placeItems="center start">
        First Name
        <Input prefix={<i className="fa fa-search" />} style={{ width: 65 }} />
      </Grid>
    ),
    dataIndex: "firstName",
  },
  {
    title: () => (
      <Grid placeItems="center start">
        Last Name
        <Input prefix={<i className="fa fa-search" />} style={{ width: 65 }} />
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
    title: () => (
      <Grid placeItems="center start">
        Appointment Date
        <Input prefix={<i className="fa fa-search" />} style={{ width: 100 }} />
      </Grid>
    ),
    render: (i: any) => i.starts === 'N/A'? 'N/A' : 
    moment(i.starts).add('days', 7 ).format('ddd, MMM DD, YYYY @ hh:mm A'),
  },
];

export default History;
