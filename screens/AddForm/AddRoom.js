import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Rooms } from '../../src/index';
import COLORS from '../../constants/colors';

class AddRoom extends Component {
    state = {
        name: '',
        type: '',
    };

    handleName = (text) => {
        this.setState({ name: text });
    };

    handleType = (value) => {
        this.setState({ type: value });
    };


    save = async (name, type) => {
        if (!name || !type) {
            Alert.alert('Missing Input!', 'Please enter a room name and select a type.', [{ text: 'OK' }]);
            return;
        }

        const room = new Rooms();

        try {
            // Call the createRoom method from the Rooms object
            await room.create(name, type); // Include type in the create method
            setTimeout(() => {
                Alert.alert(
                    'Room created successfully!',
                    `Room Details:\nName: ${name}\nType: ${type}`,[
                    {
                        text: 'OK',
                        onPress: () => {
                            // Navigate to Dashboard screen
                            this.props.navigation.navigate('Rooms');
                        },
                    }]
                );
            }, 500);
        } catch (error) {
            Alert.alert('Error', 'Failed to save room. Please try again.', [{ text: 'OK' }]);
        }
    };



render() {
    const { navigation } = this.props;
    return (
        <View style={{
            flex: 1,
            backgroundColor: COLORS.teal,
            justifyContent: 'flex-start',
            alignItems: 'center',
        }}>
            <Text style={{
                fontSize: 25,
                fontWeight: 400,
                marginVertical: 8,
                padding: 10,
                alignSelf: 'flex-start'
            }}>Add Room:</Text>

{/* Room Name input */}
        <View style={{ marginBottom: 12 }}>
            <Text style={{
                fontSize: 16,
                fontWeight: 400,
                marginVertical: 8,
            }}>Room Name:
            </Text>

                <View style={{
                    flexDirection: 'row',
                    width: '90%',
                    backgroundColor: '#bce3e1',
                    borderRadius: 15,
                    alignItems: 'center',
                }}>
                    <View style={{
                        backgroundColor: 'white',
                        width: '100%',
                        height: 48,
                        borderRadius: 15,
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingLeft: 22,
                    }}>
                        <TextInput
                            placeholder="ex. NB 301"
                            placeholderTextColor={COLORS.grey}
                            style={{
                                width: '100%',
                                color: COLORS.black,
                            }}onChangeText={this.handleName}/>
                    </View>
                </View>
        </View>

{/* Room Type Input */}
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
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                        <Picker
                            selectedValue={this.state.type}
                            style={{ height: 50, width: '100%' }}
                            onValueChange={(itemValue) => this.handleType(itemValue)}
                        >
                            <Picker.Item label="Select Type" value="" color={COLORS.grey} enabled={true} />
                            <Picker.Item label="Lecture" value="Lecture" />
                            <Picker.Item label="Laboratory" value="Laboratory" />
                                {/* Add more Picker.Item as needed */}
                        </Picker>

                    </View>
                </View>
        </View>

{/* Save Button and Cancel */}
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
            <TouchableOpacity
                style={{
                    width: 100,
                    height: 70,
                    backgroundColor: '#728f9e',
                    borderRadius: 20,
                    marginRight: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingHorizontal: 10,
                }}
                    onPress={() => this.save(this.state.name, this.state.type)} // Pass name and type
            >
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white', textAlign: 'center' }}>
                    Save
                </Text>
            </TouchableOpacity>

{/* Cancel Button */}
            <TouchableOpacity style={{
                width: 100,
                height: 70,
                backgroundColor: COLORS.primary,
                borderRadius: 20,
                marginRight: 20,
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: 10,
            }}onPress={() => navigation.navigate('Dashboard')}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white', textAlign: 'center' }}>
                    Cancel
                </Text>
            </TouchableOpacity>
            </View>

{/* Rooms List view */}
        {/* <View style={{ justifyContent: 'center', marginTop: 20, position: 'absolute', bottom: 20, width: '100%' }}>
            <TouchableOpacity style={{
                marginRight: 20,
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: 10,
            }}onPress={() => navigation.navigate('Rooms')}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black', textAlign: 'center' }}>
                    View All Rooms
                </Text>
            </TouchableOpacity>
        </View> */}
        </View>
        );
    }
}

export default AddRoom;
