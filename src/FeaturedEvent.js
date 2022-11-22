import React from 'react';
import ManageModel from "./ManageModel";
import {TextAreaField, TextField} from "@aws-amplify/ui-react";
import DateTimeInput from "./ui/DateTimeInput";

function Page() {
  return ManageModel(
    '/event/',
    'Featured Event',
    'Featured Events',
    [
      {
        name: 'name',
        label: 'Name',
        required: true,
        type: TextField,
        showInList: true
      },
      {
        name: 'description',
        label: 'Description',
        type: TextAreaField,
        showInList: true
      },
      {
        name: 'liveFrom',
        label: 'Starts at',
        type: DateTimeInput,
        showInList: true,
        isDateTime: true
      },
      {
        name: 'liveTo',
        label: 'Ends at',
        type: DateTimeInput,
        showInList: true,
        isDateTime: true
      },
      // todo: Add Schedules object
    ]
  );
}

export default Page;