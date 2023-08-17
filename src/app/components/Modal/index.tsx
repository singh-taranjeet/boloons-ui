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
        className="modal-content m-auto bg-white rounded-3xl border-8 border-primary w-4/5 md:w-2/4 relative max-w-3xl"
      >
        <div className="min-w-full">
          {title ? (
            <div
              className="flex-center w-full absolute"
              style={{ top: "-1.5rem" }}
            >
              <div className="p-rectangle-normal w-fit mx-auto rounded-full bg-white border-4 border-primary px-normal">
                <Sentence className="text-center">{title}</Sentence>
              </div>
            </div>
          ) : null}
          {onClose ? (
            <Icon
              icon={faXmark}
              className="absolute top-0 right-0 cursor-pointer"
              onClick={closeModal}
            />
          ) : null}
        </div>
        <div className="p-small md:p-normal mt-6">{children}</div>
      </div>
    </div>
  );
}
