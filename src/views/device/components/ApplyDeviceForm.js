import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Box, Button, TextField, Typography, Dialog } from "@material-ui/core";
import { U_APPLY_DEVICE_URL } from "src/settings";
import { postFetch } from "src/base";
import alertBox from "src/components/AlertBox";

export default function ApplyDeviceForm(props) {
  const { onClose, open, deviceId } = props;

  const handleClose = () => {
    onClose();
  };
  return (
    <Dialog onClose={handleClose} open={open}>
      <Formik
        initialValues={{
          inventoryUsage: "",
        }}
        validationSchema={Yup.object().shape({
          inventoryUsage: Yup.string().max(255).required(),
        })}
        onSubmit={(values) => {
          postFetch({
            url: U_APPLY_DEVICE_URL,
            values: {
              ...values,
              deviceId,
            },
            successCallback: () => alertBox({ text: "申请成功", severity: "success" })
          });
          handleClose();
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values,
        }) => (
          <form onSubmit={handleSubmit} className="dialogForm">
            <Box mb={1}>
              <Typography color="textPrimary" variant="h4">
                申请设备
              </Typography>
            </Box>
            <TextField
              fullWidth
              label="申请数量"
              margin="normal"
              name="inventoryUsage"
              onBlur={handleBlur}
              onChange={handleChange}
              variant="outlined"
            />
            <Box my={2}>
              <Button
                color="primary"
                disabled={isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                提交
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Dialog>
  );
}
