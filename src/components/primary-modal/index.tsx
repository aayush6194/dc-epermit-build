import React from "react";
import { Card, Grid , Button } from "platyplex_ui";
import { primaryTxtColor } from "../../config";

interface Props {
    children: JSX.Element;
    style?: React.CSSProperties;
    confirmText ?: string | JSX.Element;
    cancelText?: string | JSX.Element;
    onConfirm ?:() => void;
    onCancel ?: ()=> void
}

const PrimaryModal = ({
    children,
    style,
    confirmText,
    cancelText,
    onConfirm,
    onCancel
}: Props) => (
    <Grid height="100%">
        <Card shadow padding={0} width={"350px"} style={style}>
            {children}

            { onCancel && <Grid placeSelf="stretch" placeItems="stretch" gridGap={"0"} customCols='1fr 1fr'>
            <Button
              invert
              bg={primaryTxtColor}
              noBorder
              style={{ boxShadow: `0 0 0` }}
              onClick={onConfirm}
            >
              {confirmText || 'Confirm'}
            </Button>

            <Button
              invert
              bg={primaryTxtColor}
              noBorder
              style={{ boxShadow: `0 0 0` }}
              onClick={onCancel}
            >
              {cancelText || 'Cancel'}
            </Button>
          </Grid>}
        </Card>
    </Grid>
);

export default PrimaryModal;