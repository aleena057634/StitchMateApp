
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useContext, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { ConfirmAlert } from "@/componenets/CustomAlert";
import ThemeContext from "@/context/ThemeContext";
import { SignInValidation } from "../../databse/queries";

export default function SignIn() {
  const { theme } = useContext(ThemeContext);

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const [alertEmailPattern, setAlertEmailPattern] = useState(false);
  const [alertPass, setAlertPass] = useState(false);
  const [Aalert, AshowAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);

  async function checkUser(email: string, pass: string) {
    setLoading(true);

    try {
      const Email = email.trim();
      const Password = pass.trim();

      if (!Email || !Password) {
        AshowAlert(true);
        setLoading(false);
        return;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailPattern.test(Email)) {
        setAlertEmailPattern(true);
        setLoading(false);
        return;
      }

      const user = await SignInValidation(
        Email,
        Password
      );

      if (!user) {
        setAlertPass(true);
        setLoading(false);
        return;
      }

      await AsyncStorage.setItem(
        "userId",
        String(user.ID)
      );

      router.replace("/Dashbord");

      setLoading(false);
    } catch (error) {
      console.log("SIGN IN ERROR:", error);

      setLoading(false);
      setErrorAlert(true);
    }
  }

  const styles = createStyles(theme);

  return (
    <KeyboardAvoidingView
      behavior={
        Platform.OS === "ios" ? "padding" : "height"
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
            <View
              style={[
                styles.logoCircle,
                {
                  backgroundColor:
                    theme.inputBackground,
                },
              ]}
            >
              <Ionicons
                name="person-outline"
                size={29}
                color={theme.primary}
              />
            </View>

            <Text style={styles.title}>
              Welcome Back
            </Text>

            <Text style={styles.subtitle}>
              Sign in to continue to StitchMate
            </Text>
          </View>

          {/* Form */}
          <View style={styles.form}>

            <Text style={styles.label}>
              Email
            </Text>

            <View style={styles.inputContainer}>
              <Ionicons
                name="mail-outline"
                size={20}
                color={theme.primary}
              />

              <TextInput
                style={styles.inputText}
                placeholder="Enter your email"
                placeholderTextColor={theme.placeholder}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <Text style={styles.label}>
              Password
            </Text>

            <View style={styles.inputContainer}>
              <Ionicons
                name="lock-closed-outline"
                size={20}
                color={theme.primary}
              />

              <TextInput
                style={styles.inputText}
                placeholder="Enter your password"
                placeholderTextColor={theme.placeholder}
                value={pass}
                onChangeText={setPass}
                secureTextEntry={!showPass}
              />

              <Pressable
                onPress={() =>
                  setShowPass(!showPass)
                }
              >
                <Ionicons
                  name={
                    showPass
                      ? "eye"
                      : "eye-off"
                  }
                  size={20}
                  color={theme.primary}
                />
              </Pressable>
            </View>

            {loading ? (
              <View style={styles.loader}>
                <ActivityIndicator
                  size="small"
                  color={theme.primary}
                />
              </View>
            ) : (
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
            )}
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

          {/* Alerts */}
          <ConfirmAlert
            visible={Aalert}
            title="Error"
            Message="Email and Password are required"
            onConfirm={() => {
              AshowAlert(false);
            }}
          />

          <ConfirmAlert
            visible={alertEmailPattern}
            title="Email Pattern"
            Message="Please enter a valid email."
            onConfirm={() => {
              setAlertEmailPattern(false);
            }}
          />

          <ConfirmAlert
            visible={alertPass}
            title="Error"
            Message="Invalid Email and Password"
            onConfirm={() => {
              setAlertPass(false);
            }}
          />

          <ConfirmAlert
            visible={errorAlert}
            title="Error"
            Message="Something went wrong during sign in"
            onConfirm={() => {
              setErrorAlert(false);
            }}
          />

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const createStyles = (theme: any) =>
  StyleSheet.create({
    keyboardView: {
      flex: 1,
      backgroundColor: theme.background,
    },

    scrollContent: {
      flexGrow: 1,
    },

    container: {
      flexGrow: 1,
      paddingHorizontal: 25,
      paddingTop: 45,
      paddingBottom: 35,
      justifyContent: "center",
    },

    header: {
      alignItems: "center",
      marginBottom: 32,
    },

    logoCircle: {
      width: 62,
      height: 62,
      borderRadius: 31,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 14,
    },

    title: {
      fontSize: 29,
      fontWeight: "800",
      color: theme.primary,
      textAlign: "center",
    },

    subtitle: {
      fontSize: 13,
      color: theme.secondaryText,
      textAlign: "center",
      marginTop: 7,
      lineHeight: 19,
    },

    form: {
      width: "100%",
    },

    label: {
      fontSize: 14,
      fontWeight: "700",
      color: theme.text,
      marginBottom: 7,
    },

    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      height: 52,
      backgroundColor: theme.card,
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: 16,
      paddingHorizontal: 15,
      marginBottom: 18,
    },

    inputText: {
      flex: 1,
      marginLeft: 13,
      fontSize: 15,
      color: theme.text,
    },

    button: {
      height: 53,
      backgroundColor: theme.primary,
      borderRadius: 16,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 4,
      elevation: 3,
    },

    buttonText: {
      color: "#FFFFFF",
      fontSize: 16,
      fontWeight: "700",
    },

    loader: {
      height: 53,
      justifyContent: "center",
      alignItems: "center",
    },

    signup: {
      textAlign: "center",
      marginTop: 22,
      color: theme.secondaryText,
      fontSize: 14,
    },

    signupLink: {
      color: theme.primary,
      fontWeight: "800",
    },
  });
