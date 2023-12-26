import React, { useState, useEffect } from 'react';
import { View, Button, Alert, Text, StatusBar,TouchableOpacity, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, AntDesign,FontAwesome } from "@expo/vector-icons";
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import Pokemon from './Components/Pokemon';
import Logout from './Components/Logout';
import LoginPage from './Components/LoginPage';
import SignUpPage from './Components/SignUpPage';
import GoogleOAuth from './Constant/Google';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Tab = createBottomTabNavigator();

export default function App() {
  // const [user, setUser] = useState();
  const {configureGoogleSignIn,signInWithGoogle,user,signOutFromGoogle,setUser}=GoogleOAuth()
  useEffect(() => {
    // You may want to check if the user is already signed in on component mount
    // and update the state accordingly
    checkLoggedInStatus();
    configureGoogleSignIn()
  }, [configureGoogleSignIn]);
  async function checkLoggedInStatus() {
    try {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        // User is logged in, update app state or Redux store
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Error checking login status:', error);
    }
  };
 
  return (
    <>
    <StatusBar/>
    <NavigationContainer>
      {user ? (
        <Tab.Navigator>
          <Tab.Screen name='Pokemon' component={Pokemon} options={{tabBarActiveTintColor:"purple",tabBarActiveBackgroundColor:"lightblue",tabBarIcon:()=><Ionicons name="ios-home" size={24} color="black" />}} />
          <Tab.Screen name='Logout' initialParams={{signOutFromGoogle,user}} component={Logout} options={{tabBarActiveTintColor:"purple",tabBarActiveBackgroundColor:"lightblue",tabBarIcon:()=><AntDesign name="profile" size={24} color="black" />}} />
        </Tab.Navigator>
      ) : (
        <Tab.Navigator>                                  

          <Tab.Screen name="Login"component={LoginPage} initialParams={{signInWithGoogle,user}}  options={{tabBarActiveTintColor:"purple",tabBarActiveBackgroundColor:"lightblue",tabBarIcon:()=><Ionicons name="log-in" size={24} color="black" />}}  />
          <Tab.Screen name="SingUP"component={SignUpPage} initialParams={{signInWithGoogle,user}}  options={{tabBarActiveTintColor:"purple",tabBarActiveBackgroundColor:"lightblue",tabBarIcon:()=><FontAwesome name="registered" size={24} color="black" />}}   />
        </Tab.Navigator>
        
      )}
    </NavigationContainer>
    </>
  );
}
