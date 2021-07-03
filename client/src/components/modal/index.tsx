import React from "react";
import { gradient, primaryColor } from '../../config';
import { Grid, Modal, Card, Header, Button } from 'platyplex_ui';

const ErrorModal = ({
    error, 
    buttonText = 'Close', 
    buttonAction = () => { }, 
    content
}: {
    error: any,
    buttonText?: string,
    buttonAction?: ()=> void,
    content?: any
}) => {
    const message = error.message || error;
    const m = Modal({
        title: "Error",
        modal: <Grid height='100vh'>
            <Card shadow grid customRows='auto 1fr' style={{ borderRadius: '1em' }} gridGap={'.5em'}>
                <i
                    onClick={() => m.close()}
                    style={{ color: primaryColor, placeSelf: 'start' }}
                    className='fa fa-times hoverr bold txt-md'
                >
                </i>
                <div style={{ maxWidth: '500px', minWidth: '280px' }}>
                    {content ||
                        <>
                            <Header className='med' margin='.25em .25em 1em .25em'>{message}</Header>
                        </>}
                    <Button
                        bg={gradient}
                        noHover
                        padding=".5em"
                        rounded
                        margin=".8rem 0"
                        width="100%"
                        onClick={() => {
                            buttonAction();
                            m.close();
                        }}
                    >
                        {buttonText}
                    </Button>
                </div>
            </Card>
        </Grid>,
        hideCancel: true,
    })
    m.open()
};
export default ErrorModal;