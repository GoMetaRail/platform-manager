/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreatePlatform = /* GraphQL */ `
  subscription OnCreatePlatform($owner: String) {
    onCreatePlatform(owner: $owner) {
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
export const onUpdatePlatform = /* GraphQL */ `
  subscription OnUpdatePlatform($owner: String) {
    onUpdatePlatform(owner: $owner) {
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
export const onDeletePlatform = /* GraphQL */ `
  subscription OnDeletePlatform($owner: String) {
    onDeletePlatform(owner: $owner) {
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
export const onCreateCategory = /* GraphQL */ `
  subscription OnCreateCategory {
    onCreateCategory {
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
export const onUpdateCategory = /* GraphQL */ `
  subscription OnUpdateCategory {
    onUpdateCategory {
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
export const onDeleteCategory = /* GraphQL */ `
  subscription OnDeleteCategory {
    onDeleteCategory {
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
export const onCreateTag = /* GraphQL */ `
  subscription OnCreateTag {
    onCreateTag {
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
export const onUpdateTag = /* GraphQL */ `
  subscription OnUpdateTag {
    onUpdateTag {
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
export const onDeleteTag = /* GraphQL */ `
  subscription OnDeleteTag {
    onDeleteTag {
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
export const onCreateNetwork = /* GraphQL */ `
  subscription OnCreateNetwork {
    onCreateNetwork {
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
export const onUpdateNetwork = /* GraphQL */ `
  subscription OnUpdateNetwork {
    onUpdateNetwork {
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
export const onDeleteNetwork = /* GraphQL */ `
  subscription OnDeleteNetwork {
    onDeleteNetwork {
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
export const onCreatePlatformTags = /* GraphQL */ `
  subscription OnCreatePlatformTags($owner: String) {
    onCreatePlatformTags(owner: $owner) {
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
export const onUpdatePlatformTags = /* GraphQL */ `
  subscription OnUpdatePlatformTags($owner: String) {
    onUpdatePlatformTags(owner: $owner) {
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
export const onDeletePlatformTags = /* GraphQL */ `
  subscription OnDeletePlatformTags($owner: String) {
    onDeletePlatformTags(owner: $owner) {
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
