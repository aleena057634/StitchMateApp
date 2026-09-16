
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, router } from "expo-router";
import { useContext, useEffect, useState } from "react";
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

import ThemeContext from "@/context/ThemeContext";
import {
  adduser,
  checkEmail,
  showUsers,
} from "../../databse/queries";
import { userTable } from "../../databse/table";
import { ConfirmAlert } from "@/componenets/CustomAlert";

export default function SignUp() {
  const { theme } = useContext(ThemeContext);

  const [Username, setName] = useState("");
  const [UserEmail, setEmail] = useState("");
  const [UserPas, setPas] = useState("");
  const [UserPhone, setPhone] = useState("");

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [alertName, setAlertName] = useState(false);
  const [alertEmail, setAlertEmail] = useState(false);
  const [alertPhone, setAlertPhone] = useState(false);
  const [alertPass, setAlertPass] = useState(false);
  const [alert, showAlert] = useState(false);
  const [emailPattern, setAlertEmailPattern] = useState(false);

  useEffect(() => {
    userTable();
  }, []);

  async function handleShowUsers() {
    const users = await showUsers();
  }

  async function handlebutton() {
    const email = UserEmail.trim();

    if (!Username || !email || !UserPas || !UserPhone) {
      showAlert(true);
      return;
    }

    const existEmail = await checkEmail(email);

    if (existEmail) {
      setAlertEmail(true);
      return;
    }

    const namePattern = /^[A-Za-z ]+$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^03\d{9}$/;

    const passwordPattern =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).{8,}$/;

    if (!namePattern.test(Username)) {
      setAlertName(true);
      return;
    }

    if (!emailPattern.test(email)) {
      setAlertEmailPattern(true);
      return;
    }

    if (!phonePattern.test(UserPhone)) {
      setAlertPhone(true);
      return;
    }

    if (!passwordPattern.test(UserPas)) {
      setAlertPass(true);
      return;
    }

    try {
      setLoading(true);

      const newUser_id = await adduser(
        Username,
        email,
        UserPas,
        UserPhone
      );

      await AsyncStorage.setItem(
        "userId",
        String(newUser_id)
      );

      router.replace("/Dashbord");
    } catch (error) {
      console.log("Signup failed:", error);
      setLoading(false);
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

          <View style={styles.header}>
            <View
              style={[
                styles.logoCircle,
                { backgroundColor: theme.inputBackground },
              ]}
            >
          
            </View>

            <Text style={styles.title}>
              Create Account
            </Text>

            <Text style={styles.subtitle}>
              Sign up to start managing your tailor business
            </Text>
          </View>

          <View style={styles.form}>

            <Text style={styles.label}>
              Name
            </Text>

            <View style={styles.inputContainer}>
              <Ionicons
                name="person-outline"
                size={20}
                color={theme.primary}
              />

              <TextInput
                style={styles.input}
                value={Username}
                onChangeText={setName}
                placeholder="Enter your name"
                placeholderTextColor={theme.placeholder}
              />
            </View>

            <Text style={styles.label}>
              Email
            </Text>

            <View style={styles.inputContainer}>
              <Ionicons
                name="mail-outline"
                color={theme.primary}
                size={20}
              />

              <TextInput
                style={styles.input}
                value={UserEmail}
                onChangeText={setEmail}
                placeholder="Enter your email"
                placeholderTextColor={theme.placeholder}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <Text style={styles.label}>
              Phone
            </Text>

            <View style={styles.inputContainer}>
              <Ionicons
                name="call-outline"
                color={theme.primary}
                size={20}
              />

              <TextInput
                style={styles.input}
                value={UserPhone}
                onChangeText={setPhone}
                placeholder="03001234567"
                placeholderTextColor={theme.placeholder}
                keyboardType="phone-pad"
              />
            </View>

            <Text style={styles.label}>
              Password
            </Text>

            <View style={styles.inputContainer}>
              <Ionicons
                name="lock-closed-outline"
                color={theme.primary}
                size={20}
              />

              <TextInput
                style={styles.input}
                value={UserPas}
                onChangeText={setPas}
                placeholder="Enter your password"
                placeholderTextColor={theme.placeholder}
                secureTextEntry={!showPassword}
              />

              <Pressable
                onPress={() =>
                  setShowPassword(!showPassword)
                }
              >
                <Ionicons
                  name={
                    showPassword
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
                onPress={handlebutton}
              >
                <Text style={styles.buttonText}>
                  Create Account
                </Text>
              </Pressable>
            )}
          </View>

          <Text style={styles.signin}>
            Already have an account?{" "}

            <Link
              href="/SignIn"
              style={styles.signinLink}
            >
              Sign In
            </Link>
          </Text>

          <ConfirmAlert
            visible={alert}
            title="Error"
            Message="All Fields are required"
            onConfirm={() => {
              showAlert(false);
            }}
          />

          <ConfirmAlert
            visible={alertPass}
            title="Password"
            Message="Password must contain 8 characters, a number and a special character"
            onConfirm={() => {
              setAlertPass(false);
            }}
          />

          <ConfirmAlert
            visible={alertPhone}
            title="Invalid Phone"
            Message="Enter a valid phone number e.g. 03001234567"
            onConfirm={() => {
              setAlertPhone(false);
            }}
          />

          <ConfirmAlert
            visible={alertName}
            title="Invalid Name"
            Message="Name can contain letters only"
            onConfirm={() => {
              setAlertName(false);
            }}
          />

          <ConfirmAlert
            visible={alertEmail}
            title="Email"
            Message="This email is already registered."
            onConfirm={() => {
              setAlertEmail(false);
            }}
          />

          <ConfirmAlert
            visible={emailPattern}
            title="Email Pattern"
            Message="Please enter a valid email."
            onConfirm={() => {
              setAlertEmailPattern(false);
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
      marginBottom: 30,
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
      paddingHorizontal: 20,
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
      marginBottom: 17,
    },

    input: {
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
      marginTop: 5,
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

    signin: {
      textAlign: "center",
      marginTop: 22,
      color: theme.secondaryText,
      fontSize: 14,
    },

    signinLink: {
      color: theme.primary,
      fontWeight: "800",
    },
  });
