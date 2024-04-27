import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, FlatList, Dimensions, Alert } from 'react-native';
import { fetchData } from '../../src/api/algo'
import { readAllOptions, deleteAllOptions } from '../../src/components/Schedule';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import COLORS from '../../constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import * as Sharing from 'expo-sharing';
import * as Print from 'expo-print';
import RNHTMLtoPDF from 'react-native-html-to-pdf';


const Schedule = ({ navigation }) => {
  const [showModal, setShowModal] = useState(false);
  const [schedule, setSchedule] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false); 
  const [updateFlag, setUpdateFlag] = useState(false);
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const [showScheduleTables, setShowScheduleTables] = useState({});
  
  const toggleScheduleTable = (programIndex) => {
    setShowScheduleTables(prevState => ({
      ...prevState,
      [programIndex]: !prevState[programIndex]
    }));
  };

  // Function to generate PDF
  const generatePDF = async (scheduleData) => {
    try {
      let htmlContent = `
        <html>
          <head>
            <title>Schedule</title>
            <style>
              /* Add CSS styles here for the schedule display */
              body {
                font-family: Arial, sans-serif;
                margin: 0.5in; /* Add half-inch margin to all sides */
              }
              table {
                border-collapse: collapse;
                width: 100%;
                margin-bottom: 20px;
              }
              th, td {
                border: 1px solid #ddd;
                padding: 8px;
                text-align: left;
              }
              th {
                background-color: #f2f2f2;
              }
              /* Define additional styles as needed */
            </style>
          </head>
          <body>
            <h1>Schedule</h1>
      `;

      if (scheduleData) {
        scheduleData.programs.forEach((program) => {
          htmlContent += `
            <div class="schedule">
              <h2>Pr ogram: ${program.program} - ${program.major}</h2>
              <p>Year: ${program.year}</p>
              <p>Semester: ${program.semester}</p>
              <p>Block: ${program.block}</p>
              <table>
                <thead>
                  <tr>
                    <th>Course</th>
                    <th>Description</th>
                    <th>Day</th>
                    <th>Time</th>
                    <th>Room</th>
                    <th>Instructor</th>
                  </tr>
                </thead>
                <tbody>
          `;

          program.sched.forEach((sched) => {
            htmlContent += `
              <tr>
                <td>${sched.courseCode}</td>
                <td>${sched.courseDescription}</td>
                <td>${sched.day}</td>
                <td>${sched.time}</td>
                <td>${sched.room}</td>
                <td>${sched.instructor}</td>
              </tr>
            `;
          });

          htmlContent += `
                </tbody>
              </table>
            </div>
          `;
        });
      }

      // Close the HTML structure
      htmlContent += `
          </body>
        </html>
      `;

      const { uri } = await Print.printToFileAsync({ html: htmlContent });
      console.log('PDF generated:', uri);

      await Sharing.shareAsync(uri);
    } catch (error) {
      console.error('Error generating PDF:', error);
      // Handle errors during PDF generation
    }
  };

  const handleExportSchedule = async (selectedProgram) => {
    try {
      // Ensure that selectedProgram has the structure of the program you want to export
      const selectedScheduleData = {
        programs: [selectedProgram], // Create a structure with only the selected program
      };
      await generatePDF(selectedScheduleData); // Pass selected program data to generatePDF
    } catch (error) {
      console.error('Error exporting schedule:', error);
      // Handle any errors that occur during export
    }
};



  const handleOptionSelect = (optionIndex) => {
    setSelectedOption(optionIndex);
    setModalVisible(true);
    setSelectedSchedule(schedule[optionIndex]);
  };

  useEffect(() => {
    fetchGeneratedSchedule(); // Fetch data when Schedule.js is opened
  }, [updateFlag]); // Run once on component mount

  useEffect(() => {
    if (showModal) {
      fetchGeneratedSchedule(); // Fetch data when showModal state changes
    }
  }, [showModal]);

  const fetchGeneratedSchedule = async () => {
    try {
      const { allSchedules } = await readAllOptions();
      console.log('Fetched Schedule:', allSchedules);
      setSchedule(allSchedules || []); // Ensure fetched data structure matches or use a default value
    } catch (error) {
      console.error('Error fetching schedule:', error);
    }
  };

  const handleDeleteAllOptions = async () => {
    try {
      // Show alert first
      Alert.alert('Deleting...', 'Deleting all schedules.', [], { cancelable: false });
  
      // Wait for a brief moment before actually deleting the options
      setTimeout(async () => {
        try {
          await deleteAllOptions(); // Call the deleteAllOptions function from your API
          // Once deleted, update the state or refetch the options list
          await fetchGeneratedSchedule(); // Refetch the updated list of options
          setUpdateFlag(prevFlag => !prevFlag);
          Alert.alert('Deleted!', 'All schedules deleted.', [{ text: 'OK' }]);
          console.log('All options deleted!');
        } catch (deleteError) {
          console.error('Failed to delete options:', deleteError);
          Alert.alert('Error', 'Failed to delete schedules. Please try again.', [{ text: 'OK' }]);
        }
      }, 500);
  
    } catch (error) {
      console.error('Failed to initiate delete process:', error);
      Alert.alert('Error', 'Failed to initiate delete process. Please try again.', [{ text: 'OK' }]);
    }
  };
  

  const handleGenerateSchedule = async () => {
    try {
        // Show alert indicating schedule generation is in progress
        Alert.alert('Generating Schedule', 'Please wait while your new schedule is being generated...', [], { cancelable: false });

        const newSchedule = await fetchData(); // Change this to fetch your generated schedule
        setSchedule([...schedule, newSchedule]); // Append new schedule data to the existing schedule
        setUpdateFlag(prevFlag => !prevFlag);
        console.log('Generated Schedule:', newSchedule); // Log or handle the fetched schedule data

        // Close the alert after fetching the schedule
        setTimeout(() => {
            Alert.alert('Schedule Generated', 'Your new schedule has been generated successfully.', [{ text: 'OK' }]);
        }, 500);
    } catch (error) {
        console.error('Error generating schedule:', error);
        // Handle error state
        Alert.alert('Error', 'Failed to generate schedule. Please try again.', [{ text: 'OK' }]);
    }
};

  
  return (
    <View style={{ flex: 1  }}>
    <View style={{
        flex: 1,
        backgroundColor: COLORS.teal,
        justifyContent: "flex-start", 
        alignItems: 'center'  
    }}>

 {/* View Schedule banner */}
    <View style={{
              flexDirection: 'row', // Use row direction to place content and logo side by side
              alignItems: 'center', // Vertically center the content and logo
              height: windowHeight * 0.12,
              backgroundColor: '#c8e3e0',
              borderRadius: 15,
              padding: 20,
              marginTop: 15,
              width: '92%',
              marginBottom: 15
          }}>
            <View style={{ flex: 1 }}>
                <Text style={{
                    fontSize: RFValue(25), 
                    fontWeight: 'bold',
                    padding: 3, // Add padding to create space within the border
                    marginLeft: 20, // Add margin to separate "WELCOME" from the rest of the text
                }}>View Schedule
                </Text>
            </View>
            {/* Logo */}
            <Ionicons name="ios-calendar" size={40} color="black" style={{ marginRight: 20 }} />
    </View>

{/* generate and delete button */}
<View style={{ flexDirection: 'row' }}>
  {/* Generate Schedule Button */}
  <TouchableOpacity
    onPress={() => {
      setShowModal(true);
      fetchGeneratedSchedule(); // Fetch schedule data on modal open
    }}
    style={{
      width: '45%',
      height: 60,
      backgroundColor: '#728f9e',
      borderRadius: 15,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 10,
      marginRight: 10, // Add margin to create space between buttons
    }}
  >
    <Text style={{ fontSize: RFValue(17), color: 'white', textAlign: 'center' }}>
      Generate Schedule
    </Text>
  </TouchableOpacity>

  {/* Delete All Options Button */}
  <TouchableOpacity
    onPress={() => setShowDeleteModal(true)} // Show delete confirmation modal on press
    style={{
      width: '45%',
      height: 60,
      backgroundColor: "#9dc8ba",
      borderRadius: 15,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 10,
    }}
  >
    <Text style={{ fontSize: RFValue(17), color: 'black', textAlign: 'center' }}>
      Delete All Schedule
    </Text>
  </TouchableOpacity>
</View>


{/* generate schedule modal */}
        <Modal
            animationType="fade"
            transparent={true}
            visible={showModal}
            onRequestClose={() => setShowModal(false)}
        >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                <View style={{ 
                    backgroundColor: 'white', 
                    padding: 20, 
                    width: '70%',
                    borderRadius: 10,
                    alignItems: 'center',
                    shadowColor: '#000',
                    shadowOffset: {
                        width: -10,
                        height: -10,
                    },
                    shadowOpacity: 1,
                    shadowRadius: 10,
                    elevation: 7, 
                }}>
                    <Text style={{ fontSize: RFValue(17), marginBottom: 40 }}>
                        Generate New Schedule?
                    </Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '80%' }}>
                        <TouchableOpacity onPress={() => {
                            handleGenerateSchedule();
                            setShowModal(false);
                        }}>
                            <Text style={{ fontSize: 20, color: 'blue', marginRight: 15 }}>Generate</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setShowModal(false)}>
                            <Text style={{ fontSize: 20, color: 'red' }}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>


