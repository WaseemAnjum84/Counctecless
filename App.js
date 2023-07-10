import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, SafeAreaView, TouchableOpacity } from 'react-native';
import { ClerkProvider,SignedIn, SignedOut } from "@clerk/clerk-expo";
import React from 'react';
import MainNavigation from './src/Navigation';

const CLERK_PUBLISHABLE_KEY = "pk_test_YWxsb3dlZC1wZWdhc3VzLTcuY2xlcmsuYWNjb3VudHMuZGV2JA"

export default function App() {


  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
    <SignedOut>
    <MainNavigation/>
    </SignedOut>
    
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
