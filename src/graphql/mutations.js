/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createPlatform = /* GraphQL */ `
  mutation CreatePlatform(
    $input: CreatePlatformInput!
    $condition: ModelPlatformConditionInput
  ) {
    createPlatform(input: $input, condition: $condition) {
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
      images
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
export const updatePlatform = /* GraphQL */ `
  mutation UpdatePlatform(
    $input: UpdatePlatformInput!
    $condition: ModelPlatformConditionInput
  ) {
    updatePlatform(input: $input, condition: $condition) {
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
      images
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
export const deletePlatform = /* GraphQL */ `
  mutation DeletePlatform(
    $input: DeletePlatformInput!
    $condition: ModelPlatformConditionInput
  ) {
    deletePlatform(input: $input, condition: $condition) {
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
      images
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
export const createCategory = /* GraphQL */ `
  mutation CreateCategory(
    $input: CreateCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    createCategory(input: $input, condition: $condition) {
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
export const updateCategory = /* GraphQL */ `
  mutation UpdateCategory(
    $input: UpdateCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    updateCategory(input: $input, condition: $condition) {
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
export const deleteCategory = /* GraphQL */ `
  mutation DeleteCategory(
    $input: DeleteCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    deleteCategory(input: $input, condition: $condition) {
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
export const createTag = /* GraphQL */ `
  mutation CreateTag(
    $input: CreateTagInput!
    $condition: ModelTagConditionInput
  ) {
    createTag(input: $input, condition: $condition) {
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
export const updateTag = /* GraphQL */ `
  mutation UpdateTag(
    $input: UpdateTagInput!
    $condition: ModelTagConditionInput
  ) {
    updateTag(input: $input, condition: $condition) {
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
export const deleteTag = /* GraphQL */ `
  mutation DeleteTag(
    $input: DeleteTagInput!
    $condition: ModelTagConditionInput
  ) {
    deleteTag(input: $input, condition: $condition) {
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
export const createNetwork = /* GraphQL */ `
  mutation CreateNetwork(
    $input: CreateNetworkInput!
    $condition: ModelNetworkConditionInput
  ) {
    createNetwork(input: $input, condition: $condition) {
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
export const updateNetwork = /* GraphQL */ `
  mutation UpdateNetwork(
    $input: UpdateNetworkInput!
    $condition: ModelNetworkConditionInput
  ) {
    updateNetwork(input: $input, condition: $condition) {
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
export const deleteNetwork = /* GraphQL */ `
  mutation DeleteNetwork(
    $input: DeleteNetworkInput!
    $condition: ModelNetworkConditionInput
  ) {
    deleteNetwork(input: $input, condition: $condition) {
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
export const createPlatformTags = /* GraphQL */ `
  mutation CreatePlatformTags(
    $input: CreatePlatformTagsInput!
    $condition: ModelPlatformTagsConditionInput
  ) {
    createPlatformTags(input: $input, condition: $condition) {
      id
      platformID
      tagID
      platform {
        id
        name
        description
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
export const updatePlatformTags = /* GraphQL */ `
  mutation UpdatePlatformTags(
    $input: UpdatePlatformTagsInput!
    $condition: ModelPlatformTagsConditionInput
  ) {
    updatePlatformTags(input: $input, condition: $condition) {
      id
      platformID
      tagID
      platform {
        id
        name
        description
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
export const deletePlatformTags = /* GraphQL */ `
  mutation DeletePlatformTags(
    $input: DeletePlatformTagsInput!
    $condition: ModelPlatformTagsConditionInput
  ) {
    deletePlatformTags(input: $input, condition: $condition) {
      id
      platformID
      tagID
      platform {
        id
        name
        description
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
