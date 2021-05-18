import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  TextField,
  Dialog,
  makeStyles,
  DialogTitle,
} from "@material-ui/core";
import alertBox from "src/components/AlertBox";
import { MNG_ADD_DEVICE_URL, MNG_UPDATE_DEVICE_URL } from "src/settings";
import { postFetch } from "src/base";
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3)
  },
}));

export default function EditDevice(props) {
  const { onClose, open, deviceDetail } = props;
  const classes = useStyles();

  const handleClose = () => {
    onClose();
  };
  return (
    <Dialog onClose={handleClose} open={open} className={classes.root}>
      <DialogTitle onClose={handleClose}>
        {deviceDetail?.id ? "新增设备" : "编辑设备"}
      </DialogTitle>
      <Formik
        initialValues={deviceDetail}
        // validationSchema={Yup.object().shape({
        //   type: Yup.number().required("设备类型必填"),
        // })}
        onSubmit={(values) => {
          postFetch({
            url:
              deviceDetail?.id > 0 ? MNG_UPDATE_DEVICE_URL : MNG_ADD_DEVICE_URL,
            values: {
              ...values,
              type: values?.type || 0
            },
            successCallback: () => {
              alertBox({ text: "操作成功", severity: "success" });
              handleClose();
            },
          });
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
            <TextField
              select
              fullWidth
              label="设备类型"
              name="type"
              margin="normal"
              onChange={handleChange}
              variant="outlined"
              SelectProps={{
                native: true,
              }}
            >
              <option value={0}> 台式设备</option>
              <option value={1}> 移动设备</option>
              <option value={2}> 服务器</option>
              <option value={3}> 其他</option>
            </TextField>
            <TextField
              label="设备型号"
              fullWidth
              margin="normal"
              name="model"
              value={values.model}
              variant="outlined"
              onBlur={handleBlur}
              onChange={handleChange}
            />
            <TextField
              label="设备名称"
              fullWidth
              margin="normal"
              name="name"
              value={values.name}
              variant="outlined"
              onBlur={handleBlur}
              onChange={handleChange}
            />
            <TextField
              label="负责人姓名"
              margin="normal"
              fullWidth
              name="principal"
              value={values.principal}
              variant="outlined"
              onBlur={handleBlur}
              onChange={handleChange}
            />
            <TextField
              label="库存"
              margin="normal"
              fullWidth
              name="inventory"
              value={values.inventory}
              variant="outlined"
              onBlur={handleBlur}
              onChange={handleChange}
            />
            <TextField
              label="库存单位"
              margin="normal"
              fullWidth
              name="inventoryUnit"
              value={values.inventoryUnit}
              variant="outlined"
              onBlur={handleBlur}
              onChange={handleChange}
            />

            <Box my={2}>
              <Button
                color="primary"
                // disabled={isSubmitting}
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
