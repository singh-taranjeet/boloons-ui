import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Icon from "../Icon";
import { Sentence } from "../Sentence";
import { emptyFunction } from "@/app/lib/server.lib";
import Image from "next/image";
import { urls } from "@/app/lib/constants.lib";
import { pinkish } from "@/app/lib/style.lib";

function ModalStars() {
  return (
    <div className="flex-center w-full absolute" style={{ top: "-2rem" }}>
      <Image
        height={84}
        width={200}
        className="mx-auto"
        src={`${urls.media}victory-stars.svg`}
        alt="Victory starts"
      />
    </div>
  );
}

function ModalTitle(props: Readonly<{ children: React.ReactNode }>) {
  const { children } = props;
  return (
    <div className="flex-center w-full absolute" style={{ top: "-1.5rem" }}>
      <div
        className={`p-rectangle-normal w-fit mx-auto rounded-full border-4 border-primary px-normal ${pinkish}`}
      >
        <Sentence className="text-center">{children}</Sentence>
      </div>
    </div>
  );
}

function closeModal(onClose: () => void) {
  return () => onClose();
}

function ModalCloseIcon(props: Readonly<{ onClose: () => void }>) {
  const { onClose } = props;

  return (
    <Icon
      icon={faXmark}
      className="absolute top-2 right-2 cursor-pointer"
      onClick={closeModal(onClose)}
    />
  );
}

function ModalBody(props: Readonly<{ children: React.ReactNode }>) {
  function stopPropogation(e: any) {
    e.stopPropagation();
  }

  return (
    <div
      onClick={stopPropogation}
      className={`modal-content m-auto ${pinkish} rounded-3xl border-8 border-primary w-fit relative min-w-[300px] md:min-w-[400px] max-w-3xl`}
    >
      {props.children}
    </div>
  );
}

function ModalContent(props: Readonly<{ children: React.ReactNode }>) {
  const { children } = props;
  return <div className="p-small md:p-normal mt-6">{children}</div>;
}

function ModalDialog(
  props: Readonly<{
    children: React.ReactNode;
    open: boolean;
    onClose?: () => void;
  }>
) {
  const { children, onClose = emptyFunction, open } = props;

  return (
    <div
      onClick={closeModal(onClose)}
      className={`${
        open ? "flex" : "hidden"
      } fixed z-50 left-0 top-0 w-full h-full overflow-auto bg-slate-900/90 shadow`}
    >
      {open ? children : null}
    </div>
  );
}

export const Modal = {
  ModalDialog,
  ModalBody,
  ModalContent,
  ModalTitle,
  ModalCloseIcon,
  ModalStars,
};
