import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Button, Typography, TextField } from "@material-ui/core";
import { useParams } from "react-router-dom";
import alertBox from "src/components/AlertBox";

import { Editor } from "@tinymce/tinymce-react";
import {
  EDIT_ARTICLE_URL,
  GET_ARTICLE_URL,
  ADD_ARTICLE_URL,
  GET_ALL_CLASS_URL,
} from "src/settings";
import { UserContext } from "src/layouts/Context";
import { postFetch } from "src/base"; 

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  article: {
    margin: "4%",
    padding: "4%",
    boxShadow: "2px 2px 2px 1px rgba(0, 0, 0, 0.2)",
    backgroundColor: "white",
  },
  flexHeader: {
    display: "flex",
    alignItems: "center",
  },
  header: {
    marginBottom: "2%",
    "& button": {
      marginLeft: 5,
    },
    "& h4": {
      margin: 5,
      lineHeight: 2,
      fontWeight: 600,
      flex: 1,
    },
  },
  footer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
    "& button": {
      margin: 20,
    },
  },
}));

export default function ArticleEditView(props) {
  const { id } = useParams();
  const history = useHistory();
  const { userInfo } = useContext(UserContext);
  const hasPermission = userInfo.roleId === 10 || userInfo.roleId === 40;
  const [essayClasses, setEssayClasses] = useState([]);
  const [essayClass, setEssayClass] = useState('');
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const classes = useStyles();
  const handleEditorChange = (content, editor) => {
    setContent(content);
  };
  const getAllEssayClasses = () => {
    fetch(GET_ALL_CLASS_URL, {})
      .then((res) => res.json())
      .catch((error) => console.error("Error:", error))
      .then((response) => {
        setEssayClasses(response?.data || []);
      });
  };
  const handleSubmit = () => {
    if (title === "") {
      alertBox({ text: "????????????????????????", severity: "error" });
      return;
    }
    if (essayClass === "") {
      alertBox({ text: "?????????????????????", severity: "error" });
      return;
    }
    if (content === "") {
      alertBox({ text: "????????????????????????", severity: "error" });
      return;
    }
    postFetch({
      url: id === "0" ? ADD_ARTICLE_URL : EDIT_ARTICLE_URL,
      values: {
        id,
        title,
        content,
        categoryId: essayClass,
      },
      successCallback: () => {
        alertBox({ text: '????????????', severity: "success" });
        history.replace("/app/essayRecommendation/essays");
      }
    });
  };
  const getArticle = () => {
    fetch(`${GET_ARTICLE_URL}${id}`, {})
      .then((res) => res.json())
      .catch((error) => console.error("Error:", error))
      .then((response) => {
        setTitle(response?.data?.title);
        setContent(response?.data?.content);
        setEssayClass(response?.data?.categoryId);
      });
  };
  useEffect(() => {
    getAllEssayClasses();
    if (parseInt(id) > 0) getArticle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!hasPermission) {
    return (
      <div className={classes.article}>
        <Box className={clsx(classes.header, classes.flexHeader)}>
          <Typography color="textPrimary" variant="h4">
            {title}
          </Typography>
          <Button color="primary" variant="outlined" onClick={history.goBack}>
            ??????
          </Button>
        </Box>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <Box className={classes.header}>
        <TextField
          label="????????????"
          fullWidth
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <TextField
          select
          fullWidth
          label="????????????"
          name="roleId"
          margin="normal"
          onChange={(event) => setEssayClass(event.target.value)}
          value={essayClass}
        >
          {essayClasses.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </TextField>
      </Box>
      <form>
        <Editor
          apiKey="5vf6jo8wb1i8207zmbiyorw8e5z1pu5fu1o633p5lz4990yt"
          value={content}
          init={{
            height: 500,
            menubar: false,
            plugins: [
              "advlist autolink lists link image charmap print preview anchor",
              "searchreplace visualblocks code fullscreen",
              "insertdatetime media table paste code help wordcount",
            ],
            toolbar:
              "undo redo|styleselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             link|image |table|bullist numlist outdent indent | removeformat | help",
          }}
          onEditorChange={handleEditorChange}
        />
      </form>
      <Box className={classes.footer}>
        <Button
          color="primary"
          size="large"
          variant="outlined"
          onClick={history.goBack}
        >
          ??????
        </Button>
        <Button
          color="primary"
          size="large"
          variant="outlined"
          onClick={handleSubmit}
        >
          ??????
        </Button>
      </Box>
    </div>
  );
}
