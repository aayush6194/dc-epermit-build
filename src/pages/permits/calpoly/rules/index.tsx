import React, { useState } from "react";
import { Grid, Button, Card, Text, Notification, List, Placeholder } from "platyplex_ui";
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
import { Client } from "../../../../store/reducer/clients";
import { addClient, editClient, removeClient } from "../../../../store/actions/clients";
import { useFormik } from "formik";
import { NavLink } from "react-router-dom";
import { moment } from '../../../../utils/time';

const Rules = () => {
  const { clients, loading } = useSelector((state: any) => state.clients);
  const [ add, setAdd ] = useState(false);
  const client = {
  id: "",
  name: "",
  open: false,
  parkingSpace: 0,
  overbooking: true,
  permits: 0, 
  vips: 0,
  duration: 1,
  location: 'Parking Lot 1',
  starts: 'Mon, Jan 25, 2021',
  ends: 'Thu, Jun 10, 2021',
  extension: 1};

  return (
    <>
    <Grid customCols='1fr auto' placeItems='stretch'>
      <Text bold textAlign="left" style={{ marginLeft: "1em" }}>
        Set/edit your department E-permit rules below
      </Text>
      {!add && <Button rounded placeSelf='end' onClick={()=>setAdd(true)}>Add</Button>}
    </Grid>

      {add && <Card><ClientForm add client={client} cancelAdd={()=>setAdd(false)} /></Card>}
      <Card grid placeItems="stretch">
        <List 
        list={clients}
        loading={loading}
        loader={<>
        <Placeholder />
        <Placeholder />       
        </>}
          map={(client: Client, i : number) => (
            <React.Fragment key={i}>
              <Collapse
                heading={
                  <span>
                    {client.name} &nbsp;
                    <NavLink
                      target="_blank"
                      to={`/`}
                    >
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

const ClientForm = ({ client, cancelAdd, add }: { client: Client , cancelAdd? : ()=> void, add? : boolean}) => {
  const dispatch = useDispatch();
  const { handleSubmit, handleChange, values, setFieldValue } = useFormik({
    initialValues: client,
    async onSubmit(values) {
      dispatch(add? addClient(values): editClient(values));
      if(add && cancelAdd){
        cancelAdd()
      }
      Notification.success({
        title: "Success",
        message: "Changes Saved",
      });
    },
  });
  const format = 'ddd, MMM DD, YYYY';
  const error = !values.name;
  return (
    <form onChange={handleChange}>
      <Grid customCols="auto auto auto" placeSelf="stretch" placeItems="start">
        <Grid customCols="auto auto">
          Client Name
          <Input name={"name"} onChange={handleChange} value={values.name} />
        </Grid>
        <div>
          # of Parking Spaces &nbsp;{" "}
          <InputNumber
            value={values.parkingSpace}
            onChange={(e) => setFieldValue("parkingSpace", e)}
          />
        </div>

        <div>
          # of Extensions Allowed &nbsp;{" "}
          <InputNumber
            value={values.extension}
            onChange={(e) => setFieldValue("extension", e)}
          />
        </div>

        <div>
          Default E-Permit Duration &nbsp;{" "}
          <Select
            value={values.duration}
            style={{ minWidth: 150 }}
            onChange={(e) => setFieldValue("duration", e)}
          >
            <Select.Option value={0.5}>30 mins</Select.Option>
            <Select.Option value={1}>1hr</Select.Option>
            <Select.Option value={1.5}>1hr 30 mins</Select.Option>
            <Select.Option value={2}>2hr</Select.Option>
            <Select.Option value={24}>24hr</Select.Option>
          </Select>
        </div>

        <div>
          Overbooking Allowed &nbsp;{" "}
          <SwitchAtnd
            checked={values.overbooking}
            onChange={(e: boolean) => setFieldValue("overbooking", e)}
          />
        </div>

        <div>
          Navigation Allowed &nbsp; <SwitchAtnd defaultChecked />
        </div>

        <div>
          Permit Start Date &nbsp; <DatePicker value={moment(values.starts)}  format={format}  onChange={(e)=>e && setFieldValue('starts', e.format(format))}/>
        </div>

        <div>
          Permit Start Date &nbsp; <DatePicker value={moment(values.ends)} format={format} onChange={(e)=>e && setFieldValue('ends', e.format(format))}/>
        </div>
        
      
        <span/>
        <Grid customCols="auto auto">
          {cancelAdd?
          <Button rounded bg="red" onClick={cancelAdd}>
          Cancel
        </Button>:
          <Popconfirm
            title={`Are you sure you want to delete ${client.name}?`}
            onConfirm={() => dispatch(removeClient(client))}
          >
            <Button rounded bg="red">
              Remove
            </Button>
          </Popconfirm>}
          <Button disabled={error} rounded onClick={handleSubmit}>
            Save
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default Rules;
