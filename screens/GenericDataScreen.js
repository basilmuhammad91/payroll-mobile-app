import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
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

const GenericDataScreen = ({ 
  moduleConfig,
  apiService,
  customTitle,
  customEmptyState,
  customCardRenderer,
  onItemPress,
  customActions = []
}) => {
  const [formData, setFormData] = useState({});
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);

  // Module configuration with defaults
 

  useEffect(() => {
    loadData(1, true);
  }, []);

  const loadData = async (page = 1, reset = false) => {
    try {
      if (reset) {
        setRefreshing(true);
        setCurrentPage(1);
      } else {
        setLoadingMore(true);
      }

      const response = await apiService.getAll(page, config.pagination.limit);
      console.log(`Loaded ${config.title.toLowerCase()}:`, response?.data);
      
      const responseData = response.data?.data || response?.data || [];
      const pagination = response.data?.pagination || {};
      
      if (reset) {
        setData(responseData);
      } else {
        // Append new data for load more
        setData(prevData => [...prevData, ...responseData]);
      }
      
      // Update pagination info
      setCurrentPage(pagination.page || page);
      setTotalPages(pagination.totalPages || 1);
      setTotalItems(pagination.total || responseData.length);
      setHasNextPage(pagination.hasNextPage || (page < (pagination.totalPages || 1)));
      
    } catch (error) {
      console.error(`Error loading ${config.title.toLowerCase()}:`, error);
      Alert.alert('Error', `Failed to load ${config.title.toLowerCase()}`);
    } finally {
      setRefreshing(false);
      setLoadingMore(false);
    }
  };

  const handleRefresh = () => {
    loadData(1, true);
  };

  const handleLoadMore = () => {
    if (!loadingMore && hasNextPage && config.pagination.loadMore) {
      loadData(currentPage + 1, false);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (editingItem) {
        await apiService.update(editingItem._id, formData);
      } else {
        await apiService.create(formData);
      }
      handleCloseModal();
      await loadData(1, true); // Refresh from first page
      Alert.alert('Success', `${config.title} ${editingItem ? 'updated' : 'created'} successfully`);
    } catch (error) {
      console.error(`Error ${editingItem ? 'updating' : 'creating'} ${config.title.toLowerCase()}:`, error);
      Alert.alert('Error', `Failed to ${editingItem ? 'update' : 'create'} ${config.title.toLowerCase()}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (item) => {
    if (config.confirmDelete) {
      Alert.alert(
        'Confirm Delete',
        `Are you sure you want to delete this ${config.title.toLowerCase()}?`,
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Delete', style: 'destructive', onPress: () => performDelete(item) }
        ]
      );
    } else {
      await performDelete(item);
    }
  };

  const performDelete = async (item) => {
    try {
      await apiService.delete(item._id);
      await loadData(1, true); // Refresh from first page
      Alert.alert('Success', `${config.title} deleted successfully`);
    } catch (error) {
      console.error(`Error deleting ${config.title.toLowerCase()}:`, error);
      Alert.alert('Error', `Failed to delete ${config.title.toLowerCase()}`);
    }
  };

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData(item);
    } else {
      setEditingItem(null);
      setFormData({});
    }
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setEditingItem(null);
    setFormData({});
  };

  const handleItemPress = (item) => {
    if (onItemPress) {
      onItemPress(item);
    } else if (config.allowEdit) {
      handleOpenModal(item);
    }
  };

  const getFieldValue = (item, fieldName) => {
    return item[fieldName] || 'N/A';
  };

  const getFieldLabel = (fieldName) => {
    const field = config.fields.find(f => f.name === fieldName);
    return field ? field.label : fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
  };

  const getStatusColor = (status) => {
    const statusLower = status?.toLowerCase();
    return config.theme[statusLower] || config.theme.pending;
  };

  const getStatusBackgroundColor = (status) => {
    const color = getStatusColor(status);
    // Convert hex to rgba with opacity
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, 0.1)`;
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

  const getFieldIcon = (field) => {
    const iconMap = {
      email: 'mail-outline',
      phone: 'call-outline',
      date: 'calendar-outline',
      time: 'time-outline',
      location: 'location-outline',
      address: 'location-outline',
      url: 'link-outline',
      password: 'lock-closed-outline',
      user: 'person-outline',
      name: 'person-outline',
      title: 'document-text-outline',
      description: 'document-text-outline',
      reason: 'document-text-outline',
      amount: 'cash-outline',
      price: 'cash-outline',
      status: 'flag-outline',
      type: 'folder-outline',
      category: 'folder-outline',
    };

    // Check field name for icon
    const fieldNameLower = field.name.toLowerCase();
    for (const [key, icon] of Object.entries(iconMap)) {
      if (fieldNameLower.includes(key)) {
        return icon;
      }
    }

    // Check field type for icon
    if (field.type === 'date') return 'calendar-outline';
    if (field.type === 'email') return 'mail-outline';
    if (field.type === 'tel') return 'call-outline';
    if (field.type === 'url') return 'link-outline';
    if (field.type === 'textarea') return 'document-text-outline';

    return 'information-circle-outline';
  };

  const renderDataItem = ({ item }) => {
    if (customCardRenderer) {
      return customCardRenderer(item, handleItemPress, handleDelete, config);
    }

    return (
      <TouchableOpacity 
        style={styles.dataCard}
        onPress={() => handleItemPress(item)}
        activeOpacity={0.7}
      >
        <View style={styles.cardHeader}>
          {/* <Text style={styles.cardTitle}>
            {getFieldValue(item, config.primaryField)}
          </Text> */}
          {config.statusField && item[config.statusField] && (
            <View
              style={[
                styles.statusBadge,
                { backgroundColor: getStatusBackgroundColor(item[config.statusField]) }
              ]}
            >
              <Text
                style={[
                  styles.statusText,
                  { color: getStatusColor(item[config.statusField]) }
                ]}
              >
                {item[config.statusField]}
              </Text>
            </View>
          )}
        </View>
        
        <View style={styles.cardDetails}>
          {config.fields.slice(0, 4).map((field) => {
            const value = getFieldValue(item, field.name);
            if (field.name === config.statusField || field.name === config.primaryField || !value || value === 'N/A') return null;
            
            let displayValue = value;
            const icon = getFieldIcon(field);
            
            // Format dates
            if (config.dateFields.includes(field.name) || field.type === 'date') {
              displayValue = formatDate(value);
            }
            
            return (
              <View key={field.name} style={styles.fieldRow}>
                <Ionicons name={icon} size={16} color="#666" />
                <View style={styles.fieldContent}>
                  <Text style={styles.fieldLabel}>{getFieldLabel(field.name)}:</Text>
                  <Text 
                    style={styles.fieldValue} 
                    numberOfLines={field.type === 'textarea' ? 2 : 1}
                  >
                    {displayValue}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
        
        <View style={styles.cardFooter}>
          <Text style={styles.tapHint}>
            {config.allowEdit ? 'Tap to edit' : 'Tap to view'}
          </Text>
          <View style={styles.cardActions}>
            {customActions.map((action, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.actionButton, { backgroundColor: action.color || config.theme.primary }]}
                onPress={() => action.onPress(item)}
              >
                <Ionicons name={action.icon} size={16} color="#fff" />
              </TouchableOpacity>
            ))}
            {config.allowDelete && (
              <TouchableOpacity
                style={[styles.actionButton, styles.deleteButton]}
                onPress={() => handleDelete(item)}
              >
                <Ionicons name="trash-outline" size={16} color="#fff" />
              </TouchableOpacity>
            )}
            <Ionicons name="chevron-forward" size={16} color="#999" />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderLoadMoreFooter = () => {
    if (!loadingMore) return null;
    
    return (
      <View style={styles.loadMoreContainer}>
        <ActivityIndicator size="small" color={config.theme.primary} />
        <Text style={styles.loadMoreText}>Loading more...</Text>
      </View>
    );
  };

  const renderEmptyState = () => {
    if (customEmptyState) {
      return customEmptyState(() => handleOpenModal());
    }

    return (
      <View style={styles.emptyState}>
        <Ionicons name="document-outline" size={64} color="#ccc" />
        <Text style={styles.emptyStateTitle}>No {config.title}</Text>
        <Text style={styles.emptyStateSubtitle}>
          Tap the + button to create your first {config.title.toLowerCase()}
        </Text>
      </View>
    );
  };

  const renderPaginationInfo = () => {
    if (!config.pagination.enabled || data.length === 0) return null;
    
    return (
      <View style={styles.paginationInfo}>
        <Text style={styles.paginationText}>
          Showing {data.length} of {totalItems} items
        </Text>
        {totalPages > 1 && (
          <Text style={styles.paginationText}>
            Page {currentPage} of {totalPages}
          </Text>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>{customTitle || config.title}</Text>
          {renderPaginationInfo()}
        </View>
        {config.allowCreate && (
          <TouchableOpacity
            style={[styles.addButton, { backgroundColor: config.theme.primary }]}
            onPress={() => handleOpenModal()}
          >
            <Ionicons name="add" size={24} color="#fff" />
          </TouchableOpacity>
        )}
      </View>

      {/* Data List */}
      <FlatList
        data={data}
        renderItem={renderDataItem}
        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
        contentContainerStyle={[
          styles.listContainer,
          data.length === 0 && styles.emptyListContainer
        ]}
        ListEmptyComponent={renderEmptyState}
        ListFooterComponent={renderLoadMoreFooter}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        showsVerticalScrollIndicator={false}
      />

      {/* Form Modal */}
      {(config.allowCreate || config.allowEdit) && (
        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={handleCloseModal}
        >
          <SafeAreaView style={styles.modalContainer}>
            <StatusBar barStyle="light-content" backgroundColor={config.theme.primary} />
            
            {/* Modal Header */}
            <View style={[styles.modalHeader, { backgroundColor: config.theme.primary }]}>
              <TouchableOpacity
                onPress={handleCloseModal}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={24} color="#fff" />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>
                {editingItem ? `Edit ${config.title}` : `New ${config.title}`}
              </Text>
              <View style={styles.headerSpacer} />
            </View>

            {/* Modal Content */}
            <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
              <DynamicForm
                fields={config.fields}
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
                title={loading ? "Saving..." : (editingItem ? `Update ${config.title}` : `Create ${config.title}`)}
                onPress={handleSubmit}
                disabled={loading}
                style={[styles.submitButton, { backgroundColor: config.theme.primary }]}
              />
            </View>
          </SafeAreaView>
        </Modal>
      )}
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
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  headerLeft: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  paginationInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paginationText: {
    fontSize: 12,
    color: '#666',
  },
  addButton: {
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
  loadMoreContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    gap: 8,
  },
  loadMoreText: {
    fontSize: 14,
    color: '#666',
  },
  dataCard: {
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
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
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
  cardDetails: {
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
  cardActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  actionButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#F44336',
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

export default GenericDataScreen;