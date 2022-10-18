import React from 'react';
import 'react-select-search/style.css';
import ImageUploader from "./ImageUploader";

export default React.forwardRef((props, ref) => {
  return ImageUploader({
    ...props,
    maxLength: 1,
    maxFileSize: 40000, // 30kb
    fileTypes: ['image/jpeg']
  }, ref);
});