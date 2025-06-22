import { IconSymbol } from '@/components/ui/IconSymbol';
import { themeConfig } from '@/config/appConfig';
import { useColorScheme } from '@/hooks/useColorScheme';
import LeaveScreen from '@/screens/LeaveScreen';
import PayrollOperations from '@/screens/PayrollOperations';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';


export default function TabLayout() {
  const colorScheme = useColorScheme();
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  const maroon = '#e82938';


  function PaymentOperationStack() {
    return (
      <Stack.Navigator
        initialRouteName="PayrollOperations"
        screenOptions={{
          headerStyle: { backgroundColor: themeConfig.primary }, // 🟥 Header background
          headerTintColor: '#fff',                 // 🟩 Header text/icon color
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen
          name="PayrollOperations"
          component={PayrollOperations}
          options={{ title: 'Payment Operations' }}
        />
        <Stack.Screen
          name="LeaveScreen"
          component={LeaveScreen}
          options={{ title: 'Leaves' }}
        />
      </Stack.Navigator>
    );
  }

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: themeConfig.primary },    
        tabBarActiveTintColor: '#fff',               
        tabBarInactiveTintColor: '#f4cfcf',          
      }}
    >
      <Tab.Screen
        name="Leaves"
        component={PaymentOperationStack}
        options={{
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="paperplane.fill" color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
