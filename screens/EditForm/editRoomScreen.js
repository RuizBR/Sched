import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { readRoom, updateRoom } from '../../src/components/Rooms';
import COLORS from '../../constants/colors';

const EditRoomScreen = ({ route, navigation }) => {
  const { roomId } = route.params;

  const [roomDetails, setRoomDetails] = useState({
    name: '',
    type: ''
  });

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const response = await readRoom(roomId);
        if (response) {
          setRoomDetails({
            name: response.name,
            type: response.type,
          });
        }
      } catch (error) {
        console.error('Error fetching Room details:', error);
      }
    };

    fetchRoomDetails();
  }, [roomId]);

  const handleUpdate = async () => {
    try {
      const { name, type } = roomDetails;

      const updateResponse = await updateRoom(roomId, name, type);

      if (updateResponse) {
        console.log('Room updated successfully:', updateResponse);

        // Show an alert after successful update
        Alert.alert(
          'Update Successful',
          'Room details have been updated.',
          [{ text: 'OK', onPress: () => navigation.goBack() }]
        );
      } else {
        console.error('Failed to update course');
      }
    } catch (error) {
      console.error('Error updating course:', error);
    }
  };

  return (
    <View style={{
        flex: 1,
        backgroundColor: COLORS.teal,
        justifyContent: "flex-start",
        alignItems: 'center'    
    }}>

    <Text style={{
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: 20,
        padding: 10,
        alignSelf: 'flex-start'
    }}>Edit Room Details
    </Text>

{/* Room name */}
    <View style={{ marginBottom: 12 }}>
        <Text style={{
            fontSize: 16,
            fontWeight: 400,
            marginVertical: 8
        }}>Course Code:</Text>
        <View style={{
            flexDirection: 'row',
            width: '90%',
            backgroundColor: "#bce3e1",
            borderRadius: 15,
            alignItems: 'center',
        }}>
            <View style={{
                backgroundColor: 'white',
                width: "100%",
                height: 48,
                borderRadius: 15,
                justifyContent: "center",
                paddingLeft: 22
            }}>
            <TextInput
                value={roomDetails.name}
                onChangeText={(text) => setRoomDetails({ ...roomDetails, name: text })}
              />
            </View>
        </View>
    </View>

{/* Picker for room type */}
    <View style={{ marginBottom: 12 }}>
        <Text style={{
            fontSize: 16,
            fontWeight: 400,
            marginVertical: 8
        }}>Type:</Text>
        <View style={{
            flexDirection: 'row',
            width: '90%',
            backgroundColor: "#bce3e1",
            borderRadius: 15,
            alignItems: 'center',
        }}>
            <View style={{
                backgroundColor: 'white',
                width: "100%",
                height: 48,
                borderRadius: 15,
                justifyContent: "center",
            }}>
                <Picker
                  selectedValue={roomDetails.type}
                  onValueChange={(itemValue) => setRoomDetails({ ...roomDetails, type: itemValue })}
                >
                  <Picker.Item label="Select Type" value="" color={COLORS.grey} enabled={false} />
                  <Picker.Item label="Lecture" value="Lecture" />
                  <Picker.Item label="Laboratory" value="Laboratory" />
                </Picker>
            </View>
        </View>
    </View>

{/* Course Update button */}
    <View style={{
      width: 150,
      height: 50,
      backgroundColor: '#728f9e',
      borderRadius: 20,
      marginRight: 20,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 10,
    }}>
      <TouchableOpacity onPress={handleUpdate}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white', textAlign: 'center' }}>
          Update Room
        </Text>
      </TouchableOpacity>
    </View>

    </View>
  );
};

export default EditRoomScreen;
