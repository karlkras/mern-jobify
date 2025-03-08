export const getProfileRowItems = (
  nameDefault,
  lastNameDefault,
  emailDefault,
  locationDefault
) => [
  {
    elementType: 'input',
    name: 'name',
    labelName: 'name',
    defaultValue: nameDefault,
    type: 'text'
  },
  {
    elementType: 'input',
    name: 'lastname',
    labelName: 'Last Name',
    defaultValue: lastNameDefault,
    type: 'text'
  },
  {
    elementType: 'input',
    name: 'email',
    labelName: 'Email',
    defaultValue: emailDefault,
    type: 'text'
  },
  {
    elementType: 'input',
    name: 'location',
    labelName: 'Location',
    defaultValue: locationDefault,
    type: 'text'
  }
];

export const getAddJobRowItems = (
  locationDefault,
  jobStatusDefault,
  jobStatusList,
  jobTypeDefault,
  jobTypeList,
  companyDefault = null,
  positionDefault = null
) => [
  {
    elementType: 'input',
    name: 'position',
    labelName: 'Position',
    isRequired: true,
    type: 'text',
    defaultValue: positionDefault
  },
  {
    elementType: 'input',
    name: 'company',
    labelName: 'Company',
    isRequired: true,
    type: 'text',
    defaultValue: companyDefault
  },
  {
    elementType: 'input',
    name: 'jobLocation',
    labelName: 'Job Location',
    defaultValue: locationDefault,
    type: 'text'
  },
  {
    elementType: 'select',
    name: 'status',
    labelName: 'Job Status',
    defaultValue: jobStatusDefault,
    list: jobStatusList
  },
  {
    elementType: 'select',
    name: 'jobType',
    labelName: 'Job Type',
    defaultValue: jobTypeDefault,
    list: jobTypeList
  }
];

export const getJobSeachFields = (
  searchDefault,
  jobStatusDefault,
  jobStatusList,
  jobTypeDefault,
  jobTypeList,
  sortDefault,
  sortList
) => [
  {
    elementType: 'input',
    name: 'search',
    labelName: 'Search',
    defaultValue: searchDefault,
    type: 'text'
  },
  {
    elementType: 'select',
    name: 'status',
    labelName: 'job status',
    defaultValue: jobStatusDefault,
    list: jobStatusList
  },
  {
    elementType: 'select',
    name: 'jobType',
    labelName: 'Job Type',
    defaultValue: jobTypeDefault,
    list: jobTypeList
  },
  {
    elementType: 'select',
    name: 'sort',
    labelName: 'Sort',
    defaultValue: sortDefault,
    list: sortList
  }
];

export const getLoginFields = () => [
  {
    elementType: 'input',
    name: 'email',
    labelName: 'Email',
    isRequired: true,
    type: 'text'
  },
  {
    elementType: 'input',
    name: 'password',
    labelName: 'Password',
    isRequired: true,
    type: 'password'
  }
];

export const getRegisterFields = () => [
  {
    elementType: 'input',
    name: 'name',
    labelName: 'Name',
    type: 'text',
    isRequired: true
  },
  {
    elementType: 'input',
    name: 'lastName',
    labelName: 'Last Name',
    type: 'text',
    isRequired: true
  },
  {
    elementType: 'input',
    name: 'location',
    labelName: 'Location',
    type: 'text',
    isRequired: false
  },
  {
    elementType: 'input',
    name: 'email',
    labelName: 'Email',
    type: 'text',
    isRequired: true
  },
  {
    elementType: 'input',
    name: 'password',
    labelName: 'Password',
    type: 'password',
    autoComplete: 'new-password',
    isRequired: true
  }
];
