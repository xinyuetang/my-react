import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import {
  makeStyles,
  Box,
  Typography,
  Button,
  Card,
  Divider,
} from "@material-ui/core";
import KeyboardReturnIcon from "@material-ui/icons/KeyboardReturn";
import { MNG_GET_PLAN_DETAIL_URL, MNG_DELETE_STAGE_URL } from "src/settings";
import { deleteFetch } from "src/base";
import WorkTable from '../components/WorkTable'
import EditStage from '../components/EditStage'
import StageButton from "../components/StageButton";
// import EssayClasses from "./EssayClasses";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    padding: theme.spacing(3),
    "& .MuiCard-root": {
      margin: theme.spacing(1),
    },
  },
  header: {
    backgroundColor: "#fff",
    padding: theme.spacing(3),
    display: "flex",
    alignItems: "center",
    "& h2": {
      flex: 1,
    },
  },
  stages: {
    display: "flex",
    flexWrap: "wrap",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    "& .MuiButton-root": {
      margin: theme.spacing(1),
    },
  },
  endDate: {
    padding: theme.spacing(2),
    fontWeight: "bold",
  },
  return: {
    marginLeft: theme.spacing(1),
  },
}));
const StudyPlanDetailView = () => {
  const classes = useStyles();
  const { id } = useParams();
  const history = useHistory();
  const [refresh, setRefresh] = useState(false)
  const [plan, setPlan] = useState({})
  const [currentKey, setCurrentKey] = useState(0)
  const [open, setOpen] = useState(false);
  const [stageDetail, setStageDetail] = useState({});
  useEffect(() => {
    fetch(`${MNG_GET_PLAN_DETAIL_URL}?id=${id}`, {})
      .then((res) => res.json())
      .catch((error) => console.error("Error:", error))
      .then((response) => {
        setPlan(response?.data || {});
      });
  }, [refresh]);
  const currentStage = plan?.stages ? plan?.stages[currentKey] : [];
  const  handleDelete = (stageId) => {
    deleteFetch({
      url: `${MNG_DELETE_STAGE_URL}?id=${stageId}`,
      successCallback: () => {
        alert('删除成功')
        setRefresh(!refresh);
      },
    });
  }
  return (
    <div className={classes.root}>
      <Box className={classes.header}>
        <Typography color="textPrimary" size="small" component="h2">
          {plan?.name || ""}
        </Typography>
        <Button
          color="primary"
          size="small"
          variant="outlined"
          onClick={() => setOpen(true)}
        >
          添加阶段
        </Button>
        <Button
          className={classes.return}
          size="small"
          variant="outlined"
          endIcon={<KeyboardReturnIcon />}
          onClick={history.goBack}
        >
          返回
        </Button>
      </Box>
      <Box className={classes.stages}>
        {plan?.stages?.map((stage, i) => (
          <StageButton
            text={`第${stage.term}学期 ~ 阶段${stage.index}`}
            color={currentKey === i ? "primary" : "default"}
            key={stage.id}
            stage={stage}
            handleClick={() => setCurrentKey(i)}
            handleDelete={() => handleDelete(stage.id)}
            handleEdit={() => {
              setStageDetail(stage);
              setOpen(true);
            }}
          />
        ))}
      </Box>
      <Divider />
      <Typography
        color="textPrimary"
        size="small"
        component="h2"
        className={classes.endDate}
      >
        {`截止时间：${currentStage?.endDate || '--'}`}
      </Typography>
      <Card>
        <WorkTable
          works={currentStage?.commonWorks}
          workType={100}
          planStageId={currentStage?.id}
          refresh={() => setRefresh(!refresh)}
        />
      </Card>
      <Card>
        <WorkTable
          works={currentStage?.keshuoWorks}
          workType={200}
          planStageId={currentStage?.id}
          refresh={() => setRefresh(!refresh)}
        />
      </Card>
      <Card>
        <WorkTable
          works={currentStage?.academicWorks}
          workType={310}
          planStageId={currentStage?.id}
          refresh={() => setRefresh(!refresh)}
        />
      </Card>
      <Card>
        <WorkTable
          works={currentStage?.synthesizingWorks}
          workType={320}
          planStageId={currentStage?.id}
          refresh={() => setRefresh(!refresh)}
        />
      </Card>
      <Card>
        <WorkTable
          works={currentStage?.technologyWorks}
          workType={330}
          planStageId={currentStage?.id}
          refresh={() => setRefresh(!refresh)}
        />
      </Card>
      <EditStage
        open={open}
        onClose={() => {
          setOpen(false);
          setStageDetail({});
          setRefresh(!refresh);
        }}
        stageDetail={stageDetail}
        planId={plan.id}
      />
    </div>
  );
};

export default StudyPlanDetailView;
