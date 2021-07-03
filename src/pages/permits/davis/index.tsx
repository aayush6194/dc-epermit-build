import React, { useState } from "react";
import Layout from "../../../layout";
import { Grid, Modal, Button, Switch, Card, Header, Text, Notification } from "platyplex_ui";
import { gradient, primaryColor, primaryTxtColor } from "../../../config";
import {
  Table,
  Input,
  DatePicker,
  Radio,
  Select,
  Tooltip,
} from "antd";
import Form, { Message } from "../../client/form";
import { moment } from "../../../utils/time";
import permitsIssued from "../../../assets/ofPermitsIssued.png";
import graph from "../../../assets/Epermitsgraph.png";
import heat from "../../../assets/HourlyMaxAllLocations.png";
import max1 from "../../../assets/VMTHMAx.png";
import max2 from "../../../assets/max2.png";
import max3 from "../../../assets/max3.png";
import { additionalData, dataSource, newData } from "./data";
import Rules from "./rules";

enum User {
  GENERATE = "GENERATE",
  HISTORY = "HISTORY",
}

enum Admin {
  GENERATE = "GENERATE",
  HISTORY = "HISTORY",
  ANALYTICS = "ANALYTICS",
  RULES = "RULES",
}

enum History {
  ACTIVE = "ACTIVE",
  UPCOMING = "UPCOMING",
  EXPIRED = "EXPIRED",
  CANCELLED = "CANCELED",
}

const Permits = ({ admin }: { admin: boolean }) => {
  const data = admin ? [...dataSource, ...additionalData] : dataSource;
  const [state, setter] = useState<any>({
    as: User.GENERATE,
    type: History.ACTIVE,
    checked: false,
    department: "All",
  });

  const setState = (props: any) => setter({ ...state, ...props });
  const changeDepartment = (department: string) => setState({ department });
  const filtetDeparment = ({ department }: any) => department === state.department || state.department === 'All';
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
    <Layout sidebar style={{ gridTemplateRows: "1fr auto" }}>
      <Layout.Top>
        <span />
      </Layout.Top>
      <Layout.Bottom>
        <Grid placeItems="start stretch" height="100%">
          <Card grid placeItems="end start" width="100%">
            <Switch.underlined
              style={{ padding: 0 }}
              onClick={(as) => setState({ as })}
              color={primaryTxtColor}
              border={"4px solid " + primaryColor}
              items={Object.keys(admin ? Admin : User)}
              active={state.as}
            />
          </Card>

          {state.as === User.HISTORY ? (
            <Card>
              <Switch
                style={{ padding: 0 }}
                onClick={(type: any) => setState({ type })}
                color={primaryTxtColor}
                border={"2px solid " + primaryColor}
                items={Object.keys(History)}
                active={state.type}
              />
              <br />
              <Table
                bordered
                dataSource={
                  state.checked
                    ? [...newData, ...data].filter(filtetDeparment )
                    : data.filter(filtetDeparment )
                }
                columns={columns(
                  (e: any) => openPermit(e, checked),
                  admin,
                  changeDepartment
                )}
              />
            </Card>
          ) : state.as === User.GENERATE ? (
            <Card grid>
              <Form admin />
            </Card>
          ) : state.as === Admin.RULES ? (
            <Rules />
          ) : (
            <Analytics />
          )}
        </Grid>
      </Layout.Bottom>
    </Layout>
  );
};



const Analytics = () => {
  return (
    <>
      <Card>
        <Header bold textAlign="left" margin="0 0 1em 0">
          Total # of E-Permits Issued By Each Department &nbsp;
          <Tooltip title='Download the current data on excel'>
          <Button faIcon='fa fa-download' style={{fontSize: '.7em'}} rounded minWidth='4.5em' onClick={()=> Notification.success({ title: 'Success', message: 'File Downloaded'})}/>
          </Tooltip>
        </Header>
        <Grid cols="2">
          <img
            src={permitsIssued}
            alt="permit"
            style={{ minWidth: 30, maxWidth: "100%" }}
          />
          <img
            src={graph}
            alt="permit"
            style={{ minWidth: 30, maxWidth: "100%" }}
          />
        </Grid>
      </Card>

      <Card>
        <Header bold textAlign="left" margin="0 0 1em 0">
          Current Hourly Max Capacity Heat Map At All Locations
        </Header>
        <Grid cols="2">
          <img
            src={heat}
            alt="permit"
            style={{ minWidth: 30, maxWidth: "100%" }}
          />
        </Grid>
      </Card>

      <Card>
        <Header bold textAlign="left" margin="0 0 1em 0">
          Current Hourly Max Capacity Heat Map At All Locations
        </Header>
        <Grid customCols="auto auto auto 1fr" margin="0 0 1em 0">
          <Text>Choose week</Text>
          <DatePicker.RangePicker
            defaultValue={[moment("01/04/21"), moment("01/10/21")]}
            format="DD/MM/YY - DD/MM/YY"
          />
           <Tooltip title='Download the current data on excel'>
          <Button faIcon='fa fa-download' rounded minWidth='4.5em' onClick={()=> Notification.success({ title: 'Success', message: 'File Downloaded'})}/>
          </Tooltip>
          <Text style={{ gridColumn: "1/-1", width: "100%" }} textAlign="left">
            For week 01/04/21 - 01/10/21
          </Text>
        </Grid>

        <Grid cols="2" gridGap="2em 1em">
          <img
            src={max1}
            alt="permit"
            style={{ minWidth: 30, maxWidth: "100%" }}
          />
          <img
            src={max2}
            alt="permit"
            style={{ minWidth: 30, maxWidth: "100%" }}
          />
          <img
            src={max3}
            alt="permit"
            style={{ minWidth: 30, maxWidth: "100%" }}
          />
        </Grid>
      </Card>
    </>
  );
};
const departments = [
  'All',
  "VMTH",
  "UCDH Clinic",
  "Psychology",
  "SDC",
  "Employee Heath",
  "Nutrition",
  "CNL",
  "Student Health",
];
const columns = (
  openBooking: any,
  department = false,
  changeDepartment: (e: string) => void
) => [
  ...(department
    ? [
        {
          title: () => (
            <Grid placeItems="center start">
              Department
              <Select
                style={{ width: 120 }}
                defaultValue="All"
                onChange={changeDepartment}
              >
                {departments.map((a) => (
                  <Select.Option value={a}>{a}</Select.Option>
                ))}
              </Select>
            </Grid>
          ),
          dataIndex: "department",
        },
      ]
    : []),
  {
    title: () => (
      <Grid placeItems="center start">
        E-Permit ID
        <Input prefix={<i className="fa fa-search" />} style={{ width: 100 }} />
      </Grid>
    ),
    dataIndex: "ePermit",
  },
  {
    title: () => (
      <Grid placeItems="center start">
        First Name
        <Input prefix={<i className="fa fa-search" />} style={{ width: 100 }} />
      </Grid>
    ),
    dataIndex: "firstName",
  },
  {
    title: () => (
      <Grid placeItems="center start">
        Last Name
        <Input prefix={<i className="fa fa-search" />} style={{ width: 100 }} />
      </Grid>
    ),
    dataIndex: "lastName",
  },
  {
    title: () => (
      <Grid placeItems="center start">
        Email
        <Input prefix={<i className="fa fa-search" />} style={{ width: 100 }} />
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
export default Permits;
