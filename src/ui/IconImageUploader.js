import React from 'react';
import 'react-select-search/style.css';
import ImageUploader from "./ImageUploader";

function IconImageUploader(props) {
  return ImageUploader({
    ...props,
    maxLength: 1,
    fileSize: 2000000, // 2mb
    fileTypes: ['image/png', 'image/jpeg'],
    itemNameSingular: 'Icon',
    itemNamePlural: 'Icons'
  });
}

export default IconImageUploader;