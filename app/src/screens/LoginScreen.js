import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Keyboard, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS, SIZES, FONTS } from '../constants/theme';

export default function LoginScreen({ navigation }){
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOTP] = useState('');
  const [isOTPSent, setIsOTPSent] = useState(false);

  const handleSendOTP = () => {
    // Validate phone number format
    if (phoneNumber.length !== 10) {
      Alert.alert('Invalid Phone Number', 'Please enter a valid 10-digit phone number.');
      return;
    }

    // Generate and store OTP
    const generatedOTP = '1234'; // Normally, you'd generate a random 4-digit OTP
    AsyncStorage.setItem('userOTP', generatedOTP);
    setIsOTPSent(true);
    Keyboard.dismiss();
  };

  const handleVerifyOTP = async () => {
    // Retrieve stored OTP
    const storedOTP = await AsyncStorage.getItem('userOTP');

    // Verify OTP
    if (otp === storedOTP) {
      // Store user token (can be any value)
      await AsyncStorage.setItem('userToken', 'loggedInUser');
      navigation.replace('ProductListing');
    } else {
      Alert.alert('Invalid OTP', 'Please enter the correct OTP.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Zyra</Text>

      {!isOTPSent ? (
        <>
          <TextInput
            style={styles.input}
            keyboardType="phone-pad"
            placeholder="Enter your phone number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
          <TouchableOpacity style={styles.button} onPress={handleSendOTP}>
            <Text style={styles.buttonText}>Send OTP</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TextInput
            style={styles.input}
            keyboardType="number-pad"
            placeholder="Enter the OTP"
            value={otp}
            onChangeText={setOTP}
          />
          <TouchableOpacity style={styles.button} onPress={handleVerifyOTP}>
            <Text style={styles.buttonText}>Verify OTP</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SIZES.large,
  },
  title: {
    fontSize: SIZES.extraLarge,
    fontWeight: FONTS.bold,
    color: COLORS.primary,
    marginBottom: SIZES.large,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: SIZES.small,
    paddingHorizontal: SIZES.medium,
    marginVertical: SIZES.small,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.small,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: SIZES.small,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: SIZES.medium,
    fontWeight: FONTS.medium,
  },
});

// export default LoginScreen;