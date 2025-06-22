import { IconSymbol } from '@/components/ui/IconSymbol';
import { themeConfig } from '@/config/appConfig';
import { useColorScheme } from '@/hooks/useColorScheme';
import AllowanceScreen from '@/screens/AllowanceScreen';
import BankScreen from '@/screens/BankScreen';
import CostCenterScreen from '@/screens/CostCenterScreen';
import DepartmentScreen from '@/screens/DepartmentScreen';
import EmployeeTypeScreen from '@/screens/EmployeeTypeScreen';
import LeaveScreen from '@/screens/LeaveScreen';
import ParentCostCenterScreen from '@/screens/ParentCostCenterScreen';
import PayrollOperations from '@/screens/PayrollOperations';
import WorkLocationScreen from '@/screens/WorkLocationScreen';
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
        <Stack.Screen
          name="DepartmentLeaveScreen"
          component={DepartmentScreen}
          options={{ title: 'Department' }}
        />

        <Stack.Screen
          name="WorkLocationScreen"
          component={WorkLocationScreen}
          options={{ title: 'Work Location' }}
        />

        <Stack.Screen
          name="EmployeeTypeScreen"
          component={EmployeeTypeScreen}
          options={{ title: 'Employee Type' }}
        />

        <Stack.Screen
          name="ParentCostCenterScreen"
          component={ParentCostCenterScreen}
          options={{ title: 'Parent Cost Center' }}
        />

        <Stack.Screen
          name="BankScreen"
          component={BankScreen}
          options={{ title: 'Bank' }}
        />

        <Stack.Screen
          name="AllowanceScreen"
          component={AllowanceScreen}
          options={{ title: 'Allowance' }}
        />

         <Stack.Screen
          name="CostCenterScreen"
          component={CostCenterScreen}
          options={{ title: 'Cost Center' }}
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
        name="Payment Operations"
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
