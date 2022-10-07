import React from 'react';
import 'react-select-search/style.css';
import ModelPicker from "./ModelPicker";

function TagPicker(props) {
  return ModelPicker({
    ...props,
    maxLength: 3,
    itemNameSingular: 'Tag',
    itemNamePlural: 'Tags'
  });
}

export default TagPicker;