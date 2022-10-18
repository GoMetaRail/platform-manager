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
        showInList: false,
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
        showInList: false
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
        label: 'Icon Image (512x410, max 40kb)',
        required: true,
        type: IconImageUploader,
        isImage: true,
        showInList: true
      },
      // {
      //   name: 'images',
      //   label: 'Preview Image (1920x1080, max 300kb)',
      //   required: true,
      //   type: IconImageUploader,
      //   showInList: true
      // },
      {
        name: 'network',
        label: 'Network',
        required: true,
        type: NetworkPicker,
        showInList: false,
        belongsTo: 'networkPlatformsId'
      }
    ]
  );
}

export default Page;