import React, { useState } from "react";
import { Grid, Modal, Switch, Card, Button, Text } from "platyplex_ui";
import { gradient, primaryColor, primaryTxtColor } from "../../../../config";
import { Table, Input, Select, Progress, TimePicker, Popover, Popconfirm } from "antd";
import { Message } from "../../../client/form";
import { moment } from "../../../../utils/time";
import { Client } from "../../../../store/reducer/clients";
import { useDispatch, useSelector } from "react-redux";
import { Permit, PermitType, RootPermit } from "../../../../store/reducer/permit";
import { removePermit } from "../../../../store/actions/permits";
import { useParams } from "react-router";
import { permitColumns } from "../../../permits/history";

enum HistoryState {
  ACTIVE = "ACTIVE",
  UPCOMING = "UPCOMING",
  EXPIRED = "EXPIRED",
  CANCELLED = "CANCELED",
}

const History = ({ permit }: { permit?: RootPermit }) => {
  let { id } = useParams<{id: any}>();
  const [state, setter] = useState({
    type: HistoryState.ACTIVE,
    checked: false,
  });
  const { clients } = useSelector((state: any) => state.clients);
  const { permits, loading } = useSelector((state: any) => state.permits);
  const setState = (props: any) => setter({ ...state, ...props });
  const checked = () => setState({ checked: true });
  const dispatch = useDispatch();
  const openPermit = async (permit: any, checked: any) => {
    const modal = Modal({
      title: "",
      modal: (
        <Modall 
          permit={permit} 
          second_vaccine={7}
          checked={checked} 
          close={() => modal.close()} 
        />
      ),
      hideCancel: true,
    });
    modal.open();
  };

  return (
    <>
      <Switch
        style={{ padding: 0 }}
        onClick={(type: any) => setState({ type })}
        color={primaryTxtColor}
        border={"2px solid " + primaryColor}
        items={Object.keys(HistoryState)}
        active={state.type}
      />
      <br />
      { (
        <Table
          bordered
          style={{ maxWidth: '100%', overflowX: 'scroll'}}
          pagination={{ pageSize: 25 }}
          loading={loading}
          dataSource={[
            permit,
            ...permit.residential,
            ...permit.visitor
          ]}
          columns={
            permitColumns((e: any) => openPermit(e, checked), clients, (p: RootPermit)=> dispatch(removePermit(p)), id)}
        />
      )}
    </>
  );
};

const Modall = ({ close, checked, permit, second_vaccine }: any) => {
  const [done, setDone] = useState(false);
  const nextState = () => setDone(true);
  second_vaccine = Number(second_vaccine) || 7;

  return (
    <Grid height="100%" width="100%">
      <Card
        shadow
        grid
        placeItems="stretch"
        style={{ minWidth: "40vw", maxWidth: "95vw" }}
        customCols="auto 1fr"
        mobileLayout={false}
      >
        <i
          onClick={close}
          className="fa fa-times-circle txt-md pointer hoverr"
          style={{
            gridRow: done ? "span 1" : "span 7",
            padding: ".25em",
            placeSelf: "start",
            color: primaryColor,
          }}
        />
        {done ? (
          <Message
            generate
            user={{
              id: "CBL61W21",
              endDate: moment(permit.starts).add("days", second_vaccine).toISOString(),
            }}
            admin
            style={{ gridGap: "1em" }}
            confirm={() => {
            //  checked();
              close();
            }}
          />
        ) : (
          <>
            <Text bold style={{ marginTop: "1.5em" }}>
             E-Permit Extension
            </Text>
            <Text textAlign="left">
              E-Permit ID: <b>{permit._id?.substring(0,5)}</b>
            </Text>
            <Text textAlign="left">
              Next Date:{" "}
              <b>
                {moment(permit.starts)
                  .add("days", second_vaccine)
                  .format("ddd, MMM, DD, YYYY")}
              </b>
            </Text>
            <Text textAlign="left" color={primaryColor}>
              Select Time
            </Text>
            <TimePicker format="hh:mm a" minuteStep={15} />
            <Button.Normal
              style={{
                borderRadius: "1.3em",
                padding: ".5em",
                marginTop: "1em",
                backgroundImage: `${gradient}`,
                color: "white",
                border: 0,
                placeSelf: "start",
                minWidth: "15vw",
              }}
              onClick={() => {
                nextState();
              }}
              type="submit"
            >
              Schedule
            </Button.Normal>
          </>
        )}
      </Card>
    </Grid>
  );
};


export default History;
