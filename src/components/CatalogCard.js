import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Button, Grid, Typography } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { DELETE_ARTICLE_URL, DELETE_CLASS_URL } from 'src/settings';
import cookie from 'react-cookies';
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
  const className = props.data.className;
  const classID = props.data.id;
  const articles = props.data.articles;
  const refresh = props.refresh;
  const userRoleId = props.userRoleId;
  const authType = props.authType;//可以是推荐论文管理（3）或培养方案管理（4）
  const handleDeleteArticle = (id, e) => {
    fetch(DELETE_ARTICLE_URL + '?id=' + id, {
      method: 'GET',
      headers: new Headers({
        'token': cookie.load("userInfo").token
      }),
    }).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => { console.log(response); refresh(); });

  }
  const handleDeleteClass = (id, e) => {
    fetch(DELETE_CLASS_URL + '?id=' + id, {
      method: 'GET',
      headers: new Headers({
        'token': cookie.load("userInfo").token
      }),
    }).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => { console.log(response); refresh(); });

  }

  return (
    <Card className={classes.root} >
      <CardContent>
        <Grid container spacing={1} >
          <Grid item md={11}>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              {className}
            </Typography>
          </Grid>
          {(userRoleId == 0 || userRoleId == authType) && <Grid item md={1}>
            <Button onClick={e => handleDeleteClass(classID, e)} >删除类 </Button>
          </Grid>}
        </Grid>


        {articles.map((item) => (
          <Grid container spacing={1} key={item.id}>
            <Grid item md={10}>
              <RouterLink to={"/app/article/" + item.id}>
                <Typography component="h2">
                  {item.title}
                </Typography>
              </RouterLink>
            </Grid>
            {(userRoleId == 0 || userRoleId == authType) &&
              <Grid item md={1}>
                <Button component={RouterLink} to={"/app/articleEdit/" + item.id} >编辑 </Button>
              </Grid>}
            {(userRoleId == 0 || userRoleId == authType) &&
              <Grid item md={1}>
                <Button onClick={(e) => handleDeleteArticle(item.id, e)} >删除 </Button>
              </Grid>}
          </Grid>
        ))}
      </CardContent>
    </Card>
  );
}
