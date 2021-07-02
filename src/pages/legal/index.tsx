import React from "react";
import Layout from "../../layout";
import { Grid, Text } from "platyplex_ui";
import { moment } from '../../utils/time'
import ParkstashText from '../../components/parkstash-text';

const Legal = () => {
  
  return (
    <Layout sidebar style={{ gridTemplateRows: "1fr auto" }} hideFooter>
      <Layout.Bottom shiftUp={false}>
        <Grid
          placeItems="start stretch"
          padding="1em"
          height="100%"
          gridGap='.5em'
         
          style={{
            width: 1200,
            maxWidth: "100vw",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
         <Text>Patent Pending</Text>
        
         <Text >
                    © 2018-{moment().year().toString()} <ParkstashText />, All Rights Reserved
        </Text>

        <a href='https://www.findparkstash.com/terms-and-conditions'>Terms and Conditions</a>
         <a href='https://www.findparkstash.com/privacy-policy'>Privacy Policy</a>
        </Grid>
      </Layout.Bottom>
    </Layout>
  );
};

export default Legal;