{/* Modal for Delete Confirmation */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={showDeleteModal}
          onRequestClose={() => setShowDeleteModal(false)}
        >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <View style={{ 
              backgroundColor: 'white', 
              padding: 20, 
              width: '70%',
              borderRadius: 10, 
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: {
                  width: -10,
                  height: -10,
              },
              shadowOpacity: 1,
              shadowRadius: 10,
              elevation: 7, 
            }}>
              <Text style={{ fontSize: RFValue(17), marginBottom: 40 }}>
                Delete All Options?
              </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '80%' }}>
                <TouchableOpacity onPress={() => {
                    handleDeleteAllOptions(); // Call delete function
                    setShowDeleteModal(false); // Close the modal after deletion
                }}>
                    <Text style={{ fontSize: 20, color: 'blue', marginRight: 15 }}>Delete</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setShowDeleteModal(false)}>
                    <Text style={{ fontSize: 20, color: 'red' }}>Cancel</Text>
                </TouchableOpacity>
            </View>
            </View>
          </View>
        </Modal>

{/* flat list for generated schedule */}
      <View style={{ flex: 1 }}>
        <FlatList
        data={schedule}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => handleOptionSelect(index)}
            style={{
              padding: 20,
              width: windowWidth * 0.7,
              height: windowHeight * 0.1,
              borderRadius: 15,
              backgroundColor: '#dedddf',
              marginTop: 10,
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Text style={{ fontSize: 20 }}>Schedule: {index + 1}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
        style={{ maxHeight: '80%', marginTop: 10 }}
      />

{/* Modal for displaying schedule data */}
<Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ backgroundColor: COLORS.teal, width: '90%', maxHeight: '90%', borderRadius: 15 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
  {selectedSchedule && (
    <View style={{ padding: 20 }}>
      {selectedSchedule.programs.map((program, programIndex) => {
        console.log('Program:', program); // Log the program object
        console.log('Major:', program.major); // Log the major property of the program
        return (
          <View key={programIndex} style={{ marginBottom: 20 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', borderRadius: 15, padding: 5 }}>
              <View style={{ alignItems: 'flex-start' }}>
                <Text style={{ fontSize: 15 }}>
                  <Text style={{ fontWeight: 'bold' }}>Program: </Text>
                  {program.program} - {program.major}
                </Text>
                <Text style={{ fontSize: 15 }}>
                  <Text style={{ fontWeight: 'bold' }}>Year: </Text>
                  {program.year}
                </Text>
                <Text style={{ fontSize: 15 }}>
                  <Text style={{ fontWeight: 'bold' }}>Semester: </Text>
                  {program.semester}
                </Text>
                <Text style={{ fontSize: 15 }}>
                  <Text style={{ fontWeight: 'bold' }}>Block: </Text>
                  {program.block}
                </Text>
              </View>
              <View style={{ justifyContent: 'center' }}>
                <TouchableOpacity onPress={() => handleExportSchedule(program)} style={{ alignItems: 'center' }}>
                  <Ionicons name="document" size={25} color="black" />
                  <Text>Export</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => toggleScheduleTable(programIndex)} style={{ alignItems: 'center' }}>
                  <Ionicons name={showScheduleTables[programIndex] ? 'arrow-up' : 'arrow-down'} size={25} color="black" />
                  <Text>{showScheduleTables[programIndex] ? 'Hide Schedule' : 'Show Schedule'}</Text>
                </TouchableOpacity>
              </View>
            </View>
            
            {showScheduleTables[programIndex] && (
              <View style={{ borderWidth: 1, borderColor: 'black', marginTop: 10 }}>
                <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: 'black', backgroundColor: 'white' }}>
                  <Text style={{ flex: 0.7 }}>Course</Text>
                  <Text style={{ flex: 1 }}>Course Description</Text>
                  {/* <Text style={{ flex: 1 }}>Course Unit</Text> */}
                  <Text style={{ flex: 1 }}>Day</Text>
                  <Text style={{ flex: 1 }}>Time</Text>
                  <Text style={{ flex: 0.7 }}>Room</Text>
                  <Text style={{ flex: 1 }}>Instructor</Text>
                </View>
                {program.sched.map((sched, schedIndex) => (
                  <View key={schedIndex} style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: 'black' }}>
                    <Text style={{ flex: 0.7 }}>{sched.courseCode}</Text>
                    <Text style={{ flex: 1 }}>{sched.courseDescription}</Text>
                    {/* <Text style={{ flex: 1 }}>{sched.courseUnit}</Text> */}
                    <Text style={{ flex: 1 }}>{sched.day}</Text>
                    <Text style={{ flex: 1 }}>{sched.time}</Text>
                    <Text style={{ flex: 0.7 }}>{sched.room}</Text>
                    <Text style={{ flex: 0.8 }}>{sched.instructor}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        );
      })}
    </View>
  )}
</ScrollView>
    <View style={{ alignItems: "center", marginBottom: 20 }}>
        <TouchableOpacity style={{ backgroundColor: "#b2ccc5", borderRadius: 20, padding: 10, marginTop: 20, alignItems: 'center',}} onPress={() => {
          setModalVisible(false);
            }}>
              <Ionicons name="close" size={20} color="black"/>
        </TouchableOpacity>
    </View>

        </View>
      </View>
</Modal>

    
      </View>
      </View>
  </View>
  );
};

export default Schedule;
