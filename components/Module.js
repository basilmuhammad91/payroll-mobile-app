// components/Module.js
import { Text, View } from "react-native";
import Field from "./Field";

export default function Module({ module, formData, setFormData }) {
  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <View style={{ marginBottom: 24 }}>
      <Text style={{ fontWeight: "bold", fontSize: 18, marginBottom: 12 }}>
        {module.moduleName}
      </Text>
      {module.fields.map((field) => (
        <Field
          key={field.name}
          field={field}
          value={formData[field.name] || ""}
          onChange={handleChange}
        />
      ))}
    </View>
  );
}
