import React, { useState, useImperativeHandle } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
} from "@material-ui/core";

const ConfirmModal = React.forwardRef((props, ref) => {
  const [open, setOpen] = useState(true);
  const { title, other, handleCorfirm } = props;

  const handleClose = (event) => {
    setOpen(false);
    props.onClose && props.onClose(event);
  };

  useImperativeHandle(ref, () => ({
    onClose() {
      setOpen(false);
    },
  }));
  return (
    <Dialog
      // fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogContent>
        <div style={{ padding: '45px 30px' }}>
          <h4 style={{ fontSize: 16 }}>{title}</h4>
          {other && <p style={{ fontSize: 14, marginTop: 16 }}>{other}</p>}
        </div>
      </DialogContent>
      <DialogActions style={{ justifyContent: 'center' }}>
        <Button autoFocus onClick={handleClose} variant="contained">
          取消
        </Button>
        <Button
          onClick={handleCorfirm}
          variant="contained"
          color="primary"
          style={{ marginLeft: 16 }}
          autoFocus
        >
          确定
        </Button>
      </DialogActions>
    </Dialog>
  );
})
export default ConfirmModal;
