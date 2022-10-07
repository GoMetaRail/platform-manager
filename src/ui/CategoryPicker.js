import React from 'react';
import 'react-select-search/style.css';
import ModelPicker from "./ModelPicker";

function CategoryPicker(props) {
  return ModelPicker({
    ...props,
    maxLength: 1,
    itemNameSingular: 'Category',
    itemNamePlural: 'Categories'
  });
}

export default CategoryPicker;