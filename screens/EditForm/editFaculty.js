import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Modal, ScrollView, TouchableWithoutFeedback} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { readTeacher, updateTeacher } from '../../src/components/Teachers';
import { readAllCourses, readCourse }  from '../../src/components/Courses';
import MultiSelect from 'react-native-multiple-select';
import COLORS from '../../constants/colors';
import { RFValue } from "react-native-responsive-fontsize";


const FacultyEdit = ({ route, navigation }) => {
    const [courses, setCourses] = useState([]);
    const { teacherId } = route.params;

    const [teacherDetails, setTeacherDetails] = useState({
        fname: '',
        sname: '', 
        specialized: [], // Ensure courses is initialized as an empty array
        modalVisible: false,
        allCourses: [],
    });

    const openCourseSelection = () => {
        setTeacherDetails({ ...teacherDetails, modalVisible: true });
    };

    useEffect(() => {
    const fetchTeacherDetails = async () => {
        try {
            const teacherData = await readTeacher(teacherId);
            const allCoursesData = await readAllCourses();

            if (Array.isArray(allCoursesData.allCourses)) {
                setTeacherDetails(prevState => ({
                    ...prevState,
                    fname: teacherData.fname,
                    sname: teacherData.sname,
                    specialized: teacherData.specialized, // Access specialized from teacherData
                    modalVisible: false,
                    allCourses: allCoursesData.allCourses,
                }));
            } else {
                setTeacherDetails(prevState => ({
                    ...prevState,
                    fname: teacherData.fname,
                    sname: teacherData.sname,
                    specialized: teacherData.specialized, // Access specialized from teacherData
                    modalVisible: false,
                    allCourses: [],
                }));
            }
            
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    fetchTeacherDetails();
}, [teacherId]);



    const handleUpdate = async () => {
        const { fname, sname, specialized } = teacherDetails; // AccessteacherDetails from state

        if (!teacherId || !fname || !sname || !Array.isArray(specialized) || specialized.length === 0) {
            Alert.alert('Input failed', 'Please fill in all fields and select courses.', [{ text: 'OK' }]);
            return;
        }

    try {
        // Fetch course details based on their IDs
        const courseDetailsPromises = courses.map(courseId => readCourse(courseId)); 
        const courseDetails = await Promise.all(courseDetailsPromises);

        console.log('Fetched Course Details:', courseDetails);

        // Map the fetched course details to include necessary properties for block update
        const coursesForFaculty = courseDetails.map(course => ({
            _id: course._id,
            code: course.code,
            description: course.description,
            units: course.units,
            type: course.type,
        }));

        console.log('Courses for Block:', coursesForFaculty);

        // Update block details with the associated using the updateStudent function
        await updateTeacher(teacherId, fname, sname, specialized, coursesForFaculty);

        // Display success message or perform further actions
        Alert.alert(
            'Update Successful',
            'Faculty details have been updated.',
            [{ text: 'OK', onPress: () => navigation.goBack() }]
          );

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
    }}>Edit Faculty Details
    </Text>

{/* First name */}
<View style={{ marginBottom: 12 }}>
        <Text style={{
            fontSize: 16,
            fontWeight: 400,
            marginVertical: 8
        }}>First Name:</Text>
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
                value={teacherDetails.fname}
                onChangeText={(text) => setTeacherDetails({ ...teacherDetails, fname: text })}
              />
            </View>
        </View>
    </View>

{/* Last name */}
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
                justifyContent: "center",
                paddingLeft: 22
            }}>
            <TextInput
                value={teacherDetails.sname}
                onChangeText={(text) => setTeacherDetails({ ...teacherDetails, sname: text })}
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
    <TouchableWithoutFeedback onPress={() => setTeacherDetails({ ...teacherDetails, modalVisible: false })}>
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: '90%', maxHeight: '90%' }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Select Courses</Text>
            <ScrollView style={{ maxHeight: 400 }}>
            <MultiSelect
                items={teacherDetails.allCourses.map(course => ({
                    _id: course._id,
                    code: course.code,
                    description: course.description,
                    units: course.units,
                    type: course.type,
                    displayText: `${course.description}`
                }))} 
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
                    
                    const { specialized, fname, sname } = this.state;
                    if (!fname || !sname || specialized.length === 0) {
                        Alert.alert('Input failed', 'Please fill in all fields and select specialixed.', [{ text: 'OK' }]);
                        return;
                    }

                    // Call the save function to handle saving the selected 
                    handleUpdate(teacherDetails.fname, teacherDetails.sname, teacherDetails.specialized);

                    // Close the modal or perform any additional actions
                    setBlockDetails({ ...teacherDetails, modalVisible: false });
                }}

            />
            </ScrollView>
            <TouchableOpacity onPress={() => setTeacherDetails({ ...teacherDetails, modalVisible: false })}>
                <Text style={{ color: COLORS.primary, fontSize: 18 }}>Close</Text>
            </TouchableOpacity>
        </View>
    </View>
    </TouchableWithoutFeedback>
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
            Update Faculty
            </Text>
        </TouchableOpacity>
    </View>

    </View>
      );
};


export default FacultyEdit;