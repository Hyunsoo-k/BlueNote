import React, { useEffect } from "react";
import ReactQuill from "react-quill";

import styles from "./index.module.scss";

import "react-quill/dist/quill.snow.css";

interface Props {
  wysiwygRef: any;
  initialContent?: any
};

const Wysiwyg = ({ wysiwygRef, initialContent }: Props) => {
  useEffect(() => {
    wysiwygRef.current?.editor.root.setAttribute("spellcheck", "false");
  }, []);

  const modules = {
    toolbar: [
      [{ size: ["small", false, "large", "huge"] }],  
      ["link", "image"],
    ],
  };

  const handleClickContent = () => {
    if (wysiwygRef.current) {
      wysiwygRef.current.focus();
    }
  };

  return (
    <div onClick={handleClickContent} className={styles["wisiwg"]}>
      <ReactQuill
        ref={wysiwygRef}
        theme="snow"
        modules={modules}
        value={initialContent ? initialContent : null}
        placeholder="내용을 입력하세요."
      />
    </div>
  );
};

export default Wysiwyg;
