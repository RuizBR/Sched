import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import COLORS from '../constants/colors';

const Dashboard = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          backgroundColor: '#E0F2F1',
          borderBottomWidth: 1,
          borderBottomColor: 'gray',
          padding: 10,
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
          }}
        >
          Adaptive Scheduling System for CCS
        </Text>
      </View>
      <View style={{ flex: 1, padding: 20, backgroundColor: COLORS.teal }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TextInput
            style={{
              flex: 1,
              backgroundColor: 'white',
              borderRadius: 20,
              padding: 10
            }}
            placeholder="Search for available room..."
            // Add TextInput props and styles as needed
          />
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.primary,
              padding: 10,
              borderRadius: 20,
              marginLeft: 10,
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                color: 'white',
                fontSize: 16,
                fontWeight: 'bold',
              }}
            >
              Search
            </Text>
          </TouchableOpacity>
        </View>
        {/* Add the rest of your dashboard content here */}
      </View>
    </View>
  );
};

export default Dashboard;
