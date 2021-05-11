import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import {
  Box,
  Button,
  TextField,
  AppBar,
  Toolbar,
  IconButton,
  Dialog,
  Typography,
  makeStyles,
  DialogTitle,
  Slide,
  Container,
  Card,
  List,
  ListItem,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { MNG_EDIT_ALLOCATION, MNG_GET_ALLOCATION_INfO } from "src/settings";
import { postFetch } from "src/base";
const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
    // "& .MuiButton-root": {
    //   color: "#fff",
    // },
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  endDate: {
    padding: theme.spacing(3),
  },
  card: {
    padding: theme.spacing(3),
    marginTop: theme.spacing(3),
    display: "flex",
    "& .MuiBotton-root": {
      marginLeft: theme.spacing(1),
    },
  },
  stageContent: {
    marginLeft: theme.spacing(3),
    flex: 1,
  },
  listItem: {
    display: 'flex',
    '& span': {
      flex: 1
    }
  },
}));
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Process(props) {
  const { onClose, open, planId, userId } = props;
  const [info, setInfo] = useState({});
  const classes = useStyles();

  const handleClose = () => {
    onClose();
  };
  const getInfo = () => {
    fetch(`${MNG_GET_ALLOCATION_INfO}?planId=${planId}&userId=${userId}`, {})
      .then((res) => res.json())
      .catch((error) => console.error("Error:", error))
      .then((response) => {
        setInfo(response?.data || {});
      });
  }
  useEffect(() => {
    getInfo()
  }, []);
  const handleUpdate = (id, finished) => {
    postFetch({
      url: MNG_EDIT_ALLOCATION,
      values: {
        id,
        finished,
      },
      successCallback: () => {
        alert("变更成功");
        getInfo();
      },
    });
  };
  const WorkList = ({works}) => {
    return (
      <List>
        {works?.map((work) => (
          <ListItem key={work.id} className={classes.listItem}>
            <span>{`${work.index}. ${work.name}`}</span>
            <span
              style={{
                color: work?.allocation?.finished === 0 ? "#df5141" : "#3f51b5",
              }}
            >{`（${
              work?.allocation?.finished === 0 ? "未完成" : "已完成"
            }）`}</span>
            <Button
              color="primary"
              size="small"
              variant="outlined"
              style={{ marginLeft: 20 }}
              onClick={() =>
                handleUpdate(
                  work?.allocation?.id,
                  work?.allocation?.finished === 0 ? 1 : 0
                )
              }
            >
              {work?.allocation?.finished === 0 ? "设为已完成" : "设为未完成"}
            </Button>
          </ListItem>
        ))}
      </List>
    );
  };
  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      className={classes.root}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <Typography variant="h4" className={classes.title}>
            {`[${info?.name}] 任务进度`}
          </Typography>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container>
        <Typography
          className={classes.endDate}
          veriant="h6"
        >{`截止日期：${info?.referenceDate}`}</Typography>
        <Box>
          {info?.stages?.map((stage) => (
            <Card key={stage.id} className={classes.card}>
              <div>{`第${stage.index}阶段 ~ 第${stage.term}学期：`}</div>
              <div className={classes.stageContent}>
                {stage?.commonWorks?.length > 0 && (
                  <Box>
                    <Typography veriant="h6">公共任务：</Typography>
                    <WorkList works={stage?.commonWorks} />
                  </Box>
                )}
                {stage?.keshuoWorks?.length > 0 && (
                  <Box>
                    <Typography veriant="h6">科硕任务：</Typography>
                    <WorkList works={stage?.keshuoWorks} />
                  </Box>
                )}
                {stage?.academicWorks?.length > 0 && (
                  <Box>
                    <Typography veriant="h6">学术型任务：</Typography>
                    <WorkList works={stage?.academicWorks} />
                  </Box>
                )}
                {stage?.synthesizingWorks?.length > 0 && (
                  <Box>
                    <Typography veriant="h6">结合型任务：</Typography>
                    <WorkList works={stage?.synthesizingWorks} />
                  </Box>
                )}
                {stage?.technologyWorks?.length > 0 && (
                  <Box>
                    <Typography veriant="h6">技术型任务：</Typography>
                    <WorkList works={stage?.technologyWorks} />
                  </Box>
                )}
              </div>
            </Card>
          ))}
        </Box>
      </Container>
    </Dialog>
  );
}
