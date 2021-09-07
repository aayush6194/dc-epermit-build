import React, { useState } from "react";
import Layout from "../../layout";
import { Button, Card, Grid, Text } from "platyplex_ui";
import img from "../../assets/UCDavisHealth-color.png";
import Form from "./form";
import { gradient, primaryColor } from "../../config";
import { Checkbox, Input, Progress, Radio } from "antd";

const Signup = () => { 
const [step, setStep] = useState(0);


const componentProps = {
  next: () => setStep(step + 1),
  back: () => setStep(step - 1),
};

const Steps = [
  <Start {...componentProps} />,
  <BasicInfo {...componentProps} />]
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
            paddingTop: '1em',
            height:  "calc(99vh - 7em)",
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
          marginTop: "1em",
          border: 0,
          placeSelf: 'center start',
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


const Start= (props: ComponentProps) => {

  return (
    <Wrapper
      hideBack
      back={() => window.close()}
      next={props.next}
      disabledNext={false}
    >
      <Card
        shadow={true}
        grid
        placeItems="stretch"
        className="noselect slide-up"
        margin={0}
        gridGap={'1.25em'}
      > 
        <Text textAlign='left' bold> Hi Emma!</Text>
        <Text textAlign='left'>Welcome to City of Mountain View SAFE Parking Program Application</Text>
        <Text textAlign='left'>Please read the Program Rules <a style={{textDecoration: 'underline'}}>here</a>.</Text>
        <Text textAlign='left'>Please read the Eligibility Requirements <a style={{textDecoration: 'underline'}}>here</a>.</Text>
      </Card>
    </Wrapper>
  );
};

const BasicInfo = (props: ComponentProps) => {

  return (
    <Wrapper
      back={() => window.close()}
      next={props.next}
      disabledNext={false}
    >
      <Card
        shadow={true}
        grid
        placeItems="stretch"
        className="noselect slide-up"
        margin={0}
        gridGap={'2em'}
      > 
       <div style={{width: '50%', margin: 'auto'}}> 
       <Progress percent={10} showInfo={false} strokeColor={primaryColor}/>
       </div>
        <Text bold size='1.25em'>Basic Infomation </Text>
      
      
        <Text textAlign="left">Please check below any of the criterias that you meet: </Text>
        <Grid customCols='auto 1fr' placeItems='stretch'>
          <Checkbox defaultChecked /> 
          <Text textAlign='left'>You have previously lived/worked in Moutain View</Text>

          <Checkbox defaultChecked /> 
          <Text textAlign='left'>You have a children who study in Moutain View</Text>

          <Checkbox  /> 
          <Text textAlign='left'>You are  a senior</Text>

          <Checkbox  /> 
          <Text textAlign='left'>You have a disability</Text>

        </Grid>
   
        <Grid customCols='1fr 1fr 1fr'>
        {fields.map((e)=>{
          return(
            <div key={e.key}>
            <Text textAlign='left' bold color={primaryColor}>{e.label}</Text>
            <Input defaultValue={e.value}/>
            </div>
          )
        })}
        </Grid>
      </Card>
    </Wrapper>
  );
};

const fields =[
  { 
    label: 'Your First Name',
    key: 'name',
    placeholder: "Enter your First name",
    value: 'Emma'
  },
  { 
    label: 'Your Last Name',
    key: 'name',
    placeholder: "Enter your Last name",
    value: 'Watson'
  },

 { label: 'DOB',
  key: 'name',
  placeholder: "Enter your Last name",
  value: '03/04/1974'
},
{ label: 'Email Address',
  key: 'name',
  placeholder: "Enter your Last name",
  value: 'emmma.watson@gmail.com'
},
{ label: 'Phone',
  key: 'name',
  placeholder: "Enter your Last name",
  value: '(408) 450-9879'
},
{ label: 'SSN Last 4',
  key: 'name',
  placeholder: "Enter your Last name",
  value: '1234'
}
]
export default Signup;
