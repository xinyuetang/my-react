import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { UserContext } from "src/layouts/Context";
import {
  makeStyles,
  Box,
  Typography,
  Button,
  Card,
  Divider,
} from "@material-ui/core";
import KeyboardReturnIcon from "@material-ui/icons/KeyboardReturn";
import {
  MNG_GET_PLAN_DETAIL_URL,
  MNG_DELETE_STAGE_URL,
  U_GET_PLAN_DETAIL_URL,
} from "src/settings";
import { deleteFetch } from "src/base";
import corfirmModal from "src/components/ConfirmModal";
import alertBox from "src/components/AlertBox";
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
  empty: {
    padding: theme.spacing(3),
    textAlign: 'center'
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
  const { userInfo } = useContext(UserContext);
  const hasPermission = userInfo.roleId === 10 || userInfo.roleId === 50;
  useEffect(() => {
    fetch(
      `${hasPermission ? MNG_GET_PLAN_DETAIL_URL : U_GET_PLAN_DETAIL_URL}?${
        hasPermission ? "id" : "planId"
      }=${id}`,
      {}
    )
      .then((res) => res.json())
      .catch((error) => console.error("Error:", error))
      .then((response) => {
        setPlan(response?.data || {});
      });
  }, [refresh]);
  const currentStage = plan?.stages ? plan?.stages[currentKey] : [];
  const  handleDelete = (stageId, name) => {
    const cor = corfirmModal({
      title: "确定要删除改阶段吗？",
      handleCorfirm: () => {
        cor.close();
        deleteFetch({
          url: `${MNG_DELETE_STAGE_URL}?id=${stageId}`,
          successCallback: () => {
            alertBox({ text: "删除成功", severity: "success" });
            setRefresh(!refresh);
          },
        });
      },
    });
  }
  return (
    <div className={classes.root}>
      <Box className={classes.header}>
        <Typography color="textPrimary" size="small" component="h2">
          {plan?.name || ""}
        </Typography>
        {hasPermission && (
          <Button
            color="primary"
            size="small"
            variant="outlined"
            onClick={() => setOpen(true)}
          >
            添加阶段
          </Button>
        )}
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
      {plan?.stages?.length > 0 ? (
        <>
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
                hasPermission={hasPermission}
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
            {`截止日期：${currentStage?.endDate?.slice(0, 11) || "--"}`}
          </Typography>
          {(hasPermission || currentStage?.commonWorks?.length > 0) && (
            <WorkTable
              works={currentStage?.commonWorks}
              workType={100}
              planStageId={currentStage?.id}
              refresh={() => setRefresh(!refresh)}
              hasPermission={hasPermission}
            />
          )}
          {(hasPermission || currentStage?.keshuoWorks?.length > 0) && (
            <WorkTable
              works={currentStage?.keshuoWorks}
              workType={200}
              planStageId={currentStage?.id}
              refresh={() => setRefresh(!refresh)}
              hasPermission={hasPermission}
            />
          )}
          {(hasPermission || currentStage?.academicWorks?.length > 0) && (
            <WorkTable
              works={currentStage?.academicWorks}
              workType={310}
              planStageId={currentStage?.id}
              refresh={() => setRefresh(!refresh)}
              hasPermission={hasPermission}
            />
          )}
          {(hasPermission || currentStage?.synthesizingWorks?.length > 0) && (
            <WorkTable
              works={currentStage?.synthesizingWorks}
              workType={320}
              planStageId={currentStage?.id}
              refresh={() => setRefresh(!refresh)}
              hasPermission={hasPermission}
            />
          )}
          {(hasPermission || currentStage?.technologyWorks?.length > 0) && (
            <WorkTable
              works={currentStage?.technologyWorks}
              workType={330}
              planStageId={currentStage?.id}
              refresh={() => setRefresh(!refresh)}
              hasPermission={hasPermission}
            />
          )}
        </>
      ) : (
        <Card className={classes.empty}>还未添加任何培养阶段</Card>
      )}
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
