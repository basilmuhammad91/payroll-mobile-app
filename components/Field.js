// components/Field.js
import { Text, TextInput, View } from "react-native";

export default function Field({ field, value, onChange }) {
  switch (field.type) {
    case "text":
      return (
        <View style={{ marginVertical: 8 }}>
          <Text>{field.label}</Text>
          <TextInput
            style={{ borderWidth: 1, padding: 8 }}
            value={value}
            onChangeText={(text) => onChange(field.name, text)}
          />
        </View>
      );
    // case "select":
    //   return (
    //     <View style={{ marginVertical: 8 }}>
    //       <Text>{field.label}</Text>
    //       <Picker
    //         selectedValue={value}
    //         onValueChange={(itemValue) => onChange(field.name, itemValue)}
    //       >
    //         {field.options.map((option) => (
    //           <Picker.Item key={option} label={option} value={option} />
    //         ))}
    //       </Picker>
    //     </View>
    //   );
    // Add other field types as needed
    default:
      return null;
  }
}
