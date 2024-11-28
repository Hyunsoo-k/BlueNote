import React from "react";
import ReactQuill from "react-quill";

import styles from "./index.module.scss";

import "react-quill/dist/quill.snow.css";

interface Props {
  wysiwygRef: any;
};

const Wysiwyg = ({ wysiwygRef }: Props) => {
  const modules = {
    toolbar: [
      [{ size: ["small", false, "large", "huge"] }],
      [{ color: [] }, { background: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
      ["link", "image"],
    ],
  };

  const formats = [
    "size",
    "color",
    "background",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  return (
    <ReactQuill
      ref={wysiwygRef}
      theme="snow"
      modules={modules}
      formats={formats}
      style={{ minHeight: "600px", margin: "4px" }}
      placeholder="내용을 입력하세요."
    />
  );
};

export default Wysiwyg;