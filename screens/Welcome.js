import { View, Text } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import COLORS from '../constants/colors';
import Button from '../components/Button';

const Welcome = ({ navigation }) => {
  return (
    <LinearGradient
      style={{
        flex: 1,
      }}
      colors={[COLORS.secondary, COLORS.primary]}
    >
      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        {/* content  */}
        <View
          style={{
            paddingHorizontal: 22,
            paddingBottom: 100, // Push content to the bottom
            width: '100%',
          }}
        >
          <Text
            style={{
              fontSize: 60,
              fontWeight: '800',
              color: COLORS.white,
              marginBottom: -30 // Adjust margin to reduce the gap
            }}>Welcome!
          </Text>

          <View style={{ marginVertical: 22 }}>
            <Text
              style={{
                fontSize: 20,
                color: COLORS.white,
                marginVertical: 4,
              }}
            >Adaptive Scheduling System for CCS
            </Text>
          </View>

          <Button
            title="Get Started"
            onPress={() => navigation.navigate('Login')}
            style={{
              marginTop: 22,
              width: '100%',
              borderRadius: 15,
              borderWidth: 0,
            }}
          />
        </View>
      </View>
    </LinearGradient>
  );
};

export default Welcome;
