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

