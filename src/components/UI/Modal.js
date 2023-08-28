import { Fragment } from "react";
import ReactDOM from "react-dom";

import classes from "./Modal.module.css";

const Backdrop = (props) => {
  const handleBackdropClick = () => {
    if (props.onCloseLogin) {
      props.onCloseLogin();
    }
    if (props.onClose) {
      props.onClose();
    }
    if(props.onCloseRegister){
      props.onCloseRegister();
    }
  };

  return <div className={classes.backdrop} onClick={handleBackdropClick} />;
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById("overlays");

const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} onCloseLogin={props.onCloseLogin} onCloseRegister={props.onCloseRegister}/>,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;
