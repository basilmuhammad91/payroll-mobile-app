import { useEffect, useState } from 'react';
import { Button, View } from 'react-native';
import DynamicForm from '../app/components/DynamicForm';
import { createLeave, getLeaves } from '../app/modules/leaves/api';
import { leaveFields } from '../app/modules/leaves/config';


const LeavesScreen = () => {
  const [formData, setFormData] = useState({});
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    loadLeaves();
  }, []);

  const loadLeaves = async () => {
    const { data } = await getLeaves();
    setLeaves(data);
  };

  const handleSubmit = async () => {
    await createLeave(formData);
    setFormData({});
    loadLeaves();
  };

  return (
    <View>
      <DynamicForm fields={leaveFields} formData={formData} setFormData={setFormData} />
      <Button title="Save" onPress={handleSubmit} />
    </View>
  );
};

export default LeavesScreen;
