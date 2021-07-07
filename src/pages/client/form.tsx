import React, { useEffect, useState } from "react";
import { Grid, Text, Header, Button } from "platyplex_ui";
import { useFormik } from "formik";
import { Input, DatePicker, Select } from "antd";
import { gradient, primaryColor } from "../../config";
import { moment } from "../../utils/time";
import { useDispatch, useSelector } from "react-redux";
import { addPermit } from "../../store/actions/permits";
import api from '../../api';
import { ParkingLot, Zone } from "../../store/actions/clients";
import { PermitType } from "../../store/reducer/permit";
import { Client } from "../../store/reducer/clients";
import { useParams } from "react-router";
import random from "../../utils/random";

const defaultValue = {
  firstName: "",
  lastName: "",
  liscensePlate: "",
  email: "",
  starts: moment().set("minute", 0).format('ddd, MMM DD, YYYY @ hh:mm A'),
  ends: moment().set("minute", 0).add('hours', 2).format('ddd, MMM DD, YYYY @ hh:mm A'),
  phone: "",
  done: false,
  id: "2NE345678",
  employer: 0,
  type: PermitType.Employee,
  zone: Zone.R1,
  parkingLot: ParkingLot.Lot1
};

const Form = ({ admin }: any) => {
  const [user, setUser] = useState<any>(defaultValue);
  const submit = (values: any) => setUser(values);
  const reset = () => setUser(defaultValue);
  return user.done ? (
    <Message reset={reset} user={user} admin={admin} />
  ) : (
    <FormComp submit={submit} admin={admin} />
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
    <Grid placeSelf="center" gridGap="2em" style={style}>
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
          <Text>Confirmation details have been sent to your email.</Text>
        </>
      ) : generate ? (
        <Text>
          This E-Permit Expires:{" "}
          <b>
            {user?.endDate
              ? moment(user.endDate).format(`ddd, MMM DD, YYYY @ hh:mm A`)
              : "Fri, Dec 11, 2020 at 5:00 PM"}
            .
          </b>
        </Text>
      ) : (
        <Text>Confirmation details have been sent to email ({user.email}).</Text>
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
  | "firstName"
  | "lastName"
  | "liscensePlate"
  | "email"
  | "starts"
  | "ends"
  | "employer"
  | "phone";

const vehicleFields = [
  {
    id: "firstName",
    label: "First Name",
    placeholder: "Ex: John",
  },
  {
    id: "lastName",
    label: "Last Name",
    placeholder: "Ex: Doe",
  },

  {
    id: "email",
    label: "Email Address",
    placeholder: "Ex: johndoe@gmail.com",
  },
 
  {
    id: "phone",
    label: "Your Phone number",
  },

  {
    id: "starts",
    label: "E-Permit Start Date & Time",
  },

  {
    id: "ends",
    label: "E-Permit End Date & Time",
  },
  {
    id: "liscensePlate",
    label: "Your Vehicle License Plate #",
    placeholder: "Ex: 293DEF",
  },
  
] as any;

const FormComp = ({ submit, admin }: any) => {
  const dispatch = useDispatch();
  const { clients } = useSelector((state: any) => state.clients);
  let { id } = useParams<any>();
  admin = id === undefined;
  const {
    handleSubmit,
    handleChange,
    errors,
    values,
    setFieldValue,
  } = useFormik({
    initialValues: defaultValue,
    async onSubmit(values) {
      dispatch(addPermit(values));

      const userInfo =   {
        id: random(5),
        firstName: values.firstName,
        lastName: values.lastName,
        licensePlate: values.liscensePlate,
        department: clients[values.employer]?.name || 'VMTH',
        starts: moment(values.starts).format('ddd, MMM DD, YYYY @ hh:mm A'),
        ends: moment(values.ends).format('ddd, MMM DD, YYYY @ hh:mm A'), 
      };
      api.customEmail(values.email, userInfo)
      api.customSms(values.phone, userInfo)
      .catch((e)=>console.log(e))
      submit({ ...values, done: true });
    },
  });

  useEffect(()=>{
    if(id){
      const index = Number(id) - 1;
      setFieldValue('employer', index || 0)
    }
  }, [])

  const patients = clients[0]?.parkingSpace || 10;
  const error = vehicleFields.reduce(
    (acc: boolean, { id }: any) => acc || Boolean(errors[id as Values]) || !values[id as Values],
    false
  );
  return (
    <Grid placeSelf="center" placeItems="start center" gridGap="1.5em">
      <Grid placeItems="stretch" placeSelf="stretch">
        {!admin ? (
          <>
            {" "}
            <Header textAlign="left" className="med">
              Hi there!
            </Header>
            <Text textAlign="left">
            Welcome to the UC Davis Medical Center parking E-permit
              reservation system.
            </Text>
            <Text textAlign="left">
              Please enter your information below to generate E-Permit
              E-permit.
            </Text>
          </>
        ) : (<>
          <Text bold textAlign="right" color={primaryColor}>({patients - 5}/{patients}) Reservations at {moment(values.starts).format('hh:mm a')}</Text>   
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
                {id === "liscensePlate" && admin ? (
                  <Text textAlign="left" color={primaryColor} bold>
                   Vehicle License Plate #
                  </Text>
                ) : (
                  <Text textAlign="left" color={primaryColor} bold>
                    {label}
                  </Text>
                )}
                {id === "starts" || id === "ends"? (
                  <DatePicker
                    format="ddd, MMM, DD, YYYY, hh:mm a"
                    showTime={{ format: "hh:mm A" }}
                    minuteStep={15}
                    style={{ minWidth: "20vw", background: "transparent" }}
                    onChange={(e) => setFieldValue(id, e?.format('ddd, MMM DD, YYYY @ hh:mm A'))}
                    defaultValue={moment(values[id])}
                  />
                ) : (
                  <Input
                    style={{ minWidth: "20vw", background: "transparent" }}
                    name={id}
                    value={values[id]}
                    onChange={handleChange}
                    placeholder={placeholder}
                  />
                )}
              </div>
            )
          )}
          


          <div style={{ paddingTop: ".5em" }} key={id}>
              
                  <Text textAlign="left" color={primaryColor} bold>
                   Department
                  </Text>
                
                  <Select
                    style={{ minWidth: "20vw", background: "transparent" }}
                    disabled={!admin}
                    value={values.employer}
                    onChange={(e: number)=>setFieldValue('employer', e)}
                  >
                    {clients.map((e: Client,i: number)=><Select.Option value={i}>{e.name}</Select.Option>)}
                  </Select>
              </div>


          <div style={{gridColumn: 'span 2', display: 'grid'}}>
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
