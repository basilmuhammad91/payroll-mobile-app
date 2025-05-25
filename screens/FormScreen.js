// screens/FormScreen.js
import { useState } from "react";
import { Button, ScrollView } from "react-native";
import Module from "../components/Module";
import { formConfig } from "../config/formConfig";

export default function FormScreen() {
  const [formData, setFormData] = useState({});

  const handleSubmit = () => {
    console.log("Form data submitted:", formData);
  };

  return (
    <ScrollView style={{ padding: 24 }}>
      {formConfig.map((module) => (
        <Module
          key={module.moduleName}
          module={module}
          formData={formData}
          setFormData={setFormData}
        />
      ))}
      <Button title="Submit" onPress={handleSubmit} />
    </ScrollView>
  );
}
