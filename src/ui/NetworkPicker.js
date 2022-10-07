import React from 'react';
import 'react-select-search/style.css';
import ModelPicker from "./ModelPicker";

function NetworkPicker(props) {
  return ModelPicker({
    ...props,
    maxLength: 1,
    itemNameSingular: 'Network',
    itemNamePlural: 'Networks'
  });
}

export default NetworkPicker;