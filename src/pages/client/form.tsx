import React, { useState } from "react";
import { Grid, Text, Header, Button } from "platyplex_ui";
import { useFormik } from "formik";
import { Input, DatePicker } from "antd";
import { gradient, primaryColor } from "../../config";
import { moment } from "../../utils/time";
const defaultValue = {
  firstName: "",
  lastName: "",
  dob: undefined,
  licensePlate: "",
  email: "",
  startDate: undefined,
  endDate: undefined,
  done: false,
  id: "2NE345678",
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

export const Message = ({ reset, user, admin , style, confirm , generate }: any) => {
  return (
    <Grid placeSelf="center" gridGap="2em" style={style}>
      <i
        className="fas fa-check-circle"
        style={{ color: primaryColor, fontSize: "6em" }}
      />
      <Header bold>E-permit reservation successful!</Header>
      <Text>
        Your E-permit Reservation ID: <b>{user?.id || '2NE3605'}</b>
      </Text>
      {!admin ? (
        <>
          <Text>
            Your E-permit reservation ends <b>{user?.endDate? moment(user.endDate).format(`ddd, MMM DD, YYYY @ hh:mm A`) : 'Fri, Dec 11, 2020 @ 5:00 PM'}.</b>
          </Text>
          <Text>Confirmation details have been sent to your email.</Text>
        </>
      ) : (
        generate?
        <Text>This E-Permit Expires: <b>{user?.endDate? moment(user.endDate).format(`ddd, MMM DD, YYYY @ hh:mm A`) : 'Fri, Dec 11, 2020 at 5:00 PM'}.</b></Text>:
        <Text>Confirmation details have been sent to patients email.</Text>
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
        onClick={confirm? confirm : reset}
      >
        Great
      </Button.Normal>
    </Grid>
  );
};
type Values =
  | "firstName"
  | "lastName"
  | "dob"
  | "licensePlate"
  | "email"
  | "startDate"
  | "endDate";

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
    id: "licensePlate",
    label: "Your Vehicle License Plate #",
    placeholder: "Ex: 293DEF",
  },

  {
    id: "startDate",
    label: "E-Permit Start Date & Time",
  },
  {
    id: "endDate",
    label: "E-Permit End Date & Time",
  },
] as any;

const FormComp = ({ submit, admin }: any) => {
  const {
    handleSubmit,
    handleChange,
    errors,
    values,
    setFieldValue,
  } = useFormik({
    initialValues: defaultValue,
    async onSubmit(values) {
      submit({ ...values, done: true });
    },
  });

  const error = vehicleFields.reduce(
    (acc: boolean, { id }: any) => acc || Boolean(errors[id as Values]),
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
              Please enter your information below to reserve your parking
              E-permit.
            </Text>
          </>
        ) : (
          <Text textAlign="left">
            Please enter patient information below to generate parking E-permit.
          </Text>
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
                {id === "startDate" || id === "endDate" ? (
                  admin ? (
                    <Text textAlign="left" color={primaryColor} bold>
                      {label}
                    </Text>
                  ) : null
                ) : 
                id === 'licensePlate' && admin?
                <Text textAlign="left" color={primaryColor} bold>
                Patient Vehicle License Plate #
              </Text>:
                
                (
                  <Text textAlign="left" color={primaryColor} bold>
                    {label}
                  </Text>
                )}
                {id === "startDate" || id === "endDate" ? (
                  admin === true ? (
                    <DatePicker
                      format="ddd, MMM, DD, YYYY, hh:mm a"
                      showTime={{ format: "hh:mm A" }}
                      style={{ minWidth: "20vw", background: "transparent" }}
                      onChange={(e) => setFieldValue(id, e?.toISOString())}
                      defaultValue={
                        id === "startDate" ? moment() : moment().add("hour", 2)
                      }
                    />
                  ) : null
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
        </Grid>
      </form>
    </Grid>
  );
};
export default Form;
