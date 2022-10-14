import React from 'react';
import 'react-select-search/style.css';
import ModelPicker from "./ModelPicker";

export default React.forwardRef((props, ref) => {
  return ModelPicker({
    ...props,
    maxLength: 3,
    itemNameSingular: 'Tag',
    itemNamePlural: 'Tags'
  }, ref);
});