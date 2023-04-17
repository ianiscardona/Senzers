import {
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Text,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import Checkbox from "../components/Checkbox";
import { auth, db, createUserWithEmailAndPassword, firebase, Date } from "../../firebase";
import { collection, doc, setDoc, addDoc, Timestamp} from "firebase/firestore";

const RegisterScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSelected, setSelection] = useState(false);

  // function CreateProfile () {
  //   addDoc(collection(db, "reports"), {     
  //         vehicleType: vehicleType,
  //         plateNumber: plateNumber,
  //         timeSeen: timeSeen,
  //         dateSeen: dateSeen
  //       }).then(() => { 
  //         // Data saved successfully!
  //         console.log('data submitted');  
    
  //       }).catch((error) => {
  //             // The write failed...
  //             console.log(error);
  //       });
  //   }

  const handleSignup = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        const user = userCredential.user;
        console.log(user.email);
        console.log(user.password);
      })
      .catch((error) => alert(error.message));
  };

  // const timestamp = firebase.Date;
  // const updateTimestamp = await updateDoc(docRef, {
  //   timestamp: serverTimestamp()
  // });

  const timestamp = firebase.firestore.FieldValue.serverTimestamp();

  function CreateNewProfile () {
    setDoc(collection(db, "ProfileInfo"), {     
          fullName: fullName,
          email: email,
          password: password,
          // updatedAt: timestamp,
          // createdAt: Timestamp.fromDate(new Date("December 10, 1815")),
        }).then(() => { 
          // Data saved successfully!
          console.log('data submitted');  
    
        }).catch((error) => {
              // The write failed...
              console.log(error);
        });
    }


    function CreateSignup (){
      handleSignup(email,password);
      CreateNewProfile();
      }


  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text style={styles.logo}>Register</Text>
      <View style={styles.credentialContainer}>
        <Text style={styles.inputTitle}>Full Name</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Juan Dela Cruz"
            value={fullName}
            onChangeText={(text) => setFullName(text)}
            style={styles.input}
          />
        </View>
      </View>
      <View style={styles.credentialContainer}>
        <Text style={styles.inputTitle}>Email</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Enter your email here..."
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
          />
        </View>
      </View>
      <View style={styles.credentialContainer}>
        <Text style={styles.inputTitle}>Password</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Enter your password here..."
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={styles.input}
            secureTextEntry
          />
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          justifyContent: "flex-start",
          marginTop: 5,
          marginBottom: 10,
        }}
      >
        <Checkbox checked={isSelected} onChange={setSelection} />
        <Text style={{ fontSize: 16 }}>
          By registering, you confirm that you accept our{" "}
          <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
            <Pressable
              onPress={() => {
                navigation.navigate("Terms");
              }}
            >
              <Text style={{ color: "green", fontSize: 16 }}>Terms of Use</Text>
            </Pressable>
            <Text style={{ fontSize: 16 }}> and </Text>
            <Pressable
              onPress={() => {
                navigation.navigate("Privacy");
              }}
            >
              <Text style={{ color: "green", fontSize: 16 }}>
                Privacy Policy
              </Text>
            </Pressable>
          </View>
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => CreateSignup ()}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => {}} style={styles.button}>
        <View style={[styles.icon, { marginRight: 10 }]}>
          <FontAwesome5 name="google" size={18} color="white" />
        </View>
        <Text style={styles.buttonText}>Register with Google</Text>
      </TouchableOpacity>

      <View style={{ flexDirection: "row", marginTop: 5 }}>
        <Text style={{ fontSize: 16 }}>Already have an account? </Text>
        <Pressable
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "bold", color: "red" }}>
            Login
          </Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: 80,
    paddingHorizontal: 20,
    flex: 1,
    alignItems: "center",
  },
  logo: {
    fontSize: 30,
    marginBottom: 50,
  },
  credentialContainer: {
    marginBottom: 15,
  },
  inputTitle: {
    fontSize: 18,
    marginBottom: 3,
  },
  inputContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "100%",
    backgroundColor: "lightgray",
    paddingVertical: 15,
    paddingLeft: 15,
    borderRadius: 10,
  },
  forgotContainer: {
    alignSelf: "flex-end",
    marginBottom: 10,
  },
  button: {
    flexDirection: "row",
    backgroundColor: "#292828",
    width: "80%",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontSize: 18,
  },
});
