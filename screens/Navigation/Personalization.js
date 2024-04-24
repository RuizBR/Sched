import { View, Text, Image, TouchableOpacity, Modal, Dimensions, KeyboardAvoidingView, ScrollView, ActivityIndicator} from 'react-native';
import React, { useState, useEffect } from 'react';
import COLORS from '../../constants/colors';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Ionicons } from '@expo/vector-icons';
import Signup from '../Starting/Signup';
import Swiper from 'react-native-swiper';

const Personalization = ({ navigation }) => {
    const [isManualVisible, setIsManualVisible] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isContactModalVisible, setIsContactModalVisible] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const [iconSize, setIconSize] = useState(0);
    const [loggedInUsername, setLoggedInUsername] = useState(null); 
    const [detailsVisible, setDetailsVisible] = useState({
        arrowJunie: false,
        arrowMaica: false,
        arrowLeiner: false,
        arrowBrix: false
        // Add other keys for other items if needed
    });
    const [loading, setLoading] = useState(false); // State to manage loading indicator

    // Function to toggle visibility
    const toggleDetailsVisibility = (key) => {
        setDetailsVisible(prevState => ({
            ...prevState,
            [key]: !prevState[key]
        }));
    };
    

    useEffect(() => {
        const screenWidth = Dimensions.get('window').width;
        const calculatedSize = screenWidth * 0.08; // 10% of the screen width
        setIconSize(calculatedSize);
      }, []);

    const toggleManual = () => {
        setIsManualVisible(!isManualVisible);
    };
    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };
    const toggleContactModal = () => {
        setIsContactModalVisible(!isContactModalVisible);
    };
    const handleLogout = () => {
        setLoading(true); // Set loading to true when logout starts
        setIsModalVisible(false); // Hide the modal immediately
        // Simulate a delay for logout (replace with actual logout logic)
        setTimeout(() => {
            setLoading(false); // Set loading to false after the delay
            navigation.navigate('Login'); // Replace 'Login' with your actual login screen route
        }, 2000); // Delay for 2 seconds
    };

  return (
    <View style={{ flex: 1, backgroundColor: '#E0F2F1' }}>
    <View style={{ flex: 1, padding: 20, backgroundColor: COLORS.teal, alignItems: 'center' }}>
        <View style={{
            alignItems: 'center', // Vertically center the content and logo
            height: windowHeight * 0.2,
            width: windowWidth * 0.45,
            backgroundColor: "#bce3e1",
            borderRadius: 350,
            justifyContent: 'center',
            marginBottom: 50,
        }}>
            
        {/* Logo */}
            <Image
                source={require('schedulingapp/assets/AdaptiveLogo.png')} // Replace with the actual path to your logo
                style={{
                    width: windowWidth * 0.2, // Adjust the width of your logo as needed
                    height: windowHeight * 0.2, // Adjust the height of your logo as needed
                }}
            />
            
    </View>

            {/* Modals */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={isContactModalVisible}
                onRequestClose={() => setIsContactModalVisible(false)}
            >
                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 5}
                >
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                        <View style={{
                            flex: 1,
                            backgroundColor: '#ccc',
                            margin: 50,
                            padding: 20,
                            borderRadius: 40,
                            width: '80%',
                            minHeight: 50,
                            maxHeight: 400,
                            shadowColor: '#000',
                            shadowOffset: {
                                width: -10,
                                height: -10,
                            },
                            shadowOpacity: 1,
                            shadowRadius: 10,
                            elevation: 7,
                        }}>
                            {/* Render the Signup component */}
                            <Signup />

                            {/* Close button */}
                            <TouchableOpacity onPress={toggleContactModal}
                                style={{
                                    position: 'absolute',
                                    bottom: 20,
                                    right: 20,
                                    marginTop: 20,
                                    padding: 10,
                                    backgroundColor: "#bce3e1",
                                    borderRadius: 40,
                                    width: '30%',
                                    alignSelf: 'flex-end',
                                }}
                            >
                                <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: 'normal' }}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </Modal>

    <TouchableOpacity onPress={toggleManual} style={{
        width: "100%",
        height: windowHeight * 0.07,
        alignItems: 'center',
        backgroundColor: "#ccc",
        padding: 10,
        borderRadius: 20,
        flexDirection: 'row',
        marginBottom: 10
    }}>
        <Ionicons name="ios-create" size={iconSize} color="black" style={{ marginLeft: 20 }} />
        <Text style={{ fontSize: RFValue(13), fontWeight: 'bold', color: 'black', marginLeft: 15 }}>Manual/ Guide</Text>
        <Ionicons name="ios-caret-forward" size={25} color="black" style={{ position: 'absolute', right: 40 }} />
    </TouchableOpacity>
    
