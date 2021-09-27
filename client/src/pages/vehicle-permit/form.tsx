import React, { useEffect, useState } from "react";
import { Grid, Text, Header, Button } from "platyplex_ui";
import { useFormik } from "formik";
import { Input, DatePicker, Select } from "antd";
import { gradient, primaryColor } from "../../config";
import { moment } from "../../utils/time";
import { useDispatch, useSelector } from "react-redux";
import { ParkingLot, Zone } from "../../store/actions/clients";
import { PermitType } from "../../store/reducer/permit";
import { Client } from "../../store/reducer/clients";
import { useParams } from "react-router";
import { addVehiclePermit } from "../../store/actions/vehicle-permit";

const defaultValue = {
  
  liscensePlate: "",
 
  starts: moment().set("minute", 0).format("ddd, MMM DD, YYYY @ hh:mm A"),
  ends: moment()
    .set("minute", 0)
    .set('year', 2023)
    .add('hour', 1)
    .format("ddd, MMM DD, YYYY @ hh:mm A"),
  
  done: false,
  id: "2NE345678",
  employer: 0,
  type: PermitType.Visitor,
  zone: Zone.R1,
  parkingLot: ParkingLot.Lot1,
};

const Form = ({onSubmit }: any) => {
  const [user, setUser] = useState<any>(defaultValue);
  const submit = (values: any) => {
    setUser(values);
    onSubmit && onSubmit(values);
  };
  const reset = () => setUser(defaultValue);
  return user.done ? (
    <Message reset={reset} user={user} />
  ) : (
    <FormComp submit={submit} />
  );
};

