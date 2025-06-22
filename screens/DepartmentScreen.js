import { StyleSheet } from 'react-native';

import { createOne, deleteOne, getAll, updateOne } from '../app/api/genericApi';
import { leaveFields } from '../app/config';
import GenericDataScreen from './GenericDataScreen';

export default function LeaveScreen() {
    // Base resource without pagination params - they'll be added by the API service
    const BASE_RESOURCE = 'employees/leave';
    
    // Extract employer ID from your original resource URL
    const EMPLOYER_ID = 'CLIENT-005';

    const moduleConfig = {
      title: 'LeaveScreen Requests',
      fields: leaveFields,
      primaryField: 'leaveType',
      statusField: 'status',
      dateFields: ['startDate', 'endDate'],
      allowCreate: true,
      allowEdit: true,
      allowDelete: true,
      confirmDelete: true,
      pagination: {
        enabled: true,
        limit: 10, // Items per page
        loadMore: true // Enable infinite scroll
      },
      theme: {
        primary: '#e82938',
        approved: '#4CAF50',
        pending: '#FF9800',
        rejected: '#F44336',
      }
    };

    const apiService = {
      // Enhanced getAll with pagination support
      getAll: (page = 1, limit = 10) => {
        const additionalParams = { employerId: EMPLOYER_ID };
        return getAll(BASE_RESOURCE, page, limit, additionalParams);
      },
      
      // Other methods remain the same but use base resource
      create: (data) => {
        // Add employerId to the data being created
        const dataWithEmployer = { ...data, employerId: EMPLOYER_ID };
        const response = createOne(BASE_RESOURCE, dataWithEmployer);
        return response;
      },
      
      update: (id, data) => {
        // Ensure employerId is maintained during updates
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