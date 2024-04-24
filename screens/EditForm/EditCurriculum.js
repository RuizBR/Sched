import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, Modal, ScrollView, TouchableWithoutFeedback} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { readCurriculum, updateCurriculum } from '../../src/components/Curriculums';
import { readAllCourses, readCourse }  from '../../src/components/Courses';
import MultiSelect from 'react-native-multiple-select';
import COLORS from '../../constants/colors';
import { RFValue } from "react-native-responsive-fontsize";


const EditCurriculumScreen = ({ route, navigation }) => {
    const { curriculumId } = route.params;

    const [curriculumDetails, setCurriculumDetails] = useState({
        program: '',
        major: '', 
        year: '', 
        semester: '', 
        courses: [], // Ensure courses is initialized as an empty array
        modalVisible: false,
        allCourses: [],
    });

    useEffect(() => {
        const fetchCurriculumDetails = async () => {
            try {
                const curriculumData = await readCurriculum(curriculumId);
                const allCoursesData = await readAllCourses();

                setCurriculumDetails(prevState => ({
                    ...prevState,
                    program: curriculumData.program,
                    major: curriculumData.major,
                    year: curriculumData.year,
                    semester: curriculumData.semester,
                    courses: curriculumData.courses,
                    modalVisible: false,
                    allCourses: allCoursesData.allCourses || [],
                }));
                
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchCurriculumDetails();
    }, [curriculumId]);

    const handleProgramChange = (value) => {
        setCurriculumDetails({
            ...curriculumDetails,
            program: value,
            major: '', // Reset major when program changes
        });
    }

    const openCourseSelection = () => {
        setCurriculumDetails({ ...curriculumDetails, modalVisible: true });
    };

    const handleUpdate = async () => {
        const { program, major, year, semester, courses } = teacherDetails; // AccessteacherDetails from state

        if (!curriculumId || !program || !major || !year || !semester || !Array.isArray(courses) || courses.length === 0) {
            Alert.alert('Input failed', 'Please fill in all fields and select courses.', [{ text: 'OK' }]);
            return;
        }

    try {
        // Fetch course details based on their IDs
        const courseDetailsPromises = courses.map(courseId => readCourse(courseId)); 
        const courseDetails = await Promise.all(courseDetailsPromises);

        console.log('Fetched Course Details:', courseDetails);

        // Map the fetched course details to include necessary properties for block update
        const coursesForCurriculum = courseDetails.map(course => ({
            _id: course._id,
            code: course.code,
            description: course.description,
            units: course.units,
            type: course.type,
        }));

        console.log('Courses for Block:', coursesForCurriculum);

        // Update block details with the associated using the updateStudent function
        await updateCurriculum(curriculumId, program, major, year, semester, courses, coursesForCurriculum);

        // Display success message or perform further actions
        Alert.alert('Success', 'Curriculum details updated successfully.');

        // Further operations with courseDetails...
    } catch (error) {
        Alert.alert('Error', 'Failed to update Curriculum. Please try again.');
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
    }}>Edit Curriculum Details
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
                            selectedValue={curriculumDetails.program}
                            style={{ height: 50, width: "100%" }}
                            onValueChange={(itemValue) => handleProgramChange(itemValue)}
                        >
                            <Picker.Item label="Select Type" value="" color={COLORS.grey} enabled={true} />
                            <Picker.Item label="BSCS" value="BSCS" />
                            <Picker.Item label="BSIT" value="BSIT" />
                            {/* Add more Picker.Item as needed */}
                        </Picker>
                    </View>
                </View>
    </View>

{/* Major Picker */}
    {curriculumDetails.program && (
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
                                selectedValue={curriculumDetails.major}
                                style={{ height: 50, width: "100%" }}
                                onValueChange={(itemValue) => setCurriculumDetails({ ...curriculumDetails, major: itemValue })}
                            >
                                <Picker.Item label="Select Type" value="" color={COLORS.grey} enabled={true} />
                                {(curriculumDetails.program === 'BSCS' ? ['Data Science'] : ['System Development', 'Business Analytics']).map((option, index) => (
                                    <Picker.Item key={index} label={option} value={option} />
                                ))}
                            </Picker>
                        </View>
                    </View>
                </View>
    )}
    
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
                    selectedValue={curriculumDetails.year}
                    style={{ height: 50, width: "100%" }}
                    onValueChange={(itemValue) => setCurriculumDetails({ ...curriculumDetails, year: itemValue })}
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
                    selectedValue={curriculumDetails.semester}
                    style={{ height: 50, width: "100%" }}
                    onValueChange={(itemValue) => setCurriculumDetails({ ...curriculumDetails, semester: itemValue })}
                >
                    <Picker.Item label="Select Type" value="" color={COLORS.grey} enabled={false} />
                    <Picker.Item label="1st" value="1st" />
                    <Picker.Item label="2nd" value="2nd" />
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
        visible={curriculumDetails.modalVisible}
        onRequestClose={() => setCurriculumDetails({ ...curriculumDetails, modalVisible: false })}
    >
    <TouchableWithoutFeedback onPress={() => setCurriculumDetails({ ...curriculumDetails, modalVisible: false })}>
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: '90%', maxHeight: '90%' }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Select Courses</Text>
            <ScrollView style={{ maxHeight: 400 }}>
            <MultiSelect
                items={curriculumDetails.allCourses.map(course => ({
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
                        setCurriculumDetails(prevState => ({
                            ...prevState,
                            courses: selectedItems,
                        }));
                    }
                }}
                selectedItems={curriculumDetails.courses}
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
                    
                    const { courses, programs, major, year, semester } = this.state;
                    if (!programs || !major || !year || !semester || courses.length === 0) {
                        Alert.alert('Input failed', 'Please fill in all fields and select specialixed.', [{ text: 'OK' }]);
                        return;
                    }

                    // Call the save function to handle saving the selected 
                    handleUpdate(curriculumDetails.programs, curriculumDetails.major, curriculumDetails.year, curriculumDetails.semester, curriculumDetails.courses);

                    // Close the modal or perform any additional actions
                    setCurriculumDetails({ ...curriculumDetails, modalVisible: false });
                }}

            />
            </ScrollView>
            <TouchableOpacity onPress={() => setCurriculumDetails({ ...curriculumDetails, modalVisible: false })}>
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
            <Text style={{ fontSize: RFValue(13), fontWeight: 'bold', color: 'white', textAlign: 'center' }}>
            Update Curriculum
            </Text>
        </TouchableOpacity>
    </View>

    </View>
      );
};


export default EditCurriculumScreen;