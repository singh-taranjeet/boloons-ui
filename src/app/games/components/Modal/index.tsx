import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Icon from "../Icon";
import { Sentence } from "../Sentence";

export default function Modal(props: {
  children: React.ReactNode;
  open: boolean;
  onClose?: () => void;
  title?: string;
}) {
  const { children, onClose, open, title } = props;
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
        onClick={stopPropogation}
        className="modal-content m-auto bg-white rounded border-1 w-4/5 md:w-2/4 relative max-w-3xl"
      >
        <div className="px-5">
          {title ? <Sentence className="py-5">{title}</Sentence> : null}
          {onClose ? (
            <Icon
              icon={faXmark}
              className="absolute top-0 right-0 cursor-pointer !p-normal"
              onClick={closeModal}
            />
          ) : null}
        </div>
        <div className="px-5 pb-5">{children}</div>
      </div>
    </div>
  );
}
