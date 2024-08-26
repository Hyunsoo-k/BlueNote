import dynamic from "next/dynamic";
import React, { useRef, forwardRef } from "react";

import "@toast-ui/editor/dist/toastui-editor.css";

const Editor = dynamic(() => import("@toast-ui/react-editor").then((mod) => mod.Editor), { ssr: false });

const WysiwygEditor = forwardRef((props, ref) => {

  return (
    <>
      <Editor
        ref={ref}
        height="400px"
        initialEditType="wysiwyg"
        previewStyle="vertical"
        initialValue="내용을 입력해주세요"
        hideModeSwitch={true}
        useCommandShortcut={true}
      />
    </>
  );
});

export default WysiwygEditor;