{/* Logout modal */}
    <View style={{ width: '100%', height: "12%", marginBottom: 10 }}>
            <TouchableOpacity
                onPress={() => setShowModal(true)}
                style={{
                    width: '100%',
                    height: windowHeight * 0.07,
                    alignItems: 'center',
                    backgroundColor: '#ccc',
                    padding: 10,
                    borderRadius: 20,
                    flexDirection: 'row',
                    marginBottom: 30,
                }}
            >
                <Ionicons name="ios-log-out" size={iconSize} color="black" style={{ marginLeft: 20 }} />
                <Text style={{ fontSize: RFValue(13), fontWeight: 'bold', color: 'black', marginLeft: 15 }}>Logout</Text>
                <Ionicons name="ios-caret-forward" size={25} color="black" style={{ position: 'absolute', right: 40 }} />
            </TouchableOpacity>
            
                <Text style={{ textAlign: 'center', fontSize: RFValue(11), fontWeight: 'normal', color: 'grey'  }}>Adaptive Scheduling System for CCS</Text>
                <Text style={{ textAlign: 'center', fontSize: RFValue(8), fontWeight: 'normal', color: 'grey', marginBottom: 10  }}>V.2.0.9</Text>
                <Text style={{ textAlign: 'left', fontSize: RFValue(11), fontWeight: 'normal', color: 'black', marginLeft: 10  }}>What's New?</Text>
                <Text style={{ textAlign: 'left', fontSize: RFValue(11), fontWeight: 'normal', color: 'black', marginLeft: 20  }}>*Dynamic Scheduling Enhancements:</Text>
                <Text style={{ textAlign: 'left', fontSize: RFValue(9), fontWeight: 'normal', color: 'grey', marginLeft: 30  }}>-Improved algorithm for more intelligent and adaptable scheduling.</Text>
                <Text style={{ textAlign: 'left', fontSize: RFValue(9), fontWeight: 'normal', color: 'grey', marginLeft: 20  }}>-UI Optimization</Text>
                    

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
                    <Text style={{ fontSize: RFValue(15), marginBottom: 40 }}>
                        Are you sure you want to log out?
                    </Text>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={handleLogout} style={{ marginRight: 10 }}>
                            <Text style={{ fontSize: RFValue(15), color: 'blue', marginRight: 60 }}>Yes</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setShowModal(false)}>
                            <Text style={{ fontSize: RFValue(15), color: 'red' }}>No</Text>
                        </TouchableOpacity>
                    </View>
                    {loading && <ActivityIndicator style={{marginTop: 20}} size="large" color="#0000ff" />}
                </View>
                </View>
            </Modal>
    </View>

    <Modal
          animationType="fade"
          transparent={true}
          visible={isManualVisible}
          onRequestClose={() => {
            setIsManualVisible(!isManualVisible);
            }}
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
              <TouchableOpacity style={{ backgroundColor: "#b2ccc5", borderRadius: 20, padding: 10, marginTop: 20}} onPress={() => {
            setIsManualVisible(!isManualVisible);
            }}>
              <Ionicons name="close" size={20} color="black"/>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

