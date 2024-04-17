import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, ScrollView, StyleSheet, Dimensions, Alert, BackHandler } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { loginUserData } from '../../src/api/Users'; // Import readUserData function
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import Button from '../../components/Button';
import COLORS from '../../constants/colors';
import { useFocusEffect } from '@react-navigation/native'; 

const Login = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    
    useFocusEffect(
        React.useCallback(() => {
            const backAction = () => {
                Alert.alert("Exit App", "Are you sure you want to exit?", [
                    {
                        text: "Cancel",
                        onPress: () => null,
                        style: "cancel"
                    },
                    { text: "YES", onPress: () => BackHandler.exitApp() }
                ]);
                return true;
            };

            const backHandler = BackHandler.addEventListener(
                "hardwareBackPress",
                backAction
            );

            return () => backHandler.remove();
        }, [])
    );

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            // Clear input fields when the component is focused
            setUsername('');
            setPassword('');
        });

        return unsubscribe;
    }, [navigation]);

    // useEffect(() => {
    //     // Check if the user is already logged in
    //     checkLoginStatus();

    //     // Set up event listener for app state changes
    //     const unsubscribe = navigation.addListener('beforeRemove', async () => {
    //         // Clear login status from AsyncStorage when app is closed
    //         const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
    //         if (isLoggedIn === 'true') {
    //             await AsyncStorage.removeItem('isLoggedIn');
    //         }
    //     });

    //     return unsubscribe;
    // }, []);

    // const checkLoginStatus = async () => {
    //     try {
    //         // Check if the user is logged in by retrieving the stored login status
    //         const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
            
    //         if (isLoggedIn === 'true') {
    //             // Navigate to Dashboard screen if user is already logged in
    //             navigation.navigate('Dashboard');
    //         }
    //     } catch (error) {
    //         console.error('Error checking login status:', error);
    //     }
    // };

    const handleLogin = async () => {
        if (!username) {
            Alert.alert('Missing Information', 'Please enter your username.');
            return;
        }
    
        if (!password) {
            Alert.alert('Missing Information', 'Please enter your password.');
            return;
        }
    
        try {
            const userData = await loginUserData({ username, password });
            console.log('userData:', userData); // Log userData

            // Check if user data exists and if username and password match
            if (userData) {
                // Store login status to AsyncStorage
                await AsyncStorage.setItem('isLoggedIn', 'true');

                // Delay showing the alert by 500 milliseconds
                setTimeout(() => {
                    Alert.alert('Login', 'Login Successfully', [
                        {
                            text: 'OK',
                            onPress: () => {
                                // Navigate to Dashboard screen
                                navigation.navigate('Dashboard');
                            },
                        },
                    ]);
                }, 500);
        } else {
            // Show error message for invalid credentials
            Alert.alert('Invalid Credentials', 'Please enter valid username and password');
        }
        } catch (error) {
            Alert.alert('Error', 'Invalid Credentials.');
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
                                // onPress={handleLogin}
                                onPress= {
                                    // Navigate to Dashboard screen
                                    navigation.navigate('Dashboard')}
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
