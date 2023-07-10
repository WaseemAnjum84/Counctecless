
import { StyleSheet, Text, View, TextInput, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import React from 'react';
import { useSignIn } from "@clerk/clerk-expo";



export default function Login({navigation}) {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");


  const onSignInPress = async () => {
    if (!isLoaded) {
      return;
    }
    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });
      await setActive({ session: completeSignIn.createdSessionId });
    } catch (err) {
      console.log(err);
      Alert.alert('err',err?.errors[0].message)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
            <View>
              <TextInput
                style={styles.input}
                autoCapitalize="none"
                value={emailAddress}
                placeholder="Email..."
                onChangeText={(email) => setEmailAddress(email)}
              />
            </View>

            <View style={{ marginTop: 20 }}>
              <TextInput
                style={styles.input}
                value={password}
                placeholder="Password..."
                placeholderTextColor="#000"
                secureTextEntry={true}
                onChangeText={(password) => setPassword(password)}
              />
            </View>
            <TouchableOpacity onPress={onSignInPress}
              style={styles.btn}
            >
              <Text style={styles.txt}>Login</Text>
            </TouchableOpacity>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: 200,
    height: 60,
    borderColor: '#7a42f4',
    borderWidth: 1
  },
  btn: {
    width: 200,
    padding: 20,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'green',
    marginTop: 30
  },
  txt: {
    color: 'white',
    fontSize: 20
  }
});
