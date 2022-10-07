/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPlatform = /* GraphQL */ `
  query GetPlatform($id: ID!) {
    getPlatform(id: $id) {
      id
      name
      category {
        id
        name
        createdAt
        updatedAt
      }
      description
      tags {
        nextToken
      }
      domain
      iconImage
      network {
        id
        name
        config
        method
        createdAt
        updatedAt
      }
      url
      createdAt
      updatedAt
      categoryPlatformsId
      networkPlatformsId
      owner
    }
  }
`;
export const listPlatforms = /* GraphQL */ `
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
        domain
        iconImage
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
`;
export const searchPlatforms = /* GraphQL */ `
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
        domain
        iconImage
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
`;
export const getCategory = /* GraphQL */ `
  query GetCategory($id: ID!) {
    getCategory(id: $id) {
      id
      name
      platforms {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listCategories = /* GraphQL */ `
  query ListCategories(
    $filter: ModelCategoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCategories(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const searchCategories = /* GraphQL */ `
  query SearchCategories(
    $filter: SearchableCategoryFilterInput
    $sort: [SearchableCategorySortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableCategoryAggregationInput]
  ) {
    searchCategories(
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
        createdAt
        updatedAt
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
`;
export const getTag = /* GraphQL */ `
  query GetTag($id: ID!) {
    getTag(id: $id) {
      id
      name
      platforms {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listTags = /* GraphQL */ `
  query ListTags(
    $filter: ModelTagFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTags(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const searchTags = /* GraphQL */ `
  query SearchTags(
    $filter: SearchableTagFilterInput
    $sort: [SearchableTagSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableTagAggregationInput]
  ) {
    searchTags(
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
        createdAt
        updatedAt
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
`;
export const getNetwork = /* GraphQL */ `
  query GetNetwork($id: ID!) {
    getNetwork(id: $id) {
      id
      name
      config
      method
      platforms {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listNetworks = /* GraphQL */ `
  query ListNetworks(
    $filter: ModelNetworkFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNetworks(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        config
        method
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const searchNetworks = /* GraphQL */ `
  query SearchNetworks(
    $filter: SearchableNetworkFilterInput
    $sort: [SearchableNetworkSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableNetworkAggregationInput]
  ) {
    searchNetworks(
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
        config
        method
        createdAt
        updatedAt
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
`;
export const getPlatformTags = /* GraphQL */ `
  query GetPlatformTags($id: ID!) {
    getPlatformTags(id: $id) {
      id
      platformID
      tagID
      platform {
        id
        name
        description
        domain
        iconImage
        url
        createdAt
        updatedAt
        categoryPlatformsId
        networkPlatformsId
        owner
      }
      tag {
        id
        name
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listPlatformTags = /* GraphQL */ `
  query ListPlatformTags(
    $filter: ModelPlatformTagsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPlatformTags(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        platformID
        tagID
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
