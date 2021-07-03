import React, { useState } from "react";
import { Grid, Modal, Switch, Card, Button, Text } from "platyplex_ui";
import {
  disabledTxtColor,
  gradient,
  primaryColor,
  primaryTxtColor,
} from "../../../../config";
import { Table, Input, Select, Radio } from "antd";
import { additionalData, dataSource } from "../data";
import { Message } from "../../../client/form";
import { moment } from "../../../../utils/time";
import { Client } from "../../../../store/reducer/clients";
import { useSelector } from "react-redux";

enum HistoryState {
  ACTIVE = "ACTIVE",
  UPCOMING = "UPCOMING",
  EXPIRED = "EXPIRED",
  CANCELLED = "CANCELED",
};

const History = ({ client }: { client?: Client }) => {
  const admin = !client;
  const data = admin ? [...dataSource, ...additionalData] : dataSource;
  const [state, setter] = useState<any>({
    type: HistoryState.ACTIVE,
    checked: false,
    department: "All",
  });
  const { clients } = useSelector((state: any) => state.clients);
  const setState = (props: any) => setter({ ...state, ...props });
  const changeDepartment = (department: string) => setState({ department });
  const filtetDeparment = ({ department }: any) =>
    department === state.department || state.department === "All";
  const checked = () => setState({ checked: true });

  const openPermit = async (permit: any, checked: any) => {
    const modal = Modal({
      title: "",
      modal: (
        <Modall permit={permit} checked={checked} close={() => modal.close()} />
      ),
      hideCancel: true,
    });
    modal.open();
  };

  return (
    <>
      {" "}
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
        dataSource={data.filter(filtetDeparment)}
        columns={columns(
          (e: any) => openPermit(e, checked),
          clients,
          client,
          changeDepartment
        )}
      />
    </>
  );
};

const Modall = ({ close, checked, permit }: any) => {
  const [done, setDone] = useState(false);
  const nextState = () => setDone(true);

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
              endDate: moment(permit.ends).add("hour", 2).toISOString(),
            }}
            admin
            style={{ gridGap: "1em" }}
            confirm={() => {
              checked();
              close();
            }}
          />
        ) : (
            <>
              <Text bold style={{ marginTop: "1.5em" }}>
                Extend E-Permit
            </Text>
              <Text textAlign="left">
                E-Permit ID: <b>{permit.ePermit}</b>
              </Text>
              <Text textAlign="left">
                This E-Permit Expires: <b>{permit.ends}</b>
              </Text>
              <Text textAlign="left" color={primaryColor}>
                Extend By
            </Text>
              <Radio.Group name="booking_type">
                <Grid
                  customCols="auto auto auto 1fr"
                  gridGap="2em"
                  mobileLayout={false}
                >
                  {["1-hour", "2-hour", "Custom"].map((item) => (
                    <Radio
                      value={item.toLowerCase()}
                      key={item}
                      defaultChecked={item === "1-hour"}
                    >
                      <Text style={{ padding: ".5em" }}> {item}</Text>
                    </Radio>
                  ))}
                </Grid>
              </Radio.Group>
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


const columns = (
  openBooking: any,
  clients: Client[],
  client: Client | undefined,
  changeDepartment: (e: string) => void
) => [
    ...(!client
      ? [
        {
          title: () => (
            <Grid placeItems="center start">
              Client
              <Select
                style={{ width: 80 }}
                defaultValue="All"
                onChange={changeDepartment}
              >
                {clients.map(({ name }) => (
                  <Select.Option value={name}>{name}</Select.Option>
                ))}
              </Select>
            </Grid>
          ),
          render: ()=> clients[Math.floor((Math.random()* clients.length))]?.name || 'Client A'
        },
      ]
      : []),
    {
      title: () => (
        <Grid placeItems="center start">
          E-Permit ID
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
          VIP
          <Select style={{ width: 60 }} defaultValue="All" />
        </Grid>
      ),
      render: () => {
        const checked = Math.floor(Math.random() * 11) % 2 === 0;
        if (!checked)
          return "Staff"
        return (
          <span>
            <i
              className="fa fa-check-circle txt-md"
              style={{ color: checked ? primaryColor : disabledTxtColor }}
            />{" "}
          VIP{" "}
          </span>
        );
      },
    },

    {
      title: () => (
        <Grid placeItems="center start">
          Entity
          <Select style={{ width: 60 }} defaultValue="All" />
        </Grid>
      ),
      render: () => "Cal Poly",
    },

    {
      title: () => (
        <Grid placeItems="center start">
          Parking Location
          <Select style={{ width: 60 }} defaultValue="All" />
        </Grid>
      ),
      render: ({ department }: any) =>
        department === "Client A"
          ? "Parking Lot 1"
          : department === "Client B"
            ? "Parking Lot 2"
            : "Parking Lot 3",
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
          Starts
          <Input prefix={<i className="fa fa-search" />} style={{ width: 100 }} />
        </Grid>
      ),
      dataIndex: "starts",
    },
    {
      title: () => (
        <Grid placeItems="center start">
          Ends
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
            Extend
        </Button>
          <Button rounded bg="red">
            Cancel
        </Button>
        </>
      ),
    },
  ];

export default History;
