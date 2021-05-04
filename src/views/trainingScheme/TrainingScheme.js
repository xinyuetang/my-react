import React, { useState, useEffect, useContext } from "react";
import { Box, Button, makeStyles } from "@material-ui/core";
import { GET_ALL_CLASS_URL } from "src/settings";
import { UserContext } from "src/layouts/Context";
import CatalogCard from "../../components/CatalogCard";
import cookie from "react-cookies";
import NewClassForm from "../../components/NewClassForm";
import NewArticleForm from "../../components/NewArticleForm";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: "flex",
    justifyContent: "flex-end",
    "& button": {
      marginInline: 8,
    },
  },
}));
export default function TrainingScheme() {
  const classes = useStyles();
  const [datas, setDatas] = useState([]);
  const [open_class, setOpen_class] = useState(false);
  const [open_article, setOpen_article] = useState(false);
  const { userInfo } = useContext(UserContext);

  const handleOpen_class = () => {
    setOpen_class(true);
  };

  const handleClose_class = () => {
    setOpen_class(false);
    getEssayCatalog();
  };
  const handleOpen_article = () => {
    setOpen_article(true);
  };
  const handleClose_article = () => {
    setOpen_article(false);
    getEssayCatalog();
  };

  const getEssayCatalog = () => {
    fetch(GET_ALL_CLASS_URL + "?tag=1", {})
      .then((res) => res.json())
      .catch((error) => console.error("Error:", error))
      .then((response) => {
        console.log(response);
        setDatas(response?.data || []);
      });
  };
  useEffect(getEssayCatalog, []);
  return (
    <div>
      {(userInfo.roleId == 10 || userInfo.roleId == 50) && (
        <Box className={classes.toolbar}>
          <Button
            color="primary"
            size="medium"
            variant="contained"
            onClick={handleOpen_class}
          >
            新建类别
          </Button>
          <Button
            color="primary"
            size="medium"
            variant="contained"
            onClick={handleOpen_article}
          >
            新建文章
          </Button>
        </Box>
      )}

      {datas.map((item) => (
        <CatalogCard
          key={item.id}
          data={item}
          refresh={getEssayCatalog}
          userRoleId={userInfo.roleId}
          authType={4}
        ></CatalogCard>
      ))}
      <NewClassForm
        open={open_class}
        onClose={handleClose_class}
        tag={1}
      ></NewClassForm>
      <NewArticleForm
        open={open_article}
        onClose={handleClose_article}
        classes={datas}
      ></NewArticleForm>
    </div>
  );
}
