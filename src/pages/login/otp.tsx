import React, { useEffect, useState } from "react";
import { Grid, Notification } from "platyplex_ui";
import ReactCodeInput from "react-verification-code-input";

const Otp = ({ authenticate }: { authenticate: () => void }) => {
  const [otp, setOtp] = useState("");
  useEffect(() => {
    if (otp === "6194") {
      authenticate();
    } else if (otp.length === 4) {
      Notification.error({ title: "Error", message: "Wrong Code!" });
    }
  }, [otp]);
  return (
    <Grid>
      <Grid style={{ width: "100%" }} gridGap="2em">
        <ReactCodeInput
          values={otp.split("")}
          onChange={(e) => setOtp(e.trim())}
          fields={4}
        />

        {/* <Grid cols="1" placeItems="center" width="100%">
            <Button
              bg={gradient}
              noHover
              padding=".5em 1.5em"
              rounded
              onClick={() => {         
              }}
            >
              Submit
            </Button>
          </Grid> */}
      </Grid>
    </Grid>
  );
};

export default Otp;
