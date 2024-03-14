import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Modal } from 'react-native';
import { readTeacher, updateTeacher } from '../../src/components/Teachers';
import { readAllCourses, readCourse }  from '../../src/components/Courses';
import MultiSelect from 'react-native-multiple-select';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '../../constants/colors';


const EditTeacherScreen = ({ route, navigation }) => {
  const { teacherId } = route.params;

  const [teacherDetails, setTeacherDetails] = useState({
    firstName: '',
    lastName: '',
    specialized: [],
    modalVisible: false,
    allCourses: [],
  });

  const openCourseSelection = () => {
        setTeacherDetails({ ...teacherDetails, modalVisible: true });
    };

    useEffect(() => {
    const fetchData = async () => {
        try {
            const teacherData = await readTeacher(teacherId);
            const allCoursesData = await readAllCourses();

            if (teacherData && allCoursesData) {
                const selectedSpecialized = teacherData.specialized.map(course => course._id); // Assuming courses contain _id field

                setTeacherDetails(prevState => ({
                    ...prevState,
                    firstName: teacherData.name || '',
                    specialized: selectedSpecialized,
                    modalVisible: false,
                    allCourses: allCoursesData.allCourses || [],
                }));
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    fetchData();
}, [teacherId]);


    const handleUpdate = async () => {
        const { firstName, lastName, specialized } = teacherDetails; // Access teacherDetails from state
        const name = `${firstName} ${lastName}`;

        if (!teacherId || !lastName || !firstName || !Array.isArray(specialized) || specialized.length === 0) {
            Alert.alert('Input failed', 'Please fill in all fields and select courses.', [{ text: 'OK' }]);
            return;
        }

    console.log('Updating Teacher Details...');
    console.log('Teacher ID:', teacherId);
    console.log('Name:', name);
    console.log('Courses:', specialized); // Check the structure of courses first

    try {
        // Fetch course details based on their IDs
        const courseDetailsPromises = specialized.map(courseId => readCourse(courseId)); 
        const courseDetails = await Promise.all(courseDetailsPromises);

        console.log('Fetched Course Details:', courseDetails);

        // Map the fetched course details to include necessary properties for faculty update
        const specializedForFaculty = courseDetails.map(course => ({
            _id: course._id,
            code: course.code,
            description: course.description,
            units: course.units,
            type: course.type,
        }));

        console.log('Courses for faculty:', specializedForFaculty);

        // Update faculty details with the associated courses using the updateStudent function
        await updateTeacher(teacherId, name, specializedForFaculty);

        // Display success message or perform further actions
        Alert.alert('Success', 'Faculty details updated successfully.');

        // Further operations with courseDetails...
    } catch (error) {
        Alert.alert('Error', 'Failed to update faculty. Please try again.');
        console.error('Error updating faculty:', error);
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
    }}>Edit Faculty Details
    </Text>

{/* first name */}
    <View style={{ marginBottom: 12 }}>
        <Text style={{
            fontSize: 16,
            fontWeight: 400,
            marginVertical: 8
        }}>First name:</Text>
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
              value={teacherDetails.firstName}
              onChangeText={(text) => setTeacherDetails({ ...teacherDetails, firstName: text })}
              placeholder="First Name"
            />
            </View>
        </View>
    </View>

{/* last name */}
    <View style={{ marginBottom: 12 }}>
        <Text style={{
            fontSize: 16,
            fontWeight: 400,
            marginVertical: 8
        }}>Last name:</Text>
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
        value={teacherDetails.lastName}
        onChangeText={(text) => setTeacherDetails({ ...teacherDetails, lastName: text })}
        placeholder="Last Name"
      />
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
        visible={teacherDetails.modalVisible}
        onRequestClose={() => setTeacherDetails({ ...teacherDetails, modalVisible: false })}
    >
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: '90%', maxHeight: '90%' }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Select Courses</Text>
            <MultiSelect
                items={teacherDetails.allCourses.map(course => ({
                    _id: course._id,
                    code: course.code,
                    description: course.description,
                    units: course.units,
                    type: course.type,
                    displayText: `${course.description}`
                }))} // Use teacherDetails.allCourses directly
                uniqueKey="_id"
                onSelectedItemsChange={selectedItems => {
                    // Ensure selectedItems is not null or undefined
                    if (selectedItems !== null && selectedItems !== undefined) {
                        setTeacherDetails(prevState => ({
                            ...prevState,
                            specialized: selectedItems,
                        }));
                    }
                }}
                selectedItems={teacherDetails.specialized}
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
                    
                    const { specialized, firstName, lastName } = this.state;
                    if (!firstName || !lastName || specialized.length === 0) {
                        Alert.alert('Input failed', 'Please fill in all fields and select courses.', [{ text: 'OK' }]);
                        return;
                    }

                    // Call the save function to handle saving the selected courses
                    handleUpdate(teacherDetails.firstName, teacherDetails.lastName, teacherDetails.specialized);

                    // Close the modal or perform any additional actions
                    setTeacherDetails({ ...teacherDetails, modalVisible: false });
                }}

            />
            <TouchableOpacity onPress={() => setTeacherDetails({ ...teacherDetails, modalVisible: false })}>
                <Text style={{ color: COLORS.primary, fontSize: 18, alignSelf: 'flex-end' }}>Close</Text>
            </TouchableOpacity>
        </View>
    </View>
    </Modal>

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
          Update Faculty
        </Text>
      </TouchableOpacity>
    </View>

    </View>
  );
};

export default EditTeacherScreen;
