import { View, Text, Image, StyleSheet, Alert } from 'react-native'
import React, { useEffect } from 'react'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Button } from 'react-native';
import GoogleOAuth from '../Constant/Google';

export default function Logout({route}) {
    const {signOutFromGoogle,user}=route.params
    const {configureGoogleSignIn}=GoogleOAuth()
    useEffect(() => {
        configureGoogleSignIn()
    },[] )
    // const signOut = async () => {
    //     try {
    //       await GoogleSignin.revokeAccess();
    //       await GoogleSignin.signOut();
    //       setUser(null);
    //       Alert.alert('Google Sign-Out', 'Successfully signed out');
    //     } catch (error) {
    //       console.error('Error during Google Sign-Out:', error.message);
    //     }
    //   };
  return (
    <View style={styles.container}>
        {/* <Image accessibilityLabel={user.name} resizeMode='contain'  source={user.}/> */}
        <Image source={{ uri: user.photo }} style={styles.image} />
      <Text>{user.name}</Text>
      <Text>{user.email}</Text>
      <Button title="Logout" onPress={signOutFromGoogle} />
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: 96, // Set the width and height based on your preferences
      height: 96,
      borderRadius: 48, // To make it a circular image, set borderRadius to half of the width/height
    },
  });















   // const signIn = async () => {
  //   try {
  //     await GoogleSignin.hasPlayServices();
  //     const userInfo = await GoogleSignin.signIn();
  //     setUser(userInfo.user);
  //     console.log(userInfo.user);
  //   } catch (error) {
  //     handleSignInError(error);
  //   }
  // };

  // const handleSignInError = (error) => {
  //   if (error.code === statusCodes.SIGN_IN_CANCELLED) {
  //     console.log('Sign-in process cancelled');
  //   } else if (error.code === statusCodes.IN_PROGRESS) {
  //     console.log('Another sign-in process in progress');
  //   } else {
  //     console.error('Error during Google Sign-In:', error.message);
  //   }
  // };

  // const signOut = async () => {
  //   try {
  //     await GoogleSignin.revokeAccess();
  //     await GoogleSignin.signOut();
  //     setUser(null);
  //     Alert.alert('Google Sign-Out', 'Successfully signed out');
  //   } catch (error) {
  //     console.error('Error during Google Sign-Out:', error.message);
  //   }
  // };