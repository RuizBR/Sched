import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Courses } from '../../src/index'
import COLORS from '../../constants/colors';

class SubjectAdd extends Component{
    state = {
        code: '',
        description: '',
        units: '',
        type: ''
    }

    clearInputs = () => {
        this.setState({
            code: '',
            description: '',
            units: '',
            type: ''
        });
    };

    handleCode = (text) => {
        this.setState({ code: text })
    }
    handleDescription = (text) => {
        this.setState({ description: text })
    }
    handleUnits = (text) => {
        this.setState({ units: text })
    }
    handleType = (text) => {
        this.setState({ type: text })
    }
    save = async () => {
        const { code, description, units, type } = this.state;
    
        // Check if any required field is empty and handle each case separately
        if (!code) {
            Alert.alert('Input failed', 'Please enter a course code.', [{ text: 'OK' }]);
            return;
        }
    
        if (!description) {
            Alert.alert('Input failed', 'Please enter a course description.', [{ text: 'OK' }]);
            return;
        }
    
        if (!units) {
            Alert.alert('Input failed', 'Please enter the number of units.', [{ text: 'OK' }]);
            return;
        }
    
        if (!type) {
            Alert.alert('Input failed', 'Please select a type.', [{ text: 'OK' }]);
            return;
        }
    
        const courses = new Courses();
        
        try {
            const create = await courses.create(code, description, units, type);
            
            setTimeout(() => {
                Alert.alert(
                    'Course created successfully!',
                    `Course Details:\nCode: ${code}\nDescription: ${description}\nUnits: ${units}\nType: ${type}`, [
                    {
                        text: 'OK',
                        onPress: () => {
                            // Navigate to Dashboard screen
                            this.props.navigation.navigate('SubjectList');
                        },
                    },
                ]);
                this.clearInputs();
            }, 500);
            this.clearInputs(); // Reset inputs after successful save
        } catch (error) {
            Alert.alert('Error', 'Failed to create subject. Please try again.');
            console.error('Error creating subject:', error);
        }
    };
    
    render() { 
    const { navigation } = this.props;

    return (
    <View style={{
        flex: 1,
        backgroundColor: COLORS.teal,
        justifyContent: "flex-start",
        alignItems: 'center'    
    }}>

    <Text style={{
        fontSize: 25,
        fontWeight: 400,
        marginVertical: 8,
        padding: 10,
        alignSelf: 'flex-start'
    }}>Add Course:</Text>

{/* Course Code Input */}
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
                alignItems: "center",
                justifyContent: "center",
                paddingLeft: 22
            }}>
            <TextInput
                placeholder=' ex. CS 3100'
                placeholderTextColor={COLORS.grey}
                onChangeText={this.handleCode}
                value={this.state.code}
                style={{
                    width: "100%",
                    color: COLORS.black, // Set the text color inside the input box to black
            }}/>
            </View>
        </View>
    </View>

{/* Course description Input */}
    <View style={{ marginBottom: 12 }}>
        <Text style={{
            fontSize: 16,
            fontWeight: 400,
            marginVertical: 8
        }}>Course Description:</Text>
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
                paddingLeft: 22
            }}>
            <TextInput
                placeholder=' ex. Programming Languages'
                placeholderTextColor={COLORS.grey}
                onChangeText={this.handleDescription}
                value={this.state.description}
                style={{
                    width: "100%",
                    color: COLORS.black, // Set the text color inside the input box to black
            }}/>
            </View>
        </View>
    </View>

{/* Units picker */}
    <View style={{ marginBottom: 12 }}>
        <Text style={{
            fontSize: 16,
            fontWeight: 400,
            marginVertical: 8
        }}>Units:</Text>
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
                paddingLeft: 22
            }}>
            <TextInput
                placeholder=' ex. 3'
                placeholderTextColor={COLORS.grey}
                onChangeText={this.handleUnits}
                value={this.state.units}
                style={{
                    width: "100%",
                    color: COLORS.black, // Set the text color inside the input box to black
            }}keyboardType='numeric'
            />
            </View>
        </View>
    </View>

{/* Type picker */}
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
                    style={{ height: 50, width: "100%" }}
                    onValueChange={(itemValue) => this.handleType(itemValue)}
                >
                    <Picker.Item label="Select Type" value="" color={COLORS.grey} enabled={false} />
                    <Picker.Item label="Lecture" value="Lecture" />
                    <Picker.Item label="Laboratory" value="Laboratory" />
                    {/* Add more Picker.Item as needed */}
                </Picker>
            </View>
        </View>
    </View>

    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>

{/* Save Button */}
    <TouchableOpacity style={{
        width: 100,
        height: 70,
        backgroundColor: "#728f9e",
        borderRadius: 20,
        marginRight: 20,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
    }}
        onPress = {() => this.save(this.state.code, this.state.description, this.state.units, this.state.type)}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white', textAlign: 'center' }}
        >Save
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
    }}
        onPress={() => navigation.navigate('Dashboard')}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white', textAlign: 'center' }}
        >Cancel
        </Text>
    </TouchableOpacity>
    </View>

{/* View Course List */}
    {/* <View style={{ justifyContent: 'center', marginTop: 20, position: 'absolute', bottom: 20, width: '100%'}}>
    <TouchableOpacity style={{
        marginRight: 20,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
    }}
        onPress={() => navigation.navigate('SubjectList')}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black', textAlign: 'center' }}
        >Course List
        </Text>
    </TouchableOpacity>
    </View> */}

    </View>
  );
};
};

export default SubjectAdd;
