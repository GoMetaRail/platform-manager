import React from 'react';
import ManageModel from "./ManageModel";
import {TextAreaField, TextField} from "@aws-amplify/ui-react";
import NetworkImageUploader from "./ui/NetworkImageUploader";

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
        name: 'symbol',
        label: 'Symbol',
        description: 'example: ETH',
        required: true,
        type: TextField,
        showInList: true
      },
      {
        name: 'image',
        label: 'Image',
        description: '60x60 png, transparent background, max 20kb',
        required: true,
        type: NetworkImageUploader,
        isImage: true,
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