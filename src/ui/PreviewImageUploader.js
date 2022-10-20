import React from 'react';
import 'react-select-search/style.css';
import ImageUploader from "./ImageUploader";

export default React.forwardRef((props, ref) => {
  return ImageUploader({
    ...props,
    maxLength: 4,
    maxFileSize: 300000, // 300kb
    fileTypes: ['image/jpeg']
  }, ref);
});