import { Picker } from '@react-native-picker/picker';
import { TextInput, View } from 'react-native';

const DynamicForm = ({ fields, formData, setFormData }) => {
  return (
    <View>
      {fields.map(field => {
        const value = formData[field.name] || '';

        if (field.type === 'select') {
          return (
            <Picker
              key={field.name}
              selectedValue={value}
              onValueChange={val => setFormData(prev => ({ ...prev, [field.name]: val }))}
            >
              {field.options.map(option => (
                <Picker.Item label={option} value={option} key={option} />
              ))}
            </Picker>
          );
        }

        return (
          <TextInput
            key={field.name}
            placeholder={field.label}
            value={value}
            onChangeText={text => setFormData(prev => ({ ...prev, [field.name]: text }))}
          />
        );
      })}
    </View>
  );
};

export default DynamicForm;