export const Message = ({
  reset,
  user,
  admin,
  style,
  confirm,

  generate,
}: any) => {
  return (
    <Grid placeSelf="start center" gridGap="2em" style={style}>
      <i
        className="fas fa-check-circle"
        style={{ color: primaryColor, fontSize: "6em" }}
      />
      <Header bold>E-permit reservation successful!</Header>
      <Text>
        Your E-permit Reservation ID: <b>{user?.id || "2NE3605"}</b>
      </Text>
      {!admin ? (
        <>
          <Text>
            Your E-permit reservation starts at{" "}
            <b>
              {user?.starts
                ? moment(user.starts).format(`ddd, MMM DD, YYYY @ hh:mm A`)
                : "Fri, Jan 29, 2021 @ 5:00 PM"}
              .
            </b>
          </Text>
        
        </>
      ) : generate ? (
        <Text>
          This E-Permit Expires:{" "}
          <b>
            {user?.endDate
              ? moment(user.endDate).format(`ddd, MMM DD, YYYY @ hh:mm A`)
              : "Fri, Dec 11, 2021 at 5:00 PM"}
            .
          </b>
        </Text>
      ) : (
        <Text>
          Confirmation details have been sent to email ({user.email}).
        </Text>
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
type Values =
  | "liscensePlate"
  | 'duration'
  | "starts"
  | "ends";

const vehicleFields = [
  {
    id: "liscensePlate",
    label: "Your Vehicle License Plate #",
    placeholder: "Ex: 293DEF",
  },

  {
    id: "duration",
    label: "Duration",
    placeholder: "Ex: 293DEF",
  },
  {
    id: "starts",
    label: "E-Permit Start Date & Time",

  },

  {
    id: "ends",
    label: "E-Permit End Date & Time",
  },

] as any;

const FormComp = ({ submit, admin, header , dontAdd, link, partial, length = [], defaultValues, rootPermitId}: any) => {
  const { clients } = useSelector((state: any) => state.clients);
  const dispatch = useDispatch();
  let { id } = useParams() as any;
  const isCompleting = defaultValues? true: false;
  const {
    handleSubmit,
    handleChange,
    errors,
    values,
    setFieldValue,
  } = useFormik({
    initialValues: {...defaultValue, ...defaultValues, isCompleting},
    async onSubmit(values) {
      dispatch(addVehiclePermit(values))
      submit({ ...values, done: true });
    },
  });

  const defaultLocation = "Palo Alto, CA"
  useEffect(() => {
    if (id) {
      const index = Number(id) - 1;
      setFieldValue("employer", clients[index]?.name || defaultLocation);
    }
  }, []);

  const patients = clients[0]?.parkingSpace || 10;
  const error = !values.liscensePlate;
  return (
    <Grid placeSelf="start center" placeItems="start center" gridGap="1.5em">
      <Grid placeItems="stretch" placeSelf="stretch">
        {!admin ? (
          <>
            {" "}
            <Header textAlign="left" className="med">
              Hi there!
            </Header>
            <Text textAlign="left">
              Welcome to ParkStash E-permit reservation system.
            </Text>
            <Text textAlign="left">
              Please enter your information below to generate E-Permit.
            </Text>
          </>
        ) : (
          <>
            {header? header: 
            <Text bold textAlign="right" color={primaryColor}>
              ({patients - 5}/{patients}) Reservations at{" "}
              {moment(values.starts).format("hh:mm a")}
            </Text>}
            <Text textAlign="left">
              Please enter requester's information below to generate E-permit.
            </Text>
          </>
        )}
      </Grid>
      <form onSubmit={handleSubmit}>
        <Grid placeItems="stretch" cols="2" gridGap="2em 4em">
      
       
          {vehicleFields.map(
            ({
              id,
              label,
              placeholder,
            }: {
              id: Values;
              label: string;
              type: string | undefined;
              placeholder: string;
            }) => (
              <div style={{ paddingTop: ".5em" }} key={id}>
                
                  <Text textAlign="left" color={primaryColor} bold>
                    {label}
                  </Text>
                
                {id === "starts" || id === "ends" ? (
                  <DatePicker
                    format="ddd, MMM, DD, YYYY, hh:mm a"
                    showTime={{ format: "hh:mm A" }}
                    minuteStep={15}
                    disabled
                    style={{ minWidth: "20vw", background: "transparent" }}
                    onChange={(e) =>
                      setFieldValue(
                        id,
                        e?.format("ddd, MMM DD, YYYY @ hh:mm A")
                      )
                    }
                    value={moment(values[id])}
                  />
                ) :
                id === "duration"?   
                
            (<Select
            style={{ width: "100%" }}
            defaultValue='1 hour'
            onChange={(e) => {
              const hour = Number(e) || 1;
              setFieldValue('ends', moment(values.starts).add('hour', hour).format("ddd, MMM DD, YYYY @ hh:mm A"))
            }}
          >
            {[1,2,3].map((v) => (
              <Select.Option value={v}>{v} hour</Select.Option>
            ))}
          </Select>):
                (
                  <Input
                    style={{ minWidth: "20vw", background: "transparent" }}
                    name={id}
                    disabled={defaultValues? defaultValues[id]? true: false : false}
                    value={values[id]}
                    onChange={handleChange}
                    placeholder={placeholder}
                  />
                )}
              </div>
            )
          )}
 <div style={{ paddingTop: ".5em" }}>
            <Text textAlign="left" color={primaryColor} bold>
              Permit Type
            </Text>

            <Select
              disabled
              style={{ width: "100%" }}
              value={values.type}
              onChange={(e) => setFieldValue("type", e) }
            >
              {Object.keys(PermitType).map((v) => (
                <Select.Option value={v}>{v}</Select.Option>
              ))}
            </Select>
          </div>

          <div style={{ paddingTop: ".5em" }}>
            <Text textAlign="left" color={primaryColor} bold>
              Department
            </Text>

            <Select
              disabled
              style={{ width: "100%" }}
              value={values.employer}
              onChange={(e) => setFieldValue("employer", e)}
            >
              {clients.map((v: Client, i: number) => (
                <Select.Option value={i}>{v.name}</Select.Option>
              ))}
            </Select>
          </div>
          <div style={{ paddingTop: ".5em" }}>
            <Text textAlign="left" color={primaryColor} bold>
              City
            </Text>

            <Select
              disabled
              style={{ width: "100%" }}
              defaultValue={defaultLocation}
              onChange={(e) => setFieldValue("zone", e)}
            >
              <Select.Option value={defaultLocation}>
                {defaultLocation}
              </Select.Option>

              <Select.Option value={'Palo Alto'}>
                {'Palo Alto'}
              </Select.Option>
            </Select>
          </div>

      
          <div style={{ paddingTop: ".5em" }}>
            <Text textAlign="left" color={primaryColor} bold>
              Zone
            </Text>

            <Select
              disabled
              style={{ width: "100%" }}
              value={values.zone}
              onChange={(e) => setFieldValue("zone", e)}
            >
              {Object.values(Zone).map((v) => (
                <Select.Option value={v}>{v}</Select.Option>
              ))}
            </Select>
          </div>
         
          <div style={{ gridColumn: "span 2", display: "grid" }}>
            <Button.Normal
              style={{
                borderRadius: "1.3em",
                padding: ".5em",
                marginTop: "1em",
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
              onSubmit={(e: any) => handleSubmit(e)}
            >
              Reserve E-Permit
            </Button.Normal>
          </div>
        </Grid>
      </form>
    </Grid>
  );
};
export default Form;
