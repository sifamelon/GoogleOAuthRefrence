import React, { useState, useEffect } from 'react';
import { View, Button, Alert, Text, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import Pokemon from './Components/Pokemon';
import Logout from './Components/Logout';
import LoginPage from './Components/LoginPage';

GoogleSignin.configure({
  webClientId: '11046146428-ppdiummm9gp7hj21pe3ji23o5jdbi92t.apps.googleusercontent.com',
});

const Tab = createBottomTabNavigator();

export default function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    // You may want to check if the user is already signed in on component mount
    // and update the state accordingly
    // CheckSignInStatus();
  }, []);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setUser(userInfo.user);
      console.log(userInfo.user);
    } catch (error) {
      handleSignInError(error);
    }
  };

  const handleSignInError = (error) => {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      console.log('Sign-in process cancelled');
    } else if (error.code === statusCodes.IN_PROGRESS) {
      console.log('Another sign-in process in progress');
    } else {
      console.error('Error during Google Sign-In:', error.message);
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
    <>
    <StatusBar/>
    <NavigationContainer>
      {user ? (
        <Tab.Navigator>
          <Tab.Screen name='Pokemon' component={Pokemon} options={{tabBarActiveTintColor:"purple",tabBarActiveBackgroundColor:"lightblue",tabBarIcon:()=><Ionicons name="ios-home" size={24} color="black" />}} />
          <Tab.Screen name='Logout' initialParams={{user,signOut,setUser}} component={Logout} options={{tabBarActiveTintColor:"purple",tabBarActiveBackgroundColor:"lightblue",tabBarIcon:()=><AntDesign name="profile" size={24} color="black" />}} />
        </Tab.Navigator>
      ) : (
        // <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        //   <Button title="Sign In with Google" onPress={signIn} />
        // </View>
        <LoginPage/>
      )}
    </NavigationContainer>
    </>
  );
}
