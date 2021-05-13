import React from "react";
import ReactDOM from "react-dom";
import AlertBox from './AlertBox'

const alertBox = (props) => {
  const mount = document.createElement("div");
  const ref = React.createRef();
  const handleClose = () => {
    if (mount) document.body.removeChild(mount);
  };
  ReactDOM.render(
    <AlertBox
      {...props}
      ref={ref}
      onClose={(event) => {
        props.onClose && props.onClose(event);
        if (mount) document.body.removeChild(mount);
      }}
    />,
    mount
  );

  document.body.appendChild(mount);

  return {
    close: () => {
      ref?.current?.onClose();
      handleClose();
    },
  };
};

export default alertBox;
