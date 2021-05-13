import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Button, Grid, Typography } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { DELETE_ARTICLE_URL, DELETE_CLASS_URL } from 'src/settings';
import { deleteFetch } from "src/base";
import corfirmModal from "src/components/ConfirmModal";
const useStyles = makeStyles({
  root: {
    minWidth: 275,
    margin: 8
  },
  title: {
    fontSize: 14,
    fontWeight: 600
  }

});

export default function CatalogCard(props) {
  const classes = useStyles();
  const { data = {}, refresh, userRoleId, authType } = props;
  const { name, id, articles } = data;
  const handleDeleteArticle = (id, name) => {
    const cor = corfirmModal({
      title: `确定要删除[${name}]吗？`,
      handleCorfirm: () => {
        cor.close();
        deleteFetch({
          url: `${DELETE_ARTICLE_URL}?id=${id}`,
          values: { id },
          successCallback: refresh,
        });
      },
    });
  }
  const handleDeleteClass = (id, name) => {
    const cor = corfirmModal({
      title: `确定要删除[${name}]吗？`,
      handleCorfirm: () => {
        cor.close();
        deleteFetch({
          url: `${DELETE_CLASS_URL}?id=${id}`,
          values: { id },
          successCallback: refresh,
        });
      },
    });
  }

  return (
    <Card className={classes.root}>
      <CardContent>
        <Grid container spacing={1}>
          <Grid item md={11}>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              {name}
            </Typography>
          </Grid>
          {(userRoleId == 10 || userRoleId == authType) && (
            <Grid item md={1}>
              <Button onClick={(e) => handleDeleteClass(id, name)}>
                删除类{" "}
              </Button>
            </Grid>
          )}
        </Grid>

        {articles?.map((item) => (
          <Grid container spacing={1} key={item.id}>
            <Grid item md={10}>
              <RouterLink to={"/app/article/" + item.id}>
                <Typography component="h2">{item.title}</Typography>
              </RouterLink>
            </Grid>
            {(userRoleId == 10 || userRoleId == authType) && (
              <Grid item md={1}>
                <Button
                  component={RouterLink}
                  to={"/app/articleEdit/" + item.id}
                >
                  编辑{" "}
                </Button>
              </Grid>
            )}
            {(userRoleId == 10 || userRoleId == authType) && (
              <Grid item md={1}>
                <Button
                  onClick={(e) => handleDeleteArticle(item.id, item.title)}
                >
                  删除{" "}
                </Button>
              </Grid>
            )}
          </Grid>
        ))}
      </CardContent>
    </Card>
  );
}
