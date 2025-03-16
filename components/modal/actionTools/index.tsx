import { Dispatch, SetStateAction, useEffect } from "react";
import { CiEdit, CiTrash } from "react-icons/ci";

import styles from "./index.module.scss";

interface Props {
  setOpenActionTools: Dispatch<SetStateAction<boolean>>;
  handleClickEdit: () => void;
  handleClickDelete: () => void;
};

const ActionTools = ({
  setOpenActionTools,
  handleClickEdit,
  handleClickDelete
}: Props) => {
  
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const targetNode = e.target as Node;
      const actionToolsElement = document.getElementById("action-tools");

      if (!actionToolsElement?.contains(targetNode)) {
        setOpenActionTools(false);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div id="action-tools" className={styles["action-tools"]}>
      <div className={styles["action-tools__edit-section"]}>
        <span
          onClick={handleClickEdit}
          className={styles["action-tools__edit-button"]}
        >
          수정하기
        </span>
        <CiEdit
          size={18}
          style={{
            position: "relative",
            top: "9px"
          }}
        />
      </div>
      <div className={styles["action-tools__delete-section"]}>
        <span
          onClick={handleClickDelete}
          className={styles["action-tools__delete-button"]}
        >
          삭제하기
        </span>
        <CiTrash
          size={18}
          style={{
            position: "relative",
            top: "7px"
          }}
        />
      </div>
    </div>
  );
};

export default ActionTools;
