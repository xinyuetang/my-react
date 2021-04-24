import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Box,Button,Typography} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import { Editor } from '@tinymce/tinymce-react';
import { EDIT_ARTICLE_URL, GET_ARTICLE_URL } from 'src/settings';
import cookie from 'react-cookies';

const useStyles = makeStyles(()=> ({
  header:{
    display: "flex",
    justifyContent: "space-between",
    background:"#3f51b542",
    '& button': {
      margin: 5
    },
    '& h4':{
      margin:5,
      lineHeight: 2,
      fontWeight: 600

    }
  }
}));


export default function ArticleEditView(props) {
  let { id } = useParams();
  let [title, setTitle] = useState("");
  let [content, setContent] = useState("");
  const classes = useStyles();
  const handleEditorChange = (content, editor) => {
    setContent(content);
  }
  const handleSubmit = () => {
    fetch(EDIT_ARTICLE_URL + '?id=' + id, {
      method: 'POST',
      headers: new Headers({
        'token': cookie.load("userInfo").token,
        'Content-Type': 'application/json;charset=utf-8'
      }),
      body: content
    }).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => console.log(response));
  }
  const getArticle = () => {
    fetch(GET_ARTICLE_URL + '?id=' + id, {
      method: 'GET',
      headers: new Headers({
        'token': cookie.load("userInfo").token,
      }),
    }).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => { setTitle(response.title); setContent(response.content) });
  }
  useEffect(getArticle, []);



  return (
      <div>
      <Box className={classes.header}>
        <Typography
          color="textPrimary"
          variant="h4"
        >
          {title}
        </Typography>
        <Button color="primary" variant="outlined" onClick={handleSubmit}>保存</Button>
      </Box>
      <form>

        <Editor
          apiKey='5vf6jo8wb1i8207zmbiyorw8e5z1pu5fu1o633p5lz4990yt'
          value={content}

          init={{
            height: 500,
            menubar: false,
            plugins: [
              'advlist autolink lists link image charmap print preview anchor',
              'searchreplace visualblocks code fullscreen',
              'insertdatetime media table paste code help wordcount'
            ],
            toolbar:
              'undo redo|styleselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             link|image |table|bullist numlist outdent indent | removeformat | help'
          }}
          onEditorChange={handleEditorChange}
        />
      </form>
    </div>

  );

}