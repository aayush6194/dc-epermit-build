import React from "react";
import Layout from "../layout";
import { Grid, Card, Text } from "platyplex_ui";
import { primaryColor } from "../config";
import user from "../assets/user.svg";
import permitt from "../assets/permit.svg";
import { Permit, RootPermit } from "../store/reducer/permit";
import Form from "./client/form";
const SubVisitor = ({
  permit,
  rootPermit,
  name
}: {
  permit: Permit | RootPermit;
  rootPermit: RootPermit
  name?: string;
}) => {
  return (
    <Layout style={{ gridTemplateRows: "1fr auto" }} avatarImg={user}>
      <Layout.Top noBackground>
          <span/>
      </Layout.Top>
      <Layout.Bottom>
        <Grid
          placeItems="start stretch"
          padding="1em"
          height="100%"
          gridGap=".5em"
          style={{
            width: 1400,
            maxWidth: "100vw",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <Card grid placeItems="end start">
            <Text bold size={"1.2em"} className='capitalize'>
              Hello, {name || permit.firstName}!
            </Text>
          </Card>
         
          <PermitCard permit={permit} rootPermit={rootPermit}/>
        </Grid>
      </Layout.Bottom>
    </Layout>
  );
};

export const PermitCard = ({
  permit,
  rootPermit,
}: {
  permit: Permit | RootPermit;
  rootPermit: RootPermit
})=>{
  return  !permit.firstName?
  <Form admin={false} defaultValues={permit} rootPermitId={permit._id === rootPermit._id? undefined: rootPermit._id}/>:
  
  <Card grid>
  <div style={{maxWidth: '90vw', width: 700}}>
    <Text bold  textAlign="right" color={primaryColor}>
      ({Math.abs(3 - rootPermit.residential.length)}/3) Residents Permit Remaining
    </Text>
    <Text bold  textAlign="right" color={primaryColor}>
      ({Math.abs(2 - rootPermit.visitor.length)}/2) Visitors Remaining
    </Text>
  <Card grid shadow customCols='200px 1fr' placeItems='stretch' gridGap='.5em 2em'>
  <Text bold  textAlign="left" style={{ gridColumn: '1/-1'}}>
    Epermit ID:  {permit._id?.substring(0,5) || '4GH68943'}
    </Text>
    <img
      src={permitt}
      alt="Mail"
      style={{ width: 200, margin: "auto" , gridRow: 'span 6'}}
    />
  
    <Text bold textAlign="left" color={primaryColor}>
     Type :  {permit.type} 
    </Text>
    <Text bold textAlign="left">
    Full Name:  {permit.firstName} {permit.lastName}
    </Text>

    <Text bold  textAlign="left">
    Email Address:  {permit.email}
    </Text>

    <Text bold  textAlign="left">
    Phone #:  {permit.phone}
    </Text>

    <Text bold textAlign="left">
    Vehicle License Plate #:  {permit.liscensePlate} 
    </Text>


    <Text bold  textAlign="left" color={'red'}>
    Epermit Expiry Date :  {permit.ends} 
    </Text>
  </Card>
  </div>
</Card>
}

export default SubVisitor;
