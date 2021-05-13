import React from "react";
import ReactDOM from "react-dom";
import ConfirmModal from "./ConfirmModal";

const confirmModal = (props) => {
  const mount = document.createElement("div");
  const ref = React.createRef();
  const handleClose = () => {
    if (mount) document.body.removeChild(mount);
  };
  ReactDOM.render(
    <ConfirmModal
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

export default confirmModal;
