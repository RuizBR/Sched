import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, FlatList } from 'react-native';
import { fetchData } from '../../src/api/algo'
import { readAllOptions, deleteAllOptions } from '../../src/components/Schedule';
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
            <h2>Program: ${program.program}</h2>
            <p>Year: ${program.year}</p>
            <p>Semester: ${program.semester}</p>
            <p>Block: ${program.block}</p>
            <table>
              <thead>
                <tr>
                  <th>Course</th>
                  <th>Description</th>
                  <th>Unit</th>
                  <th>Day</th>
                  <th>Time</th>
                  <th>Room</th>
                  <th>Instructor</th>
                  <!-- Add other table headers -->
                </tr>
              </thead>
              <tbody>
        `;

        program.sched.forEach((sched) => {
          htmlContent += `
            <tr>
              <td>${sched.courseCode}</td>
              <td>${sched.courseDescription}</td>
              <td>${sched.courseUnit}</td>
              <td>${sched.day}</td>
              <td>${sched.time}</td>
              <td>${sched.room}</td>
              <td>${sched.instructor}</td>
              <!-- Add other table data -->
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

// Modify handleExportSchedule to pass selectedSchedule data to generatePDF
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
      await deleteAllOptions(); // Call the deleteAllOptions function from your API
      // Once deleted, update the state or refetch the options list
      await fetchGeneratedSchedule(); // Refetch the updated list of options
      setUpdateFlag(prevFlag => !prevFlag);
      console.log('All options deleted!');
    } catch (error) {
      console.error('Failed to delete options:', error);
    }
  };

  const handleGenerateSchedule = async () => {
    try {
      const newSchedule = await fetchData(); // Change this to fetch your generated schedule
      setSchedule([...schedule, newSchedule]); // Append new schedule data to the existing schedule
      setUpdateFlag(prevFlag => !prevFlag);
      console.log('Generated Schedule:', newSchedule); // Log or handle the fetched schedule data
    } catch (error) {
      console.error('Error generating schedule:', error);
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
              height: 100,
              backgroundColor: COLORS.secondary,
              borderRadius: 15,
              padding: 20,
              marginTop: 15,
              width: '92%',
              marginBottom: 15
          }}>
            <View style={{ flex: 1 }}>
                <Text style={{
                    fontSize: 30, // Set the font size for "WELCOME"
                    fontWeight: 'bold',
                    padding: 3, // Add padding to create space within the border
                    marginLeft: 20, // Add margin to separate "WELCOME" from the rest of the text
                }}>View Schedule
                </Text>
            </View>
            {/* Logo */}
            <Ionicons name="ios-calendar" size={50} color="black" style={{ marginRight: 20 }} />
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
    <Text style={{ fontSize: 18, color: 'white', textAlign: 'center' }}>
      Generate Schedule
    </Text>
  </TouchableOpacity>

  {/* Delete All Options Button */}
  <TouchableOpacity
    onPress={() => setShowDeleteModal(true)} // Show delete confirmation modal on press
    style={{
      width: '45%',
      height: 60,
      backgroundColor: COLORS.primary,
      borderRadius: 15,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 10,
    }}
  >
    <Text style={{ fontSize: 18, color: 'white', textAlign: 'center' }}>
      Delete All Options
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
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ 
                    backgroundColor: 'white', 
                    padding: 20, 
                    width: '60%',
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
                    <Text style={{ fontSize: 22, marginBottom: 20 }}>
                        Generate New Schedule?
                    </Text>
                          <TouchableOpacity onPress={() => {
                            handleGenerateSchedule();
                            setShowModal(false);
                          }}>
                            <Text style={{ fontSize: 15, color: 'blue', marginBottom: 15 }}>Generate</Text>
                          </TouchableOpacity>

                          <TouchableOpacity onPress={() => setShowModal(false)}>
                              <Text style={{ fontSize: 15, color: 'red' }}>Cancel</Text>
                          </TouchableOpacity>
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
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ 
              backgroundColor: 'white', 
              padding: 20, 
              width: '60%',
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
              <Text style={{ fontSize: 22, marginBottom: 20 }}>
                Delete All Options?
              </Text>
              <TouchableOpacity onPress={() => {
                handleDeleteAllOptions(); // Call delete function
                setShowDeleteModal(false); // Close the modal after deletion
              }}>
                <Text style={{ fontSize: 15, color: 'red', marginBottom: 15 }}>Confirm Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setShowDeleteModal(false)}>
                <Text style={{ fontSize: 15, color: 'blue' }}>Cancel</Text>
              </TouchableOpacity>
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
              width: 300,
              height: 80,
              borderRadius: 15,
              backgroundColor: '#dedddf',
              marginTop: 10,
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Text style={{ fontSize: 20 }}>Option: {index + 1}</Text>
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
      <ScrollView>
      <View style={{ backgroundColor: COLORS.teal, height: '100%' }}>
  {selectedSchedule && (
    <View style={{ padding: 20 }}>
      {selectedSchedule.programs.map((program, programIndex) => (
        <View key={programIndex} style={{ marginBottom: 20 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View style={{ alignItems: 'flex-start' }}>
          <Text style={{ fontSize: 15 }}>
            <Text style={{ fontWeight: 'bold' }}>Program: </Text>
            {program.program}
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
              <TouchableOpacity onPress={() => handleExportSchedule(program)}>
              <Ionicons name="document" size={30} color="black" />
              <Text>Export</Text>
              </TouchableOpacity>
          </View>
          </View>

          <View style={{ borderWidth: 1, borderColor: 'black', marginTop: 10 }}>
            <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: 'black', backgroundColor: 'white' }}>
              <Text style={{ flex: 1 }}>Course</Text>
              <Text style={{ flex: 1 }}>Course Description</Text>
              <Text style={{ flex: 1 }}>Course Unit</Text>
              <Text style={{ flex: 1 }}>Day</Text>
              <Text style={{ flex: 1 }}>Time</Text>
              <Text style={{ flex: 1 }}>Room</Text>
              <Text style={{ flex: 1 }}>Instructor</Text>
            </View>
            {program.sched.map((sched, schedIndex) => (
              <View key={schedIndex} style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: 'black' }}>
                <Text style={{ flex: 1 }}>{sched.courseCode}</Text>
                <Text style={{ flex: 1 }}>{sched.courseDescription}</Text>
                <Text style={{ flex: 1 }}>{sched.courseUnit}</Text>
                <Text style={{ flex: 1 }}>{sched.day}</Text>
                <Text style={{ flex: 1 }}>{sched.time}</Text>
                <Text style={{ flex: 1 }}>{sched.room}</Text>
                <Text style={{ flex: 1 }}>{sched.instructor}</Text>
              </View>
            ))}
          </View>
        </View>
      ))}
      <TouchableOpacity onPress={() => setModalVisible(false)}>
        <Text>Close Modal</Text>
      </TouchableOpacity>
    </View>
  )}
</View>

      </ScrollView>
    </Modal>
    
      </View>
      </View>
  </View>
  );
};

export default Schedule;
