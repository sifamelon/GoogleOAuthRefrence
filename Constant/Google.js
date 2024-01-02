
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
const configureGoogleSignIn = async () => {
  try {
      await GoogleSignin.configure({
        webClientId: '11046146428-ppdiummm9gp7hj21pe3ji23o5jdbi92t.apps.googleusercontent.com',
      });
    } catch (error) {
      console.error('Error configuring Google Sign-In:', error);
    }
  };
 
  const GoogleOAuth   = () => {
    const [user, setUser] = useState(null); 
    const signInWithGoogle = async () => {
        try {
          await GoogleSignin.hasPlayServices();
          const userInfo = await GoogleSignin.signIn();
          setUser(userInfo.user);
          await AsyncStorage.setItem('user', JSON.stringify(userInfo.user));
        //   console.log(userInfo.user);
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
      const signOutFromGoogle = async () => {
        try {
          await GoogleSignin.revokeAccess();
          await GoogleSignin.signOut();
          await AsyncStorage.removeItem('user');
          setUser(null);
      
        } catch (error) {
          console.error('Error during Google Sign-Out:', error.message);
        }
      };
    return { configureGoogleSignIn, signInWithGoogle, signOutFromGoogle, user,setUser };
}
// const GoogleOAuth=useGoogleOAuth;
export default GoogleOAuth