
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useState } from "react";
import {
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

import { SignInValidation } from "../../databse/queries";
import colors from "../constents/colors";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  async function checkUser(email: string, pass: string) {
    try {
      const Email = email.trim();
      const Password = pass.trim();

      if (!Email || !Password) {
        Alert.alert(
          "Error",
          "All fields are required"
        );
        return;
      }

      const user = await SignInValidation(Email, Password);

      if (!user) {
        Alert.alert(
          "Error",
          "Invalid email or password"
        );
        return;
      }

      await AsyncStorage.setItem(
        "userId",
        String(user.ID)
      );

      const savedUserId =
        await AsyncStorage.getItem("userId");

      console.log(
        "Saved User ID:",
        savedUserId
      );

      Alert.alert(
        "Success",
        "Sign In Successfully"
      );

      router.replace("/Dashbord");

    } catch (error) {
      console.log(
        "SIGN IN ERROR:",
        error
      );

      Alert.alert(
        "Error",
        "Something went wrong during sign in"
      );
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={
        Platform.OS === "ios"
          ? "padding"
          : "height"
      }
      style={styles.keyboardView}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.container}>

          {/* Header */}

          <View style={styles.header}>

            {/* <View style={styles.logoCircle}>
              <Text style={styles.logoText}>
                S
              </Text>
            </View> */}

            <Text style={styles.title}>
              Welcome Back
            </Text>

            <Text style={styles.subtitle}>
              Sign in to continue to StitchMate
            </Text>

          </View>

          {/* Form */}

          <View style={styles.form}>

            {/* Email */}

            <Text style={styles.label}>
              Email
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor={
                colors.secondaryText
              }
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            {/* Password */}

            <Text style={styles.label}>
              Password
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              placeholderTextColor={
                colors.secondaryText
              }
              value={pass}
              onChangeText={setPass}
              secureTextEntry
            />

            {/* Sign In Button */}

            <Pressable
              style={styles.button}
              onPress={() =>
                checkUser(email, pass)
              }
            >
              <Text style={styles.buttonText}>
                Sign In
              </Text>
            </Pressable>

          </View>

          {/* Sign Up */}

          <Text style={styles.signup}>
            Don't have an account?{" "}

            <Text
              style={styles.signupLink}
              onPress={() =>
                router.push("/SignUp")
              }
            >
              Sign Up
            </Text>
          </Text>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({

  keyboardView: {
    flex: 1,
    backgroundColor: colors.background,
  },

  scrollContent: {
    flexGrow: 1,
  },

  container: {
    flex: 1,
    paddingHorizontal: 25,
    paddingVertical: 45,
    justifyContent: "center",
  },

  /* Header */

  header: {
    alignItems: "center",
    marginBottom: 40,
  },

  logoCircle: {
    width: 68,
    height: 68,
    borderRadius: 22,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    elevation: 4,
  },

  logoText: {
    color: colors.white,
    fontSize: 30,
    fontWeight: "800",
  },

  title: {
    fontSize: 30,
    fontWeight: "800",
    color: colors.primary,
    textAlign: "center",
  },

  subtitle: {
    fontSize: 14,
    color: colors.secondaryText,
    textAlign: "center",
    marginTop: 8,
  },

  /* Form */

  form: {
    width: "100%",
  },

  label: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 8,
  },

  input: {
    height: 54,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    paddingHorizontal: 16,
    fontSize: 15,
    marginBottom: 20,
    color: colors.text,
  },

  /* Button */

  button: {
    height: 54,
    backgroundColor: colors.primary,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 4,
    elevation: 4,
  },

  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "700",
  },

  /* Sign Up */

  signup: {
    textAlign: "center",
    marginTop: 28,
    color: colors.secondaryText,
    fontSize: 14,
  },

  signupLink: {
    color: colors.primary,
    fontWeight: "800",
  },

});

