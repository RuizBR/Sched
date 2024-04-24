import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StatusBar, Dimensions, Alert, BackHandler, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '../../constants/colors';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { readAllCoursesData } from '../../src/api/Courses';
import { readAllTeachersData } from '../../src/api/Teachers';
import { readAllRoomsData } from '../../src/api/Rooms';
import { readAllStudentsData } from '../../src/api/Students';
import { useFocusEffect } from '@react-navigation/native';
import Swiper from 'react-native-swiper';



const Dashboard = ({ navigation }) => {
  const [coursesCount, setCoursesCount] = useState(0);
  const [teachersCount, setTeachersCount] = useState(0);
  const [roomsCount, setRoomsCount] = useState(0);
  const [studentsCount, setStudentsCount] = useState(0);
  const [error, setError] = useState(null);
  const [updateFlag, setUpdateFlag] = useState(false);
  const [currentDate, setCurrentDate] = useState('');
  const [iconSize, setIconSize] = useState(0);
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const [isDashboardFocused, setIsDashboardFocused] = useState(false);
  const dayOfWeek = new Date().getDay();
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const greeting = `Have a Good ${days[dayOfWeek]}!`;
  const [modalVisible, setModalVisible] = useState(true); // State variable for modal visibility

  // Function to hide the modal
  const hideModal = () => {
    setModalVisible(false);
  };
  
  useEffect(() => {
    const screenWidth = Dimensions.get('window').width;
    const calculatedSize = screenWidth * 0.09; // 10% of the screen width
    setIconSize(calculatedSize);
  }, []);

  useEffect(() => {
    // Update the current date every second
    const interval = setInterval(() => {
      const date = new Date();
      const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
      setCurrentDate(date.toLocaleDateString('en-US', options));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const backAction = () => {
      if (isDashboardFocused) {
        Alert.alert("Exit Application?", "Do you want to exit the application?", [
          {
            text: "Cancel",
            onPress: () => null,
            style: "cancel"
          },
          { text: "Yes", onPress: () => BackHandler.exitApp() }
        ]);
        return true;
      }
    };

    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

    return () => backHandler.remove();
  }, [isDashboardFocused]);

  useEffect(() => {
    const onFocus = navigation.addListener('focus', () => {
      setIsDashboardFocused(true);
    });

    const onBlur = navigation.addListener('blur', () => {
      setIsDashboardFocused(false);
    });

    return () => {
      onFocus();
      onBlur();
    };
  }, [navigation]);


  useEffect(() => {
    fetchTeachersCount();
    fetchRoomsCount();
    fetchStudentsCount();
    fetchCoursesCount(); // Fetch counts when the component mounts or when updateFlag changes
  }, [updateFlag]);

// fetch courses count
  const fetchCoursesCount = async () => {
    try {
      const coursesResponse = await readAllCoursesData();
      if (coursesResponse && Array.isArray(coursesResponse.courses)) {
        setCoursesCount(coursesResponse.courses.length);
        setError(null);
      } else {
        setError('Error fetching courses. Unexpected response.');
      }
      setUpdateFlag(prevFlag => !prevFlag);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error fetching data. Please try again.');
    }
  };

//fetch faculties count
  const fetchTeachersCount = async () => {
    try {
      const response = await readAllTeachersData();
      if (response && Array.isArray(response.teachers)) {
        setTeachersCount(response.teachers.length); // Set the count of faculty
        setError(null); // Reset error state
      } else {
        setError('Error fetching faculty. Unexpected response.');
      }
    } catch (error) {
      console.error('Error fetching faculty:', error);
      setError('Error fetching faculty. Please try again.');
    }
  };

// fetch rooms count
  const fetchRoomsCount = async () => {
    try {
      const response = await readAllRoomsData();
      if (response && Array.isArray(response.rooms)) {
        setRoomsCount(response.rooms.length); // Set the count of room
        setError(null); // Reset error state
      } else {
        setError('Error fetching room. Unexpected response.');
      }
    } catch (error) {
      console.error('Error fetching room:', error);
      setError('Error fetching room. Please try again.');
    }
  };

// fetch students count
  const fetchStudentsCount = async () => {
    try {
      const response = await readAllStudentsData();
      if (response && Array.isArray(response.students)) {
        setStudentsCount(response.students.length); // Set the count of students/ block
        setError(null); // Reset error state
      } else {
        setError('Error fetching students. Unexpected response.');
      }
    } catch (error) {
      console.error('Error fetching students:', error);
      setError('Error fetching students. Please try again.');
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      const backAction = () => {
        Alert.alert("Exit Application?", "Do you want to exit the application?", [
          {
            text: "Cancel",
            onPress: () => null,
            style: "cancel"
          },
          { text: "Yes", onPress: () => BackHandler.exitApp() }
        ]);
        return true;
      };

      const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

      return () => backHandler.remove();
    }, [])
  );

  return (
    <ScrollView style={{ backgroundColor: '#E0F2F1' }}>
    <StatusBar backgroundColor={COLORS.teal} barStyle="dark-content" />
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 20, backgroundColor: COLORS.teal }}>
      <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={hideModal}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <View
              style={{
                margin: 20,
                width: '80%',
                height: '70%',
                backgroundColor: 'white',
                borderRadius: 25,
                padding: 35,
                alignItems: 'center',
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 5,
                position: 'relative', // Add this line
              }}
            >
              <Swiper style={{ height: '90%' }} showsButtons={false} autoplay={true}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                  <Image
                    source={require('schedulingapp/assets/SS1.png')}
                    style={{ width: "100%", height: "90%", flex: 1, resizeMode: 'contain' }}
                  />
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                  <Image
                    source={require('schedulingapp/assets/SS2.png')}
                    style={{ width: "100%", height: "90%", flex: 1, resizeMode: 'contain' }}
                  />
                </View>
              </Swiper>
              <Text style={{ marginTop: 15, textAlign: 'center' }}>Adaptive Scheduling System for CCS</Text>
              <TouchableOpacity style={{ backgroundColor: "#b2ccc5", borderRadius: 20, padding: 10, marginTop: 20}} onPress={hideModal}>
              <Ionicons name="close" size={20} color="black"/>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>



{/* Welcome & System name*/}
      <View style={{ flex: 1 }}>
        <View style={{
                flexDirection: 'row', // Use row direction to place content and logo side by side
                alignItems: 'center', // Vertically center the content and logo
                height: windowHeight * 0.12,
                backgroundColor: "#b6e2de",
                borderRadius: 20,
                padding: 10,
                marginBottom: 10
            }}>
            <View style={{ flex: 1 }}>
            <Text style={{
                fontSize: RFValue(20), // Set the font size for "WELCOME"
                fontWeight: 'bold',
                padding: 3, // Add padding to create space within the border
                marginLeft: 10, // Add margin to separate "WELCOME" from the rest of the text
            }}>Welcome!
            </Text>

            <Text style={{
                paddingLeft: 15,
                fontSize: RFValue(10),
                color: COLORS.black
            }}>Adaptive Scheduling System for CCS
            </Text>
        </View>

{/* CCS Logo */}
            <Image
                source={require('schedulingapp/assets/CCSLogo.png')} // Replace with the actual path to your logo
                style={{
                    width: windowWidth * 0.2, // Adjust the width of your logo as needed
                    height: windowHeight * 0.2, // Adjust the height of your logo as needed
                    aspectRatio: 1,
                }}
            />
        </View>

{/* 4 Button for quick view */}
    {/* <View style={{
        flex: 1,
        backgroundColor: COLORS.teal,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    }}>
        <View style={{ flexDirection: 'row', justifyContent: 'center', }}>
    {/* Button 1 */}
        {/* <TouchableOpacity style={{
            width: "22%",
            height: 100,
            borderRadius: 20,
            marginRight: 16,
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0.9,
        }}
          onPress={() => navigation.navigate('SubjectAdd')}>
        <Ionicons name="ios-book" size={40} color="black"/>
            <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'black' }}>Course List</Text>
        </TouchableOpacity> */}

    {/* Button 2 */}
        {/* <TouchableOpacity style={{
            width: "22%",
            height: 100,
            borderRadius: 20,
            marginRight: 16,
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0.9,
        }}
          onPress={() => navigation.navigate('FacultyAdd')}>
        <Ionicons name="ios-people" size={40} color="black"/>
            <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'black' }}>Faculty List</Text>
        </TouchableOpacity> */}

    {/* Button 3 */}
        {/* <TouchableOpacity style={{
            width: "22%",
            height: 100,
            borderRadius: 20,
            marginRight: 16,
            justifyContent: 'center',
            alignItems: 'center',
            opacity: 0.9,
        }}
          onPress={() => navigation.navigate('AddRoom')}>
        <Ionicons name="ios-business" size={40} color="black"/>
            <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'black' }}>Room</Text>
        </TouchableOpacity> */}

    {/* Button 4 */}
        {/* <TouchableOpacity style={{
            width: "22%",
            height: 100,
            borderRadius: 15,
            justifyContent: 'center',
            alignItems: 'center',
            opacity: 0.9,
        }}
          onPress={() => navigation.navigate('AddBlock')}>
        <Ionicons name="ios-albums" size={40} color="black"/>
            <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'black' }}>Block</Text>
        </TouchableOpacity>
        </View> */}
    {/* </View> */}

{/* text/ space for hello */}   
    <View style={{ flexDirection: 'row' }}>
    <View style={{
      height: "80%",
      width: "55%",
      backgroundColor: '#c8e9e1',
      borderRadius: 20,
      padding: 10,
      marginTop: 10,
      marginRight: 15
    }}>
      <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginLeft: 10 }}>
        <Ionicons name="person-circle-outline" size={50} />
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons name="ellipse" size={10} color="green" style={{ marginRight: 5 }} />
          <Text style={{
            fontSize: 16,
            fontWeight: 'bold',
          }}>
            {/* Online */}
          </Text>
        </View>
      </View>
      <Text style={{
        fontSize: RFValue(15),
        fontWeight: 'bold',
        padding: 3,
        marginLeft: 10,
        marginBottom: -10
      }}>
        Hello {/* name of the user/ type of user logged */}!
      </Text>
      <Text style={{
        fontSize: RFValue(13),
        padding: 3,
        marginLeft: 10,
        marginBottom: 25
      }}>
        {greeting}
      </Text>
    </View>

