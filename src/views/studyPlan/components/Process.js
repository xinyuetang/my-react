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
import alertBox from 'src/components/AlertBox'
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
    paddingTop: theme.spacing(3),
    fontWeight: 'bold',
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
    '& .MuiTypography-root': {
      flex: 1
    }
  },
}));
const FINISH_TYPE = {
  10: {
    text: "进行中",
    color: "#263238",
  },
  20: {
    text: "延期未完成",
    color: "#ff9d00",
  },
  30: {
    text: "超期未完成",
    color: "#ff0000",
  },
  40: {
    text: "已完成",
    color: "#df5141",
  },
  50: {
    text: "延期完成",
    color: "#df5141",
  },
  60: {
    text: "超期完成",
    color: "#df5141",
  },
};
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
  const handleUpdate = (values) => {
    postFetch({
      url: MNG_EDIT_ALLOCATION,
      values,
      successCallback: () => {
        alertBox({ text: "变更成功", severity: 'success' });
        getInfo();
      },
    });
  };
  const WorkList = ({works}) => {
    return (
      <List>
        {works?.map((work) => (
          <WorkListItem work={work} key={work.id} />
        ))}
      </List>
    );
  };
  const WorkListItem = ({work}) => {
    const date =
      work?.allocation?.planWorkExpectedEndDate?.length > 11
        ? work?.allocation?.planWorkExpectedEndDate?.slice(0, 11)
        : work?.allocation?.planWorkExpectedEndDate;
    const [isSet, SetIsSet] = useState(false)
    const [updateTime, setUpdateTime] = useState(date);
    console.log(updateTime, work?.allocation?.planWorkExpectedEndDate);
    return (
      <ListItem className={classes.listItem}>
        <Typography>
          <span>{`${work.index}. ${work.name}`}</span>
          <span
            style={{
              color: FINISH_TYPE[work?.allocation?.status || 10]?.color,
            }}
          >
            {`（${FINISH_TYPE[work?.allocation?.status || 10]?.text}）`}
          </span>
        </Typography>

        {isSet ? (
          <>
            <TextField
              label="截止日期"
              type="date"
              margin="normal"
              disabled={!isSet}
              name="date"
              value={updateTime}
              onChange={(e) => setUpdateTime(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Button
              color="primary"
              size="small"
              style={{ marginLeft: 20 }}
              onClick={() => {
                handleUpdate({
                  id: work?.allocation?.id,
                  delayDate: updateTime,
                });
                SetIsSet(false);
              }}
            >
              保存
            </Button>
          </>
        ) : (
          <>
            <div>{`结束日期：${updateTime}`}</div>
            <Button
              color="primary"
              size="small"
              style={{ marginLeft: 20 }}
              onClick={() => SetIsSet(true)}
            >
              修改结束日期
            </Button>
          </>
        )}
        <Button
          color="primary"
          size="small"
          variant="outlined"
          style={{ marginLeft: 20 }}
          onClick={() =>
            handleUpdate({
              id: work?.allocation?.id,
              finished: work?.allocation?.finished === 0 ? 1 : 0,
            })
          }
        >
          {work?.allocation?.finished === 0 ? "设为已完成" : "设为未完成"}
        </Button>
      </ListItem>
    );
  }
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
        <Typography className={classes.endDate} veriant="h6">
          {`初始日期：${
            info?.referenceDate?.length > 11
              ? info?.referenceDate?.slice(0, 11)
              : info?.referenceDate
          }`}
        </Typography>
        <Box>
          {info?.stages?.map((stage) => (
            <Card key={stage.id} className={classes.card}>
              <div>
                <h4>
                  {`第${stage.term}学期 ~ 第${stage.index}阶段`}
                  <br />
                  <span
                    style={{ fontSize: 12 }}
                  >{`结束日期：(${stage?.endDate?.slice(0, 11)})`}</span>
                </h4>
              </div>
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
