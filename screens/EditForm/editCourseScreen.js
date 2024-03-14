import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { readCourse, updateCourse } from '../../src/components/Courses';
import COLORS from '../../constants/colors';

const EditCourseScreen = ({ route, navigation }) => {
  const { courseId } = route.params;

  const [courseDetails, setCourseDetails] = useState({
    code: '',
    description: '',
    units: '',
    type: ''
  });

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await readCourse(courseId);
        if (response) {
          setCourseDetails({
            code: response.code,
            description: response.description,
            units: response.units,
            type: response.type,
          });
        }
      } catch (error) {
        console.error('Error fetching course details:', error);
      }
    };

    fetchCourseDetails();
  }, [courseId]);

  const handleUpdate = async () => {
    try {
      const { code, description, units, type } = courseDetails;

      const updateResponse = await updateCourse(courseId, code, description, units, type);

      if (updateResponse) {
        console.log('Course updated successfully:', updateResponse);

        // Show an alert after successful update
        Alert.alert(
          'Update Successful',
          'Course details have been updated.',
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
    }}>Edit Course Details
    </Text>

{/* Course code */}
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
                value={courseDetails.code}
                onChangeText={(text) => setCourseDetails({ ...courseDetails, code: text })}
                placeholder="Course Code"
              />
            </View>
        </View>
    </View>

{/* Course description */}
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
                justifyContent: "center",
                paddingLeft: 22
            }}>
            <TextInput
              value={courseDetails.description}
              onChangeText={(text) => setCourseDetails({ ...courseDetails, description: text })}
              placeholder="Course Description"
            />
            </View>
        </View>
    </View>

{/* Course Units */}
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
                justifyContent: "center",
                paddingLeft: 22
            }}>
            <TextInput
              value={courseDetails.units}
              onChangeText={(text) => setCourseDetails({ ...courseDetails, units: text })}
              placeholder="Units"
              keyboardType='numeric'
            />
            </View>
        </View>
    </View>

{/* Picker for Units */}
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
                  selectedValue={courseDetails.type}
                  onValueChange={(itemValue) => setCourseDetails({ ...courseDetails, type: itemValue })}
                >
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
          Update Course
        </Text>
      </TouchableOpacity>
    </View>

    </View>
  );
};

export default EditCourseScreen;
