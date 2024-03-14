import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import React, {useState} from 'react'
import COLORS from '../constants/colors';

const Personalization = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');

  const handleSave = () => {
    // Implement your logic to save the edited personal details here
    // You can use the state variables (firstName, lastName, email, subject) to access the user's input
  };

  return (
    <View style={{
      flex: 1,
      padding: 20,
      backgroundColor: COLORS.teal
    }}>
      <Text style={{
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5
      }}>First name:</Text>
      <TextInput
        style={{
          backgroundColor: 'white',
          borderRadius: 20,
          padding: 10,
          marginBottom: 15
        }}
        placeholder="Enter your first name"
        value={firstName}
        onChangeText={(text) => setFirstName(text)}
      />

      <Text style={{
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5
      }}>Last name:</Text>
      <TextInput
        style={{
          backgroundColor: 'white',
          borderRadius: 20,
          padding: 10,
          marginBottom: 15
        }}
        placeholder="Enter your last name"
        value={lastName}
        onChangeText={(text) => setLastName(text)}
      />

      <Text style={{
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5
      }}>Email:</Text>
      <TextInput
        style={{
          backgroundColor: 'white',
          borderRadius: 20,
          padding: 10,
          marginBottom: 15
        }}
        placeholder="Enter your email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />

      <Text style={{
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5
      }}>Subject to teach:</Text>
      <TextInput
        style={{
          backgroundColor: 'white',
          borderRadius: 20,
          padding: 10,
          marginBottom: 15
        }}
        placeholder="Enter the subject you teach"
        value={subject}
        onChangeText={(text) => setSubject(text)}
      />

      <TouchableOpacity
        style={{
          backgroundColor: COLORS.primary,
          padding: 15,
          borderRadius: 20,
          alignItems: 'center'
        }}
        onPress={handleSave}
      >
        <Text style={{
          color: 'white',
          fontSize: 16,
          fontWeight: 'bold'
        }}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Personalization;