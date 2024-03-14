import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Modal} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import { readAllCourses, readCourse }  from '../../src/components/Courses';
import { Students } from '../../src/index'
import MultiSelect from 'react-native-multiple-select';
import COLORS from '../../constants/colors';


class AddBlock extends Component{
    state = {
        program: '',
        year: '',
        semester: '',
        block: '',
        modalVisible: false, // Add a state to manage the modal visibility
        courses: [], // State to manage selected courses
        allCourses: [],
    }

    clearInputs = () => {
        this.setState({
            program: '',
            year: '',
            semester: '',
            block: '',
            courses: []
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


    handleProgram = (text) => {
        this.setState({ program: text })
    }
    handleYear = (text) => {
        this.setState({ year: text })
    }
    handleSemester = (text) => {
        this.setState({ semester: text })
    }
    handleBlock = (text) => {
        this.setState({ block: text })
    }

    save = async () => {
    const { program, year, semester, block, courses } = this.state;

    if (!program || !year || !semester || !block || !Array.isArray(courses) || courses.length === 0) {
        Alert.alert('Input failed', 'Please fill in all fields and select courses.', [{ text: 'OK' }]);
        return;
    }

    console.log('Saving Block Details...');
    console.log('Program:', program);
    console.log('Year:', year);
    console.log('Semester:', semester);
    console.log('Block:', block);
    console.log('Courses:', courses); // Check the structure of courses first

    try {
        const student = new Students();

        // Fetch course details based on their IDs
        const courseDetailsPromises = courses.map(courseId => readCourse(courseId)); // Assuming readCourse fetches course details by ID

        // Resolve all promises to get course details
        const courseDetails = await Promise.all(courseDetailsPromises);

        console.log('Fetched Course Details:', courseDetails);

        // Map the fetched course details to include necessary properties for block creation
        const coursesForBlock = courseDetails.map(course => ({
            _id: course._id,
            code: course.code,
            description: course.description,
            units: course.units,
            type: course.type,
        }));

        console.log('Courses for Block:', coursesForBlock);

        // Save block details with the associated courses
        await student.create(program, year, semester, block, coursesForBlock);

        // Display success message or perform further actions
        Alert.alert('Created Successfully', 'Details saved successfully.');

            this.clearInputs();
        // Further operations with courseDetails...
    } catch (error) {
        Alert.alert('Error', 'Failed to create block. Please try again.');
        console.error('Error creating block:', error);
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
    }}>Add Block
    </Text>

{/* Program picker */}
    <View style={{ marginBottom: 12 }}>
        <Text style={{
            fontSize: 16,
            fontWeight: 400,
            marginVertical: 8
        }}>Program:</Text>
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
                    selectedValue={this.state.program}
                    style={{ height: 50, width: "100%" }}
                    onValueChange={(itemValue) => this.handleProgram(itemValue)}
                >
                    <Picker.Item label="Select Type" value="" color={COLORS.grey} enabled={true} />
                    <Picker.Item label="BSCS" value="BSCS" />
                    <Picker.Item label="BSIT" value="BSIT" />
                    {/* Add more Picker.Item as needed */}
                </Picker>
            </View>
        </View>
    </View>

{/* Year Picker */}
    <View style={{ marginBottom: 12 }}>
        <Text style={{
            fontSize: 16,
            fontWeight: 400,
            marginVertical: 8
        }}>Year:</Text>
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
            }}>
                <Picker
                    selectedValue={this.state.year}
                    style={{ height: 50, width: "100%" }}
                    onValueChange={(itemValue) => this.handleYear(itemValue)}
                >
                    <Picker.Item label="Select Type" value="" color={COLORS.grey} enabled={true} />
                    <Picker.Item label="1st" value="1st" />
                    <Picker.Item label="2nd" value="2nd" />
                    <Picker.Item label="3rd" value="3rd" />
                    <Picker.Item label="4th" value="4th" />
                    {/* Add more Picker.Item as needed */}
                </Picker>
            </TouchableOpacity>
        </View>
    </View>

{/* Semester Picker */}
    <View style={{ marginBottom: 12 }}>
        <Text style={{
            fontSize: 16,
            fontWeight: 400,
            marginVertical: 8
        }}>Semester:</Text>
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
                    selectedValue={this.state.semester}
                    style={{ height: 50, width: "100%" }}
                    onValueChange={(itemValue) => this.handleSemester(itemValue)}
                >
                    <Picker.Item label="Select Type" value="" color={COLORS.grey} enabled={true} />
                    <Picker.Item label="1st" value="1st" />
                    <Picker.Item label="2nd" value="2nd" />
                    {/* Add more Picker.Item as needed */}
                </Picker>
            </View>
        </View>
    </View>

{/* Block picker */}
    <View style={{ marginBottom: 12 }}>
        <Text style={{
            fontSize: 16,
            fontWeight: 400,
            marginVertical: 8
        }}>Block:</Text>
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
                    selectedValue={this.state.block}
                    style={{ height: 50, width: "100%" }}
                    onValueChange={(itemValue) => this.handleBlock(itemValue)}
                >
                    <Picker.Item label="Select Type" value="" color={COLORS.grey} enabled={true} />
                    <Picker.Item label="A" value="A" />
                    <Picker.Item label="B" value="B" />
                    <Picker.Item label="C" value="C" />
                    <Picker.Item label="D" value="D" />
                    <Picker.Item label="E" value="E" />
                    {/* Add more Picker.Item as needed */}
                </Picker>
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
            }}onPress={this.openCourseSelection}>
            <Ionicons name="ios-book" size={20} color="black"/>
            <Text style={{ marginLeft: 10, fontWeight: 'bold' }}>Select Courses</Text>
            </TouchableOpacity>
        </View>
    </View>
    
