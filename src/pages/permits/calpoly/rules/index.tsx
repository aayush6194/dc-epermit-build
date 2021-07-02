import React, { useState } from "react";
import {
  Grid,
  Button,
  Card,
  Text,
  Notification,
  List,
  Placeholder,
} from "platyplex_ui";
import Collapse from "../../../../components/collapse";
import {
  InputNumber,
  Switch as SwitchAtnd,
  Select,
  Popconfirm,
  Input,
  DatePicker,
} from "antd";
import Bar from "../../../../components/bar";
import { useDispatch, useSelector } from "react-redux";
import { Client, ParkingLot, Zone } from "../../../../store/reducer/clients";
import {
  addClient,
  editClient,
  removeClient,
} from "../../../../store/actions/clients";
import { useFormik } from "formik";
import { NavLink } from "react-router-dom";

const Rules = () => {
  const { clients, loading } = useSelector((state: any) => state.clients);
  const [add, setAdd] = useState(false);

  const client: Client = {
    id: "",
    name: "",
    open: false,
    parkingSpace: 100,
    overbooking: true,
    communication: true,
    employee: 10,
    parkingLot: [],
    handicap: 10,
    zone: [],
    employeeFee : 45,
    handicapFee: 45,
    residenceFee: 45
  };

  return (
    <>
      <Grid customCols="1fr auto" placeItems="stretch">
        <Text bold textAlign="left" style={{ marginLeft: "1em" }}>
          Set/edit your Site E-permit rules below
        </Text>
        {!add && (
          <Button rounded placeSelf="end" onClick={() => setAdd(true)}>
            Add
          </Button>
        )}
      </Grid>

      {add && (
        <Card>
          <ClientForm add client={client} cancelAdd={() => setAdd(false)} />
        </Card>
      )}
      <Card grid placeItems="stretch">
        <List
          list={clients}
          loading={loading}
          loader={
            <>
              <Placeholder />
              <Placeholder />
            </>
          }
          map={(client: Client, i: number) => (
            <React.Fragment key={i}>
              <Collapse
                heading={
                  <span>
                    {client.name} &nbsp;
                    <NavLink target="_blank" to={`/`}>
                      <i className="fa fa-link" />
                    </NavLink>
                  </span>
                }
                collapse={!client.open || i === 0}
                pad="1em"
              >
                <ClientForm client={client} />
              </Collapse>
              <Bar />
            </React.Fragment>
          )}
        />
      </Card>
    </>
  );
};

const ClientForm = ({
  client,
  cancelAdd,
  add,
}: {
  client: Client;
  cancelAdd?: () => void;
  add?: boolean;
}) => {
  const dispatch = useDispatch();

  const { handleSubmit, handleChange, values, setFieldValue } = useFormik({
    initialValues: client,
    async onSubmit(values) {
      dispatch(add ? addClient(values) : editClient(values));
      if (add && cancelAdd) {
        cancelAdd();
      }
      Notification.success({
        title: "Success",
        message: "Changes Saved",
      });
    },
  });

  const error = !values.name;
  return (
    <form onChange={handleChange}>
      <Grid customCols="auto auto auto" placeSelf="stretch" placeItems="start">
        <Grid customCols="auto auto">
          Address
          <Input name={"name"} onChange={handleChange} value={values.name} />
        </Grid>

        <div>
          Zone &nbsp;
          <Select
           mode="multiple"
            value={values.zone}
            style={{minWidth: 100}}
            onChange={(e) => setFieldValue("zone", e)}
          >
            {Object.keys(Zone).map((v) => (
              <Select.Option value={v}>{v}</Select.Option>
            ))}
          </Select>
        </div>

        <div>
        Council Member &nbsp;
          <Select
           mode="multiple"
            value={values.parkingLot}
            style={{minWidth: 100}}
            onChange={(e) => setFieldValue("parkingLot", e)}
          >
            {Object.keys(ParkingLot).map((v) => (
              <Select.Option value={v}>{v}</Select.Option>
            ))}
          </Select>
        </div>

        
        <div>
          # of Parking Spaces &nbsp;{" "}
          <InputNumber
            value={values.parkingSpace}
            onChange={(e) => setFieldValue("parkingSpace", e)}
          />
        </div>

        <div>
          # of Employee Spaces &nbsp;{" "}
          <InputNumber
            value={values.employee}
            onChange={(e) => setFieldValue("employee", e)}
          />
        </div>

        <div>
          # of Handicap Spaces &nbsp;{" "}
          <InputNumber
            value={values.handicap}
            onChange={(e) => setFieldValue("handicap", e)}
          />
        </div>

       


        <div>
          Overstaying Allowed &nbsp;{" "}
          <SwitchAtnd
            checked={values.overbooking}
            onChange={(e: boolean) => setFieldValue("overbooking", e)}
          />
        </div>

        <div>
          Navigation Allowed &nbsp; <SwitchAtnd defaultChecked />
        </div>

        <div>
          Communication with employee allowed &nbsp;{" "}
          <SwitchAtnd
            checked={values.communication}
            onChange={(e: boolean) => setFieldValue("communication", e)}
          />
        </div>

        <div>
          Employee Permit Monthly Fee &nbsp;
          $<InputNumber
            value={values.employeeFee}
            onChange={(e) => setFieldValue("employeeFee", e)}
          />
        </div>

        <div>
          Handicap Permit Monthly Fee &nbsp;
          $<InputNumber
            value={values.handicapFee}
            onChange={(e) => setFieldValue("handicapFee", e)}
          />
        </div>

        <div>
        Visitor Permit Monthly Fee &nbsp;
          $<InputNumber
            value={values.residenceFee}
            onChange={(e) => setFieldValue("residenceFee", e)}
          />
        </div>

        <div>
        Number of  visitor extension&nbsp;
          <InputNumber
            defaultValue={2}
          />
        </div>
              <span/>
              <span/>
        <Grid customCols="auto auto">
          {cancelAdd ? (
            <Button rounded bg="red" onClick={cancelAdd}>
              Cancel
            </Button>
          ) : (
            <Popconfirm
              title={`Are you sure you want to delete ${client.name}?`}
              onConfirm={() => dispatch(removeClient(client))}
            >
              <Button rounded bg="red">
                Remove
              </Button>
            </Popconfirm>
          )}
          <Button disabled={error} rounded onClick={handleSubmit}>
            Save
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default Rules;
