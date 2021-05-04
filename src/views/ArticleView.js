import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import cookie from "react-cookies";
import { GET_ARTICLE_URL } from "src/settings";
const useStyles = makeStyles(() => ({
  article: {
    margin: "4%",
    padding: "4%",
    boxShadow: "2px 2px 2px 1px rgba(0, 0, 0, 0.2)",
    backgroundColor: "white",
  },
  header: {
    marginBottom: "2%",
  },
}));
export default function ArticleView(props) {
  let { id } = useParams();
  let [title, setTitle] = useState("");
  let [content, setContent] = useState("");
  const classes = useStyles();
  const getArticle = () => {
    fetch(`${GET_ARTICLE_URL}/${id}`, {})
      .then((res) => res.json())
      .catch((error) => console.error("Error:", error))
      .then((response) => {
        console.log(response);
        setTitle(response?.data?.title || '');
        setContent(response?.data?.content || '');
      });
  };
  useEffect(getArticle, []);
  return (
    <div className={classes.article}>
      <Typography className={classes.header} color="textPrimary" variant="h4">
        {title}
      </Typography>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}
