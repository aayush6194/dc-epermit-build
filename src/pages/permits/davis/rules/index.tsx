import React from "react";
import { Grid, Button, Card, Text, Notification } from "platyplex_ui";
import Collapse from "../../../../components/collapse";
import { InputNumber, Switch as SwitchAtnd, Select } from "antd";
import Bar from "../../../../components/bar";
const Rules = () => {
  return (
    <>
      <Text bold textAlign="left" style={{ marginLeft: "1em" }}>
        Set/edit your department E-permit rules below
      </Text>
      <Card grid placeItems="stretch">
        {rules.map((rule: any) => (
          <>
            <Collapse heading={rule.name} collapse={!rule.open} pad="1em">
              <Grid
                customCols="auto auto auto"
                placeSelf="stretch"
                placeItems="start"
              >
                <div>
                  # of Parking Spaces &nbsp;{" "}
                  <InputNumber defaultValue={rule.parkingSpace} />
                </div>

                <div>
                  # of Extensions Allowed &nbsp;{" "}
                  <InputNumber defaultValue={rule.extension} />
                </div>

                <div>
                  Default E-Permit Duration &nbsp;{" "}
                  <Select
                    defaultValue={rule.duration}
                    style={{ minWidth: 150 }}
                  >
                    <Select.Option value={0.5}>30 mins</Select.Option>
                    <Select.Option value={1}>1hr</Select.Option>
                    <Select.Option value={1.5}>1hr 30 mins</Select.Option>
                    <Select.Option value={2}>2hr</Select.Option>
                  </Select>
                </div>

                <div>
                  Overbooking Allowed &nbsp;{" "}
                  <SwitchAtnd defaultChecked={rule.overbooking} />
                </div>

                <div>
                  Navigation Allowed &nbsp; <SwitchAtnd defaultChecked />
                </div>
                <span />
                <Button
                  rounded
                  onClick={() =>
                    Notification.success({
                      title: "Success",
                      message: "Changes Saved",
                    })
                  }
                >
                  Save
                </Button>
              </Grid>
            </Collapse>
            <Bar />
          </>
        ))}
      </Card>
    </>
  );
};

const rules = [
  {
    name: "VMTH",
    open: true,
    parkingSpace: 65,
    overbooking: true,
    duration: 1,
    extension: 2,
  },
  {
    name: "UCDH Clinic",
    open: false,
    parkingSpace: 18,
    overbooking: false,
    duration: 2,
    extension: 1,
  },

  {
    name: "Student Health",
    open: false,
    parkingSpace: 19,
    overbooking: false,
    duration: 1.5,
    extension: 2,
  },
  {
    name: "CNL",
    open: false,
    parkingSpace: 6,
    overbooking: false,
    duration: 1,
    extension: 1,
  },

  {
    name: "Nutrition",
    open: false,
    parkingSpace: 2,
    overbooking: false,
    duration: 2.5,
    extension: 4,
  },

  {
    name: "Employee Heath",
    open: false,
    parkingSpace: 3,
    overbooking: false,
    duration: 1,
    extension: 1,
  },

  {
    name: "SDC",
    open: false,
    parkingSpace: 2,
    overbooking: false,
    duration: 1.5,
    extension: 2,
  },
  {
    name: "Psychology",
    open: false,
    parkingSpace: 1,
    overbooking: false,
    duration: 2.5,
    extension: 3,
  },
];

export default Rules;
