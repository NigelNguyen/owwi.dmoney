import React from "react";
import { createPortal } from "react-dom";
import Backdrop from "../../atoms/Backdrop";
import Overlay from "../../Overlay";

const Modal = ({
  children,
  onCloseModal,
  open,
  title = "Modal Title",
  className,
  nextOverlay
}: {
  open?: boolean;
  children: React.ReactNode;
  onCloseModal: () => void;
  title?: string;
  className?: string;
  nextOverlay?: React.ReactNode;
}) => {
  const modal = (
    <Backdrop>
      <div className="flex gap-4 absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
        <Overlay onClickCloseButton={onCloseModal} className={className}>
          <div className="text-2xl pb-4">{title}</div>
          {children}
        </Overlay>
        {nextOverlay ? nextOverlay : null}
      </div>
    </Backdrop>
  );

  return open
    ? createPortal(modal, document.getElementById("portal") || document.body)
    : null;
};

export default Modal;
