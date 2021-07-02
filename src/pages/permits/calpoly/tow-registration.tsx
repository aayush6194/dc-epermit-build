import React, { useEffect, useState } from "react";
import { Grid, Text, Header, Button, Card } from "platyplex_ui";
import { Input, DatePicker, Select, Checkbox, Radio, Table, } from "antd";
import { gradient, primaryColor } from "../../../config";
import { moment } from "../../../utils/time";
import { useDispatch, useSelector } from "react-redux";
import api from "../../../api";
import { ParkingLot, Zone } from "../../../store/actions/clients";
import { Permit, PermitType } from "../../../store/reducer/permit";
import state from "./state.json";
import mail from "../../../assets/mail.svg";
import empty from "../../../assets/empty.svg";
import { addDispatch } from "../../../store/actions/dispatches";
import { Notification } from "../../../store/reducer/notifications";
const defaultValue = {
  firstName: "",
  lastName: "",
  liscensePlate: "",
  email: "",
  starts:'N/A',
  ends: 'N/A',
  phone: "",
  done: false,
  id: "2NE345678",
  employer: 0,
  type: PermitType.Residential,
  zone: Zone.R1,
  parkingLot: ParkingLot.Lot1,
};

const TowRegistration = ({ admin, header, onSubmit }: any) => {
  const [user, setUser] = useState<any>(defaultValue);
  const [search, setSearch] = useState("");
  const submit = (values: any) => {
    setUser(values);
    onSubmit && onSubmit(values);
  };
  const reset = () => setUser(defaultValue);
  return user.done ? (
    <Message reset={reset} user={user} admin={admin} />
  ) : (
    <Search submit={submit} />
  );
};

export const Message = ({ reset, user, style, confirm }: any) => {
  return (
    <Grid placeSelf="center" gridGap="2em" style={style}>
      <i
        className="fas fa-check-circle"
        style={{ color: primaryColor, fontSize: "6em" }}
      />
      <Header bold>Tow Notification Created!</Header>

      <Text>Confirmation details have been sent to email ({user.email}).</Text>

      <Button.Normal
        style={{
          borderRadius: "1.3em",
          padding: ".5em",
          marginTop: "1em",
          backgroundImage: `${gradient}`,
          color: "white",
          border: 0,
          minWidth: "15vw",
        }}
        type="submit"
        onClick={confirm ? confirm : reset}
      >
        Great
      </Button.Normal>
    </Grid>
  );
};

