import React, {useImperativeHandle, useState} from 'react';
import 'react-select-search/style.css';
import {TextField} from "@aws-amplify/ui-react";
import moment from "moment";

export default React.forwardRef((props, ref) => {
  function DateTimeInput(props, ref) {
    const {onChange, isDisabled, isRequired, name, value, maxLength, itemNameSingular, itemNamePlural} = props;
    const [dateValue, setDateValue] = useState(moment(value).format('yyyy-MM-DDTkk:mm'));
    useImperativeHandle(ref, () => ({}));

    function transformValue(value) {
      let date = null;
      if (value.length > 0) {
        date = new Date(value).toISOString();
      }

      onChange({
        target: {
          'type': 'input',
          name: name,
          value: date
        }
      });

      setDateValue(moment(date).format('yyyy-MM-DDTkk:mm'));
    }

    let inputProps = {
      ...props
    }
    delete inputProps.onChange;
    delete inputProps.value;
    return (
      <TextField
        type="datetime-local"
        value={dateValue}
        onChange={(e) => transformValue(e.target.value)}
        {...inputProps}
      />
    );
  }

  return DateTimeInput(props, ref);
});