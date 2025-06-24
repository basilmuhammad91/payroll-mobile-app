export const themeConfig = {
    primary: '#e82938',
    success: '#4CAF50',
    warning: '#FF9800',
    error: '#F44336',
    pending: '#FF9800',
    approved: '#4CAF50',
    rejected: '#F44336',
}

export const leaveFields = [
  {
    name: 'leave',
    label: 'Leave',
    placeholder: 'Enter Leave Name',
    type: 'text',
    icon: 'file-text',
    required: true,
  },
  {
    name: 'leave_description',
    label: 'Description',
    placeholder: 'Enter description',
    type: 'text',
    icon: 'file-text',
    required: true,
  },
  {
    name: 'balance',
    label: 'Balance',
    placeholder: 'Enter Balance',
    type: 'number',
    icon: 'activity',
    required: true,
  },
  {
    name: 'maxCarryForward',
    label: 'Max Carry Forward',
    placeholder: 'Enter Carry Forward',
    type: 'number',
    icon: 'calendar',
    required: false,
  },
];

export const departmentFields = [
  {
    name: 'department',
    label: 'Department',
    placeholder: 'Enter Department Name',
    type: 'text',
    icon: 'file-text',
    required: true,
  },
  {
    name: 'department_description',
    label: 'Description',
    placeholder: 'Enter description',
    type: 'text',
    icon: 'file-text',
    required: true,
  },
];

export const workLocationFields = [
  {
    name: 'work_location',
    label: 'Work Location',
    placeholder: 'Enter Work Location Name',
    type: 'text',
    icon: 'file-text',
    required: true,
  },
  {
    name: 'work_location_description',
    label: 'Description',
    placeholder: 'Enter description',
    type: 'text',
    icon: 'file-text',
    required: true,
  },
];

export const employeeTypeFields = [
  {
    name: 'employee_type',
    label: 'Employee Type',
    placeholder: 'Enter Employee Type Name',
    type: 'text',
    icon: 'file-text',
    required: true,
  },
  {
    name: 'employee_type_description',
    label: 'Description',
    placeholder: 'Enter description',
    type: 'text',
    icon: 'file-text',
    required: true,
  },
];

export const parentCostCenterFields = [
  {
    name: 'cost_center',
    label: 'Cost Center',
    placeholder: 'Enter Cost Center',
    type: 'text',
    icon: 'file-text',
    required: true,
  },
  {
    name: 'cost_center_description',
    label: 'Description',
    placeholder: 'Enter description',
    type: 'text',
    icon: 'file-text',
    required: true,
  },
   {
    name: 'code',
    label: 'Code',
    placeholder: 'Enter Code',
    type: 'number',
    icon: 'file-text',
    required: true,
  },
];

export const bankFields = [
  {
    name: 'bank',
    label: 'Bank',
    placeholder: 'Enter Bank Name',
    type: 'text',
    icon: 'file-text',
    required: true,
  },
  {
    name: 'bank_description',
    label: 'Description',
    placeholder: 'Enter description',
    type: 'text',
    icon: 'file-text',
    required: true,
  },
];

export const allowanceFields = [
  {
    name: 'allownce',
    label: 'Allowance',
    placeholder: 'Enter Allowance',
    type: 'text',
    icon: 'file-text',
    required: true,
  },
  {
    name: 'allownce_description',
    label: 'Description',
    placeholder: 'Enter description',
    type: 'text',
    icon: 'file-text',
    required: true,
  },
];

export const costCenterFields = [
  {
    name: 'code',
    label: 'Code',
    placeholder: 'Enter Code',
    type: 'number',
    icon: 'file-text',
    required: true,
  },
  {
    name: 'cost_center',
    label: 'Cost Center',
    placeholder: 'Enter Cost Center',
    type: 'text',
    icon: 'file-text',
    required: true,
  },
  {
    name: 'cost_center_description',
    label: 'Description',
    placeholder: 'Enter description',
    type: 'text',
    icon: 'file-text',
    required: true,
  },
  {
    name: 'parentId',
    label: 'Parent Cost Center',
    placeholder: 'Select Parent Cost Center',
    type: 'select', 
    icon: 'file-text',
    required: true,
    optionsSource: {
      endpoint: '/employees/parentCostCenter?employerId=CLIENT-005&page=1&limit=10',
      valueKey: '_id', 
      labelKey: 'cost_center', 
    },
  },
];

export const managerFields = [
  {
    name: 'manager',
    label: 'Manager',
    placeholder: 'Enter Manager',
    type: 'text',
    icon: 'file-text',
    required: true,
  },
  {
    name: 'departmentId',
    label: 'Department',
    placeholder: 'Select Department',
    type: 'select', 
    icon: 'file-text',
    required: true,
    optionsSource: {
      endpoint: '/employees/department?employerId=CLIENT-005&page=1&limit=10',
      valueKey: '_id', 
      labelKey: 'department', 
    },
  },
  {
    name: 'employeeId',
    label: 'Employee',
    placeholder: 'Select Employee',
    type: 'select', 
    icon: 'file-text',
    required: true,
    optionsSource: {
      endpoint: '/employees',
      valueKey: '_id', 
      labelKey: 'firstName', 
    },
  },
];

export const jobTitleFields = [
  {
    name: 'job_title',
    label: 'Job Title',
    placeholder: 'Enter Job Title',
    type: 'text',
    icon: 'file-text',
    required: true,
  },
  {
    name: 'departmentId',
    label: 'Department',
    placeholder: 'Select Department',
    type: 'select', 
    icon: 'file-text',
    required: true,
    optionsSource: {
      endpoint: '/employees/department?employerId=CLIENT-005&page=1&limit=10',
      valueKey: '_id', 
      labelKey: 'department', 
    },
  },
   {
    name: 'job_title_description',
    label: 'Description',
    placeholder: 'Enter description',
    type: 'text',
    icon: 'file-text',
    required: true,
  },
];