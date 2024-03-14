import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Users } from '../../src/index';
import COLORS from '../../constants/colors';

class Signup extends Component{
    state = {
        username: '',
        password: '',
    };

    handleUsername = (text) => {
        this.setState({ username: text });
    };

    handlePassword = (text) => {
        this.setState({ password: text });
    };

    save = async () => {
        const { username, password } = this.state;

        if (!username || !password) {
            Alert.alert('Missing Input!', 'Please provide username and password');
            return;
        }

        const users = new Users();

        try {
            const response = await users.create(username, password);

            if (response) {
                Alert.alert('Success', 'User signed up successfully!');
                // Redirect or navigate to another screen upon successful signup
            } else {
                Alert.alert('Signup Failed', 'Failed to sign up the user');
            }
        } catch (error) {
            console.error('Error occurred: ', error);
            Alert.alert('Error', 'An error occurred while signing up');
        }
    };

   render() { 
  return (
    <View style={{
      flex: 1,
      backgroundColor: '#ccc',
      justifyContent: "flex-start",
      alignItems: 'center'
    }}>

      <Text style={{
        fontSize: 30,
        marginTop: 20,
        padding: 10,
      }}>Sign Up
      </Text>

      {/* input username */}
      <View style={{ marginBottom: 12 }}>
        <Text style={{
          fontSize: 16,
          fontWeight: 400,
          marginVertical: 8
        }}>Username:</Text>
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
                placeholder='Enter username'
                placeholderTextColor={COLORS.grey}
                onChangeText={this.handleUsername}
                style={{ /* Styles for username input */ }}/>
          </View>
        </View>
      </View>

      {/* input password */}
      <View style={{ marginBottom: 12 }}>
        <Text style={{
          fontSize: 16,
          fontWeight: 400,
          marginVertical: 8
        }}>Password:</Text>
        <View style={{
          flexDirection: 'row',
          width: '90%',
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
                placeholder='Enter password'
                placeholderTextColor={COLORS.grey}
                onChangeText={this.handlePassword}
                secureTextEntry={true} // For password input
                style={{ /* Styles for password input */ }}/>
          </View>
        </View>
      </View>

      {/* Sign Up button */}
      <View style={{ justifyContent: 'center', marginTop: 20 }}>
        <TouchableOpacity
          style={{
            width: 100,
            height: 50,
            backgroundColor: "#728f9e",
            borderRadius: 20,
            marginRight: 20,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 10,
          }}
          onPress={() => this.save(this.state.username, this.state.password)}
        >
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white', textAlign: 'center' }}>
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
};

export default Signup;
