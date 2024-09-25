import React from 'react';
import { Editor } from '@toast-ui/react-editor';

import '@toast-ui/editor/dist/toastui-editor.css';

interface Props {
  editorRef: React.RefObject<Editor>;
  initialContent?: any;
}

const WysiwygEditor = ({ editorRef, initialContent }: Props) => {
  const toolbarItems = [
    ['heading', 'bold'],
    ['hr', 'quote'],
    [],
    ['image', 'link'],
    [],
    ['scrollSync'],
  ]

  return (
    <Editor
      ref={editorRef}
      initialValue={initialContent || " "}
      previewStyle="vertical"
      height="500px"
      initialEditType="wysiwyg"
      useCommandShortcut
      toolbarItems={toolbarItems}
      hideModeSwitch={true}
    />
  );
};

export default WysiwygEditor;