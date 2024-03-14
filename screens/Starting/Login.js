import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, StyleSheet, Dimensions, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { readUserData } from '../../src/api/Users'; // Import readUserData function
import Button from '../../components/Button';
import COLORS from '../../constants/colors';

const Login = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const handleLogin = async () => {
        try {
            // Call API to read user data
            const userData = await readUserData({ username, password });

            // Check if user data exists and if username and password match
            if (userData) {
                // Navigate to Dashboard screen
                navigation.navigate('Dashboard');
            } else {
                // Show error message for invalid credentials
                Alert.alert('Invalid Credentials', 'Please enter valid username and password');
            }
        } catch (error) {
            console.error('Error during login:', error);
            Alert.alert('Error', 'An error occurred during login. Please try again later.');
        }
    };

    return (
        <ScrollView style={{ backgroundColor: '#E0F2F1' }}>
            <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.teal }}>

                {/* Background CCSLogo as overlay  */}
                <Image source={require('schedulingapp/assets/CCSLogo.png')}
                    style={{
                        ...StyleSheet.absoluteFillObject,
                        opacity: 0.1,
                        resizeMode: 'cover',
                    }}/>

                <View style={{ flex: 1 }}>
                    {/* Header */}
                    <View style={{
                        flexDirection: 'row', 
                        alignItems: 'center', 
                        height: "12%",
                        backgroundColor: "#bce3e1",
                        borderRadius: 15,
                        padding: 10,
                        marginTop: 30,
                        marginHorizontal: 22
                    }}>
                        <View style={{ flex: 1 }}>
                            <Text style={{
                                fontSize: RFValue(20), 
                                fontWeight: 'bold',
                                padding: 3, 
                                marginLeft: 10, 
                            }}>Welcome!</Text>

                            <Text style={{
                                paddingLeft: 15,
                                fontSize: RFValue(10),
                                color: COLORS.black
                            }}>Adaptive Scheduling System for CCS</Text>
                        </View> 

                        {/* Logo */}
                        <Image source={require('schedulingapp/assets/CCSLogo.png')} 
                            style={{
                                width: windowWidth * 0.2, 
                                height: windowHeight * 0.2, 
                                aspectRatio: 1,
                            }}/>
                    </View>

                    {/* Login Form */}
                    <View style={{
                        paddingHorizontal: 22,
                        paddingBottom: 50, 
                        alignItems: 'center'
                    }}>
                        <Text style={{
                            fontSize: 40,
                            fontWeight: '800',
                            color: COLORS.black,
                            marginBottom: -60, 
                            marginTop: "20%"
                        }}>Login</Text>
                    </View>

                    <View style={{
                        height: windowHeight * 0.43,
                        backgroundColor: "#bce3e1",
                        borderRadius: 50,
                        paddingHorizontal: 22,
                        marginTop: 30,
                        marginBottom: "50%",
                        marginHorizontal: 22,
                        opacity: 0.8
                    }}>
                        <View style={{ marginHorizontal: 22}}>
                            <View style={{ marginBottom: 12, marginTop: 20 }}>
                                <Text style={{
                                    fontSize: 16,
                                    fontWeight: 400,
                                    marginVertical: 8
                                }}>Username:</Text>

                                <View style={{
                                    backgroundColor: 'white', 
                                    width: "100%",
                                    height: windowHeight * 0.06,
                                    borderRadius: 15,
                                    justifyContent: "center",
                                    paddingLeft: 22
                                }}>
                                    <TextInput
                                        placeholder='Enter username'
                                        onChangeText={(text) => setUsername(text)}
                                        value={username}
                                    />
                                </View>
                            </View>
                        
                            <View style={{ marginBottom: 12 }}>
                                <Text style={{
                                    fontSize: 16,
                                    fontWeight: 400,
                                    marginVertical: 8
                                }}>Password</Text>

                                <View style={{
                                    backgroundColor: 'white', 
                                    width: "100%",
                                    height: windowHeight * 0.06,
                                    borderRadius: 15,
                                    justifyContent: "center",
                                    paddingLeft: 22
                                }}>
                                    <TextInput
                                        placeholder='Enter password'
                                        onChangeText={(text) => setPassword(text)}
                                        value={password}
                                        secureTextEntry={true}
                                    />
                                </View>
                            </View>

                            {/* Login Button */}
                            <Button
                                title="Login"
                                filled
                                onPress={() => navigation.navigate('Dashboard')}
                                style={{
                                    marginTop: 18,
                                    marginBottom: 15,
                                    borderRadius: 15,
                                    borderWidth: 0,
                                    height: windowHeight * 0.07,
                                }}
                            />
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </ScrollView>
    )
}
export default Login;
