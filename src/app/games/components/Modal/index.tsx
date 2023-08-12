import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Icon from "../Icon";
import { useState } from "react";

export default function Modal(props: {
  children: React.ReactNode;
  open: boolean;
  onClose?: () => void;
}) {
  const { children, onClose, open } = props;
  function closeModal() {
    if (onClose) {
      onClose();
    }
  }

  function stopPropogation(e: any) {
    e.stopPropagation();
  }

  return (
    <div
      onClick={closeModal}
      className={`${
        open ? "flex" : "hidden"
      } fixed z-50 left-0 top-0 w-full h-full overflow-auto bg-slate-900/50`}
    >
      <div
        // ref={modalRef}
        onClick={stopPropogation}
        className="modal-content m-auto bg-white p-square-normal rounded border-1 w-4/5 md:w-2/4 relative max-w-3xl"
      >
        {onClose ? (
          <Icon
            icon={faXmark}
            className="absolute top-0 right-0 cursor-pointer"
            onClick={closeModal}
          />
        ) : null}
        {children}
      </div>
    </div>
  );
}
