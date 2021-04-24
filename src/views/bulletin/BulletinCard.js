import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Button, Grid, Typography } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import cookie from 'react-cookies';
import {MARK_AS_READ_URL} from 'src/settings';
const useStyles = makeStyles({
  root: {
    margin: 8
  },
  title: {
    fontSize: 14,
    fontWeight: 600
  },
  date:{
      fontSize:11
  },
  unRead:{
      color:"#0a0d0e"
  }


});

export default function BulletinCard(props) {
  const classes = useStyles();
  const title = props.bulletin.title;//通告标题
  const id = props.bulletin.id;//通告id
  const content = props.bulletin.content;//通告内容
  const date = props.bulletin.date;//通告发布日期
  const isRead = props.bulletin.isRead;//通告是否已读
  const refresh = props.refresh;


  const markAsRead= (id)=>{
    fetch(MARK_AS_READ_URL+'?bulletinId='+id, {
        method: 'GET', 
        headers: new Headers({
            'token': cookie.load("userInfo").token
        })
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {console.log(response);});
    refresh();

  };

  return (
    <Card className={classes.root} key={id} >
      <CardContent>
      <Grid container spacing={1} >
        <Grid item md={11}>
          <Typography className={isRead? classes.title: classes.title+"  "+ classes.unRead } color="textSecondary"  gutterBottom>
            {title}
          </Typography>
        </Grid>
        <Grid item md={1}>
        <Typography className={classes.date} color="textSecondary" gutterBottom>
            {date}
          </Typography>
        </Grid>
        <Grid item md={11} >
        <Typography className={isRead? classes.content: classes.title+"  "+ classes.unRead }  color="textSecondary" gutterBottom>
            {content}
          </Typography>
        </Grid>
        <Grid item md={1}>

        {isRead==0 && 
        <Button size="small" onClick={()=>markAsRead(id)} >
            标记已读
        </Button>}
       
        </Grid>
       
      </Grid>
      
       
      
      </CardContent>
    </Card>
  );
}
