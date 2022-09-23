import React from 'react';
import ManageModel from "./ManageModel";
import {TextField} from "@aws-amplify/ui-react";

function Page() {
  return ManageModel(
    '/tag/',
    'Tag',
    'Tags',
    [
      {
        name: 'name',
        label: 'Name',
        required: true,
        type: TextField,
        showInList: true
      }
    ]
  );
}

export default Page;