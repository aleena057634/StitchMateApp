
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

  const [alertPass, setAlertPass] = useState(false);
  const [Aalert, AshowAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);

  const [EmailError, setEmailError] = useState("");
  const [PassError, SetPassError] = useState("");

  function validateEmail(value: string) {
    const Email = value.trim();

    if (!Email) {
      setEmailError("Email can't be empty");
      return false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.com$/;

    if (!emailPattern.test(Email)) {
      setEmailError("Invalid email");
      return false;
    }

    setEmailError("");
    return true;
  }

  function validatePassword(value: string) {
    const Password = value.trim();

    if (!Password) {
      SetPassError("Password can't be empty");
      return false;
    }

    const passwordPattern =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).{8,}$/;

    if (!passwordPattern.test(Password)) {
      SetPassError(
        "Password must contain 8 characters, a number and a special character"
      );
      return false;
    }

    SetPassError("");
    return true;
  }

  async function checkUser(email: string, pass: string) {
    if (!email.trim() || !pass.trim()) {
      AshowAlert(true);
      return;
    }

    const validEmail = validateEmail(email);
    const validPassword = validatePassword(pass);

    if (!validEmail || !validPassword) {
      return;
    }

    setLoading(true);

    try {
      const Email = email.trim();
      const Password = pass.trim();

      const user = await SignInValidation(Email, Password);

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

          {/* Top Icon */}
          <View style={styles.topIcon}>
            <Ionicons
              name="cut-outline"
              size={32}
              color={theme.primary}
            />
          </View>

          <Text style={styles.brandName}>
            StitchMate
          </Text>

          <Text style={styles.title}>
            Welcome Back
          </Text>

          <Text style={styles.subtitle}>
            Sign in to continue managing your
            tailor business
          </Text>

          {/* Login Card */}
          <View style={styles.loginCard}>

            {/* Email */}
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
                onChangeText={(value) => {
                  setEmail(value);
                  setEmailError("");
                }}
                onBlur={() => {
                  validateEmail(email);
                }}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {EmailError ? (
              <Text style={styles.errorText}>
                {EmailError}
              </Text>
            ) : null}

            {/* Password */}
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
                onChangeText={(value) => {
                  setPass(value);
                  SetPassError("");
                }}
                onBlur={() => {
                  validatePassword(pass);
                }}
                secureTextEntry={!showPass}
              />

              <Pressable
                onPress={() => setShowPass(!showPass)}
                style={styles.eyeButton}
              >
                <Ionicons
                  name={
                    showPass
                      ? "eye-outline"
                      : "eye-off-outline"
                  }
                  size={20}
                  color={theme.primary}
                />
              </Pressable>
            </View>

            {PassError ? (
              <Text style={styles.errorText}>
                {PassError}
              </Text>
            ) : null}

            {/* Forgot Password UI */}
            <Pressable
              style={styles.forgotButton}
            >
              <Text style={styles.forgotText}>
                Forgot Password?
              </Text>
            </Pressable>

            {/* Sign In Button */}
            {loading ? (
              <View style={styles.loader}>
                <ActivityIndicator
                  size="small"
                  color={theme.buttonText}
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

                <Ionicons
                  name="arrow-forward"
                  size={19}
                  color={theme.buttonText}
                />
              </Pressable>
            )}
          </View>

          {/* Sign Up */}
          <View style={styles.signupContainer}>
            <Text style={styles.signup}>
              Don't have an account?
            </Text>

            <Pressable
              onPress={() =>
                router.push("/SignUp")
              }
            >
              <Text style={styles.signupLink}>
                Create Account
              </Text>
            </Pressable>
          </View>

          {/* Alerts */}
          <ConfirmAlert
            visible={Aalert}
            title="Error"
            Message="All Fields are required"
            onConfirm={() => {
              AshowAlert(false);
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
      justifyContent: "center",
    },

    container: {
      flex: 1,
      paddingHorizontal: 25,
      paddingVertical: 35,
      justifyContent: "center",
    },

    topIcon: {
      width: 72,
      height: 72,
      borderRadius: 36,
      backgroundColor: theme.card,
      borderWidth: 1,
      borderColor: theme.border,
      alignSelf: "center",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 12,
    },

    brandName: {
      color: theme.primary,
      fontSize: 15,
      fontWeight: "800",
      textAlign: "center",
      letterSpacing: 1,
      marginBottom: 8,
    },

    title: {
      fontSize: 30,
      fontWeight: "800",
      color: theme.text,
      textAlign: "center",
    },

    subtitle: {
      fontSize: 13,
      color: theme.secondaryText,
      textAlign: "center",
      marginTop: 8,
      lineHeight: 19,
      paddingHorizontal: 25,
      marginBottom: 28,
    },

    loginCard: {
      width: "100%",
      backgroundColor: theme.card,
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: 22,
      padding: 20,
      elevation: 4,
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
      height: 53,
      backgroundColor: theme.background,
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: 14,
      paddingHorizontal: 14,
      marginBottom: 5,
    },

    inputText: {
      flex: 1,
      marginLeft: 12,
      fontSize: 15,
      color: theme.text,
    },

    eyeButton: {
      paddingLeft: 10,
    },

    errorText: {
      color: "#D32F2F",
      fontSize: 12,
      marginLeft: 4,
      marginBottom: 12,
    },

    forgotButton: {
      alignSelf: "flex-end",
      marginTop: 2,
      marginBottom: 18,
    },

    forgotText: {
      color: theme.primary,
      fontSize: 13,
      fontWeight: "700",
    },

    button: {
      height: 53,
      backgroundColor: theme.primary,
      borderRadius: 14,
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
      gap: 8,
    },

    buttonText: {
      color: theme.buttonText,
      fontSize: 16,
      fontWeight: "700",
    },

    loader: {
      height: 53,
      backgroundColor: theme.primary,
      borderRadius: 14,
      justifyContent: "center",
      alignItems: "center",
    },

    signupContainer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 24,
      gap: 5,
    },

    signup: {
      color: theme.secondaryText,
      fontSize: 14,
    },

    signupLink: {
      color: theme.primary,
      fontSize: 14,
      fontWeight: "800",
    },
  });
