import { StyleSheet } from 'react-native';
import { createOne, deleteOne, getAll, updateOne } from '../../app/api/genericApi';
import GenericDataScreen from '../../screens/GenericDataScreen';
import { leaveFields } from '../modules/leaves/config';

export default function Leave() {
    const RESOURCE = 'employees/leave?employerId=CLIENT-005&page=1&limit=10';

    const moduleConfig = {
      title: 'Leave Requests',
      fields: leaveFields,
      primaryField: 'leaveType',
      statusField: 'status',
      dateFields: ['startDate', 'endDate'],
      allowCreate: true,
      allowEdit: true,
      allowDelete: true,
      confirmDelete: true,
      theme: {
        primary: '#e82938',
        approved: '#4CAF50',
        pending: '#FF9800',
        rejected: '#F44336',
      }
    };

    const apiService = {
      getAll: () => getAll(RESOURCE),
      create: (data) => createOne(RESOURCE, data),
      update: (id, data) => updateOne(RESOURCE, id, data),
      delete: (id) => deleteOne(RESOURCE, id),
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
