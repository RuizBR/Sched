import { View, Text, Image, TouchableOpacity, Modal, Dimensions, KeyboardAvoidingView} from 'react-native';
import React, { useState, useEffect } from 'react';
import COLORS from '../../constants/colors';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Ionicons } from '@expo/vector-icons';
import Signup from '../Starting/Signup';

const Personalization = ({ navigation }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isContactModalVisible, setIsContactModalVisible] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const [iconSize, setIconSize] = useState(0);

    useEffect(() => {
        const screenWidth = Dimensions.get('window').width;
        const calculatedSize = screenWidth * 0.08; // 10% of the screen width
        setIconSize(calculatedSize);
      }, []);

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };
    const toggleContactModal = () => {
        setIsContactModalVisible(!isContactModalVisible);
    };
    const handleLogout = () => {
        setIsModalVisible(!isModalVisible);
        navigation.navigate('Login'); // Replace 'Login' with your actual login screen route
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
            marginBottom: 20,
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
    
        <Text style={{ fontSize: RFValue(15), fontWeight: "bold", marginBottom: 30 }}>
                    ADMINISTRATOR
        </Text>
           

        <TouchableOpacity 
        onPress={toggleContactModal}
        style={{
                width: "100%",
                height: windowHeight * 0.07,
                alignItems: 'center',
                backgroundColor: "#ccc",
                padding: 10,
                borderRadius: 20,
                flexDirection: 'row',
                marginBottom: 10
            }}>
                <Ionicons name="person-circle-outline" size={iconSize} color="black" style={{ marginLeft: 20 }} />
                <Text style={{ fontSize: RFValue(13), fontWeight: 'bold', color: 'black', marginLeft: 15 }}>Add User</Text>
                <Ionicons name="ios-caret-forward" size={25} color="black" style={{ position: 'absolute', right: 40 }} />
            </TouchableOpacity>

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

    <TouchableOpacity style={{
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
                <Text style={{ textAlign: 'center', fontSize: RFValue(8), fontWeight: 'normal', color: 'grey', marginBottom: 10  }}>V.2.0.5</Text>
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
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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
                        <Text style={{ fontSize: RFValue(13), marginBottom: 20 }}>
                            Are you sure you want to log out?
                        </Text>
                        <TouchableOpacity onPress={handleLogout}>
                            <Text style={{ fontSize: RFValue(13), color: 'blue', marginBottom: 10 }}>Yes</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setShowModal(false)}>
                            <Text style={{ fontSize: RFValue(13), color: 'red', marginTop: 10 }}>No</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
    </View>

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
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{
                flex: 1,
                backgroundColor: '#fff',
                margin: 50,
                padding: 20,
                borderRadius: 40,
                width: '80%', 
                maxHeight: '30%', 
                shadowColor: '#000',
                shadowOffset: {
                    width: -10,
                    height: -10,
                },
                shadowOpacity: 1,
                shadowRadius: 10,
                elevation: 7,
            }}>
    
{/* About Us content */}
                <View style={{
                    flex: 1, 
                    
                }}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ fontSize: RFValue(15), marginBottom: 25 }}>Contact Us</Text>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                        <Ionicons name="logo-facebook" size={30} color="darkblue" style={{ marginLeft: 20 }} />
                        <Text style={{ fontSize: RFValue(13), fontWeight:'bold', marginLeft: 5  }}>Facebook </Text>
                    </View>

                    <View>
                        <Text style={{ marginLeft: 50, marginBottom: 5 }}> Junie Ann Patambang</Text>
                        <Text style={{ marginLeft: 50, marginBottom: 5 }}> Leiner Sacdalan</Text>
                        <Text style={{ marginLeft: 50, marginBottom: 5 }}> Maica Virrey</Text>
                        <Text style={{ marginLeft: 50, marginBottom: 5 }}> Brixter Ruiz</Text>
                    </View>
                </View>

{/* Close button */}
                    <TouchableOpacity onPress={toggleModal} 
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
                        }}>
                        <Text style={{ textAlign: 'center', fontSize: RFValue(13), fontWeight: 'normal'  }}>Close</Text>
                    </TouchableOpacity>

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

