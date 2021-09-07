import React, { useRef, useState } from "react";
import Layout from "../../layout";
import { Button, Card, Grid, Text } from "platyplex_ui";
import img from "../../assets/MtnView_Logo.png_4006cf7409645b4b8a805958617cd046.png";
import moveLogo from "../../assets/movemv-logo.png";
import finishLogo from "../../assets/security_512px.png";
import { gradient, primaryColor } from "../../config";
import { Checkbox, DatePicker, Input, Progress, Select } from "antd";
import map from "../../assets/MVMapChoiceImage.png";
import useQuery from "../../hooks/query";
import moment from "moment";
const Signup = () => {
  const { query } = useQuery();
  const [step, setStep] = useState(query?.step || 0);

  const componentProps = {
    next: () => setStep(step + 1),
    back: () => setStep(step - 1),
  };

  const Steps = [
    <Start {...componentProps} />,
   
  
    <BasicInfo {...componentProps} />,
    <AdditionalInfo {...componentProps} />,
    <PreferredParking {...componentProps} />,

    <Review {...componentProps} />,
    <Finish {...componentProps} />,
  ];
  return (
    <Layout sidebar style={{ gridTemplateRows: "1fr auto" }} avatarImg={img}>
      <Layout.Top>
        <span />
      </Layout.Top>
      <Layout.Bottom>
        <Grid
          placeItems="start stretch"
          padding=".5em"
          height="100%"
          style={{
            width: 900,
            paddingTop: "1em",
            height: "calc(99vh - 7em)",
            gridTemplateRows: "1fr auto",
            maxWidth: "100vw",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          {Steps[step]}
        </Grid>
      </Layout.Bottom>
    </Layout>
  );
};
interface WrapperProps {
  children?: JSX.Element | any;
  back: () => void;
  loading?: boolean;
  next: () => void;
  disabledNext?: boolean;
  nextText?: string;
  hideBack?: boolean;
}

interface ComponentProps {
  back: () => void;
  next: () => void;
}

const Wrapper = ({
  nextText,
  children,
  back,
  next,
  disabledNext,
  loading,
  hideBack,
}: WrapperProps) => {
  return (
    <>
      <Grid
        placeItems="start stretch"
        style={{
          overflowY: "auto",
          gridTemplateRows: "3em 1fr",
          height: "100%",
        }}
      >
        {hideBack ? (
          <span />
        ) : (
          <Text
            style={{ placeSelf: "stretch start" }}
            className="bold pointer"
            onClick={back}
          >
            <i className="fa fa-chevron-left" /> &nbsp; Back{" "}
          </Text>
        )}
        {children}
      </Grid>
      <Button
        rounded
        disabled={disabledNext || loading}
        onClick={next}
        noHover
        className="pointer med"
        style={{
          padding: ".5em",
          margin: "1em 0",
          border: 0,
          placeSelf: "center start",
          fontWeight: 600,
        }}
        bg={gradient}
        type="submit"
      >
        {nextText || "Next"}
      </Button>
    </>
  );
};

const Start = (props: ComponentProps) => {
  return (
    <Wrapper
      hideBack
      back={() => window.close()}
      next={props.next}
      nextText="Begin Application"
      disabledNext={false}
    >
      <Card
        shadow={true}
        grid
        placeItems="stretch"
        className="noselect slide-up"
        margin={0}
        style={{ padding: "2em 1.5em 3em 1.5em" }}
        gridGap={"1.25em"}
      >
        <Grid customCols="auto auto" placeSelf="center">
          <img src={img} alt="Mointain View" style={{ height: 130 }} />
          <img src={moveLogo} alt="Mointain View" style={{ height: 150 }} />
        </Grid>
        <Text textAlign="left" bold size="1.25em">
          {" "}
          Hi Emma!
        </Text>
        <Text textAlign="left">
          Welcome to City of Mountain View SAFE Parking Program Application
        </Text>
        <Text textAlign="left">
          Please read the Program Rules{" "}
          <a style={{ textDecoration: "underline" }}>here</a>.
        </Text>
        <Text textAlign="left">
          Please read the Eligibility Requirements{" "}
          <a style={{ textDecoration: "underline" }}>here</a>.
        </Text>
        <Text textAlign="left">
          For more information regarding this program, please visit this{" "}
          <a style={{ textDecoration: "underline" }}>link</a>.
        </Text>
        <Text textAlign="left">
          For any question regarding the application, please contact MOVE
          Mountain View by phone 650-851-0181, email contact@movemv.org or visit{" "}
          <a style={{ textDecoration: "underline" }}>movemv.org</a>.
        </Text>
      </Card>
    </Wrapper>
  );
};



const Finish = (props: ComponentProps) => {
  return (
    <Wrapper
    
      back={() => window.close()}
      next={()=>setTimeout(()=>window.close(), 1000)}
      nextText="Great"
      disabledNext={false}
    >
      <Card
        shadow={true}
        grid
        placeItems="stretch"
        className="noselect slide-up"
        margin={0}
        style={{ padding: "2em 1.5em 3em 1.5em" }}
        gridGap={"1.25em"}
      >

        <img src={finishLogo} style={{ width: 200, margin: 'auto' }} alt='done' />
        <Text bold size="1.25em">
          Your application has been successfully submitted for review.
        </Text>

        <Text bold>
          Application # 34ES3456
        </Text>
        <Text textAlign="left">
          Please store this Application # for your records. You can check status of your application from History section. You will be notified via email/call once a decision has been reached
        </Text>
        <Text textAlign="left">
          For any questions regarding the application, please contact MOVE Mountain View by phone 650-861-0181, email contact@movemv.org or visit
          &nbsp;<a style={{ textDecoration: "underline" }}>movemv.org</a>.
        </Text>
      </Card>
    </Wrapper>
  );
};

const BasicInfo = (props: ComponentProps) => {
  return (
    <Wrapper back={props.back} next={props.next} disabledNext={false}>
       <Card
  shadow={true}
  grid
  placeItems="stretch"
  className="noselect slide-up"
  margin={0}
  gridGap={"2em"}
  style={{ padding: "2em 1.5em 3em 1.5em" }}
>
  <div style={{ width: "50%", margin: "auto" }}>
    <Progress percent={25} showInfo={false} strokeColor={primaryColor} />
  </div>
     <BasicInfoComp/>
    </Card>
    </Wrapper>
  );
};

const BasicInfoComp = ()=>(<>
  <Text bold size="1.25em">
    Basic Infomation{" "}
  </Text>

  <Text textAlign="left">
    Please check below any of the criterias that you meet:{" "}
  </Text>
  <Grid customCols="auto 1fr" placeItems="stretch">
    <Checkbox defaultChecked />
    <Text textAlign="left">
      You have previously lived/worked in Moutain View
    </Text>

    <Checkbox defaultChecked />
    <Text textAlign="left">
      You have a children who study in Moutain View
    </Text>

    <Checkbox />
    <Text textAlign="left">You are a senior</Text>

    <Checkbox />
    <Text textAlign="left">You have a disability</Text>
  </Grid>

  <Grid customCols="1fr 1fr 1fr">
    {fields.map((e) => {
      return (
        <div key={e.key}>
          <Text textAlign="left" bold color={primaryColor}>
            {e.label}
          </Text>
          <Input defaultValue={e.value} />
        </div>
      );
    })}
  </Grid>
</>)

const AdditionalInfo = (props: ComponentProps) => {
  return (
    <Wrapper  back={props.back} next={props.next} disabledNext={false}>
      <Card
  shadow={true}
  grid
  placeItems="stretch"
  className="noselect slide-up"
  margin={0}
  gridGap={"2em"}
  style={{ padding: "2em 1.5em 3em 1.5em" }}
>
  <div style={{ width: "50%", margin: "auto" }}>
    <Progress percent={50} showInfo={false} strokeColor={primaryColor} />
  </div>
 
     <AdditionalInfoComp/>
    </Card>
    </Wrapper>
  );
};

const AdditionalInfoComp = ({ done}: {done?: boolean})=>{
  return  <>
   <Text bold size="1.25em">
    Additional Infomation{" "}
  </Text>
  <Grid customCols="1fr 1fr 1fr" placeItems="start stretch">
    <Grid placeItems="start" gridGap="0em">
      <Text textAlign="left" bold color={primaryColor}>
        Your Vehicle Information
      </Text>
      <Text textAlign="left">
        2010 White Veno V-Series V3815TK
        <br />
        License Plate #2NE360
        <br />
        Class A RV
      </Text>

      <Button
        rounded
        noHover
        className="pointer med"
        style={{
          padding: ".5em",
          margin: "1em 0",
          border: 0,
          placeSelf: "center start",
          fontWeight: 600,
        }}
        bg={gradient}
        type="submit"
      >
        Change/Add Vehicle
      </Button>
    </Grid>

    <Grid placeItems="start" gridGap="0em">
      <Text textAlign="left" bold color={primaryColor}>
        Your Vehicle Registration
      </Text>
      <UploadButton>Upload Vehicle Registration</UploadButton>
      {done && <div>Reg.pdf</div>}
    </Grid>

    <Grid placeItems="start" gridGap="0em">
      <Text textAlign="left" bold color={primaryColor}>
        Your Vehicle Insurance
      </Text>
  
      <UploadButton>Upload Vehicle Insurance</UploadButton>
      {done && <div>Ins.pdf</div>}
    </Grid>

    <Grid placeItems="start" gridGap="0em">
      <Text textAlign="left" bold color={primaryColor}>
        Your Driver's License Information
      </Text>
      <Input defaultValue={"456Y567"} />
      <UploadButton>Upload Front</UploadButton>
      {done && <div>Front_License.pdf</div>}

      <UploadButton>Upload Back</UploadButton>

      {done && <div>Back_License.pdf</div>}
    </Grid>
  </Grid>

  <Grid placeItems="start">
    <Text textAlign="left" bold color={primaryColor}>
      How many people will be living in your vehicle?
    </Text>
    <Text textAlign="left">
      Please note: Only approved registered household members will be
      allowed. Guests are not allowed in vehicles or on property
    </Text>
    <Select defaultValue={done? "2": "Make a selection"} style={{ minWidth: 150 }}>
      {["Just me", "2", "3", "4"].map((e) => (
        <Select.Option value={e}>{e}</Select.Option>
      ))}
    </Select>
  </Grid>

  <Grid placeItems="start stretch">
    <Text textAlign="left" bold color={primaryColor}>
      Add Additional Members
    </Text>
    <Grid customCols="auto auto auto auto">
      <div></div>
    </Grid>
  </Grid>
</>
}

const PreferredParking = (props: ComponentProps) => {
  return (
    
    <Wrapper  back={props.back} next={props.next} disabledNext={false}>
      <Card
  shadow={true}
  grid
  placeItems="stretch"
  className="noselect slide-up"
  margin={0}
  gridGap={"2em"}
  style={{ padding: "2em 1.5em 3em 1.5em" }}
>
  <div style={{ width: "50%", margin: "auto" }}>
    <Progress percent={75} showInfo={false} strokeColor={primaryColor} />
  </div>
     <PreferredParkingComp/>
  </Card>
    </Wrapper>
  );
};

const PreferredParkingComp = ({ done}: {done?: boolean})=>{
  const locations = ["Lord's Grace Christian Church", "Shoreline Amphitheatre Parking Lot B", "1020 Terra Bella Avenue", "Pioneer Way and Evelyn Avenue"]
  return  <>
  <Text bold size="1.25em">
    Preferred Parking Location
  </Text>
  <Text textAlign="left" bold color={primaryColor}>
    Choose from the options below your preferred parking location
  </Text>
  <Grid placeItems="start stretch" customCols='auto 1fr'>
    <Grid placeItems='start'>
      {[1, 2, 3].map((i) => <>
        <Text textAlign='left' bold>Choice {i}</Text>
        <Select defaultValue={done? locations[i]: "Make a selection"} style={{ minWidth: 270 }}>
          {locations.map((e) => (
            <Select.Option value={e}>{e}</Select.Option>
          ))}
        </Select>
        <Text textAlign="left" bold color={primaryColor}>
          See locations details
        </Text>
      </>)}

    </Grid>

    <img src={map} alt='map' style={{maxWidth: '100%'}}/>
  </Grid>
  <Grid customCols='1fr 1fr 1fr'>
    <Grid placeItems='start' placeSelf='start'>
      <Text textAlign='left' bold color={primaryColor}>Preferred Start Date</Text>
      <DatePicker defaultValue={moment('09/07/2021')} format='ddd, MMM DD, YYYY' />
    </Grid>

    <Grid placeItems='start' placeSelf='start'>
      <Text textAlign='left' bold color={primaryColor}>Preferred Start Date</Text>
      <DatePicker defaultValue={moment('10/05/2021')} format='ddd, MMM DD, YYYY' />
    </Grid>

    <span />


    <Grid placeItems='start' placeSelf='start'>
      <Text textAlign='left' bold color={primaryColor}>Your parking schedule</Text>
      <Select defaultValue={done? '24/7': "Make a selection"} style={{ minWidth: 200 }}>
        {['24/7', 'Overnight, 7 Days a week', 'Specific Schedule'].map((e) => (
          <Select.Option value={e}>{e}</Select.Option>
        ))}
      </Select>

    </Grid>
    <Text textAlign='left' bold style={{ gridColumn: '1/-1', width: '100%' }}>Overnight parking is limited from 5PM to 9AM.</Text>
  </Grid>
</>
}


const Review = (props: ComponentProps) => {
  return (
    
    <Wrapper  back={props.back} next={props.next} disabledNext={false}>
      <Card
  shadow={true}
  grid
  placeItems="stretch"
  className="noselect slide-up"
  margin={0}
  gridGap={"2em"}
  style={{ padding: "2em 1.5em 3em 1.5em" }}
>
  <div style={{ width: "50%", margin: "auto" }}>
    <Progress percent={100} showInfo={false} strokeColor={primaryColor} />
  </div>

  <Text bold size="1.25em">
   Review
  </Text>
  <BasicInfoComp/>
  <AdditionalInfoComp done/>
     <PreferredParkingComp done/>
  </Card>
    </Wrapper>
  );
};


const UploadButton = ({ children }: any) => {
  const ref = useRef<any>(null);
  const [file, setFile] = useState();
  return (
    <>
      <input
        type="file"
        style={{ display: "none" }}
        ref={ref}
        onChange={(e: any) => setFile(e?.target?.files[0]?.name)}
      />
      <Button
        rounded
        noHover
        className="pointer med"
        style={{
          padding: ".5em",
          margin: "1em 0",
          border: 0,
          placeSelf: "center start",
          fontWeight: 600,
        }}
        bg={gradient}
        onClick={() => ref?.current?.click()}
        type="submit"
      >
        {children}
      </Button>
      {file && <div>{file}</div>}
    </>
  );
};


const fields = [
  {
    label: "Your First Name",
    key: "name",
    placeholder: "Enter your First name",
    value: "Emma",
  },
  {
    label: "Your Last Name",
    key: "name",
    placeholder: "Enter your Last name",
    value: "Watson",
  },

  {
    label: "DOB",
    key: "name",
    placeholder: "Enter your Last name",
    value: "03/04/1974",
  },
  {
    label: "Email Address",
    key: "name",
    placeholder: "Enter your Last name",
    value: "emmma.watson@gmail.com",
  },
  {
    label: "Phone",
    key: "name",
    placeholder: "Enter your Last name",
    value: "(408) 450-9879",
  },
  {
    label: "SSN Last 4",
    key: "name",
    placeholder: "Enter your Last name",
    value: "1234",
  },
];
export default Signup;
