import {
  makeStyles,
  Button,
  Tooltip,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
const useStyles = makeStyles((theme) => ({
  popover: {
    pointerEvents: "none",
  },
  paper: {
    padding: theme.spacing(1),
  },
}));
const StageButton = (props) => {
  const classes = useStyles();
  const {
    text,
    color,
    handleClick,
    handleEdit,
    handleDelete,
    hasPermission,
  } = props;

  if (hasPermission) {
    return (
      <Tooltip
        className={classes.Tooltip}
        title={
          <>
            <Button
              size="small"
              variant="text"
              style={{ color: "#fff" }}
              onClick={handleEdit}
            >
              编辑
            </Button>
            <Button
              size="small"
              variant="text"
              onClick={handleDelete}
              style={{ color: "#fff" }}
            >
              删除
            </Button>
          </>
        }
        interactive
        arrow
      >
        <Button
          variant="contained"
          color={color}
          onClick={handleClick}
          endIcon={<MoreVertIcon />}
        >
          {text}
        </Button>
      </Tooltip>
    );
  }
    return (
      <Button
        variant="contained"
        color={color}
        onClick={handleClick}
      >
        {text}
      </Button>
    );
};
export default StageButton;
