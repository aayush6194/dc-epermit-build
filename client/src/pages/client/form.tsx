import React, { useEffect, useState } from "react";
import { Grid, Text, Header, Button } from "platyplex_ui";
import { useFormik } from "formik";
import { Input, DatePicker, Select } from "antd";
import { gradient, primaryColor } from "../../config";
import { moment } from "../../utils/time";
import { useDispatch, useSelector } from "react-redux";
import { addPermit ,addResidence} from "../../store/actions/permits";
import api from "../../api";
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
  starts: moment().set("minute", 0).format("ddd, MMM DD, YYYY @ hh:mm A"),
  ends: moment()
    .set("minute", 0)
    .set('year', 2023)
    .format("ddd, MMM DD, YYYY @ hh:mm A"),
  phone: "",
  done: false,
  id: random(6),
  employer: 0,
  type: PermitType.Residential,
  zone: Zone.R1,
  parkingLot: ParkingLot.Lot1,
};

const Form = ({ admin, header, onSubmit, link, partial, length, defaultValues, rootPermitId }: {
  admin: boolean,
   header?: any,
    onSubmit?: any,
     link?: string, 
     partial?: any, 
     length?: any,
     defaultValues?: any
     rootPermitId?: any;
}) => {
  const [user, setUser] = useState<any>(defaultValue);
  const submit = (values: any) => {
    setUser(values);
    onSubmit && onSubmit(values);
  };
  const reset = () => setUser(defaultValue);
  return user.done ? (
    <Message reset={reset} user={user} admin={admin} />
  ) : (
    <FormComp defaultValues={defaultValues} rootPermitId={rootPermitId} submit={submit} admin={admin} header={header} dontAdd={!!onSubmit} link={link} partial={partial} length={length}/>
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
              : "Fri, Dec 11, 2021 at 5:00 PM"}
            .
          </b>
        </Text>
      ) : (
        <Text>
          Confirmation details have been sent to ({user.email || user.phone}).
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
  | "firstName"
  | "lastName"
  | "liscensePlate"
  | "email"
  | "starts"
  | "ends"
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

const FormComp = ({ submit, admin, header , dontAdd, link, partial, length = [], defaultValues, rootPermitId}: any) => {
  const dispatch = useDispatch();
  const { clients } = useSelector((state: any) => state.clients);
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
      if(!dontAdd){
        if(rootPermitId){
          dispatch(addResidence(values, rootPermitId, values.type));
        } else {
          dispatch(addPermit(values));
        }
       
      }

      const info =  {
        id: values._id?.substring(values?._id?.length -5)?.toUpperCase()  || random(5),
        isCompleting: values.firstName? true: false,
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        licensePlate: values.liscensePlate,
        phone: values.phone,
        starts: values.starts,
        ends: values.ends,
        type: values.type,
        department: clients[0]?.vaccine,
        location: clients[0]?.name,
        link: partial? link + `/sub-${values.type === 'Residential'? 'resident': 'visitor'}/${values.type === 'Residential'? length[0]: length[1]}` : (link || window.location.href)
      }

      if(values.email){
        api
        .customEmail (values.email, info)
        .catch((e) => console.log(e))
      }

      if(values.phone){
        api
        .customSms(values.phone, info)
        .catch((e) => console.log(e))
      }


   
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
  const error = 
  admin? (!values.email &&  !values.phone):
  vehicleFields.reduce(
    (acc: boolean, { id }: any) =>
      acc || Boolean(errors[id as Values]) || !values[id as Values],
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
          
        {admin? 
        <>
        <div style={{ paddingTop: ".5em" }}>
            <Text textAlign="left" color={primaryColor} bold>
              Email
            </Text>

            <Input
                    style={{ minWidth: "20vw", background: "transparent" }}
                    name={'email'}
                    value={values.email}
                    onChange={handleChange}
                    placeholder={"Enter the Email"}
                  />
          </div>


          <div style={{ paddingTop: ".5em" }}>
            <Text textAlign="left" color={primaryColor} bold>
              Phone #
            </Text>

            <Input
                    style={{ minWidth: "20vw", background: "transparent" }}
                    name={'phone'}
                    value={values.phone}
                    onChange={handleChange}
                    placeholder={"Enter the Phone Number"}
                  />
          </div>
        </>
        :
        <>
        <div style={{ paddingTop: ".5em" }}>
            <Text textAlign="left" color={primaryColor} bold>
              Permit Type
            </Text>

            <Select
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
              style={{ width: "100%" }}
              value={values.employer}
              disabled={id !== undefined}
              onChange={(e) => setFieldValue("employer", e)}
            >
              {clients.map((v: Client, i: number) => (
                <Select.Option value={i}>{v.name}</Select.Option>
              ))}
            </Select>
          </div>
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
                {id === "starts" || id === "ends" ? (
                  <DatePicker
                    format="ddd, MMM, DD, YYYY, hh:mm a"
                    showTime={{ format: "hh:mm A" }}
                    minuteStep={15}
            
                    style={{ minWidth: "20vw", background: "transparent" }}
                    onChange={(e) =>
                      setFieldValue(
                        id,
                        e?.format("ddd, MMM DD, YYYY @ hh:mm A")
                      )
                    }
                    value={moment(values[id])}
                  />
                ) : (
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
              City
            </Text>

            <Select
              style={{ width: "100%" }}
              defaultValue={defaultLocation}
              disabled={id !== undefined}
              onChange={(e) => setFieldValue("zone", e)}
            >
              <Select.Option value={defaultLocation}>
                {defaultLocation}
              </Select.Option>
            </Select>
          </div>

      
          <div style={{ paddingTop: ".5em" }}>
            <Text textAlign="left" color={primaryColor} bold>
              Zone
            </Text>

            <Select
              style={{ width: "100%" }}
              value={values.zone}
              disabled={id !== undefined}
              onChange={(e) => setFieldValue("zone", e)}
            >
              {Object.values(Zone).map((v) => (
                <Select.Option value={v}>{v}</Select.Option>
              ))}
            </Select>
          </div>
          </>}
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
