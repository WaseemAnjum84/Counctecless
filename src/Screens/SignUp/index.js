
import { StyleSheet, Text, View, TextInput, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import React from 'react';
import { useSignUp } from "@clerk/clerk-expo";

export default function SignUp({navigation}) {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }
    try {
      await signUp.create({
        emailAddress,
        password,
      }).then((res) => {
        // send the email.
        signUp.prepareEmailAddressVerification({ strategy: "email_code" });
        // change the UI to our pending section.
        setPendingVerification(true);
      }).catch((err) => {
    
        Alert.alert('err',err?.errors[0].message)
      })
    } catch (err) {
      Alert.alert('err',err?.errors[0].message)
      console.log('errr', err)
    }
  }
  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      }).then((res)=>{
        navigation.navigate('Login')
      })
      if (completeSignUp.status !== "complete") {
        /*  investigate the response, to see if there was an error
         or if the user needs to complete more steps.*/
        Alert.alert('err',err?.errors[0].message)
      }
      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId })
        navigation.navigate('Login')
      }

    } catch (err) {
      Alert.alert('err',err?.errors[0].message)
    }
  }



  return (
    <SafeAreaView style={styles.container}>
      <View>
        {!pendingVerification && (
          <View>
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

            <TouchableOpacity onPress={onSignUpPress}
              style={styles.btn}
            >
              <Text style={styles.txt}>Sign up</Text>
            </TouchableOpacity>
          </View>
        )}
        {pendingVerification && (
          <View>
            <View>
              <TextInput
                style={styles.input}
                value={code}
                placeholder="Code..."
                onChangeText={(code) => setCode(code)}
              />
            </View>
            <TouchableOpacity onPress={onPressVerify}
              style={styles.btn}
            >
              <Text style={styles.txt}>Verify Email</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
