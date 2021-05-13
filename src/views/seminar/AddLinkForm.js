import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Button, TextField, makeStyles } from "@material-ui/core";
import { UPDATE_SEMINAR_URL } from "src/settings";
import { postFetch } from "src/base";
import alertBox from "src/components/AlertBox";

const useStyles = makeStyles(() => ({
  root: {
    "& input": {
      maxWidth: "8rem",
    },
    "& button": {
      background: "#2f3c88",
      color: "white",
      fontWeight: 500,
      marginLeft: "5px",
      verticalAlign: "bottom",
    },
  },
}));
function AddLinkForm(props) {
  const { seminar } = props;
  const classes = useStyles();
  return (
    <Formik
      initialValues={{
        link: seminar?.link || "",
      }}
      validationSchema={Yup.object().shape({
        link: Yup.string().required(),
      })}
      onSubmit={(values) => {
        postFetch({
          url: UPDATE_SEMINAR_URL,
          values: {
            ...seminar,
            link: values.link,
          },
          successCallback: () => alertBox({ text: "提交成功", severity: "success" })
        });
      }}
    >
      {({ handleChange, handleSubmit, values }) => (
        <form onSubmit={handleSubmit} className={classes.root}>
          <TextField
            onChange={handleChange}
            size="small"
            name="link"
            label="请填写资源链接"
            value={values.link}
          />
          <Button size="small" type="submit">
            提交
          </Button>
        </form>
      )}
    </Formik>
  );
}
export default AddLinkForm;
