// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { WelcomeScreen, LoginScreen, HomeScreen, InfoScreen, ProfileScreen, RegisterScreen, AskQuestionScreen, ListQuestionScreen, ListAnswerScreen } from './src/screens';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="WelcomeScreen"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="InfoScreen"
          component={InfoScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AskQuestionScreen"
          component={AskQuestionScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ListQuestionScreen"
          component={ListQuestionScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ListAnswerScreen"
          component={ListAnswerScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