{/* Display for Curriculum */}
    <TouchableOpacity onPress={() => {
        navigation.navigate('CurriculumList')
      }}
        style={{
            height: "80%",
            width: "40%",
            backgroundColor: "#ccddd7",
            borderRadius: 20,
            padding: 10,
            marginTop: 10,
            marginBottom: 40,
            marginRight: 20
        }}>
          {error ? (
            <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'white', marginTop: 20 }}>{error}</Text>
          ) : (
            <>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10, marginTop: 15 }}>
                <Ionicons name="document-text" size={iconSize} color="black" />
              </View>
              <Text style={{ fontSize: RFValue(13), fontWeight: 'bold', color: 'black', marginLeft: 10 }}>Curriculum</Text>
            </>
        )}
    </TouchableOpacity>
    </View>

{/* real-time date */}
      <View style={{ marginLeft: 10, marginBottom: 5 }}>
        <Text style={{
          fontSize: RFValue(13),
          fontWeight: 'bold',
        }}>
          {currentDate} {/* Display current date */}
        </Text>
      </View>
    

{/* for extra quick views or shortcuts. it can be remove if not used */}

    <View style={{
      flex: 1,
      backgroundColor: COLORS.teal,
      marginTop: 5,
      alignContent: 'center'
    }}>
    </View>

