/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreatePlatformInput = {
  id?: string | null,
  name: string,
  description?: string | null,
  domain: string,
  iconImage?: string | null,
  images?: Array< string | null > | null,
  url: string,
  categoryPlatformsId?: string | null,
  networkPlatformsId?: string | null,
};

export type ModelPlatformConditionInput = {
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  domain?: ModelStringInput | null,
  iconImage?: ModelStringInput | null,
  images?: ModelStringInput | null,
  url?: ModelStringInput | null,
  and?: Array< ModelPlatformConditionInput | null > | null,
  or?: Array< ModelPlatformConditionInput | null > | null,
  not?: ModelPlatformConditionInput | null,
  categoryPlatformsId?: ModelIDInput | null,
  networkPlatformsId?: ModelIDInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type Platform = {
  __typename: "Platform",
  id: string,
  name: string,
  category: Category,
  description?: string | null,
  tags?: ModelPlatformTagsConnection | null,
  domain: string,
  iconImage?: string | null,
  images?: Array< string | null > | null,
  network: Network,
  url: string,
  createdAt: string,
  updatedAt: string,
  categoryPlatformsId?: string | null,
  networkPlatformsId?: string | null,
  owner?: string | null,
};

export type Category = {
  __typename: "Category",
  id: string,
  name: string,
  platforms?: ModelPlatformConnection | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelPlatformConnection = {
  __typename: "ModelPlatformConnection",
  items:  Array<Platform | null >,
  nextToken?: string | null,
};

export type ModelPlatformTagsConnection = {
  __typename: "ModelPlatformTagsConnection",
  items:  Array<PlatformTags | null >,
  nextToken?: string | null,
};

export type PlatformTags = {
  __typename: "PlatformTags",
  id: string,
  platformID: string,
  tagID: string,
  platform: Platform,
  tag: Tag,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type Tag = {
  __typename: "Tag",
  id: string,
  name: string,
  platforms?: ModelPlatformTagsConnection | null,
  createdAt: string,
  updatedAt: string,
};

export type Network = {
  __typename: "Network",
  id: string,
  name: string,
  symbol: string,
  image: string,
  config: string,
  method?: string | null,
  platforms?: ModelPlatformConnection | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdatePlatformInput = {
  id: string,
  name?: string | null,
  description?: string | null,
  domain?: string | null,
  iconImage?: string | null,
  images?: Array< string | null > | null,
  url?: string | null,
  categoryPlatformsId?: string | null,
  networkPlatformsId?: string | null,
};

export type DeletePlatformInput = {
  id: string,
};

export type CreateCategoryInput = {
  id?: string | null,
  name: string,
};

export type ModelCategoryConditionInput = {
  name?: ModelStringInput | null,
  and?: Array< ModelCategoryConditionInput | null > | null,
  or?: Array< ModelCategoryConditionInput | null > | null,
  not?: ModelCategoryConditionInput | null,
};

export type UpdateCategoryInput = {
  id: string,
  name?: string | null,
};

export type DeleteCategoryInput = {
  id: string,
};

export type CreateTagInput = {
  id?: string | null,
  name: string,
};

export type ModelTagConditionInput = {
  name?: ModelStringInput | null,
  and?: Array< ModelTagConditionInput | null > | null,
  or?: Array< ModelTagConditionInput | null > | null,
  not?: ModelTagConditionInput | null,
};

export type UpdateTagInput = {
  id: string,
  name?: string | null,
};

export type DeleteTagInput = {
  id: string,
};

export type CreateNetworkInput = {
  id?: string | null,
  name: string,
  symbol: string,
  image: string,
  config: string,
  method?: string | null,
};

export type ModelNetworkConditionInput = {
  name?: ModelStringInput | null,
  symbol?: ModelStringInput | null,
  image?: ModelStringInput | null,
  config?: ModelStringInput | null,
  method?: ModelStringInput | null,
  and?: Array< ModelNetworkConditionInput | null > | null,
  or?: Array< ModelNetworkConditionInput | null > | null,
  not?: ModelNetworkConditionInput | null,
};

export type UpdateNetworkInput = {
  id: string,
  name?: string | null,
  symbol?: string | null,
  image?: string | null,
  config?: string | null,
  method?: string | null,
};

export type DeleteNetworkInput = {
  id: string,
};

export type CreatePlatformTagsInput = {
  id?: string | null,
  platformID: string,
  tagID: string,
};

export type ModelPlatformTagsConditionInput = {
  platformID?: ModelIDInput | null,
  tagID?: ModelIDInput | null,
  and?: Array< ModelPlatformTagsConditionInput | null > | null,
  or?: Array< ModelPlatformTagsConditionInput | null > | null,
  not?: ModelPlatformTagsConditionInput | null,
};

export type UpdatePlatformTagsInput = {
  id: string,
  platformID?: string | null,
  tagID?: string | null,
};

export type DeletePlatformTagsInput = {
  id: string,
};

export type ModelPlatformFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  domain?: ModelStringInput | null,
  iconImage?: ModelStringInput | null,
  images?: ModelStringInput | null,
  url?: ModelStringInput | null,
  and?: Array< ModelPlatformFilterInput | null > | null,
  or?: Array< ModelPlatformFilterInput | null > | null,
  not?: ModelPlatformFilterInput | null,
  categoryPlatformsId?: ModelIDInput | null,
  networkPlatformsId?: ModelIDInput | null,
};

export type SearchablePlatformFilterInput = {
  id?: SearchableIDFilterInput | null,
  name?: SearchableStringFilterInput | null,
  description?: SearchableStringFilterInput | null,
  domain?: SearchableStringFilterInput | null,
  iconImage?: SearchableStringFilterInput | null,
  images?: SearchableStringFilterInput | null,
  url?: SearchableStringFilterInput | null,
  createdAt?: SearchableStringFilterInput | null,
  updatedAt?: SearchableStringFilterInput | null,
  categoryPlatformsId?: SearchableIDFilterInput | null,
  networkPlatformsId?: SearchableIDFilterInput | null,
  and?: Array< SearchablePlatformFilterInput | null > | null,
  or?: Array< SearchablePlatformFilterInput | null > | null,
  not?: SearchablePlatformFilterInput | null,
};

export type SearchableIDFilterInput = {
  ne?: string | null,
  gt?: string | null,
  lt?: string | null,
  gte?: string | null,
  lte?: string | null,
  eq?: string | null,
  match?: string | null,
  matchPhrase?: string | null,
  matchPhrasePrefix?: string | null,
  multiMatch?: string | null,
  exists?: boolean | null,
  wildcard?: string | null,
  regexp?: string | null,
  range?: Array< string | null > | null,
};

export type SearchableStringFilterInput = {
  ne?: string | null,
  gt?: string | null,
  lt?: string | null,
  gte?: string | null,
  lte?: string | null,
  eq?: string | null,
  match?: string | null,
  matchPhrase?: string | null,
  matchPhrasePrefix?: string | null,
  multiMatch?: string | null,
  exists?: boolean | null,
  wildcard?: string | null,
  regexp?: string | null,
  range?: Array< string | null > | null,
};

export type SearchablePlatformSortInput = {
  field?: SearchablePlatformSortableFields | null,
  direction?: SearchableSortDirection | null,
};

export enum SearchablePlatformSortableFields {
  id = "id",
  name = "name",
  description = "description",
  domain = "domain",
  iconImage = "iconImage",
  images = "images",
  url = "url",
  createdAt = "createdAt",
  updatedAt = "updatedAt",
  categoryPlatformsId = "categoryPlatformsId",
  networkPlatformsId = "networkPlatformsId",
}


export enum SearchableSortDirection {
  asc = "asc",
  desc = "desc",
}


export type SearchablePlatformAggregationInput = {
  name: string,
  type: SearchableAggregateType,
  field: SearchablePlatformAggregateField,
};

export enum SearchableAggregateType {
  terms = "terms",
  avg = "avg",
  min = "min",
  max = "max",
  sum = "sum",
}


export enum SearchablePlatformAggregateField {
  id = "id",
  name = "name",
  description = "description",
  domain = "domain",
  iconImage = "iconImage",
  images = "images",
  url = "url",
  createdAt = "createdAt",
  updatedAt = "updatedAt",
  categoryPlatformsId = "categoryPlatformsId",
  networkPlatformsId = "networkPlatformsId",
}


export type SearchablePlatformConnection = {
  __typename: "SearchablePlatformConnection",
  items:  Array<Platform | null >,
  nextToken?: string | null,
  total?: number | null,
  aggregateItems:  Array<SearchableAggregateResult | null >,
};

export type SearchableAggregateResult = {
  __typename: "SearchableAggregateResult",
  name: string,
  result?: SearchableAggregateGenericResult | null,
};

export type SearchableAggregateGenericResult = SearchableAggregateScalarResult | SearchableAggregateBucketResult


export type SearchableAggregateScalarResult = {
  __typename: "SearchableAggregateScalarResult",
  value: number,
};

export type SearchableAggregateBucketResult = {
  __typename: "SearchableAggregateBucketResult",
  buckets?:  Array<SearchableAggregateBucketResultItem | null > | null,
};

export type SearchableAggregateBucketResultItem = {
  __typename: "SearchableAggregateBucketResultItem",
  key: string,
  doc_count: number,
};

export type ModelCategoryFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  and?: Array< ModelCategoryFilterInput | null > | null,
  or?: Array< ModelCategoryFilterInput | null > | null,
  not?: ModelCategoryFilterInput | null,
};

export type ModelCategoryConnection = {
  __typename: "ModelCategoryConnection",
  items:  Array<Category | null >,
  nextToken?: string | null,
};

export type SearchableCategoryFilterInput = {
  id?: SearchableIDFilterInput | null,
  name?: SearchableStringFilterInput | null,
  createdAt?: SearchableStringFilterInput | null,
  updatedAt?: SearchableStringFilterInput | null,
  and?: Array< SearchableCategoryFilterInput | null > | null,
  or?: Array< SearchableCategoryFilterInput | null > | null,
  not?: SearchableCategoryFilterInput | null,
};

export type SearchableCategorySortInput = {
  field?: SearchableCategorySortableFields | null,
  direction?: SearchableSortDirection | null,
};

export enum SearchableCategorySortableFields {
  id = "id",
  name = "name",
  createdAt = "createdAt",
  updatedAt = "updatedAt",
}


export type SearchableCategoryAggregationInput = {
  name: string,
  type: SearchableAggregateType,
  field: SearchableCategoryAggregateField,
};

export enum SearchableCategoryAggregateField {
  id = "id",
  name = "name",
  createdAt = "createdAt",
  updatedAt = "updatedAt",
}


export type SearchableCategoryConnection = {
  __typename: "SearchableCategoryConnection",
  items:  Array<Category | null >,
  nextToken?: string | null,
  total?: number | null,
  aggregateItems:  Array<SearchableAggregateResult | null >,
};

export type ModelTagFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  and?: Array< ModelTagFilterInput | null > | null,
  or?: Array< ModelTagFilterInput | null > | null,
  not?: ModelTagFilterInput | null,
};

export type ModelTagConnection = {
  __typename: "ModelTagConnection",
  items:  Array<Tag | null >,
  nextToken?: string | null,
};

export type SearchableTagFilterInput = {
  id?: SearchableIDFilterInput | null,
  name?: SearchableStringFilterInput | null,
  createdAt?: SearchableStringFilterInput | null,
  updatedAt?: SearchableStringFilterInput | null,
  and?: Array< SearchableTagFilterInput | null > | null,
  or?: Array< SearchableTagFilterInput | null > | null,
  not?: SearchableTagFilterInput | null,
};

export type SearchableTagSortInput = {
  field?: SearchableTagSortableFields | null,
  direction?: SearchableSortDirection | null,
};

export enum SearchableTagSortableFields {
  id = "id",
  name = "name",
  createdAt = "createdAt",
  updatedAt = "updatedAt",
}


export type SearchableTagAggregationInput = {
  name: string,
  type: SearchableAggregateType,
  field: SearchableTagAggregateField,
};

export enum SearchableTagAggregateField {
  id = "id",
  name = "name",
  createdAt = "createdAt",
  updatedAt = "updatedAt",
}


export type SearchableTagConnection = {
  __typename: "SearchableTagConnection",
  items:  Array<Tag | null >,
  nextToken?: string | null,
  total?: number | null,
  aggregateItems:  Array<SearchableAggregateResult | null >,
};

export type ModelNetworkFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  symbol?: ModelStringInput | null,
  image?: ModelStringInput | null,
  config?: ModelStringInput | null,
  method?: ModelStringInput | null,
  and?: Array< ModelNetworkFilterInput | null > | null,
  or?: Array< ModelNetworkFilterInput | null > | null,
  not?: ModelNetworkFilterInput | null,
};

