
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
const [Alert, showAlert]=useState(false);
  const [Username, setName] = useState("");
  const [UserEmail, setEmail] = useState("");
  const [UserPas, setPas] = useState("");
  const [UserPhone, setPhone] = useState("");

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [alertEmail, setAlertEmail] = useState(false);

  const [nameError, setNameErro] = useState("");
  const [EmailError, setEmailErro] = useState("");
  const [phoneError, setPhoneErro] = useState("");
  const [passError, setPassErro] = useState("");

  useEffect(() => {
    userTable();
  }, []);

  async function handleShowUsers() {
    const users = await showUsers();
  }

  function validName(name: string) {
    if (!name.trim()) {
      setNameErro("Name can't be empty");
      return false;
    }

    const namePattern = /^[A-Za-z ]+$/;

    if (!namePattern.test(name.trim())) {
      setNameErro("Name contains letters only");
      return false;
    }

    setNameErro("");
    return true;
  }

  function validEmail(email: string) {
    if (!email.trim()) {
      setEmailErro("Email can't be empty");
      return false;
    }

   const emailPattern = /^[^\s@]+@[^\s@]+\.com$/;

    if (!emailPattern.test(email.trim())) {
      setEmailErro("Invalid email");
      return false;
    }

    setEmailErro("");
    return true;
  }

  function validPass(pass: string) {
    if (!pass.trim()) {
      setPassErro("Password can't be empty");
      return false;
    }

    const passwordPattern =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).{8,}$/;

    if (!passwordPattern.test(pass)) {
      setPassErro(
        "Password must contain 8 characters, a number and a special character"
      );
      return false;
    }

    setPassErro("");
    return true;
  }

  function validphone(phone: string) {
    if (!phone.trim()) {
      setPhoneErro("Phone can't be empty");
      return false;
    }

    const phonePattern = /^(03\d{9}|92\d{10})$/;

    if (!phonePattern.test(phone.trim())) {
      setPhoneErro(
        "Enter a valid phone number e.g. 03001234567 or 923001234567"
      );
      return false;
    }

    setPhoneErro("");
    return true;
  }

  async function handlebutton() {
  const email = UserEmail.trim();

  if (!Username.trim() || !email || !UserPas.trim() || !UserPhone.trim()) {
    showAlert(true);
    return;
  }

  const validname = validName(Username);
  const validemail = validEmail(UserEmail);
  const validPhone = validphone(UserPhone);
  const validpass = validPass(UserPas);

  if (!validname || !validemail || !validPhone || !validpass) {
    return;
  }

  const existEmail = await checkEmail(email);

  if (existEmail) {
    setAlertEmail(true);
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
                {
                  backgroundColor:
                    theme.inputBackground,
                },
              ]}
            ></View>

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
                onChangeText={(value) => {
                  setName(value);
                  setNameErro("")
                }} onBlur={()=>{validName(Username)}}
                placeholder="Enter your name"
                placeholderTextColor={theme.placeholder}
              />
            </View>

            {nameError ? (
              <Text style={styles.errorText}>
                {nameError}
              </Text>
            ) : null}

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
                onChangeText={(value) => {
                  setEmail(value);
              setEmailErro("");
                }} onBlur={()=>{    validEmail(UserEmail)}}
                placeholder="Enter your email"
                placeholderTextColor={theme.placeholder}
                keyboardType="email-address"
               
              />
            </View>

            {EmailError ? (
              <Text style={styles.errorText}>
                {EmailError}
              </Text>
            ) : null}

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
                onChangeText={(value) => {
                  setPhone(value);
                  setPhoneErro("")
                }} onBlur={()=>{validPass(UserPhone);}}
                placeholder="03001234567"
                placeholderTextColor={theme.placeholder}
                keyboardType="phone-pad"
              />
            </View>

            {phoneError ? (
              <Text style={styles.errorText}>
                {phoneError}
              </Text>
            ) : null}

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
                onChangeText={(value) => {
                  setPas(value);
                setPassErro("")
                }} onBlur={()=>{  validPass(UserPas);}}
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

            {passError ? (
              <Text style={styles.errorText}>
                {passError}
              </Text>
            ) : null}

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
            visible={alertEmail}
            title="Email"
            Message="This email is already registered."
            onConfirm={() => {
              setAlertEmail(false);
            }}
          />
        </View>
        <ConfirmAlert
  visible={Alert}
  title="Error"
  Message="All Fields are required"
  onConfirm={() => {
    showAlert(false);
  }}
/>
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
      marginBottom: 5,
    },

    input: {
      flex: 1,
      marginLeft: 13,
      fontSize: 15,
      color: theme.text,
    },

    errorText: {
      color: "#D32F2F",
      fontSize: 12,
      marginLeft: 4,
      marginBottom: 14,
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