{/* multiselect pop up */}
    <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={() => {
            this.setState({ modalVisible: false });
        }}
    >
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ 
            backgroundColor: 'white', 
            padding: 20, 
            borderRadius: 10, 
            width: '90%', 
            maxHeight: '90%', 
            shadowColor: '#000',
                shadowOffset: {
                    width: -10,
                    height: -10,
                },
            shadowOpacity: 1,
            shadowRadius: 10,
            elevation: 7, }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Select Courses</Text>
            <MultiSelect
                items={this.state.allCourses && this.state.allCourses.allCourses ? this.state.allCourses.allCourses.map(course => ({
                    _id: course._id,
                    code: course.code,
                    description: course.description,
                    units: course.units,
                    type: course.type,
                    displayText: `${course.description}`
                })) : []
            }
                uniqueKey="_id"
                onSelectedItemsChange={selectedItems => {
                    // Ensure selectedItems is not null or undefined
                    if (selectedItems !== null && selectedItems !== undefined) {
                        this.setState({ courses: selectedItems });
                    }
                }}
                selectedItems={this.state.courses}
                selectText="Select Courses"
                searchInputPlaceholderText="Search Courses..."
                onChangeInput={text => console.log(text)}
                tagContainerStyle={{
                    paddingVertical: 5, // Adjust the vertical padding as needed
                    paddingHorizontal: 10, // Adjust the horizontal padding as needed
                    marginRight: 10,
                    borderRadius: 20, // Adjust the border radius as needed
                    width: '95%'
                }}
                tagTextStyle={{
                    color: 'white', // Change the text color of the tags
                    fontSize: 10, // Adjust the font size of the tags
                    paddingHorizontal: 5, // Adjust the horizontal padding of the text within tags
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
                    
                    const { courses, program, year, semester, block } = this.state;
                    if (!program || !year || !semester || !block || courses.length === 0) {
                        Alert.alert('Input failed', 'Please fill in all fields and select courses.', [{ text: 'OK' }]);
                        return;
                    }

                    // Call the save function to handle saving the selected courses
                    this.save(this.state.program, this.state.year, this.state.semester, this.state.block, this.state.courses);
                    
                    // Close the modal or perform any additional actions
                    this.setState({ modalVisible: false });
                }}

            />
            <TouchableOpacity
                onPress={() => {
                    this.setState({ modalVisible: false });
                    // Any additional actions when closing the modal
                }}
                style={{ marginTop: 20, alignSelf: 'flex-end' }}
            >
                <Text style={{ color: COLORS.primary, fontSize: 18 }}>Close</Text>
            </TouchableOpacity>
        </View>
    </View>
    </Modal>

{/* button for save and cancel */}
    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>

{/* save button */}
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
        onPress = {() => this.save(this.state.program, this.state.year, this.state.semester, this.state.block, this.state.courses)} 
        >
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white', textAlign: 'center' }}>
            Save
        </Text>
    </TouchableOpacity>

{/* Cancel button */}
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

{/* block list view */}
    <View style={{ justifyContent: 'center', marginTop: 20, position: 'absolute', bottom: 20, width: '100%'}}>
    <TouchableOpacity style={{
        marginRight: 20,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
    }}
        onPress={() => navigation.navigate('Blocks')}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black', textAlign: 'center' }}
        >View List
        </Text>
    </TouchableOpacity>
    </View>

    </View>
  );
};
};

export default AddBlock;