export type ModelNetworkConnection = {
  __typename: "ModelNetworkConnection",
  items:  Array<Network | null >,
  nextToken?: string | null,
};

export type SearchableNetworkFilterInput = {
  id?: SearchableIDFilterInput | null,
  name?: SearchableStringFilterInput | null,
  symbol?: SearchableStringFilterInput | null,
  image?: SearchableStringFilterInput | null,
  config?: SearchableStringFilterInput | null,
  method?: SearchableStringFilterInput | null,
  createdAt?: SearchableStringFilterInput | null,
  updatedAt?: SearchableStringFilterInput | null,
  and?: Array< SearchableNetworkFilterInput | null > | null,
  or?: Array< SearchableNetworkFilterInput | null > | null,
  not?: SearchableNetworkFilterInput | null,
};

export type SearchableNetworkSortInput = {
  field?: SearchableNetworkSortableFields | null,
  direction?: SearchableSortDirection | null,
};

export enum SearchableNetworkSortableFields {
  id = "id",
  name = "name",
  symbol = "symbol",
  image = "image",
  config = "config",
  method = "method",
  createdAt = "createdAt",
  updatedAt = "updatedAt",
}


export type SearchableNetworkAggregationInput = {
  name: string,
  type: SearchableAggregateType,
  field: SearchableNetworkAggregateField,
};