{/* Display 1 for data counts */}
      <View style={{ flexDirection: 'row', justifyContent: 'center',  }}>
        <TouchableOpacity onPress={() => {
          navigation.navigate('SubjectList')
        }}
        style={{
          width: "47%",
          height: windowHeight * 0.18,
          backgroundColor: "#728f9e",
          borderRadius: 20,
          marginRight: 20,
          justifyContent: 'center',
          opacity: 0.9,
          overflow: 'hidden',
          // shadowColor: '#000',
          // shadowOffset: {
          //   width: -5,
          //   height: -5,
          // },
          // shadowOpacity: 0.7,
          // shadowRadius: 5,
          // elevation: 7,
        }}>
        <LinearGradient
          colors={['#728f9e', '#fff', '#728f9e']}
          end={{ x: 2, y: 3 }}
          style={{
            flex: 1,
            justifyContent: 'center',
          }}>
          {error ? (
            <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'white' }}>{error}</Text>
          ) : (
            <>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 25 }}>
                <Ionicons name="ios-book" size={iconSize} color="white" />
                <Text style={{ fontSize: RFValue(30), fontWeight: 'normal', color: 'black', marginLeft: 50,  }}>{coursesCount}</Text>
              </View>
              <Text style={{ fontSize: RFValue(15), fontWeight: 'bold', color: 'white', marginLeft: 25 }}>Courses</Text>
            </>
        )}
        </LinearGradient>
        </TouchableOpacity>


