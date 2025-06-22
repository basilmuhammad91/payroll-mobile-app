import { StyleSheet } from 'react-native';

import { createOne, deleteOne, getAll, updateOne } from '../app/api/genericApi';

import { employeeTypeFields } from '../config/appConfig';
import GenericDataScreen from './GenericDataScreen';

export default function EmployeeTypeScreen() {
    const BASE_RESOURCE = 'employees/employeeType';
    
    const EMPLOYER_ID = 'CLIENT-005';

    const moduleConfig = {
      title: 'EmployeeTypeScreen Requests',
      fields: employeeTypeFields,
      primaryField: 'employeeTypeType',
      statusField: 'status',
      dateFields: ['startDate', 'endDate'],
      allowCreate: true,
      allowEdit: true,
      allowDelete: true,
      confirmDelete: true,
      pagination: {
        enabled: true,
        limit: 10, 
        loadMore: true 
      },
      theme: {
        primary: '#e82938',
        approved: '#4CAF50',
        pending: '#FF9800',
        rejected: '#F44336',
      }
    };

    const apiService = {
      getAll: (page = 1, limit = 10) => {
        const additionalParams = { employerId: EMPLOYER_ID };
        return getAll(BASE_RESOURCE, page, limit, additionalParams);
      },
      
      create: (data) => {
        const dataWithEmployer = { ...data, employerId: EMPLOYER_ID };
        const response = createOne(BASE_RESOURCE, dataWithEmployer);
        return response;
      },
      
      update: (id, data) => {
        const dataWithEmployer = { ...data, employerId: EMPLOYER_ID };
        return updateOne(BASE_RESOURCE, id, dataWithEmployer);
      },
      
      delete: (id) => deleteOne(BASE_RESOURCE, id),
    };

   return (
    <GenericDataScreen
      moduleConfig={moduleConfig}
      apiService={apiService}
    />
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});