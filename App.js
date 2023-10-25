import "react-native-gesture-handler";
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from '@react-navigation/drawer';


import Welcome from './screens/Welcome';
import Login from './screens/Login';
import Personalization from './screens/Personalization';
import Schedule from './screens/Schedule';
import Conflict from './screens/Conflict';
import Calendar from './screens/Calendar';
import Request from './screens/Request';
import Dashboard from './screens/Dashboard';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
 
function DrawerRoutes() {
  return (
    <Drawer.Navigator initialRouteName="Dashboard"
    screenOptions={{
        headerStyle: {
          backgroundColor: '#E0F2F1', // Set your header color here
        },
        drawerStyle: {
          backgroundColor: '#E0F2F1', // Set your drawer background color here
        },
      }}
      >
      <Drawer.Screen name="Home" component={Dashboard}  />
      <Drawer.Screen name="Personalization" component={Personalization} />
      <Drawer.Screen name="Schedule Management" component={Schedule} />
      <Drawer.Screen name="Conflict Resolution" component={Conflict} />
      <Drawer.Screen name="Calendar View" component={Calendar} />
      <Drawer.Screen name="Time of Request" component={Request} />
    </Drawer.Navigator>
  );
}
 
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Dashboard" component={DrawerRoutes} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
