import React from 'react';
import ManageModel from "./ManageModel";
import {TextAreaField, TextField} from "@aws-amplify/ui-react";
import CategoryPicker from "./ui/CategoryPicker";
import TagPicker from "./ui/TagPicker";
import NetworkPicker from "./ui/NetworkPicker";
import IconImageUploader from "./ui/IconImageUploader";

function Page() {
  return ManageModel(
    '/platform/',
    'Platform',
    'Platforms',
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
        name: 'category',
        label: 'Category',
        required: true,
        type: CategoryPicker,
        showInList: true,
        belongsTo: 'categoryPlatformsId'
      },
      {
        name: 'tags',
        label: 'Tags',
        type: TagPicker,
        showInList: true,
        manyToMany: {
          relationship: 'PlatformTags',
          id: 'tagID'
        }
      },
      {
        name: 'domain',
        label: 'Domain',
        required: true,
        type: TextField,
        showInList: true
      },
      {
        name: 'url',
        label: 'URL (to open when platform is launched)',
        required: true,
        type: TextField,
        showInList: true
      },
      {
        name: 'iconImage',
        label: 'Icon Image',
        required: true,
        type: IconImageUploader,
        showInList: true
      },
      // todo: add uploader
      // {
      //   name: 'images',
      //   label: 'Images',
      //   type: TextField
      // },
      {
        name: 'network',
        label: 'Network',
        required: true,
        type: NetworkPicker,
        showInList: true,
        belongsTo: 'networkPlatformsId'
      }
    ]
  );
}

export default Page;