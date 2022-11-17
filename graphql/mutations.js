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
        symbol
        image
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
        symbol
        image
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
        symbol
        image
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
export const createFeaturedEvent = /* GraphQL */ `
  mutation CreateFeaturedEvent(
    $input: CreateFeaturedEventInput!
    $condition: ModelFeaturedEventConditionInput
  ) {
    createFeaturedEvent(input: $input, condition: $condition) {
      id
      name
      description
      schedules {
        id
        date
        createdAt
        updatedAt
        owner
      }
      liveFrom
      liveTo
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateFeaturedEvent = /* GraphQL */ `
  mutation UpdateFeaturedEvent(
    $input: UpdateFeaturedEventInput!
    $condition: ModelFeaturedEventConditionInput
  ) {
    updateFeaturedEvent(input: $input, condition: $condition) {
      id
      name
      description
      schedules {
        id
        date
        createdAt
        updatedAt
        owner
      }
      liveFrom
      liveTo
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteFeaturedEvent = /* GraphQL */ `
  mutation DeleteFeaturedEvent(
    $input: DeleteFeaturedEventInput!
    $condition: ModelFeaturedEventConditionInput
  ) {
    deleteFeaturedEvent(input: $input, condition: $condition) {
      id
      name
      description
      schedules {
        id
        date
        createdAt
        updatedAt
        owner
      }
      liveFrom
      liveTo
      createdAt
      updatedAt
      owner
    }
  }
`;
export const createSchedule = /* GraphQL */ `
  mutation CreateSchedule(
    $input: CreateScheduleInput!
    $condition: ModelScheduleConditionInput
  ) {
    createSchedule(input: $input, condition: $condition) {
      id
      date
      platformAgenda {
        id
        description
        date
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateSchedule = /* GraphQL */ `
  mutation UpdateSchedule(
    $input: UpdateScheduleInput!
    $condition: ModelScheduleConditionInput
  ) {
    updateSchedule(input: $input, condition: $condition) {
      id
      date
      platformAgenda {
        id
        description
        date
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteSchedule = /* GraphQL */ `
  mutation DeleteSchedule(
    $input: DeleteScheduleInput!
    $condition: ModelScheduleConditionInput
  ) {
    deleteSchedule(input: $input, condition: $condition) {
      id
      date
      platformAgenda {
        id
        description
        date
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const createPlatformAgenda = /* GraphQL */ `
  mutation CreatePlatformAgenda(
    $input: CreatePlatformAgendaInput!
    $condition: ModelPlatformAgendaConditionInput
  ) {
    createPlatformAgenda(input: $input, condition: $condition) {
      id
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
      description
      date
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updatePlatformAgenda = /* GraphQL */ `
  mutation UpdatePlatformAgenda(
    $input: UpdatePlatformAgendaInput!
    $condition: ModelPlatformAgendaConditionInput
  ) {
    updatePlatformAgenda(input: $input, condition: $condition) {
      id
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
      description
      date
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deletePlatformAgenda = /* GraphQL */ `
  mutation DeletePlatformAgenda(
    $input: DeletePlatformAgendaInput!
    $condition: ModelPlatformAgendaConditionInput
  ) {
    deletePlatformAgenda(input: $input, condition: $condition) {
      id
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
      description
      date
      createdAt
      updatedAt
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
      symbol
      image
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
      symbol
      image
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
      symbol
      image
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