{/* Display 2 for data counts */}
        <TouchableOpacity onPress={() => {
          navigation.navigate('FacultyList')
        }}
        style={{
          width: "47%",
          height: windowHeight * 0.18,
          backgroundColor: COLORS.primary,
          borderRadius: 20,
          marginBottom: 20,
          justifyContent: 'center',
          opacity: 0.9,
          overflow: 'hidden',
          // shadowColor: '#000',
          // shadowOffset: {
          //   width: -5,
          //   height: -5,
          // },
          // shadowOpacity: 0.7,
          // shadowRadius: 5,
          // elevation: 7,
        }}>
        <LinearGradient
          colors={[COLORS.primary, '#fff', COLORS.primary]}
          end={{ x: 2, y: 3 }}
          style={{
            flex: 1,
            justifyContent: 'center',
          }}>
          {error ? (
              <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'white' }}>{error}</Text>
            ) : (
              <>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 25 }}>
                  <Ionicons name="ios-people" size={iconSize} color="white" />
                  <Text style={{ fontSize: RFValue(30), fontWeight: 'normal', color: 'black', marginLeft: 50 }}>{teachersCount}</Text>
                </View>
                <Text style={{ fontSize: RFValue(15), fontWeight: 'bold', color: 'white', marginLeft: 25 }}>Faculty</Text>
              </>
          )}
        </LinearGradient>
        </TouchableOpacity>
      </View>

{/* Display 3 for data counts*/}
      <View style={{ flexDirection: 'row', justifyContent: 'center',  }}>
        <TouchableOpacity onPress={() => {
          navigation.navigate('Rooms')
        }}
        style={{
          width: "47%",
          height: windowHeight * 0.18,
          backgroundColor: COLORS.secondary,
          borderRadius: 20,
          marginRight: 20,
          justifyContent: 'center',
          opacity: 0.9,
          overflow: 'hidden',
          // shadowColor: '#000',
          // shadowOffset: {
          //   width: -5,
          //   height: -5,
          // },
          // shadowOpacity: 0.7,
          // shadowRadius: 5,
          // elevation: 7,
        }}>
        <LinearGradient
          colors={[COLORS.secondary, '#fff', COLORS.secondary]}
          end={{ x: 2, y: 3 }}
          style={{
            flex: 1,
            justifyContent: 'center',
          }}>
          {error ? (
              <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'white' }}>{error}</Text>
            ) : (
              <>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 25 }}>
                <Ionicons name="ios-business" size={iconSize} color="white" />
                  <Text style={{ fontSize: RFValue(30), fontWeight: 'normal', color: 'black', marginLeft: 50 }}>{roomsCount}</Text>
                </View>
                <Text style={{ fontSize: RFValue(15), fontWeight: 'bold', color: 'white', marginLeft: 25 }}>Rooms</Text>
              </>
          )}
          </LinearGradient>
        </TouchableOpacity>


{/* Display 4 for data counts */}
        <TouchableOpacity onPress={() => {
          navigation.navigate('Blocks')
        }}
        style={{
          width: "47%",
          height: windowHeight * 0.18,
          backgroundColor: 'dimgrey',
          borderRadius: 20,
          justifyContent: 'center',
          opacity: 0.9,
          overflow: 'hidden',
          // shadowColor: '#000',
          // shadowOffset: {
          //   width: -5,
          //   height: -5,
          // },
          // shadowOpacity: 0.7,
          // shadowRadius: 5,
          // elevation: 7,
        }}>
        <LinearGradient
          colors={['dimgrey', '#fff', 'dimgrey']}
          end={{ x: 2, y: 3 }}
          style={{
            flex: 1,
            justifyContent: 'center',
          }}>
          {error ? (
                <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'white' }}>{error}</Text>
              ) : (
                <>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 25 }}>
                  <Ionicons name="ios-albums" size={iconSize} color="white" />
                  <Text style={{ fontSize: RFValue(30), fontWeight: 'normal', color: 'black', marginLeft: 50 }}>{studentsCount}</Text>
                </View>
                <Text style={{ fontSize: RFValue(15), fontWeight: 'bold', color: 'white', marginLeft: 25 }}>Blocks</Text>
                </>
            )}
          </LinearGradient>
        </TouchableOpacity>
      </View>

{/* Another extra space */}
      <View style={{
          height: windowHeight * 0.05,
          backgroundColor: COLORS.primary,
          borderRadius: 15,
          padding: 10,
          marginTop: 20
        }}>
      </View>

{/* Another extra space */}
<View style={{
          height: 100,
          backgroundColor: COLORS.teal,
          borderRadius: 15,
          padding: 10,
          marginTop: 20
        }}>
        <Text style={{
          fontSize: 30, // Set the font size for "WELCOME"
          fontWeight: 'bold',
          padding: 3, // Add padding to create space within the border
          marginLeft: 10, // Add margin to separate "WELCOME" from the rest of the text
        }}>
        </Text>
      </View>

    
    </View>
    </View>
    </View>
    </ScrollView>
  );
};

export default Dashboard;
