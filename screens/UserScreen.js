import { useEffect, useState } from 'react';
import { Button, View } from 'react-native';
import DynamicForm from '../app/components/DynamicForm';
import { createUser, getUsers } from '../app/modules/users/api';
import { userFields } from '../app/modules/users/config';


const UsersScreen = () => {
  const [formData, setFormData] = useState({});
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const { data } = await getUsers();
    setUsers(data);
  };

  const handleSubmit = async () => {
    await createUser(formData);
    setFormData({});
    loadUsers();
  };

  return (
    <View>
      <DynamicForm fields={userFields} formData={formData} setFormData={setFormData} />
      <Button title="Save" onPress={handleSubmit} />
    </View>
  );
};

export default UsersScreen;
