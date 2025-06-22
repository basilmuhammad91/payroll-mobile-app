import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react'; // Import useEffect and useState
import {
  ActivityIndicator, // For loading spinner
  Alert, // For error alerts (optional, you can use a toast or other UI)
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { API_BASE_URL } from '.././api/genericApi';

import axios from 'axios';

const localApiService = {
  get: async (endpoint) => {
  console.log(`${API_BASE_URL}${endpoint}`)
    try {
      const response = await axios.get(`${API_BASE_URL}${endpoint}`);
      return response.data?.data || response.data; 
    } catch (error) {
      console.error(`API Error for ${endpoint}:`, error.response?.data || error.message);
      throw error;
    }
  },
};


const DynamicForm = ({ fields, formData, setFormData }) => {
  const [dynamicOptions, setDynamicOptions] = useState({});
  const [loadingOptions, setLoadingOptions] = useState({});
  const [errorOptions, setErrorOptions] = useState({});

  useEffect(() => {
    const fetchAllDynamicOptions = async () => {
      const newDynamicOptions = {};
      const newLoadingStates = {};
      const newErrorStates = {};
      const promises = fields.map(async (field) => {
        if (field.type === 'select' && field.optionsSource) {
          newLoadingStates[field.name] = true;
          try {
            const data = await localApiService.get(field.optionsSource.endpoint);
            // Assuming the API returns an array directly, or an object with a 'data' key
            newDynamicOptions[field.name] = data.data || data; // Adjust based on your API response structure
            newErrorStates[field.name] = null; // Clear any previous errors
          } catch (error) {
            newErrorStates[field.name] = `Failed to load ${field.label} options.`;
            Alert.alert('Error', `Failed to load options for ${field.label}. Please try again.`);
            console.error(`Failed to fetch options for ${field.name}:`, error);
          } finally {
            newLoadingStates[field.name] = false;
          }
        }
      });

      // Wait for all promises to resolve
      await Promise.all(promises);

      // Update states once all fetches are complete
      setDynamicOptions(prev => ({ ...prev, ...newDynamicOptions }));
      setLoadingOptions(prev => ({ ...prev, ...newLoadingStates }));
      setErrorOptions(prev => ({ ...prev, ...newErrorStates }));
    };

    fetchAllDynamicOptions();
  }, [fields]); // Re-run effect if the fields configuration changes

  const handleChange = (fieldName, value) => {
    setFormData(prev => ({ ...prev, [fieldName]: value }));
  };

  return (
    <View style={styles.card}>
      {fields.map(field => {
        const value = formData[field.name] || '';
        const iconName = field.icon || 'edit';

        return (
          <View key={field.name} style={styles.fieldContainer}>
            {/* Label */}
            <Text style={styles.label}>{field.label}{field.required && <Text style={styles.requiredIndicator}>*</Text>}</Text>

            {/* Input Group */}
            <View style={styles.inputGroup}>
              <Icon name={iconName} size={20} color="#e11d48" style={styles.icon} />

              {field.type === 'select' ? (
                loadingOptions[field.name] ? (
                  <ActivityIndicator size="small" color="#e11d48" style={styles.loadingIndicator} />
                ) : errorOptions[field.name] ? (
                  <Text style={styles.errorText}>{errorOptions[field.name]}</Text>
                ) : (
                  <Picker
                    selectedValue={value}
                    style={styles.picker}
                    onValueChange={val => handleChange(field.name, val)}
                  >
                    {/* Add a default placeholder item */}
                    <Picker.Item label={field.placeholder || `Select a ${field.label}`} value="" />
                    {/* Render dynamic options if available */}
                    {dynamicOptions[field.name] && dynamicOptions[field.name].map(option => (
                      <Picker.Item
                        label={option[field.optionsSource.labelKey]}
                        value={option[field.optionsSource.valueKey]}
                        key={option[field.optionsSource.valueKey]}
                      />
                    ))}
                    {/* If static options are also provided (less likely for dynamic, but for completeness) */}
                    {field.options && field.options.map(option => (
                        // Assumes static options are simple strings or objects with 'label' and 'value'
                        <Picker.Item
                          label={typeof option === 'object' ? option.label : option}
                          value={typeof option === 'object' ? option.value : option}
                          key={typeof option === 'object' ? option.value : option}
                        />
                    ))}
                  </Picker>
                )
              ) : (
                <TextInput
                  style={styles.input}
                  placeholder={field.placeholder}
                  value={value}
                  keyboardType={field.type === 'number' ? 'numeric' : 'default'}
                  onChangeText={text => handleChange(field.name, text)}
                />
              )}
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    elevation: 2,
    marginVertical: 10,
  },
  fieldContainer: {
    marginBottom: 16,
  },
  label: {
    fontWeight: '600',
    marginBottom: 6,
    fontSize: 14,
    color: '#111827',
  },
  requiredIndicator: {
    color: 'red',
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderColor: '#e5e7eb',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    minHeight: 48, // Ensure consistent height for all inputs/pickers
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
  },
  picker: {
    flex: 1,
    // Add these lines to make the picker fill the input group
    height: '100%',
    width: '100%',
  },
  loadingIndicator: {
    flex: 1, // Allow it to take up available space
  },
  errorText: {
    flex: 1,
    color: 'red',
    fontSize: 12,
    marginLeft: 8,
  },
});

export default DynamicForm;