export enum SearchableNetworkAggregateField {
  id = "id",
  name = "name",
  symbol = "symbol",
  image = "image",
  config = "config",
  method = "method",
  createdAt = "createdAt",
  updatedAt = "updatedAt",
}


export type SearchableNetworkConnection = {
  __typename: "SearchableNetworkConnection",
  items:  Array<Network | null >,
  nextToken?: string | null,
  total?: number | null,
  aggregateItems:  Array<SearchableAggregateResult | null >,
};

export type ModelPlatformTagsFilterInput = {
  id?: ModelIDInput | null,
  platformID?: ModelIDInput | null,
  tagID?: ModelIDInput | null,
  and?: Array< ModelPlatformTagsFilterInput | null > | null,
  or?: Array< ModelPlatformTagsFilterInput | null > | null,
  not?: ModelPlatformTagsFilterInput | null,
};

export type CreatePlatformMutationVariables = {
  input: CreatePlatformInput,
  condition?: ModelPlatformConditionInput | null,
};

export type CreatePlatformMutation = {
  createPlatform?:  {
    __typename: "Platform",
    id: string,
    name: string,
    category:  {
      __typename: "Category",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
    },
    description?: string | null,
    tags?:  {
      __typename: "ModelPlatformTagsConnection",
      nextToken?: string | null,
    } | null,
    domain: string,
    iconImage?: string | null,
    images?: Array< string | null > | null,
    network:  {
      __typename: "Network",
      id: string,
      name: string,
      symbol: string,
      image: string,
      config: string,
      method?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    url: string,
    createdAt: string,
    updatedAt: string,
    categoryPlatformsId?: string | null,
    networkPlatformsId?: string | null,
    owner?: string | null,
  } | null,
};

export type UpdatePlatformMutationVariables = {
  input: UpdatePlatformInput,
  condition?: ModelPlatformConditionInput | null,
};

export type UpdatePlatformMutation = {
  updatePlatform?:  {
    __typename: "Platform",
    id: string,
    name: string,
    category:  {
      __typename: "Category",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
    },
    description?: string | null,
    tags?:  {
      __typename: "ModelPlatformTagsConnection",
      nextToken?: string | null,
    } | null,
    domain: string,
    iconImage?: string | null,
    images?: Array< string | null > | null,
    network:  {
      __typename: "Network",
      id: string,
      name: string,
      symbol: string,
      image: string,
      config: string,
      method?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    url: string,
    createdAt: string,
    updatedAt: string,
    categoryPlatformsId?: string | null,
    networkPlatformsId?: string | null,
    owner?: string | null,
  } | null,
};

export type DeletePlatformMutationVariables = {
  input: DeletePlatformInput,
  condition?: ModelPlatformConditionInput | null,
};

export type DeletePlatformMutation = {
  deletePlatform?:  {
    __typename: "Platform",
    id: string,
    name: string,
    category:  {
      __typename: "Category",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
    },
    description?: string | null,
    tags?:  {
      __typename: "ModelPlatformTagsConnection",
      nextToken?: string | null,
    } | null,
    domain: string,
    iconImage?: string | null,
    images?: Array< string | null > | null,
    network:  {
      __typename: "Network",
      id: string,
      name: string,
      symbol: string,
      image: string,
      config: string,
      method?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    url: string,
    createdAt: string,
    updatedAt: string,
    categoryPlatformsId?: string | null,
    networkPlatformsId?: string | null,
    owner?: string | null,
  } | null,
};

export type CreateCategoryMutationVariables = {
  input: CreateCategoryInput,
  condition?: ModelCategoryConditionInput | null,
};

export type CreateCategoryMutation = {
  createCategory?:  {
    __typename: "Category",
    id: string,
    name: string,
    platforms?:  {
      __typename: "ModelPlatformConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateCategoryMutationVariables = {
  input: UpdateCategoryInput,
  condition?: ModelCategoryConditionInput | null,
};

export type UpdateCategoryMutation = {
  updateCategory?:  {
    __typename: "Category",
    id: string,
    name: string,
    platforms?:  {
      __typename: "ModelPlatformConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteCategoryMutationVariables = {
  input: DeleteCategoryInput,
  condition?: ModelCategoryConditionInput | null,
};

export type DeleteCategoryMutation = {
  deleteCategory?:  {
    __typename: "Category",
    id: string,
    name: string,
    platforms?:  {
      __typename: "ModelPlatformConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateTagMutationVariables = {
  input: CreateTagInput,
  condition?: ModelTagConditionInput | null,
};

export type CreateTagMutation = {
  createTag?:  {
    __typename: "Tag",
    id: string,
    name: string,
    platforms?:  {
      __typename: "ModelPlatformTagsConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateTagMutationVariables = {
  input: UpdateTagInput,
  condition?: ModelTagConditionInput | null,
};

export type UpdateTagMutation = {
  updateTag?:  {
    __typename: "Tag",
    id: string,
    name: string,
    platforms?:  {
      __typename: "ModelPlatformTagsConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteTagMutationVariables = {
  input: DeleteTagInput,
  condition?: ModelTagConditionInput | null,
};

export type DeleteTagMutation = {
  deleteTag?:  {
    __typename: "Tag",
    id: string,
    name: string,
    platforms?:  {
      __typename: "ModelPlatformTagsConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateNetworkMutationVariables = {
  input: CreateNetworkInput,
  condition?: ModelNetworkConditionInput | null,
};

export type CreateNetworkMutation = {
  createNetwork?:  {
    __typename: "Network",
    id: string,
    name: string,
    symbol: string,
    image: string,
    config: string,
    method?: string | null,
    platforms?:  {
      __typename: "ModelPlatformConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateNetworkMutationVariables = {
  input: UpdateNetworkInput,
  condition?: ModelNetworkConditionInput | null,
};

export type UpdateNetworkMutation = {
  updateNetwork?:  {
    __typename: "Network",
    id: string,
    name: string,
    symbol: string,
    image: string,
    config: string,
    method?: string | null,
    platforms?:  {
      __typename: "ModelPlatformConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteNetworkMutationVariables = {
  input: DeleteNetworkInput,
  condition?: ModelNetworkConditionInput | null,
};

export type DeleteNetworkMutation = {
  deleteNetwork?:  {
    __typename: "Network",
    id: string,
    name: string,
    symbol: string,
    image: string,
    config: string,
    method?: string | null,
    platforms?:  {
      __typename: "ModelPlatformConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreatePlatformTagsMutationVariables = {
  input: CreatePlatformTagsInput,
  condition?: ModelPlatformTagsConditionInput | null,
};

export type CreatePlatformTagsMutation = {
  createPlatformTags?:  {
    __typename: "PlatformTags",
    id: string,
    platformID: string,
    tagID: string,
    platform:  {
      __typename: "Platform",
      id: string,
      name: string,
      description?: string | null,
      domain: string,
      iconImage?: string | null,
      images?: Array< string | null > | null,
      url: string,
      createdAt: string,
      updatedAt: string,
      categoryPlatformsId?: string | null,
      networkPlatformsId?: string | null,
      owner?: string | null,
    },
    tag:  {
      __typename: "Tag",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdatePlatformTagsMutationVariables = {
  input: UpdatePlatformTagsInput,
  condition?: ModelPlatformTagsConditionInput | null,
};

export type UpdatePlatformTagsMutation = {
  updatePlatformTags?:  {
    __typename: "PlatformTags",
    id: string,
    platformID: string,
    tagID: string,
    platform:  {
      __typename: "Platform",
      id: string,
      name: string,
      description?: string | null,
      domain: string,
      iconImage?: string | null,
      images?: Array< string | null > | null,
      url: string,
      createdAt: string,
      updatedAt: string,
      categoryPlatformsId?: string | null,
      networkPlatformsId?: string | null,
      owner?: string | null,
    },
    tag:  {
      __typename: "Tag",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeletePlatformTagsMutationVariables = {
  input: DeletePlatformTagsInput,
  condition?: ModelPlatformTagsConditionInput | null,
};

export type DeletePlatformTagsMutation = {
  deletePlatformTags?:  {
    __typename: "PlatformTags",
    id: string,
    platformID: string,
    tagID: string,
    platform:  {
      __typename: "Platform",
      id: string,
      name: string,
      description?: string | null,
      domain: string,
      iconImage?: string | null,
      images?: Array< string | null > | null,
      url: string,
      createdAt: string,
      updatedAt: string,
      categoryPlatformsId?: string | null,
      networkPlatformsId?: string | null,
      owner?: string | null,
    },
    tag:  {
      __typename: "Tag",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type GetPlatformQueryVariables = {
  id: string,
};

export type GetPlatformQuery = {
  getPlatform?:  {
    __typename: "Platform",
    id: string,
    name: string,
    category:  {
      __typename: "Category",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
    },
    description?: string | null,
    tags?:  {
      __typename: "ModelPlatformTagsConnection",
      nextToken?: string | null,
    } | null,
    domain: string,
    iconImage?: string | null,
    images?: Array< string | null > | null,
    network:  {
      __typename: "Network",
      id: string,
      name: string,
      symbol: string,
      image: string,
      config: string,
      method?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    url: string,
    createdAt: string,
    updatedAt: string,
    categoryPlatformsId?: string | null,
    networkPlatformsId?: string | null,
    owner?: string | null,
  } | null,
};

export type ListPlatformsQueryVariables = {
  filter?: ModelPlatformFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPlatformsQuery = {
  listPlatforms?:  {
    __typename: "ModelPlatformConnection",
    items:  Array< {
      __typename: "Platform",
      id: string,
      name: string,
      description?: string | null,
      domain: string,
      iconImage?: string | null,
      images?: Array< string | null > | null,
      url: string,
      createdAt: string,
      updatedAt: string,
      categoryPlatformsId?: string | null,
      networkPlatformsId?: string | null,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type SearchPlatformsQueryVariables = {
  filter?: SearchablePlatformFilterInput | null,
  sort?: Array< SearchablePlatformSortInput | null > | null,
  limit?: number | null,
  nextToken?: string | null,
  from?: number | null,
  aggregates?: Array< SearchablePlatformAggregationInput | null > | null,
};

export type SearchPlatformsQuery = {
  searchPlatforms?:  {
    __typename: "SearchablePlatformConnection",
    items:  Array< {
      __typename: "Platform",
      id: string,
      name: string,
      description?: string | null,
      domain: string,
      iconImage?: string | null,
      images?: Array< string | null > | null,
      url: string,
      createdAt: string,
      updatedAt: string,
      categoryPlatformsId?: string | null,
      networkPlatformsId?: string | null,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
    total?: number | null,
    aggregateItems:  Array< {
      __typename: "SearchableAggregateResult",
      name: string,
      result: ( {
          __typename: "SearchableAggregateScalarResult",
          value: number,
        } | {
          __typename: "SearchableAggregateBucketResult",
          buckets?:  Array< {
            __typename: string,
            key: string,
            doc_count: number,
          } | null > | null,
        }
      ) | null,
    } | null >,
  } | null,
};

export type GetCategoryQueryVariables = {
  id: string,
};

export type GetCategoryQuery = {
  getCategory?:  {
    __typename: "Category",
    id: string,
    name: string,
    platforms?:  {
      __typename: "ModelPlatformConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListCategoriesQueryVariables = {
  filter?: ModelCategoryFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCategoriesQuery = {
  listCategories?:  {
    __typename: "ModelCategoryConnection",
    items:  Array< {
      __typename: "Category",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type SearchCategoriesQueryVariables = {
  filter?: SearchableCategoryFilterInput | null,
  sort?: Array< SearchableCategorySortInput | null > | null,
  limit?: number | null,
  nextToken?: string | null,
  from?: number | null,
  aggregates?: Array< SearchableCategoryAggregationInput | null > | null,
};

export type SearchCategoriesQuery = {
  searchCategories?:  {
    __typename: "SearchableCategoryConnection",
    items:  Array< {
      __typename: "Category",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
    total?: number | null,
    aggregateItems:  Array< {
      __typename: "SearchableAggregateResult",
      name: string,
      result: ( {
          __typename: "SearchableAggregateScalarResult",
          value: number,
        } | {
          __typename: "SearchableAggregateBucketResult",
          buckets?:  Array< {
            __typename: string,
            key: string,
            doc_count: number,
          } | null > | null,
        }
      ) | null,
    } | null >,
  } | null,
};

export type GetTagQueryVariables = {
  id: string,
};

export type GetTagQuery = {
  getTag?:  {
    __typename: "Tag",
    id: string,
    name: string,
    platforms?:  {
      __typename: "ModelPlatformTagsConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListTagsQueryVariables = {
  filter?: ModelTagFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTagsQuery = {
  listTags?:  {
    __typename: "ModelTagConnection",
    items:  Array< {
      __typename: "Tag",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type SearchTagsQueryVariables = {
  filter?: SearchableTagFilterInput | null,
  sort?: Array< SearchableTagSortInput | null > | null,
  limit?: number | null,
  nextToken?: string | null,
  from?: number | null,
  aggregates?: Array< SearchableTagAggregationInput | null > | null,
};

export type SearchTagsQuery = {
  searchTags?:  {
    __typename: "SearchableTagConnection",
    items:  Array< {
      __typename: "Tag",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
    total?: number | null,
    aggregateItems:  Array< {
      __typename: "SearchableAggregateResult",
      name: string,
      result: ( {
          __typename: "SearchableAggregateScalarResult",
          value: number,
        } | {
          __typename: "SearchableAggregateBucketResult",
          buckets?:  Array< {
            __typename: string,
            key: string,
            doc_count: number,
          } | null > | null,
        }
      ) | null,
    } | null >,
  } | null,
};

export type GetNetworkQueryVariables = {
  id: string,
};

export type GetNetworkQuery = {
  getNetwork?:  {
    __typename: "Network",
    id: string,
    name: string,
    symbol: string,
    image: string,
    config: string,
    method?: string | null,
    platforms?:  {
      __typename: "ModelPlatformConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListNetworksQueryVariables = {
  filter?: ModelNetworkFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListNetworksQuery = {
  listNetworks?:  {
    __typename: "ModelNetworkConnection",
    items:  Array< {
      __typename: "Network",
      id: string,
      name: string,
      symbol: string,
      image: string,
      config: string,
      method?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type SearchNetworksQueryVariables = {
  filter?: SearchableNetworkFilterInput | null,
  sort?: Array< SearchableNetworkSortInput | null > | null,
  limit?: number | null,
  nextToken?: string | null,
  from?: number | null,
  aggregates?: Array< SearchableNetworkAggregationInput | null > | null,
};

export type SearchNetworksQuery = {
  searchNetworks?:  {
    __typename: "SearchableNetworkConnection",
    items:  Array< {
      __typename: "Network",
      id: string,
      name: string,
      symbol: string,
      image: string,
      config: string,
      method?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
    total?: number | null,
    aggregateItems:  Array< {
      __typename: "SearchableAggregateResult",
      name: string,
      result: ( {
          __typename: "SearchableAggregateScalarResult",
          value: number,
        } | {
          __typename: "SearchableAggregateBucketResult",
          buckets?:  Array< {
            __typename: string,
            key: string,
            doc_count: number,
          } | null > | null,
        }
      ) | null,
    } | null >,
  } | null,
};

export type GetPlatformTagsQueryVariables = {
  id: string,
};

export type GetPlatformTagsQuery = {
  getPlatformTags?:  {
    __typename: "PlatformTags",
    id: string,
    platformID: string,
    tagID: string,
    platform:  {
      __typename: "Platform",
      id: string,
      name: string,
      description?: string | null,
      domain: string,
      iconImage?: string | null,
      images?: Array< string | null > | null,
      url: string,
      createdAt: string,
      updatedAt: string,
      categoryPlatformsId?: string | null,
      networkPlatformsId?: string | null,
      owner?: string | null,
    },
    tag:  {
      __typename: "Tag",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListPlatformTagsQueryVariables = {
  filter?: ModelPlatformTagsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPlatformTagsQuery = {
  listPlatformTags?:  {
    __typename: "ModelPlatformTagsConnection",
    items:  Array< {
      __typename: "PlatformTags",
      id: string,
      platformID: string,
      tagID: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreatePlatformSubscriptionVariables = {
  owner?: string | null,
};

export type OnCreatePlatformSubscription = {
  onCreatePlatform?:  {
    __typename: "Platform",
    id: string,
    name: string,
    category:  {
      __typename: "Category",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
    },
    description?: string | null,
    tags?:  {
      __typename: "ModelPlatformTagsConnection",
      nextToken?: string | null,
    } | null,
    domain: string,
    iconImage?: string | null,
    images?: Array< string | null > | null,
    network:  {
      __typename: "Network",
      id: string,
      name: string,
      symbol: string,
      image: string,
      config: string,
      method?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    url: string,
    createdAt: string,
    updatedAt: string,
    categoryPlatformsId?: string | null,
    networkPlatformsId?: string | null,
    owner?: string | null,
  } | null,
};

export type OnUpdatePlatformSubscriptionVariables = {
  owner?: string | null,
};

export type OnUpdatePlatformSubscription = {
  onUpdatePlatform?:  {
    __typename: "Platform",
    id: string,
    name: string,
    category:  {
      __typename: "Category",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
    },
    description?: string | null,
    tags?:  {
      __typename: "ModelPlatformTagsConnection",
      nextToken?: string | null,
    } | null,
    domain: string,
    iconImage?: string | null,
    images?: Array< string | null > | null,
    network:  {
      __typename: "Network",
      id: string,
      name: string,
      symbol: string,
      image: string,
      config: string,
      method?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    url: string,
    createdAt: string,
    updatedAt: string,
    categoryPlatformsId?: string | null,
    networkPlatformsId?: string | null,
    owner?: string | null,
  } | null,
};

export type OnDeletePlatformSubscriptionVariables = {
  owner?: string | null,
};

export type OnDeletePlatformSubscription = {
  onDeletePlatform?:  {
    __typename: "Platform",
    id: string,
    name: string,
    category:  {
      __typename: "Category",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
    },
    description?: string | null,
    tags?:  {
      __typename: "ModelPlatformTagsConnection",
      nextToken?: string | null,
    } | null,
    domain: string,
    iconImage?: string | null,
    images?: Array< string | null > | null,
    network:  {
      __typename: "Network",
      id: string,
      name: string,
      symbol: string,
      image: string,
      config: string,
      method?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    url: string,
    createdAt: string,
    updatedAt: string,
    categoryPlatformsId?: string | null,
    networkPlatformsId?: string | null,
    owner?: string | null,
  } | null,
};

export type OnCreateCategorySubscription = {
  onCreateCategory?:  {
    __typename: "Category",
    id: string,
    name: string,
    platforms?:  {
      __typename: "ModelPlatformConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateCategorySubscription = {
  onUpdateCategory?:  {
    __typename: "Category",
    id: string,
    name: string,
    platforms?:  {
      __typename: "ModelPlatformConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteCategorySubscription = {
  onDeleteCategory?:  {
    __typename: "Category",
    id: string,
    name: string,
    platforms?:  {
      __typename: "ModelPlatformConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateTagSubscription = {
  onCreateTag?:  {
    __typename: "Tag",
    id: string,
    name: string,
    platforms?:  {
      __typename: "ModelPlatformTagsConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateTagSubscription = {
  onUpdateTag?:  {
    __typename: "Tag",
    id: string,
    name: string,
    platforms?:  {
      __typename: "ModelPlatformTagsConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteTagSubscription = {
  onDeleteTag?:  {
    __typename: "Tag",
    id: string,
    name: string,
    platforms?:  {
      __typename: "ModelPlatformTagsConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateNetworkSubscription = {
  onCreateNetwork?:  {
    __typename: "Network",
    id: string,
    name: string,
    symbol: string,
    image: string,
    config: string,
    method?: string | null,
    platforms?:  {
      __typename: "ModelPlatformConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateNetworkSubscription = {
  onUpdateNetwork?:  {
    __typename: "Network",
    id: string,
    name: string,
    symbol: string,
    image: string,
    config: string,
    method?: string | null,
    platforms?:  {
      __typename: "ModelPlatformConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteNetworkSubscription = {
  onDeleteNetwork?:  {
    __typename: "Network",
    id: string,
    name: string,
    symbol: string,
    image: string,
    config: string,
    method?: string | null,
    platforms?:  {
      __typename: "ModelPlatformConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreatePlatformTagsSubscriptionVariables = {
  owner?: string | null,
};

export type OnCreatePlatformTagsSubscription = {
  onCreatePlatformTags?:  {
    __typename: "PlatformTags",
    id: string,
    platformID: string,
    tagID: string,
    platform:  {
      __typename: "Platform",
      id: string,
      name: string,
      description?: string | null,
      domain: string,
      iconImage?: string | null,
      images?: Array< string | null > | null,
      url: string,
      createdAt: string,
      updatedAt: string,
      categoryPlatformsId?: string | null,
      networkPlatformsId?: string | null,
      owner?: string | null,
    },
    tag:  {
      __typename: "Tag",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdatePlatformTagsSubscriptionVariables = {
  owner?: string | null,
};

export type OnUpdatePlatformTagsSubscription = {
  onUpdatePlatformTags?:  {
    __typename: "PlatformTags",
    id: string,
    platformID: string,
    tagID: string,
    platform:  {
      __typename: "Platform",
      id: string,
      name: string,
      description?: string | null,
      domain: string,
      iconImage?: string | null,
      images?: Array< string | null > | null,
      url: string,
      createdAt: string,
      updatedAt: string,
      categoryPlatformsId?: string | null,
      networkPlatformsId?: string | null,
      owner?: string | null,
    },
    tag:  {
      __typename: "Tag",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeletePlatformTagsSubscriptionVariables = {
  owner?: string | null,
};

export type OnDeletePlatformTagsSubscription = {
  onDeletePlatformTags?:  {
    __typename: "PlatformTags",
    id: string,
    platformID: string,
    tagID: string,
    platform:  {
      __typename: "Platform",
      id: string,
      name: string,
      description?: string | null,
      domain: string,
      iconImage?: string | null,
      images?: Array< string | null > | null,
      url: string,
      createdAt: string,
      updatedAt: string,
      categoryPlatformsId?: string | null,
      networkPlatformsId?: string | null,
      owner?: string | null,
    },
    tag:  {
      __typename: "Tag",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};
