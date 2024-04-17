import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Modal, ScrollView } from 'react-native';
import { readAllCourses, readCourse } from '../../src/components/Courses';
import { Ionicons } from '@expo/vector-icons';
import { Teachers } from '../../src/index';
import MultiSelect from 'react-native-multiple-select';
import COLORS from '../../constants/colors';

class FacultyAdd extends Component {
    state = {
        firstName: '',
        lastName: '',
        specialized: [],
        modalVisible: false
    };

    clearInputs = () => {
        this.setState({
            firstName: '',
            lastName: '',
            specialized: []
        });
    };

    openCourseSelection = async () => {
        try {
            // Fetch courses and update allCourses state here
            const allCourses = await readAllCourses(); // Wait for the data fetch
            console.log('Available Courses Before Setting State:', allCourses);

            this.setState({ allCourses, modalVisible: true }, () => {
                console.log('Available Courses After Setting State:', this.state.allCourses);
            });
        } catch (error) {
            console.error('Failed to fetch courses:', error);
            // Handle error condition - show an alert or perform other actions
        }
    };

    handleFirstName = (text) => {
        this.setState({ firstName: text });
    };

    handleLastName = (text) => {
        this.setState({ lastName: text });
    };

    handleSpecialized = (selectedItems) => {
        this.setState({ specialized: selectedItems, modalVisible: false });
    };

    save = async () => {
    const { firstName, lastName, specialized } = this.state;

    if (!firstName || !lastName || !Array.isArray(specialized) || specialized.length === 0) {
        Alert.alert('Input failed', 'Please fill in all fields and select courses.', [{ text: 'OK' }]);
        return;
    }

    try {
        const teacher = new Teachers();
        const name = `${firstName} ${lastName}`;

        // Fetch details of the selected courses
        const courseDetailsPromises = specialized.map(courseId => readCourse(courseId));
        const courseDetails = await Promise.all(courseDetailsPromises);

        // Format the fetched course details
        const coursesForFaculty = courseDetails.map(course => ({
            _id: course._id,
            code: course.code,
            description: course.description,
            units: course.units,
            type: course.type,
        }));

        // Assuming `create` method returns a promise
        await teacher.create(name, coursesForFaculty);

        // Display a success message with faculty details
        setTimeout(() => {
            Alert.alert(
                'Created successfully!',
                `Faculty Details:\nName: ${name}\nSpecialization: ${coursesForFaculty.map(course => course.code).join(', ')}`,[
                {
                    text: 'OK',
                    onPress: () => {
                        // Navigate to Dashboard screen
                        this.props.navigation.navigate('FacultyList');
                    },
                },]
            );
        }, 500);
            this.clearInputs(); // Reset inputs after successful save
        } catch (error) {
            Alert.alert('Error', 'Failed to create faculty. Please try again.');
            console.error('Error creating faculty:', error);
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
                marginTop: 20,
                padding: 10,
                alignSelf: 'flex-start'
            }}>Add Faculty
            </Text>

