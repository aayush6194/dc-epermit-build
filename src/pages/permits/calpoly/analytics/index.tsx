import React from "react";
import { Grid, Button, Card, Header, Notification, Text } from "platyplex_ui";
import { Tooltip } from "antd";
import { disabledTxtColor, primaryColor } from "../../../../config";
import { useSelector } from "react-redux";
import { Client } from "../../../../store/reducer/clients";

const Analytics = () => {
  const { clients } = useSelector((state: any) => state.clients);
  return (
    <>
      {clients.map(({ name, starts, ends, location, parkingSpace, permits, vips }: Client) => (
        <Card>
          <Header bold margin="0 0 1em 0">
            <Grid customCols="3em 1fr 3em" placeItems="center stretch">
              <span />
              {name}
              <Tooltip title="Download the current data on excel">
                <Button
                  faIcon="fa fa-download"
                  style={{ float: "right", fontSize: ".7em" }}
                  rounded
                  minWidth="4.5em"
                  onClick={() =>
                    Notification.success({
                      title: "Success",
                      message: "File Downloaded",
                    })
                  }
                />
              </Tooltip>
            </Grid>
          </Header>
          <Text>
            {starts} - {ends}
          </Text>
          <Text style={{ fontStyle: "italic" }}>{location}</Text>

          <Grid placeItems='stretch' cols='3' margin='1.5em 0'>
            <div style={{borderRight: '2px solid '+ disabledTxtColor}}>
              <Text># of Parking Spaces Assigned</Text>
              <Text size='2.25em' color={primaryColor} bold>{parkingSpace}</Text>
            </div>
                  
            <div style={{borderRight: '2px solid '+ disabledTxtColor}}>
              <Text>Total # of E-Permits Issued</Text>
              <Text size='2.25em' color={primaryColor} bold>{permits}</Text>
            </div>

            <div>
              <Text># of VIP</Text>
              <Text size='2.25em' color={primaryColor} bold>{vips}</Text>
            </div>
          </Grid>
        </Card>
      ))}
    </>
  );
};

export default Analytics;
