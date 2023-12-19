import { View, Text } from 'react-native'
import React from 'react'

const Pokemon = () => {
    GoogleSignin.configure({
        webClientId: '11046146428-ppdiummm9gp7hj21pe3ji23o5jdbi92t.apps.googleusercontent.com',
      });
      
      
        const signIn = async () => {
          try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            Alert.alert('Google Sign-In', `Welcome ${userInfo.user.name}!`);
            console.log(userInfo.user);
          } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
              // User cancelled the sign-in process
              console.log('Sign-in process cancelled');
            } else if (error.code === statusCodes.IN_PROGRESS) {
              // Another sign-in process is in progress
              console.log('Another sign-in process in progress');
            } else {
              // Handle other errors
              console.error('Error during Google Sign-In:', error.message);
            }
          }
        };
    return (
    <View>
      <Text>Pokemon</Text>
    </View>
  )
}

export default Pokemon