const Search = ({ submit }: any) => {
  const { permits }: { permits: Permit[] } = useSelector(
    (state: any) => state.permits
  );
  const { notifications } = useSelector(
    (state: any) => state.notifications
  );
 const dispatch = useDispatch();
  const searchPermit = () => {
    setSelected(false);
    const foundPermit = permits.reduce(
      (acc: Permit | undefined, curr: Permit) => {
        return curr.liscensePlate.toUpperCase().trim() === search.trim()
          ? curr
          : acc;
      },
      undefined
    );

    const foundNotification = notifications.reduce(
      (acc: Notification | undefined, curr: Notification) => {
        return curr.liscensePlate.toUpperCase().trim() === search.trim()
          ? curr
          : acc;
      },
      undefined
    );

    const foundData = foundPermit || foundNotification
    setNotFound(!foundData);
    setPermit(foundData);
  };
  const [search, setSearch] = useState("");
  const [selectedState, setState] = useState<string | undefined>(undefined);
  const error = search.length < 3 || typeof selectedState === "undefined";
  const [selectedPermit, setPermit] = useState<undefined | Permit>(undefined);
  const [notFound, setNotFound] = useState(false);
  const [selected, setSelected] = useState(false);

  const onSubmit = () => {
    console.log(selectedPermit);
    if (selectedPermit) {
      const dispatchEvent = {
        firstName: selectedPermit.firstName,
        lastName: selectedPermit.lastName,
        email: selectedPermit.email,
        liscensePlate: selectedPermit.liscensePlate,
        phone: selectedPermit.phone,
        time:  moment().format("ddd, MMM DD, YYYY @ hh:mm A")
      }
     dispatch(addDispatch(dispatchEvent))
      api
        .sendTowEmail2({
          firstName: selectedPermit.firstName,
          lastName: selectedPermit.lastName,
          email: selectedPermit.email,
          licensePlate: selectedPermit.liscensePlate,
          phone: selectedPermit.phone,
          vaccine: "any",
          date: moment(selectedPermit.starts).toISOString(),
          location: "any",
          space: 1,
        })
        .catch((e) => console.log(e));
      submit({ ...selectedPermit, done: true });
    }
  };
  return (
    <>
    <Card grid>
    <Grid placeSelf="center" placeItems="start center" gridGap="1.5em">

      <Grid
        placeItems="center stretch"
        placeSelf="stretch"
        customCols="8em 1fr 6em"
      >
        <Select
        showSearch
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          placeholder="State"
          value={selectedState}
          onChange={(e) => setState(e)}
        >
          {state.map((s) => (
            <Select.Option value={s["alpha-2"]}>{s.name}</Select.Option>
          ))}
        </Select>
        <Input
          value={search}
          name='liscensePlate'
          onChange={(e) => setSearch(e.target.value.toUpperCase())}
          placeholder="Enter the License Plate #"
          style={{ minWidth: "20vw", background: "transparent" }}
        />
        <Button.Normal
          style={{
            borderRadius: "1.3em",
            padding: ".5em",
            ...(!error
              ? {
                  backgroundImage: `${gradient}`,
                  color: "white",
                  border: 0,
                }
              : {}),
          }}
          type="submit"
          disabled={error}
          onClick={searchPermit}
        >
          Search
        </Button.Normal>
      </Grid>
      <Grid placeItems="stretch" placeSelf="stretch" gridGap="2em 4em">
        <Grid placeItems="center stretch">
          {!selectedPermit ? (
            <>
              <img
                src={notFound ? empty : mail}
                alt="Mail"
                style={{ height: "30vh", margin: "auto" }}
              />
              {notFound && (
                <Text size={"1.5em"} bold color={primaryColor}>
                  No Result
                </Text>
              )}
            </>
          ) : (
            <Card shadow   >
              <Grid customCols="5em 1fr auto" placeItems="center stretch"   className='pointer' onClick={(e) => setSelected(!selected)}>
                <span />
                <div>
                  <Text textAlign="left">
                    Name:{" "}
                    {selectedPermit.firstName + " " + selectedPermit.lastName}
                  </Text>
                  <Text textAlign="left">Email: {selectedPermit.email}</Text>
                  <Text textAlign="left">Phone #: {selectedPermit.phone}</Text>
                  <Text textAlign="left">State: {selectedState}</Text>
                </div>
                <Radio
                  value={selected}
                  checked={selected}
              
                ></Radio>
              </Grid>
            </Card>
          )}
        </Grid>
        <Button.Normal
          style={{
            borderRadius: "1.3em",
            padding: ".5em",
            marginTop: "1em",
            ...(!!selected
              ? {
                  backgroundImage: `${gradient}`,
                  color: "white",
                  border: 0,
                }
              : {}),
          }}
          type="submit"
          disabled={!selected}
          onClick={(e: any) => onSubmit()}
        >
          Create Notification
        </Button.Normal>
      </Grid>
      
   
     
    </Grid>
    </Card>
     <DispatchHistory />
     </>
  );
};



const DispatchHistory = () => {
  const { dispatches } = useSelector((state: any) => state.dispatches);
  return (
<Card>
    <br />

    <Text bold textAlign='left' size='1.25em' color={primaryColor}>Tow Notification History</Text>
    <br />
        <Table
          bordered
          style={{ maxWidth: '100%'}}
          pagination={{ pageSize: 25 }}
          dataSource={dispatches}
          columns={columns()}
        />
      </Card>
        );
};

const columns = () => [

  {
    title: () => (
      <Grid placeItems="center start">
        Time
        <Input prefix={<i className="fa fa-search" />} style={{ width: 50 }} />
      </Grid>
    ),
    dataIndex: "time",
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
];
export default TowRegistration;
