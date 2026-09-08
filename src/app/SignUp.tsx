import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import {
  adduser,
  checkEmail,
  showUsers,
} from "../../databse/queries";
import { userTable } from "../../databse/table";

import colors from "../constents/colors";

export default function SignUp() {
  const [Username, setName] = useState("");
  const [UserEmail, setEmail] = useState("");
  const [UserPas, setPas] = useState("");
  const [UserPhone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    userTable();
  }, []);

  async function handleShowUsers() {
    const users = await showUsers();
    console.log("Current users in database:", users);
  }

  async function handlebutton() {
    const email = UserEmail.trim();

    if (!Username || !email || !UserPas || !UserPhone) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    const existEmail = await checkEmail(email);

    if (existEmail) {
      Alert.alert(
        "Email Already Exists",
        "This email is already registered."
      );
      return;
    }

    const namePattern = /^[A-Za-z ]+$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^03\d{9}$/;
    const passwordPattern =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).{8,}$/;

    if (!namePattern.test(Username)) {
      Alert.alert(
        "Invalid Name",
        "Name can contain letters only"
      );
      return;
    }

    if (!emailPattern.test(email)) {
      Alert.alert(
        "Invalid Email",
        "Please enter a valid email"
      );
      return;
    }

    if (!phonePattern.test(UserPhone)) {
      Alert.alert(
        "Invalid Phone",
        "Enter a valid phone number e.g. 03001234567"
      );
      return;
    }

    if (!passwordPattern.test(UserPas)) {
      Alert.alert(
        "Invalid Password",
        "Password must contain 8 characters, a number and a special character"
      );
      return;
    }

    try {
      setLoading(true);

    const newUser_id=  await adduser(
        Username,
        email,
        UserPas,
        UserPhone
      );
      await AsyncStorage.setItem("userId", String(newUser_id));
       console.log("Saved User ID:", newUser_id);
      Alert.alert(
        "Success",
        "User registered successfully"
      );

      router.replace("/Dashbord");

      // console.log("User added");
    } catch (error) {
      console.log("Signup failed:", error);
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
     behavior={Platform.OS === "ios" ? "padding" : "height"}
  style={{ flex: 1 }}         
    >
    <ScrollView
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.container}>
        <Text style={styles.title}>
          Welcome To Sign Up
        </Text>

        <Text style={styles.label}>Name</Text>

        <TextInput
          style={styles.input}
          value={Username}
          onChangeText={setName}
          placeholder="Enter your name"
          placeholderTextColor={colors.secondaryText}
        />

        <Text style={styles.label}>Email</Text>

        <TextInput
          style={styles.input}
          value={UserEmail}
          onChangeText={setEmail}
          placeholder="Enter your email"
          placeholderTextColor={colors.secondaryText}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Phone</Text>

        <TextInput
          style={styles.input}
          value={UserPhone}
          onChangeText={setPhone}
          placeholder="Enter your phone"
          placeholderTextColor={colors.secondaryText}
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>Password</Text>

        <TextInput
          style={styles.input}
          value={UserPas}
          onChangeText={setPas}
          placeholder="Enter your password"
          placeholderTextColor={colors.secondaryText}
          secureTextEntry
        />

        <Pressable
          style={styles.button}
          onPress={handlebutton}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator
              size="small"
              color="#FFFFFF"
            />
          ) : (
            <Text style={styles.buttonText}>
              Sign Up
            </Text>
          )}
        </Pressable>

        <Text style={styles.signin}>
          Already have an Account?{" "}
          <Link
            href="/SignIn"
            style={styles.signinLink}
          >
            Sign In
          </Link>
        </Text>
      </View>

    </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    paddingHorizontal: 25,
    paddingTop: 70,
    paddingBottom: 40,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.primary,
    textAlign: "center",
    marginBottom: 40,
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 8,
  },

  input: {
    height: 52,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 20,
    color: colors.text,
  },

  button: {
    height: 52,
    backgroundColor: colors.primary,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    elevation: 3,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "bold",
  },

  signin: {
    textAlign: "center",
    marginTop: 25,
    color: colors.secondaryText,
    fontSize: 15,
  },

  signinLink: {
    color: colors.primary,
    fontWeight: "bold",
  },
});