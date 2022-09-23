import React from 'react';
import ManageModel from "./ManageModel";
import {TextAreaField, TextField} from "@aws-amplify/ui-react";

function Page() {
  return ManageModel(
    '/network/',
    'Network',
    'Networks',
    [
      {
        name: 'name',
        label: 'Name',
        required: true,
        type: TextField,
        showInList: true
      },
      {
        name: 'config',
        label: 'Config',
        required: true,
        type: TextAreaField
      },
      {
        name: 'method',
        label: 'Method',
        type: TextField
      }
    ]
  );
}

export default Page;