{/* Button to open contact modal */}
    <TouchableOpacity
        style={{
            position: 'absolute',
            bottom: 110,
            right: 20,
            backgroundColor: COLORS.primary,
            width: 60,
            height: 60,
            borderRadius: 30,
            justifyContent: 'center',
            alignItems: 'center',
            elevation: 5,
        }}
        onPress={toggleModal}
      >
        <Ionicons name="ios-information-circle" size={40} color="#fff" />
    </TouchableOpacity>

{/* Modal for About Us */}
        <Modal
            animationType="fade"
            transparent={true}
            visible={isModalVisible}
            onRequestClose={() => {
            setIsModalVisible(!isModalVisible);
            }}
        >
{/* About Us content */}
        <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ backgroundColor: COLORS.teal, width: '90%', maxHeight: '90%', borderRadius: 15 }}> 
                <View style={{ padding: 20 }}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <Text style={{ fontSize: 25, marginBottom: 30, textAlign: 'center'}}>About Us </Text>
                    <View style={{ marginBottom: 20 }}>
                
                {/* Details for Junie Ann PAtambang */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', borderRadius: 15, padding: 5, marginBottom: 20}}>
                        <View style={{ alignItems: 'flex-start' }}>
                            <Text style={{ fontSize: 15 }}>
                                <Text style={{ fontWeight: 'bold', marginLeft: 30 }}>Junie Ann Patambang </Text>
                            </Text>
                        </View>

                        <View style={{ justifyContent: 'center' }}>
                            <TouchableOpacity onPress={() => toggleDetailsVisibility('arrowJunie')} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Ionicons name={detailsVisible['arrowJunie'] ? 'arrow-up' : 'arrow-down'} size={25} color="black" style={{ marginLeft: 10, marginRight: 20 }} />
                            </TouchableOpacity>
                            
                        </View>
                        
                    </View>
                            {detailsVisible['arrowJunie'] && (
                                <View style={{
                                    flexDirection: 'row', 
                                    alignItems: 'center', 
                                    height: 100,
                                    width: '100%',
                                    backgroundColor: "#bce3e1",
                                    borderRadius: 15,
                                    padding: 10,
                                    marginTop: 10,
                                    marginBottom: 20,
                                }}>
                                    <View style={{ flex: 1}}>
                                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                            {/* Icon */}
                                            <Ionicons name="mail" size={20} color={COLORS.black} style={{ marginLeft: 10 }} />
                                            <Text style={{
                                                paddingLeft: 5,
                                                fontSize: RFValue(12),
                                                color: COLORS.black
                                            }}>junie02patambang@gmail.com</Text>
                                        </View>

                                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                            {/* Icon */}
                                            <Ionicons name="logo-facebook" size={20} color={COLORS.black} style={{ marginLeft: 10 }} />
                                            <Text style={{
                                                paddingLeft: 5,
                                                fontSize: RFValue(12),
                                                color: COLORS.black
                                            }}>Junie Ann Patambang</Text>
                                        </View>

                                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                            {/* Icon */}
                                            <Ionicons name="call" size={20} color={COLORS.black} style={{ marginLeft: 10 }} />
                                            <Text style={{
                                                paddingLeft: 5,
                                                fontSize: RFValue(12),
                                                color: COLORS.black
                                            }}>09485932755</Text>
                                        </View>
                                    </View>
            
                                    {/* Logo */}
                                    <Image source={require('schedulingapp/assets/Junie.png')} 
                                        style={{
                                            width: windowWidth * 0.2, 
                                            height: windowHeight * 0.2, 
                                            aspectRatio: 1,
                                        }}/>
                                </View>
                            )}

                {/* Details for Jhamaica Virrey */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', borderRadius: 15, padding: 5, marginBottom: 20 }}>
                        <View style={{ alignItems: 'flex-start' }}>
                            <Text style={{ fontSize: 15 }}>
                                <Text style={{ fontWeight: 'bold', marginLeft: 30 }}>Jhamaica Virrey </Text>
                            </Text>
                        </View>  

                        <View style={{ justifyContent: 'center' }}>
                            <TouchableOpacity onPress={() => toggleDetailsVisibility('arrowMaica')} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Ionicons name={detailsVisible['arrowMaica'] ? 'arrow-up' : 'arrow-down'} size={25} color="black" style={{ marginLeft: 10, marginRight: 20 }} />
                            </TouchableOpacity>
                            
                        </View>
                        
                    </View>
                            {detailsVisible['arrowMaica'] && (
                                <View style={{
                                    flexDirection: 'row', 
                                    alignItems: 'center', 
                                    height: 100,
                                    width: '100%',
                                    backgroundColor: "#bce3e1",
                                    borderRadius: 15,
                                    padding: 10,
                                    marginTop: 10,
                                    marginBottom: 20,
                                }}>
                                    <View style={{ flex: 1}}>
                                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                            {/* Icon */}
                                            <Ionicons name="mail" size={20} color={COLORS.black} style={{ marginLeft: 10 }} />
                                            <Text style={{
                                                paddingLeft: 5,
                                                fontSize: RFValue(12),
                                                color: COLORS.black
                                            }}>jhamaicavirrey@gmail.com</Text>
                                        </View>

                                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                            {/* Icon */}
                                            <Ionicons name="logo-facebook" size={20} color={COLORS.black} style={{ marginLeft: 10 }} />
                                            <Text style={{
                                                paddingLeft: 5,
                                                fontSize: RFValue(12),
                                                color: COLORS.black
                                            }}>Maica Virrey</Text>
                                        </View>

                                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                            {/* Icon */}
                                            <Ionicons name="call" size={20} color={COLORS.black} style={{ marginLeft: 10 }} />
                                            <Text style={{
                                                paddingLeft: 5,
                                                fontSize: RFValue(12),
                                                color: COLORS.black
                                            }}>09513149880</Text>
                                        </View>
                                    </View>
            
                                    {/* Logo */}
                                    <Image source={require('schedulingapp/assets/Maica.png')} 
                                        style={{
                                            width: windowWidth * 0.2, 
                                            height: windowHeight * 0.2, 
                                            aspectRatio: 1,
                                        }}/>
                                </View>
                            )}
                
                {/* Details for Leiner Sacdalan */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', borderRadius: 15, padding: 5, marginBottom: 20 }}>
                        <View style={{ alignItems: 'flex-start' }}>
                            <Text style={{ fontSize: 15 }}>
                                <Text style={{ fontWeight: 'bold', marginLeft: 30 }}>Leiner Sacdalan </Text>
                            </Text>
                        </View>

                        <View style={{ justifyContent: 'center' }}>
                            <TouchableOpacity onPress={() => toggleDetailsVisibility('arrowLeiner')} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Ionicons name={detailsVisible['arrowLeiner'] ? 'arrow-up' : 'arrow-down'} size={25} color="black" style={{ marginLeft: 10, marginRight: 20 }} />
                            </TouchableOpacity>
                            
                        </View>
                        
                    </View>
                            {detailsVisible['arrowLeiner'] && (
                                <View style={{
                                    flexDirection: 'row', 
                                    alignItems: 'center', 
                                    height: 100,
                                    width: '100%',
                                    backgroundColor: "#bce3e1",
                                    borderRadius: 15,
                                    padding: 10,
                                    marginTop: 10,
                                    marginBottom: 20,
                                }}>
                                    <View style={{ flex: 1}}>
                                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                            {/* Icon */}
                                            <Ionicons name="mail" size={20} color={COLORS.black} style={{ marginLeft: 10 }} />
                                            <Text style={{
                                                paddingLeft: 5,
                                                fontSize: RFValue(12),
                                                color: COLORS.black
                                            }}>leinersacdalan11@gmail.com</Text>
                                        </View>

                                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                            {/* Icon */}
                                            <Ionicons name="logo-facebook" size={20} color={COLORS.black} style={{ marginLeft: 10 }} />
                                            <Text style={{
                                                paddingLeft: 5,
                                                fontSize: RFValue(12),
                                                color: COLORS.black
                                            }}>Leiner Sacdalan</Text>
                                        </View>

                                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                            {/* Icon */}
                                            <Ionicons name="call" size={20} color={COLORS.black} style={{ marginLeft: 10 }} />
                                            <Text style={{
                                                paddingLeft: 5,
                                                fontSize: RFValue(12),
                                                color: COLORS.black
                                            }}>09099859915</Text>
                                        </View>
                                    </View>
            
                                    {/* Logo */}
                                    <Image source={require('schedulingapp/assets/Leiner.png')} 
                                        style={{
                                            width: windowWidth * 0.2, 
                                            height: windowHeight * 0.2, 
                                            aspectRatio: 1,
                                        }}/>
                                </View>
                            )}

                {/* Details for Brixter Ruiz */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', borderRadius: 15, padding: 5, marginBottom: 20 }}>
                        <View style={{ alignItems: 'flex-start' }}>
                            <Text style={{ fontSize: 15 }}>
                                <Text style={{ fontWeight: 'bold', marginLeft: 30 }}>Brixter Ruiz </Text>
                            </Text>
                        </View>

                        <View style={{ justifyContent: 'center' }}>
                            <TouchableOpacity onPress={() => toggleDetailsVisibility('arrowBrix')} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Ionicons name={detailsVisible['arrowBrix'] ? 'arrow-up' : 'arrow-down'} size={25} color="black" style={{ marginLeft: 10, marginRight: 20 }} />
                            </TouchableOpacity>
                            
                        </View>
                        
                    </View>
                            {detailsVisible['arrowBrix'] && (
                                <View style={{
                                    flexDirection: 'row', 
                                    alignItems: 'center', 
                                    height: 100,
                                    width: '100%',
                                    backgroundColor: "#bce3e1",
                                    borderRadius: 15,
                                    padding: 10,
                                    marginTop: 10,
                                    marginBottom: 20,
                                }}>
                                    <View style={{ flex: 1}}>
                                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                            {/* Icon */}
                                            <Ionicons name="mail" size={20} color={COLORS.black} style={{ marginLeft: 10 }} />
                                            <Text style={{
                                                paddingLeft: 5,
                                                fontSize: RFValue(12),
                                                color: COLORS.black
                                            }}>ruizbrixter0@gmail.com</Text>
                                        </View>

                                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                            {/* Icon */}
                                            <Ionicons name="logo-facebook" size={20} color={COLORS.black} style={{ marginLeft: 10 }} />
                                            <Text style={{
                                                paddingLeft: 5,
                                                fontSize: RFValue(12),
                                                color: COLORS.black
                                            }}>Brix Ruiz</Text>
                                        </View>

                                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                            {/* Icon */}
                                            <Ionicons name="call" size={20} color={COLORS.black} style={{ marginLeft: 10 }} />
                                            <Text style={{
                                                paddingLeft: 5,
                                                fontSize: RFValue(12),
                                                color: COLORS.black
                                            }}>09674828059</Text>
                                        </View>
                                    </View>
            
                                    {/* Logo */}
                                    <Image source={require('schedulingapp/assets/Brixter.png')} 
                                        style={{
                                            width: windowWidth * 0.2, 
                                            height: windowHeight * 0.2, 
                                            aspectRatio: 1,
                                        }}/>
                                </View>
                            )}
                    <TouchableOpacity onPress={() => setIsModalVisible(false)} style={{ alignItems: 'center', marginTop: 20 }}>
                        <Text style={{ fontSize: 16, color: 'blue' }}>Close Modal</Text>
                    </TouchableOpacity>
                    </View>
                </ScrollView>
                </View>
            </View>
        </View>        
        </Modal>
        </View>
        <View>

      </View>
    </View>
    
  );
};

export default Personalization;

