import React, { useState, useImperativeHandle } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const AlertBox = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(true);
  const { severity, text } = props;

  const handleClose = (event) => {
    setVisible(false);
    props.onClose && props.onClose(event);
  };

  useImperativeHandle(ref, () => ({
    onClose() {
      setVisible(false);
    },
  }));
  return (
    <Snackbar
      ref={ref}
      open={visible}
      autoHideDuration={1000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert onClose={handleClose} severity={severity || "info"}>
        {text}
      </Alert>
    </Snackbar>
  );
})
export default AlertBox
