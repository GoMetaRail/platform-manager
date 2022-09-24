import React from 'react';
import SelectSearch from "react-select-search";
import 'react-select-search/style.css';
import {SearchField} from "@aws-amplify/ui-react";

function CategoryPicker() {
  const options = [
    {name: 'Swedish', value: 'sv'},
    {name: 'English', value: 'en'},
    {
      type: 'group',
      name: 'Group name',
      items: [
        {name: 'Spanish', value: 'es'},
      ]
    },
  ];

  return (
    <SearchField
      label="Search"
      placeholder="Search here..."
      autoComplete="false"
      onSubmit={(q) => {
        alert(q);
      }}
    />

    /*<SelectSearch
        options={options}
        value="sv"
        name="language"
        placeholder="Choose your language"
      />*/
  );
}

export default CategoryPicker;