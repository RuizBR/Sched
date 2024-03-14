import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import COLORS from '../../constants/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Welcome = ({ navigation }) => {
  
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      navigation.navigate('Login');
    }, 2000); // 5000 milliseconds = 5 seconds

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <LinearGradient
      style={{
        flex: 1,
      }}
      colors={[COLORS.teal, COLORS.primary]}
    >
      {/* Background CCSLogo as overlay */}
      <Image
        source={require('schedulingapp/assets/CCSLogo.png')}
        style={{
          ...StyleSheet.absoluteFillObject,
          opacity: 0.1,
          resizeMode: 'cover',
        }}
      />

      <View style={styles.container}>
        {/* Logo */}
        <Image
          source={require('schedulingapp/assets/CCSLogo.png')} // Replace with the actual path to your logo
          style={styles.logo}
        />

        {/* content  */}
        <View style={styles.contentContainer}>
          <Text
            style={{
              fontSize: RFValue(40),
              fontWeight: '800',
              color: COLORS.white,
              marginBottom: -30, // Adjust margin to reduce the gap
            }}
          >
            Welcome!
          </Text>

          <View style={{ marginVertical: 22 }}>
            <Text
              style={{
                fontSize: RFValue(15),
                color: COLORS.white,
                marginVertical: 4,
              }}
            >
              Adaptive Scheduling System for CCS
            </Text>
          </View>

          {isLoading && (
          <ActivityIndicator size="large" color={COLORS.white} />
        )}
        </View>
      </View>
    </LinearGradient>
  );
};
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({  
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: windowWidth * 0.2, // Adjust the width of your logo as needed
    height: windowHeight * 0.2, // Adjust the height of your logo as needed
    aspectRatio: 1,
  },
  contentContainer: {
    paddingHorizontal: 22,
    paddingBottom: 50, // Push content to the bottom
    width: '100%',
    alignItems: 'center',
  },
});

export default Welcome;
