import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Modal} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import { readStudent, updateStudent } from '../../src/components/Students';
import { readAllCourses, readCourse }  from '../../src/components/Courses';
import MultiSelect from 'react-native-multiple-select';
import COLORS from '../../constants/colors';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";


const EditBlockScreen = ({ route, navigation }) => {
    const { blockId } = route.params;

    const [blockDetails, setBlockDetails] = useState({
        program: '',
        major: '',
        year: '',
        semester: '',
        block: '',
        courses: [], // Ensure courses is initialized as an empty array
        modalVisible: false,
        allCourses: [], 
    });

    const openCourseSelection = () => {
        setBlockDetails({ ...blockDetails, modalVisible: true });
    };

    useEffect(() => {
    const fetchData = async () => {
        try {
            const blockData = await readStudent(blockId);
            const allCoursesData = await readAllCourses();

            if (blockData && allCoursesData) {
                const selectedCourses = blockData.courses.map(course => course._id); // Assuming courses contain _id field

                setBlockDetails(prevState => ({
                    ...prevState,
                    program: blockData.program,
                    major: blockData.major,
                    year: blockData.year,
                    semester: blockData.semester,
                    block: blockData.block,
                    courses: selectedCourses,
                    modalVisible: false,
                    allCourses: allCoursesData.allCourses || [],
                }));
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    fetchData();
}, [blockId]);


    const handleUpdate = async () => {
        const { program, major, year, semester, block, courses } = blockDetails; // Access blockDetails from state

        if (!blockId || !program || !major || !year || !semester || !block || !Array.isArray(courses) || courses.length === 0) {
            Alert.alert('Input failed', 'Please fill in all fields and select courses.', [{ text: 'OK' }]);
            return;
        }

    console.log('Updating Block Details...');
    console.log('Block ID:', blockId);
    console.log('Program:', program);
    console.log('Major:', major);
    console.log('Year:', year);
    console.log('Semester:', semester);
    console.log('Block:', block);
    console.log('Courses:', courses); // Check the structure of courses first

    try {
        // Fetch course details based on their IDs
        const courseDetailsPromises = courses.map(courseId => readCourse(courseId)); 
        const courseDetails = await Promise.all(courseDetailsPromises);

        console.log('Fetched Course Details:', courseDetails);

        // Map the fetched course details to include necessary properties for block update
        const coursesForBlock = courseDetails.map(course => ({
            _id: course._id,
            code: course.code,
            description: course.description,
            units: course.units,
            type: course.type,
        }));

        console.log('Courses for Block:', coursesForBlock);

        // Update block details with the associated courses using the updateStudent function
        await updateStudent(blockId, program, major, year, semester, block, coursesForBlock);

        // Display success message or perform further actions
        Alert.alert('Success', 'Block details updated successfully.');

        // Further operations with courseDetails...
    } catch (error) {
        Alert.alert('Error', 'Failed to update block. Please try again.');
        console.error('Error updating block:', error);
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
    }}>Edit Course Details
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
                    selectedValue={blockDetails.program}
                    style={{ height: 50, width: "100%" }}
                    onValueChange={(itemValue) => setBlockDetails({ ...blockDetails, program: itemValue })}
                >
                    <Picker.Item label="Select Type" value="" color={COLORS.grey} enabled={false} />
                    <Picker.Item label="BSCS" value="BSCS" />
                    <Picker.Item label="BSIT" value="BSIT" />
                    {/* Add more Picker.Item as needed */}
                </Picker>
            </View>
        </View>
    </View>

    {/* Program picker */}
    <View style={{ marginBottom: 12 }}>
        <Text style={{
            fontSize: 16,
            fontWeight: 400,
            marginVertical: 8
        }}>Major:</Text>
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
                    selectedValue={blockDetails.major}
                    style={{ height: 50, width: "100%" }}
                    onValueChange={(itemValue) => setBlockDetails({ ...blockDetails, major: itemValue })}
                >
                    <Picker.Item label="Select Type" value="" color={COLORS.grey} enabled={false} />
                    <Picker.Item label="Data Science" value="DS" />
                    <Picker.Item label="System Development" value="SD" />
                    <Picker.Item label="N/A" value="N/A" />
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
            <View style={{
                backgroundColor: 'white',
                width: "100%",
                height: 48,
                borderRadius: 15,
                alignItems: "center",
                justifyContent: "center",
            }}>
                <Picker
                    selectedValue={blockDetails.year}
                    style={{ height: 50, width: "100%" }}
                    onValueChange={(itemValue) => setBlockDetails({ ...blockDetails, year: itemValue })}
                >
                    <Picker.Item label="Select Type" value="" color={COLORS.grey} enabled={false} />
                    <Picker.Item label="1st" value="1st" />
                    <Picker.Item label="2nd" value="2nd" />
                    <Picker.Item label="3rd" value="3rd" />
                    <Picker.Item label="4th" value="4th" />
                    {/* Add more Picker.Item as needed */}
                </Picker>
            </View>
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
                    selectedValue={blockDetails.semester}
                    style={{ height: 50, width: "100%" }}
                    onValueChange={(itemValue) => setBlockDetails({ ...blockDetails, semester: itemValue })}
                >
                    <Picker.Item label="Select Type" value="" color={COLORS.grey} enabled={false} />
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
                    selectedValue={blockDetails.block}
                    style={{ height: 50, width: "100%" }}
                    onValueChange={(itemValue) => setBlockDetails({ ...blockDetails, block: itemValue })}
                >
                    <Picker.Item label="Select Type" value="" color={COLORS.grey} enabled={false} />
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
            }} onPress={openCourseSelection}>
                <Ionicons name="ios-book" size={20} color="black"/>
                <Text style={{ marginLeft: 10, fontWeight: 'bold' }}>Select Courses</Text>
        </TouchableOpacity>
        </View>
    </View>
    
{/* multiselect pop up */}
    <Modal
        animationType="fade"
        transparent={true}
        visible={blockDetails.modalVisible}
        onRequestClose={() => setBlockDetails({ ...blockDetails, modalVisible: false })}
    >
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: '90%', maxHeight: '90%' }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Select Courses</Text>
            <MultiSelect
                items={blockDetails.allCourses.map(course => ({
                    _id: course._id,
                    code: course.code,
                    description: course.description,
                    units: course.units,
                    type: course.type,
                    displayText: `${course.description}`
                }))} // Use blockDetails.allCourses directly
                uniqueKey="_id"
                onSelectedItemsChange={selectedItems => {
                    // Ensure selectedItems is not null or undefined
                    if (selectedItems !== null && selectedItems !== undefined) {
                        setBlockDetails(prevState => ({
                            ...prevState,
                            courses: selectedItems,
                        }));
                    }
                }}
                selectedItems={blockDetails.courses}
                selectText="Select Courses"
                searchInputPlaceholderText="Search Courses..."
                onChangeInput={text => console.log(text)}
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
                    
                    const { courses, program, major, year, semester, block } = this.state;
                    if (!program || !major || !year || !semester || !block || courses.length === 0) {
                        Alert.alert('Input failed', 'Please fill in all fields and select courses.', [{ text: 'OK' }]);
                        return;
                    }

                    // Call the save function to handle saving the selected courses
                    handleUpdate(blockDetails.program, bloclDetails.major, blockDetails.year, blockDetails.semester, blockDetails.block, blockDetails.courses);

                    // Close the modal or perform any additional actions
                    setBlockDetails({ ...blockDetails, modalVisible: false });
                }}

            />
            <TouchableOpacity onPress={() => setBlockDetails({ ...blockDetails, modalVisible: false })}>
                <Text style={{ color: COLORS.primary, fontSize: 18 }}>Close</Text>
            </TouchableOpacity>
        </View>
    </View>
    </Modal>

{/* update button */}
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
            <Text style={{ fontSize: RFValue(15), fontWeight: 'bold', color: 'white', textAlign: 'center' }}>
            Update Course
            </Text>
        </TouchableOpacity>
    </View>

    </View>
      );
};


export default EditBlockScreen;