import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Modal} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { readTeacher, updateTeacher } from '../../src/components/Teachers';
import { readAllCourses, readCourse }  from '../../src/components/Courses';
import MultiSelect from 'react-native-multiple-select';
import COLORS from '../../constants/colors';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";


const FacultyEdit = ({ route, navigation }) => {
  const { teacherId } = route.params;

  const [teacherDetails, setTeacherDetails] = useState({
    fname: '',
    sname: ''
  });

  useEffect(() => {
    const fetchTeacherDetails = async () => {
      try {
        const teacherData = await readTeacher(teacherId);
        if (teacherData) {
          setTeacherDetails({
            fname: teacherData.fname,
            sname: teacherData.sname
          });
        }
      } catch (error) {
        console.error('Error fetching Room details:', error);
      }
    };

    fetchTeacherDetails();
  }, [teacherId]);

  const handleUpdate = async () => {
    try {
      const { fname, sname } = teacherDetails;

      const updateResponse = await updateTeacher(teacherId, fname, sname);

      if (updateResponse) {
        console.log('Faculty updated successfully:', updateResponse);

        // Show an alert after successful update
        Alert.alert(
          'Update Successful',
          'Faculty details have been updated.',
          [{ text: 'OK', onPress: () => navigation.goBack() }]
        );
      } else {
        console.error('Failed to update faculty');
      }
    } catch (error) {
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

{/* Faculty Update button */}
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
