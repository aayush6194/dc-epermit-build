import React, { useEffect, useState } from "react";
import { Grid, Text, Header, Button, Switch} from "platyplex_ui";
import { useFormik } from "formik";
import { Input,  Checkbox, Table } from "antd";
import { gradient, primaryColor } from "../../../config";
import { moment } from "../../../utils/time";
import { useDispatch, useSelector } from "react-redux";
import api from "../../../api";
import { ParkingLot, Zone } from "../../../store/actions/clients";
import { PermitType } from "../../../store/reducer/permit";
import { useParams } from "react-router";
import { addNotification } from "../../../store/actions/notifications";

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

const TowNotification = ({ admin, header, onSubmit }: any) => {
  const [user, setUser] = useState<any>(defaultValue);
  const submit = (values: any) => {
    setUser(values);
    onSubmit && onSubmit(values);
  };
  const reset = () => setUser(defaultValue);
  return user.done ? (
    <Message reset={reset} user={user} admin={admin} />
  ) : (
    <FormComp submit={submit} admin={admin} header={header} dontAdd={!!onSubmit} />
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
      <Header bold>Tow Notification Created!</Header>

        <Text>
          Confirmation details have been sent to email ({user.email}).
        </Text>

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
    id: "liscensePlate",
    label: "Your Vehicle License Plate #",
    placeholder: "Ex: 293DEF",
  },
] as any;

const FormComp = ({ submit, admin }: any) => {
  const dispatch = useDispatch();
  const { clients } = useSelector((state: any) => state.clients);
  let { id } = useParams() as any;
  const {
    handleSubmit,
    handleChange,
    errors,
    values,
    setFieldValue,
  } = useFormik({
    initialValues: defaultValue,
    async onSubmit(values) {
      dispatch(addNotification({
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          liscensePlate: values.liscensePlate,
          phone: values.phone,
      }));

      
      api
        .sendTowEmail({
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          licensePlate: values.liscensePlate,
          phone: values.phone,
          vaccine: clients[0]?.vaccine,
          date: moment(values.starts).toISOString(),
          location: clients[0]?.name,
          space: 1,
        })
        .catch((e) => console.log(e));
      submit({ ...values, done: true });
    },
  });

  useEffect(() => {
    if (id) {
      const index = Number(id) - 1;
      setFieldValue("employer", clients[index]?.name || "10412 TULSA DRIVE");
    }
  }, []);

  const patients = clients[0]?.parkingSpace || 10;
  const error = vehicleFields.reduce(
    (acc: boolean, { id }: any) =>
      acc || Boolean(errors[id as Values]) || !values[id as Values],
    false
  );
  return (
    <Grid placeSelf="center" placeItems="start center" gridGap="1.5em">
      <Grid placeItems="stretch" placeSelf="stretch">
        {(
          <>
            <Text textAlign="left">
              Please enter the client information below to a create tow notification.
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
                { (
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

          <Text style={{ gridColumn: 'span 2' }}>             
           <Checkbox defaultChecked /> I agree to receive notification if my vehicle is subjected to be towed due to illegal parking
           </Text>

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
              Create Notification
            </Button.Normal>
          </div>
        </Grid>
      </form>
    </Grid>
  );
}


export default TowNotification;
