import React from 'react';
import { View, Image, Text, StatusBar, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

import Welcome from './screens/Starting/Welcome';
import Login from './screens/Starting/Login';
import Personalization from './screens/Navigation/Personalization';
import Schedule from './screens/Navigation/Schedule';
import Dashboard from './screens/Navigation/Dashboard';
import SubjectList from './screens/SubjectList';
import SubjectAdd from './screens/AddForm/SubjectAdd';
import FacultyList from './screens/FacultyList';
import FacultyAdd from './screens/AddForm/FacultyAdd';
import AddBlock from './screens/AddForm/AddBlock'
import AddRoom from './screens/AddForm/AddRoom';
import Rooms from './screens/RoomList';
import Blocks from './screens/Blocks';
import Signup from './screens/Starting/Signup';
import EditCourseScreen from './screens/EditForm/editCourseScreen';
import EditRoomScreen from './screens/EditForm/editRoomScreen';
import EditBlockScreen from './screens/EditForm/editBlockScreen';
import EditCurriculumScreen from './screens/EditForm/EditCurriculum';
import AddCurriculum from './screens/AddForm/Curriculum';
import CurriculumList from './screens/CurriculumList';
import FacultyEdit from './screens/EditForm/editFaculty';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function TabNavigator() {

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          position: 'absolute',
          bottom: 15,
          right: 50,
          left: 50,
          height: windowHeight * 0.09,
          opacity: 0.9,
          backgroundColor: '#CCCCCC',
          borderRadius: 50, // Increased border radius
          borderWidth: 5,
          borderColor: 'rgba(0, 0, 0, 0.3)', // Color for the shadow
          shadowColor: '#111',
          shadowOpacity: 0.5,
        },
        tabBarShowLabel: false,
        tabBarOptions: {
          labelStyle: {
            fontSize: 12,
          },
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Dashboard}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ alignItems: 'center', justifyContent: 'center', left: 10 }}>
                <Ionicons name="ios-home" size={24} color={focused ? '#007260' : '#111'} />
                <Text style={{ textAlign: 'center', fontSize: 12, color: '#111' }}>Home</Text>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Schedule"
        component={Schedule}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: focused? '#007260' : '#111',
                  width: windowWidth * 0.16,
                  height: windowHeight * 0.08,
                  top: focused? -30 : 0,
                  borderRadius: 50,
                }}>
                <FontAwesome name="desktop" size={24} color={'#fff'} />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Personalization"
        component={Personalization}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ alignItems: 'center',justifyContent: 'center', right: 10 }}>
                <Ionicons name="ios-settings" size={24} color={focused ? '#007260' : '#111'} />
                <Text style={{ textAlign: 'center', fontSize: 12, color: '#111' }}>Settings</Text>
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}

function App(navigation) {
  return (
    <NavigationContainer>
    <StatusBar backgroundColor={"#E0F2F1"} barStyle="dark-content" />
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="SubjectList" component={SubjectList} options={{ headerTitle: 'Adaptive Scheduling System', headerStyle: { backgroundColor: "#c8e3e0" }, headerTitleAlign: 'center' }} />
        <Stack.Screen name="SubjectAdd" component={SubjectAdd} options={{ headerTitle: 'Adaptive Scheduling System', headerStyle: { backgroundColor: "#c8e3e0" }, headerTitleAlign: 'center' }} />
        <Stack.Screen name="FacultyList" component={FacultyList} options={{ headerTitle: 'Adaptive Scheduling System', headerStyle: { backgroundColor: "#c8e3e0" }, headerTitleAlign: 'center' }} />
        <Stack.Screen name="FacultyAdd" component={FacultyAdd} options={{ headerTitle: 'Adaptive Scheduling System', headerStyle: { backgroundColor: "#c8e3e0" }, headerTitleAlign: 'center' }} />
        <Stack.Screen name="AddBlock" component={AddBlock} options={{ headerTitle: 'Adaptive Scheduling System', headerStyle: { backgroundColor: "#c8e3e0" }, headerTitleAlign: 'center' }} />
        <Stack.Screen name="Rooms" component={Rooms} options={{ headerTitle: 'Adaptive Scheduling System', headerStyle: { backgroundColor: "#c8e3e0" }, headerTitleAlign: 'center' }} />
        <Stack.Screen name="Blocks" component={Blocks} options={{ headerTitle: 'Adaptive Scheduling System', headerStyle: { backgroundColor: "#c8e3e0" }, headerTitleAlign: 'center' }} />
        <Stack.Screen name="AddRoom" component={AddRoom} options={{ headerTitle: 'Adaptive Scheduling System', headerStyle: { backgroundColor: "#c8e3e0" }, headerTitleAlign: 'center' }} />
        <Stack.Screen name="Signup" component={Signup} options={{ headerTitle: 'Adaptive Scheduling System', headerStyle: { backgroundColor: "#c8e3e0" }, headerTitleAlign: 'center' }} />
        <Stack.Screen name="EditCourse" component={EditCourseScreen} options={{ headerTitle: 'Adaptive Scheduling System', headerStyle: { backgroundColor: "#c8e3e0" }, headerTitleAlign: 'center' }} />
        <Stack.Screen name="EditBlock" component={EditBlockScreen} options={{ headerTitle: 'Adaptive Scheduling System', headerStyle: { backgroundColor: "#c8e3e0" }, headerTitleAlign: 'center' }} />
        <Stack.Screen name="EditRoom" component={EditRoomScreen} options={{ headerTitle: 'Adaptive Scheduling System', headerStyle: { backgroundColor: "#c8e3e0" }, headerTitleAlign: 'center' }} />
        <Stack.Screen name="Curriculum" component={AddCurriculum} options={{ headerTitle: 'Adaptive Scheduling System', headerStyle: { backgroundColor: "#c8e3e0" }, headerTitleAlign: 'center' }} />
        <Stack.Screen name="EditCurriculum" component={EditCurriculumScreen} options={{ headerTitle: 'Adaptive Scheduling System', headerStyle: { backgroundColor: "#c8e3e0" }, headerTitleAlign: 'center' }} />
        <Stack.Screen name="CurriculumList" component={CurriculumList} options={{ headerTitle: 'Adaptive Scheduling System', headerStyle: { backgroundColor: "#c8e3e0" }, headerTitleAlign: 'center' }} />
        <Stack.Screen name="Edit_Faculty" component={FacultyEdit} options={{ headerTitle: 'Adaptive Scheduling System', headerStyle: { backgroundColor: "#c8e3e0" }, headerTitleAlign: 'center' }} />
        <Stack.Screen
          name="Dashboard"
          component={TabNavigator}
          options={{
            headerTitle: () => (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={require('./assets/AdaptiveLogo.png')} style={{ width: 50, height: 50, marginRight: 10 }} />
                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Adaptive Scheduling System for CCS</Text>
              </View>
            ),
            headerBackVisible: false,
            headerStyle: {
              backgroundColor: '#E0F2F1',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
