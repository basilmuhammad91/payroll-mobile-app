import React from 'react';

import { IconSymbol } from '@/components/ui/IconSymbol';
import { useColorScheme } from '@/hooks/useColorScheme';
import LeaveScreen from '@/screens/LeaveScreen';
import PayrollOperations from '@/screens/PayrollOperations';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const Stack = createNativeStackNavigator();

  function LeaveStack() {
  return (
    <Stack.Navigator initialRouteName="PayrollOperations">
      <Stack.Screen name="PayrollOperations" component={PayrollOperations} options={{ title: 'Leaves' }} />
      <Stack.Screen name="LeaveScreen" component={LeaveScreen} options={{ title: 'Leaves' }} />
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

 return (
  <Tab.Navigator>
    <Tab.Screen
      name="Leaves"
      component={LeaveStack}
      options={{
        tabBarIcon: ({ color }) => (
          <IconSymbol size={28} name="paperplane.fill" color={color} />
        ),
      }}
    />
  </Tab.Navigator>
);
}
