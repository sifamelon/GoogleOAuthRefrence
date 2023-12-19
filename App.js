import React, { useState } from 'react';
import { View, Button, Alert,Text } from 'react-native';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId: '11046146428-ppdiummm9gp7hj21pe3ji23o5jdbi92t.apps.googleusercontent.com',
});

export default function App() {
  const [user, setUser] = useState();  
    const signIn = async () => {
      try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        // Alert.alert('Google Sign-In', `Welcome ${userInfo.user.name}!`);
        setUser(userInfo)
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

  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      setUser(null);
      Alert.alert('Google Sign-Out', 'Successfully signed out');
    } catch (error) {
      console.error('Error during Google Sign-Out:', error.message);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {user ? (
        <>
          <Button title="Logout" onPress={signOut} />
          <View style={{ marginTop: 20 }}>
          
              <Text>Welcome {user.user.name} {user.user.email}</Text>
          </View>
        </>
      ) : (
        <>
        <Button title="Sign In with Google" onPress={signIn} />
        <Button title="Logout" onPress={signOut} />
        </>
      )}
    </View>
  );
}
