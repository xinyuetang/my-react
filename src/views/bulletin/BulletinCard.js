import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, Button, Grid, Typography } from "@material-ui/core";
import { MARK_AS_READ_URL } from "src/settings";
import { formFetch } from "src/base";
const useStyles = makeStyles({
  root: {
    margin: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: 600,
  },
  date: {
    fontSize: 11,
  },
  unRead: {
    color: "#0a0d0e",
  },
  readButton: {
    padding: '0px 4px'
  },
});

export default function BulletinCard(props) {
  const classes = useStyles();
  const { createTime, id, read, content, title } = props?.bulletin;
  const refresh = props.refresh;

  const markAsRead = (id) => {
    formFetch({
      url: `${MARK_AS_READ_URL}?id=${id}`,
      values: { id },
      successCallback: refresh,
    });
  };

  return (
    <Card className={classes.root} key={id}>
      <CardContent>
        <Grid container spacing={1}>
          <Grid item md={11}>
            <Typography
              className={
                read ? classes.title : classes.title + "  " + classes.unRead
              }
              color="textSecondary"
              gutterBottom
            >
              {title}
            </Typography>
          </Grid>
          <Grid item md={1}>
            <Typography
              className={classes.date}
              color="textSecondary"
              gutterBottom
            >
              {createTime}
            </Typography>
          </Grid>
          <Grid item md={11}>
            <Typography
              className={
                read ? classes.content : classes.title + "  " + classes.unRead
              }
              color="textSecondary"
              gutterBottom
            >
              {content}
            </Typography>
          </Grid>
          <Grid item md={1}>
            {read == 0 && (
              <Button
                color="primary"
                size="small"
                variant="outlined"
                className={classes.readButton}
                onClick={() => markAsRead(id)}
              >
                标记已读
              </Button>
            )}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
