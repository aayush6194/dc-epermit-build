import React from "react";
import Layout from "../../layout";
import { Grid, Text, Button, Modal } from "platyplex_ui";
import PrimaryModal from "../../components/primary-modal";
import { Input } from "antd";
import useCopy from "../../hooks/copy";
import useConfig from "../../hooks/config";

const Help = () => {
  const {  copy } = useCopy();

  const { config } = useConfig();
  const phone = config?.help?.phone;
  const email = config?.help?.email;


  const TextModal = Modal({
    title: "",
    modal: (
      <PrimaryModal
        cancelText="Cancel"
        onCancel={() => TextModal.close()}
        confirmText='Open app'
        onConfirm={() => {window.location.href = `sms:${phone}`}}
      >
        <Grid gridGap=".25em" padding="1em">
          <Text bold size='1.2em'>Text us at: </Text>
          <Input  
            value={phone} 
            className='pointer' 
            onClick={()=>copy(phone, 'Number Copied')} 
            suffix={<i className='fa fa-clipboard' onClick={()=>copy(phone, 'Number Copied')}/>} 
          />
         
        </Grid>
      </PrimaryModal>
    ),
    hideCancel: true,
  });

  const CallModal = Modal({
    title: "",
    modal: (
      <PrimaryModal
        cancelText="Cancel"
        onCancel={() => CallModal.close()}
        confirmText='Open app'
        onConfirm={() => {window.location.href = `tel:${phone}`}}
      >
        <Grid gridGap=".25em" padding="1em">
          <Text bold size='1.2em'>Call us at: </Text>
          <Input  
            value={phone} 
            className='pointer' 
            onClick={()=>copy(phone, 'Number Copied')} 
            suffix={<i className='fa fa-clipboard'  onClick={()=>copy(phone, 'Number Copied')}/>} 
          />
         
        </Grid>
      </PrimaryModal>
    ),
    hideCancel: true,
  });
  return (
    <Layout sidebar style={{ gridTemplateRows: "1fr auto" }}>
      <Layout.Top>
        <span />
      </Layout.Top>
      <Layout.Bottom>
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
         <Text  color='white'>ParkStash support team is available 24/7 to help with any issues or questions you may have.</Text>
         <Text  color='white'>Contact us via any options below and we will get back to right away!</Text>
          <Grid padding='2em 0 0 0'>
            <Button onClick={TextModal.open}>Text us</Button>
            <Button onClick={CallModal.open}>Call us</Button>
            <a href={`mailto:${email}`}><Button>Email us</Button></a>
         </Grid>
        </Grid>
      </Layout.Bottom>
    </Layout>
  );
};

export default Help;
