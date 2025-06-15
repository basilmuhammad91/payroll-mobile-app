import { Picker } from '@react-native-picker/picker';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather'; // or FontAwesome

const DynamicForm = ({ fields, formData, setFormData }) => {
  return (
    <View style={styles.card}>
      {fields.map(field => {
        const value = formData[field.name] || '';
        const iconName = field.icon || 'edit';

        return (
          <View key={field.name} style={styles.fieldContainer}>
            {/* Label */}
            <Text style={styles.label}>{field.label}</Text>

            {/* Input Group */}
            <View style={styles.inputGroup}>
              <Icon name={iconName} size={20} color="#e11d48" style={styles.icon} />

              {field.type === 'select' ? (
                <Picker
                  selectedValue={value}
                  style={styles.picker}
                  onValueChange={val =>
                    setFormData(prev => ({ ...prev, [field.name]: val }))
                  }
                >
                  {field.options.map(option => (
                    <Picker.Item label={option} value={option} key={option} />
                  ))}
                </Picker>
              ) : (
                <TextInput
                  style={styles.input}
                  placeholder={field.placeholder}
                  value={value}
                  keyboardType={field.type === 'number' ? 'numeric' : 'default'}
                  onChangeText={text =>
                    setFormData(prev => ({ ...prev, [field.name]: text }))
                  }
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
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderColor: '#e5e7eb',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
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
  },
});

export default DynamicForm;
