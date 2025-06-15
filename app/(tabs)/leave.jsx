import { StyleSheet } from 'react-native';
import GenericDataScreen from '../../screens/GenericDataScreen';
import { createLeave, deleteLeave, getLeaves, updateLeave } from '../modules/leaves/api';
import { leaveFields } from '../modules/leaves/config';

export default function Leave() {

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
      getAll: getLeaves,
      create: createLeave,
      update: updateLeave,
      delete: deleteLeave,
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
