import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import {
  FlatList,
  Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CustomButton from '../app/components/CustomButton';
import DynamicForm from '../app/components/DynamicForm';
import { createLeave, getLeaves } from '../app/modules/leaves/api';
import { leaveFields } from '../app/modules/leaves/config';

const LeavesScreen = () => {
  const [formData, setFormData] = useState({});
  const [leaves, setLeaves] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editingLeave, setEditingLeave] = useState(null);

  useEffect(() => {
    loadLeaves();
  }, []);

  const loadLeaves = async () => {
    try {
      const { data } = await getLeaves();
      setLeaves(data);
    } catch (error) {
      console.error('Error loading leaves:', error);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await createLeave(formData);
      handleCloseModal();
      await loadLeaves();
    } catch (error) {
      console.error('Error creating leave:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (leave = null) => {
    if (leave) {
      setEditingLeave(leave);
      setFormData(leave);
    } else {
      setEditingLeave(null);
      setFormData({});
    }
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setEditingLeave(null);
    setFormData({});
  };

  const getFieldValue = (item, fieldName) => {
    return item[fieldName] || 'N/A';
  };

  const getFieldLabel = (fieldName) => {
    const field = leaveFields.find(f => f.name === fieldName);
    return field ? field.label : fieldName;
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'approved':
        return '#4CAF50';
      case 'pending':
        return '#FF9800';
      case 'rejected':
        return '#F44336';
      default:
        return '#9E9E9E';
    }
  };

  const getStatusBackgroundColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'approved':
        return '#E8F5E8';
      case 'pending':
        return '#FFF3E0';
      case 'rejected':
        return '#FFEBEE';
      default:
        return '#F5F5F5';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const renderLeaveItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.leaveCard}
      onPress={() => handleOpenModal(item)}
      activeOpacity={0.7}
    >
      <View style={styles.leaveHeader}>
        <Text style={styles.leaveType}>
          {getFieldValue(item, 'leaveType') || 'Leave Request'}
        </Text>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: getStatusBackgroundColor(item.status) }
          ]}
        >
          <Text
            style={[
              styles.statusText,
              { color: getStatusColor(item.status) }
            ]}
          >
            {item.status || 'Pending'}
          </Text>
        </View>
      </View>
      
      <View style={styles.leaveDetails}>
        {leaveFields.map((field, index) => {
          const value = getFieldValue(item, field.name);
          if (field.name === 'status' || !value || value === 'N/A') return null;
          
          let displayValue = value;
          let icon = 'information-circle-outline';
          
          // Format different field types
          if (field.type === 'date') {
            displayValue = formatDate(value);
            icon = 'calendar-outline';
          } else if (field.name === 'durationType') {
            icon = 'time-outline';
          } else if (field.name === 'reason') {
            icon = 'document-text-outline';
          } else if (field.name === 'leaveType') {
            icon = 'folder-outline';
          }
          
          return (
            <View key={field.name} style={styles.fieldRow}>
              <Ionicons name={icon} size={16} color="#666" />
              <View style={styles.fieldContent}>
                <Text style={styles.fieldLabel}>{getFieldLabel(field.name)}:</Text>
                <Text 
                  style={styles.fieldValue} 
                  numberOfLines={field.name === 'reason' ? 2 : 1}
                >
                  {displayValue}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
      
      <View style={styles.cardFooter}>
        <Text style={styles.tapHint}>Tap to edit</Text>
        <Ionicons name="chevron-forward" size={16} color="#999" />
      </View>
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Ionicons name="document-outline" size={64} color="#ccc" />
      <Text style={styles.emptyStateTitle}>No Leave Requests</Text>
      <Text style={styles.emptyStateSubtitle}>
        Tap the + button to create your first leave request
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Leave Requests</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => handleOpenModal()}
        >
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Leave List */}
      <FlatList
        data={leaves}
        renderItem={renderLeaveItem}
        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
        contentContainerStyle={[
          styles.listContainer,
          leaves.length === 0 && styles.emptyListContainer
        ]}
        ListEmptyComponent={renderEmptyState}
        showsVerticalScrollIndicator={false}
      />

      {/* Add Leave Modal */}
              <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <SafeAreaView style={styles.modalContainer}>
          <StatusBar barStyle="light-content" backgroundColor="#e82938" />
          
          {/* Modal Header */}
          <View style={styles.modalHeader}>
            <TouchableOpacity
              onPress={handleCloseModal}
              style={styles.closeButton}
            >
              <Ionicons name="close" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>
              {editingLeave ? 'Edit Leave Request' : 'New Leave Request'}
            </Text>
            <View style={styles.headerSpacer} />
          </View>

          {/* Modal Content */}
          <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
            <DynamicForm
              fields={leaveFields}
              formData={formData}
              setFormData={setFormData}
            />
          </ScrollView>

          {/* Modal Footer */}
          <View style={styles.modalFooter}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={handleCloseModal}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            
            <CustomButton
              title={loading ? "Submitting..." : (editingLeave ? "Update Request" : "Submit Request")}
              onPress={handleSubmit}
              disabled={loading}
              style={styles.submitButton}
            />
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  addButton: {
    backgroundColor: '#e82938',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  listContainer: {
    padding: 16,
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  leaveCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  leaveHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  leaveType: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  leaveDetails: {
    gap: 12,
  },
  fieldRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  fieldContent: {
    flex: 1,
  },
  fieldLabel: {
    fontSize: 12,
    color: '#999',
    fontWeight: '500',
    marginBottom: 2,
  },
  fieldValue: {
    fontSize: 14,
    color: '#333',
    lineHeight: 18,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  tapHint: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#666',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateSubtitle: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    lineHeight: 22,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#e82938',
  },
  closeButton: {
    padding: 4,
  },
  modalTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
  },
  headerSpacer: {
    width: 32,
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  modalFooter: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  submitButton: {
    flex: 1,
  },
});

export default LeavesScreen;