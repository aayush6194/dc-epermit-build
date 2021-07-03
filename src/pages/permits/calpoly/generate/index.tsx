import React, { useState } from "react";
import { Grid, Text, Header, Button , Card} from "platyplex_ui";
import { Input, DatePicker, Select, InputNumber, Checkbox } from "antd";
import { disabledTxtColor, gradient, primaryColor } from "../../../../config";
import { moment } from "../../../../utils/time";
import { Client } from "../../../../store/reducer/clients";

const defaultValue = {
  startDate: undefined,
  endDate: undefined,
  done: false,
};

const Generate = ({ client }: {client? : Client}) => {
  const [data, setData] = useState<any>(defaultValue);
  const submit = (values: any) => setData({ ...data, done: true });
  const reset = () => setData(defaultValue);
  return data.done ? (
    <Message reset={reset} data={data} admin={client === undefined} />
  ) : (
    <FormComp submit={submit}/>
  );
};

export const Message = ({ reset, data, admin, style, confirm }: any) => {
  return (
    <Grid placeSelf="center" gridGap="2em" style={style}>
      <i
        className="fas fa-check-circle"
        style={{ color: primaryColor, fontSize: "6em" }}
      />
      <Header bold>E-permit reservation successful!</Header>
      <Text>
        E-permit Reservation ID: <b>{data?.id || "2NE3605"}</b>
      </Text>
      {!admin ? (
        <>
          <Text>
            Your E-permit reservation ends{" "}
            <b>
              {data?.endDate
                ? moment(data.endDate).format(`ddd, MMM DD, YYYY @ hh:mm A`)
                : "Fri, Dec 11, 2020 @ 5:00 PM"}
              .
            </b>
          </Text>
          <Text>Confirmation details have been sent.</Text>
        </>
      ) : (
        <Text>Confirmation details have been sent.</Text>
      )}
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

const FormComp = ({ submit }: any) => {
  const error = false;
  const btnStyle = (error: boolean)=>({
    placeSelf: "center start",
    padding: ".5em .75em",
    ...(!error
      ? {
          backgroundImage: `${gradient}`,
          color: "white",
          border: 0,
        }
      : {}),
  });

  return (
    <Grid placeSelf="center start" placeItems="start center" gridGap="1.5em">
      <Grid placeItems="stretch" placeSelf="stretch">
        <Text textAlign="left">Please enter required information below</Text>
      </Grid>
      <div>
        <Grid placeItems="stretch" cols="3" gridGap="2em 4em">
          <Grid placeItems="stretch" gridGap={".25em"}>
            <Text textAlign="left" color={primaryColor} bold>
              Entity
            </Text>
            <Select defaultValue="Cal Poly">
              <Select.Option value="Cal Poly">Cal Poly</Select.Option>
            </Select>
          </Grid>

          <Grid placeItems="stretch" gridGap={".25em"}>
            <Text textAlign="left" color={primaryColor} bold>
              Location
            </Text>
            <Select defaultValue="Parking Lot 1">
              <Select.Option value="Parking Lot 1">Parking Lot 1</Select.Option>
              <Select.Option value="Parking Lot 2">Parking Lot 2</Select.Option>
              <Select.Option value="Parking Lot 3">Parking Lot 3</Select.Option>
            </Select>
          </Grid>

          <Grid placeItems="stretch" gridGap={".25em"}>
            <Text textAlign="left" color={primaryColor} bold>
              # of Parking Spots Needed
            </Text>
            <InputNumber style={{ width: "100%", border: 0 }} />
          </Grid>

          <Grid placeItems="stretch" gridGap={".25em"}>
            <Text textAlign="left" color={primaryColor} bold>
              E-Permit Start Date
            </Text>
            <DatePicker
              format="ddd, MMM, DD, YYYY"
              style={{ minWidth: "20vw", background: "transparent" }}
              defaultValue={moment()}
            />
          </Grid>

          <Grid placeItems="stretch" gridGap={".25em"}>
            <Text textAlign="left" color={primaryColor} bold>
              E-Permit End Date
            </Text>
            <DatePicker
              format="ddd, MMM, DD, YYYY"
              style={{ minWidth: "20vw", background: "transparent" }}
              defaultValue={moment()}
            />
          </Grid>
        </Grid>

        <Grid
          customCols="auto auto 1fr"
          placeItems="stretch"
          margin="2em 0 0 0"
          gridGap=".5em"
        >
          <Text textAlign="left" style={{ gridColumn: "1/-1" }}>
            Please add driver and vehicle information below
          </Text>

          <Button rounded  style={btnStyle(false)}>Upload CSV/Excel</Button>
          <Button rounded  style={btnStyle(false)}>Add information manually</Button>
        </Grid>

        <Grid placeItems="stretch" margin='1em 0 0 0'>
          <Table />
          <br/>
          <Button
            rounded
            style={btnStyle(error)}
            type="submit"
            disabled={error}
            onClick={(e: any) => submit()}
          >
            Generate E-Permit
          </Button>
        </Grid>
      </div>
    </Grid>
  );
};

const Table = () => {
  const [data, setData] = useState<any>([]);

  const addData = () => {
    setData([
      ...data,
      {
        firstName: "",
        lastName: "",
        email: "",
        liscensePlate: "",
        vip: false,
        edit: true,
      },
    ]);
  };

  const deleteRow = (index: number) =>
    setData(data.filter((_: any, i: number) => i !== index));
  const toggleRow = (index: number, edit: boolean) => {
    const rows = [...data];
    rows[index] = {
      ...rows[index],
      edit,
    };
    setData(rows);
  };

  const modifyRow = (index: number, row: any) => {
    const rows = [...data];
    rows[index] = {
      ...rows[index],
      ...row,
    };
    setData(rows);
  };

  const columns = [
    {
      title: "First Name",
      render: (data: any, index: number) =>
        data.edit ? (
          <Input
            value={data["firstName"]}
            placeholder="John"
            name="First Name"
            onChange={(e) => modifyRow(index, { firstName: e.target.value })}
          />
        ) : (
          <div>{data["firstName"]}</div>
        ),
    },
    {
      title: "Last Name",
      render: (data: any, index: number) =>
        data.edit ? (
          <Input
            value={data["lastName"]}
            placeholder="Doe"
            name="Last Name"
            onChange={(e) => modifyRow(index, { lastName: e.target.value })}
          />
        ) : (
          <div>{data["lastName"]}</div>
        ),
    },
    {
      title: "Email Address",
      render: (data: any, index: number) =>
        data.edit ? (
          <Input
            value={data["email"]}
            placeholder="john.doe@emai.com"
            name="email"
            onChange={(e) => modifyRow(index, { email: e.target.value })}
          />
        ) : (
          <div>{data["email"]}</div>
        ),
    },
    {
      title: "Vehicle License Plate #",
      render: (data: any, index: number) =>
        data.edit ? (
          <Input
            placeholder="2NE360"
            value={data["liscensePlate"]}
            name="Liscense Plate"
            onChange={(e) =>
              modifyRow(index, { liscensePlate: e.target.value.toUpperCase() })
            }
          />
        ) : (
          <div>{data["liscensePlate"]}</div>
        ),
    },
    {
      title: "VIP",
      render: (data: any, index: number) =>
        data.edit ? (
          <div>
            <Checkbox
              checked={data["vip"]}
              style={{ borderRadius: "50%" }}
             onChange={(e) => modifyRow(index, { vip: e.target.checked})}
            /> &nbsp;
            VIP
          </div>
        ) : (
          <div>
          <i
            className="fa fa-check-circle txt-md"
            style={{ color: data['vip']? primaryColor : disabledTxtColor }}
          />{" "}
          VIP{" "}
        </div>
        ),
    },
    {
      title: "Actions",
      render: (data: any, index: number) => (
        <Grid customCols="auto auto" gridGap={0}>
          <Button
            rounded
            disabled={!data.firstName || !data.lastName || !data.email}
            onClick={() => toggleRow(index, !data.edit)}
          >
            {data.edit ? "Add" : "Edit"}
          </Button>
          <Button rounded bg="red" onClick={() => deleteRow(index)}>
            Delete
          </Button>
        </Grid>
      ),
    },
  ];
  return (
    <>
      <Grid
        customCols="repeat(6, 200px)"
        placeItems="stretch"
        margin=".5em 0 0 0"
      >
        {columns.map(({ title }) => (
          <Text color={primaryColor} bold key={title}>
            {title}
          </Text>
        ))}
        {data.map((datum: any, index: number) => (
          <React.Fragment key={index}>
            {columns.map(({ render }) => render(datum, index))}
          </React.Fragment>
        ))}
      </Grid>
      <i
        className="fa fa-plus pointer txt-left txt-md"
        style={{ color: primaryColor }}
        onClick={addData}
      />
    </>
  );
};

export default Generate;
