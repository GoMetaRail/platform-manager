import React from 'react';
import ManageModel from "./ManageModel";
import {TextAreaField, TextField} from "@aws-amplify/ui-react";
import CategoryPicker from "./ui/CategoryPicker";
import TagPicker from "./ui/TagPicker";
import NetworkPicker from "./ui/NetworkPicker";
import IconImageUploader from "./ui/IconImageUploader";
import PreviewImageUploader from "./ui/PreviewImageUploader";

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
        name: 'iconImage',
        label: 'Icon Image',
        description: '512x410 jpg, max 40kb',
        required: true,
        type: IconImageUploader,
        isImage: true,
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
        label: 'URL',
        description: 'to open when platform is launched',
        required: true,
        type: TextField,
        showInList: true
      },
      {
        name: 'images',
        label: 'Preview Images',
        description: '1920x1080 jpg, max 300kb',
        required: false,
        showInList: true,
        showCountInList: true,
        type: PreviewImageUploader,
      },
      {
        name: 'network',
        label: 'Network',
        required: true,
        type: NetworkPicker,
        showInList: true,
        belongsTo: 'networkPlatformsId'
      }
    ],
    /* GraphQL */ `
          query ListPlatforms(
              $filter: ModelPlatformFilterInput
              $limit: Int
              $nextToken: String
          ) {
              listPlatforms(filter: $filter, limit: $limit, nextToken: $nextToken) {
                  items {
                      id
                      name
                      description
                      category {
                          id
                          name
                      }
                      network {
                          id
                          name
                      }
                      domain
                      iconImage
                      images
                      url
                      createdAt
                      updatedAt
                      categoryPlatformsId
                      networkPlatformsId
                      owner
                  }
                  nextToken
              }
          }
    `,
    /* GraphQL */ `
          query SearchPlatforms(
              $filter: SearchablePlatformFilterInput
              $sort: [SearchablePlatformSortInput]
              $limit: Int
              $nextToken: String
              $from: Int
              $aggregates: [SearchablePlatformAggregationInput]
          ) {
              searchPlatforms(
                  filter: $filter
                  sort: $sort
                  limit: $limit
                  nextToken: $nextToken
                  from: $from
                  aggregates: $aggregates
              ) {
                  items {
                      id
                      name
                      description
                      category {
                          id
                          name
                      }
                      network {
                          id
                          name
                      }
                      domain
                      iconImage
                      images
                      url
                      createdAt
                      updatedAt
                      categoryPlatformsId
                      networkPlatformsId
                      owner
                  }
                  nextToken
                  total
                  aggregateItems {
                      name
                      result {
                          ... on SearchableAggregateScalarResult {
                              value
                          }
                          ... on SearchableAggregateBucketResult {
                              buckets {
                                  key
                                  doc_count
                              }
                          }
                      }
                  }
              }
          }
    `
  );
}

export default Page;