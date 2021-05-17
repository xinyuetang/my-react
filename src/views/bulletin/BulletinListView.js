import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  makeStyles,
  Button,
} from "@material-ui/core";
// import cookie from "react-cookies";
import Page from "src/components/Page";
import { GET_ALL_BULLETIN_URL, MARK_READ_ALL } from "src/settings";
import BulletinCard from "./BulletinCard";
import { postFetch } from "src/base";
const useStyles = makeStyles((theme) => ({
  header: {
    display: "flex",
    justifyContent: "space-between",
    padding: "16px",
    "& p": {
      lineHeight: 2,
    },
  },
}));

const BulletinListView = () => {
  const classes = useStyles();
  const [bulletins, setBulletins] = useState([]); //所有通知
  //向后台调取所有通知
  const getAllBulletin = () => {
    return fetch(GET_ALL_BULLETIN_URL, {})
      .then((res) => res.json())
      .catch((error) => console.error("Error:", error))
      .then((response) => {
        console.log(response);
        setBulletins(response.data || []);
      });
  };

  useEffect(getAllBulletin, []);
  return (
    <Page className={classes.root} title="notification">
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="md">
          <Box className={classes.header}>
            <Typography color="textPrimary" size="small" component="h2">
              通知记录
            </Typography>
            <Button
              color="primary"
              size="small"
              variant="outlined"
              onClick={() =>
                postFetch({
                  url: MARK_READ_ALL,
                  successCallback: getAllBulletin,
                })
              }
            >
              全部已读
            </Button>
          </Box>
          {bulletins.map((item) => (
            <BulletinCard
              bulletin={item}
              key={item.id}
              refresh={getAllBulletin}
            ></BulletinCard>
          ))}
        </Container>
      </Box>
    </Page>
  );
};

export default BulletinListView;