            <View style={{ marginBottom: 12 }}>
                <Text style={{
                    fontSize: 16,
                    fontWeight: 400,
                    marginVertical: 8
                }}>First Name:</Text>
                <View style={{
                    flexDirection: 'row',
                    width: '90%',
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
                        placeholder=' ex. Juan'
                        placeholderTextColor={COLORS.grey}
                        onChangeText={this.handleFirstName}
                        value={this.state.firstName}
                        style={{
                            width: "100%",
                            color: COLORS.black, // Set the text color inside the input box to black
                    }}/>
                    </View>
                </View>
            </View>

            <View style={{ marginBottom: 12 }}>
                <Text style={{
                    fontSize: 16,
                    fontWeight: 400,
                    marginVertical: 8
                }}>Last Name:</Text>
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
                        placeholder=' ex. De la Cruz'
                        placeholderTextColor={COLORS.grey}
                        onChangeText={this.handleLastName}
                        value={this.state.lastName}
                        style={{
                            width: "100%",
                            color: COLORS.black, // Set the text color inside the input box to black
                    }}/>
                    </View>
                </View>
            </View>
            
            {/* Courses button that triggers multiselect */}
    <View style={{ marginBottom: 12 }}>
        <Text style={{
            fontSize: 16,
            fontWeight: 400,
            marginVertical: 8
        }}>Courses:</Text>
        <View style={{
            flexDirection: 'row',
            width: '90%',
            backgroundColor: "#bce3e1",
            borderRadius: 15,
            alignItems: 'center',
        }}>
            <TouchableOpacity style={{
                backgroundColor: 'white',
                width: "100%",
                height: 48,
                borderRadius: 15,
                alignItems: "center",
                justifyContent: "center",
                flexDirection: 'row'
            }} onPress={this.openCourseSelection}>
                <Ionicons name="ios-book" size={20} color="black"/>
                <Text style={{ marginLeft: 10, fontWeight: 'bold' }}>Select Courses</Text>
            </TouchableOpacity>

        </View>
    </View>

    <Modal
    animationType="fade"
    transparent={true}
    visible={this.state.modalVisible}
    onRequestClose={() => {
        this.setState({ modalVisible: false });
    }}
>
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <View style={{ 
            backgroundColor: 'white', 
            padding: 20, 
            borderRadius: 10, 
            width: '95%', // Adjust the width here
            maxHeight: '80%', // Adjust the height here
            shadowColor: '#000',
            shadowOffset: {
                width: -10,
                height: -10,
            },
            shadowOpacity: 1,
            shadowRadius: 10,
            elevation: 7, 
            }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Select Courses</Text>
            {/* Wrap MultiSelect with ScrollView */}
            <ScrollView style={{ maxHeight: 400 }}> 
                <MultiSelect
                    items={this.state.allCourses && this.state.allCourses.allCourses ? this.state.allCourses.allCourses.map(course => ({
                        _id: course._id,
                        code: course.code,
                        description: course.description,
                        units: course.units,
                        type: course.type,
                        displayText: `${course.description}`
                    })) : []}
                    uniqueKey="_id"
                    onSelectedItemsChange={selectedItems => {
                        // Limit the selected items to a maximum of 4 
                        let limitedSelectedItems = selectedItems;
                        if (limitedSelectedItems.length > 4) {
                            limitedSelectedItems = limitedSelectedItems.slice(0, 4);
                        }
                        this.setState({ specialized: limitedSelectedItems });
                    }}
                    selectedItems={this.state.specialized}
                    selectText="Select Courses"
                    searchInputPlaceholderText="Search Courses..."
                    onChangeInput={text => console.log(text)}
                    tagContainerStyle={{
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                        marginRight: 10,
                        borderRadius: 20,
                        width: '95%'
                    }}
                    tagTextStyle={{
                        color: 'white',
                        fontSize: 10,
                        paddingHorizontal: 5,
                    }}
                    tagRemoveIconColor={COLORS.primary}
                    tagBorderColor={COLORS.primary}
                    tagTextColor={COLORS.primary}
                    selectedItemTextColor={COLORS.primary}
                    selectedItemIconColor={COLORS.primary}
                    itemTextColor="#000"
                    displayKey="displayText"
                    searchInputStyle={{ color: COLORS.primary }}
                    submitButtonColor={COLORS.primary}
                    submitButtonText="Submit"
                    onConfirm={() => {
                        
                        const { firstName, lastName, specialized } = this.state;
                        if (!firstName || !lastName || specialized.length === 0) {
                            Alert.alert('Input failed', 'Please fill in all fields and select courses.', [{ text: 'OK' }]);
                            return;
                        }

                        // Call the save function to handle saving the selected courses
                        this.save(this.state.firstName, this.state.lastName, this.state.specialized);
                        
                        // Close the modal or perform any additional actions
                        this.setState({ modalVisible: false });
                    }}
                />
            </ScrollView>
            {/* End of ScrollView */}
            
            <TouchableOpacity
                onPress={() => {
                    this.setState({ modalVisible: false });
                    // Any additional actions when closing the modal
                }}
                style={{ marginTop: 20, alignSelf: 'center' }}
            >
                <Text style={{ color: COLORS.primary, fontSize: 20, textAlign: 'center' }}>Close</Text>
            </TouchableOpacity>
        </View>
    </View>
    </Modal>



            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
                {/* Button 1 */}

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
            onPress = {() => this.save(this.state.firstName, this.state.lastName, this.state.specialized)}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white', textAlign: 'center' }}
                >Save
                </Text>
            </TouchableOpacity>


                {/* Button 2 */}
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

            {/* <View style={{ justifyContent: 'center', marginTop: 20, position: 'absolute', bottom: 20, width: '100%'}}>
            <TouchableOpacity style={{
                marginRight: 20,
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: 10,
            }}
                onPress={() => navigation.navigate('FacultyList')}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black', textAlign: 'center' }}
                >Faculty List
                </Text>
            </TouchableOpacity>
            </View> */}

            </View>
        );
   };
};


export default FacultyAdd;
