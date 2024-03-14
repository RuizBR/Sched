import React from 'react';
import { View, Text, TouchableOpacity, } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '../../constants/colors';


const Curriculum = ({ navigation }) => {

  return (
      <View style={{ flex: 1, backgroundColor: '#E0F2F1' }}>
      <View style={{ flex: 1, padding: 20, backgroundColor: COLORS.teal }}>
          <View style={{
              flexDirection: 'row', // Use row direction to place content and logo side by side
              alignItems: 'center', // Vertically center the content and logo
              height: 100,
              backgroundColor: COLORS.secondary,
              borderRadius: 15,
              padding: 10,
          }}>
            <View style={{ flex: 1 }}>
                <Text style={{
                    fontSize: 30, // Set the font size for "WELCOME"
                    fontWeight: 'bold',
                    padding: 3, // Add padding to create space within the border
                    marginLeft: 20, // Add margin to separate "WELCOME" from the rest of the text
                }}>Academic Programs
                </Text>
            </View>

            {/* Logo */}
            <Ionicons name="ios-school" size={50} color="black" style={{ marginRight: 20 }} />
      </View>


      <View style={{
        height: '40%',
        backgroundColor: "#bce3e1",
        borderRadius: 15,
        padding: 10,
        marginTop: 30
      }}>
        <View style={{
            flexDirection: 'row',
            width: '90%',
            backgroundColor: "#bce3e1",
            borderRadius: 15,
            marginTop: 15,
        }}>
        <Text style={{
            fontSize: 20, // Set the font size for "WELCOME"
            fontWeight: 'bold',
            padding: 3, // Add padding to create space within the border
            marginLeft: 10, // Add margin to separate "WELCOME" from the rest of the text
          }}>Program Code
        </Text>

        <Text style={{
            fontSize: 20, // Set the font size for "WELCOME"
            fontWeight: 'bold',
            padding: 3, // Add padding to create space within the border
            marginLeft: 10, // Add margin to separate "WELCOME" from the rest of the text
          }}>Name
        </Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingRight: 20  }}>

          {/* Button 1 */}
          <TouchableOpacity style={{
              width: 60,
              height: 60,
              backgroundColor: "#728f9e",
              borderRadius: 20,
              marginRight: 20,
              marginBottom: 10,
              flexDirection: 'row', 
              alignItems: 'center', 
              justifyContent: 'center',
          }}>
          <Ionicons name="ios-eye" size={35} color="white" style={{ marginRight: 10, marginLeft: 10 }} />
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingRight: 20  }}>

          {/* Button 1 */}
          <TouchableOpacity style={{
              width: 60,
              height: 60,
              backgroundColor: "#728f9e",
              borderRadius: 20,
              marginRight: 20,
              flexDirection: 'row', 
              alignItems: 'center', 
              justifyContent: 'center',
          }}>
          <Ionicons name="ios-eye" size={35} color="white" style={{ marginRight: 10, marginLeft: 10 }} />
          </TouchableOpacity>
        </View>
    </View>


    <TouchableOpacity
        style={{
            position: 'absolute',
            width: 80,
            height: 80,
            alignItems: 'center',
            justifyContent: 'center',
            right: 30,
            bottom: 120
        }}
            onPress={() => navigation.navigate('AddCurriculum')}>
        <View
            style={{
                width: 70,
                height: 70,
                borderRadius: 40,
                backgroundColor: COLORS.secondary,
                alignItems: 'center',
                justifyContent: 'center',
            }}>
              <Ionicons name="ios-add" size={40} color="black" />
        </View>
    </TouchableOpacity>

  </View>

  </View>
  );
};

export default Curriculum;
