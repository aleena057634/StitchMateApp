import ThemeContext from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
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
import { ChangePassword } from "../../databse/table";
import { ConfirmAlert } from "@/componenets/CustomAlert";

export default function ChangePass() {
    const { theme } = useContext(ThemeContext);

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [passError, setPassError] = useState("");
    const [ConpassError, setconPassError] = useState("");

    const [loader, setLoading] = useState(false);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [SuccessAlert, SetSuccessAlert] = useState(false);

    const PassValidtion = (passwod: string) => {
        const pass = passwod.trim();

        if (!pass) {
            setPassError("Password can't be empty");
            return false;
        }

        if (pass.length < 8) {
            setPassError("Password must be at least 8 characters");
            return false;
        }

        if (!/[a-z]/.test(pass)) {
            setPassError("Password must contain a lowercase letter");
            return false;
        }

        if (!/[A-Z]/.test(pass)) {
            setPassError("Password must contain an uppercase letter");
            return false;
        }

        if (!/[0-9]/.test(pass)) {
            setPassError("Password must contain a number");
            return false;
        }

        if (!/[@$!%*?&]/.test(pass)) {
            setPassError("Password must contain a special symbol");
            return false;
        }

        setPassError("");
        return true;
    };

    const ConfPassValidtion = (passwod: string) => {
        const pass = passwod.trim();

        if (!pass) {
            setconPassError("Confirm Password can't be empty");
            return false;
        }

        if (pass !== password) {
            setconPassError("Passwords do not match");
            return false;
        }

        setconPassError("");
        return true;
    };

    const handleValidation = async () => {
        const passwordValid = PassValidtion(password);

        if (!passwordValid) {
            return;
        }

        const confirmPasswordValid = ConfPassValidtion(confirmPassword);

        if (!confirmPasswordValid) {
            return;
        }

        try {
            setLoading(true);

            await ChangePassword(password);

            setLoading(false);
            SetSuccessAlert(true);
        } catch (error) {
            setLoading(false);
            SetSuccessAlert(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <ScrollView
                contentContainerStyle={[
                    styles.scrollContainer,
                    { backgroundColor: theme.background },
                ]}
                keyboardShouldPersistTaps="handled"
            >
                <View
                    style={[
                        styles.box,
                        { backgroundColor: theme.card },
                    ]}
                >
                    <Ionicons
                        name="lock-closed-outline"
                        size={40}
                        color={theme.primary}
                    />

                    <Text
                        style={[
                            styles.title,
                            { color: theme.primary },
                        ]}
                    >
                        Change Password
                    </Text>

                    {/* Password */}

                    <View style={styles.inputContainer}>
                        <TextInput
    placeholder="Password"
    placeholderTextColor={theme.text}
    value={password}
    onChangeText={(text) => {
        setPassword(text);
        setPassError("");
    }}
    onBlur={() => {
        PassValidtion(password);
    }}
    secureTextEntry={!showPassword}
    style={[
        styles.input,
        {
            color: theme.text,
            borderColor: theme.border,
        },
    ]}
/>

                        <Pressable
                            onPress={() =>
                                setShowPassword(!showPassword)
                            }
                            style={styles.eyeButton}
                        >
                            <Ionicons
                                name={
                                    showPassword
                                        ? "eye-outline"
                                        : "eye-off-outline"
                                }
                                size={22}
                                color={theme.primary}
                            />
                        </Pressable>
                    </View>

                    {passError !== "" && (
                        <Text style={styles.errorText}>
                            {passError}
                        </Text>
                    )}

                    {/* Confirm Password */}

                    <View style={styles.inputContainer}>
                        <TextInput
    placeholder="Confirm Password"
    placeholderTextColor={theme.text}
    value={confirmPassword}
    onChangeText={(text) => {
        setConfirmPassword(text);
        setconPassError("");
    }}
    onBlur={() => {
        ConfPassValidtion(confirmPassword);
    }}
    secureTextEntry={!showConfirmPassword}
    style={[
        styles.input,
        {
            color: theme.text,
            borderColor: theme.border,
        },
    ]}
/>

                        <Pressable
                            onPress={() =>
                                setShowConfirmPassword(
                                    !showConfirmPassword
                                )
                            }
                            style={styles.eyeButton}
                        >
                            <Ionicons
                                name={
                                    showConfirmPassword
                                        ? "eye-outline"
                                        : "eye-off-outline"
                                }
                                size={22}
                                color={theme.primary}
                            />
                        </Pressable>
                    </View>

                    {ConpassError !== "" && (
                        <Text style={styles.errorText}>
                            {ConpassError}
                        </Text>
                    )}

                    {/* Save Button */}

                    <Pressable
                        onPress={handleValidation}
                        disabled={loader}
                        style={[
                            styles.saveButton,
                            { backgroundColor: theme.primary },
                        ]}
                    >
                        {loader ? (
                            <ActivityIndicator
                                size="small"
                                color={theme.buttonText}
                            />
                        ) : (
                            <Text
                                style={[
                                    styles.saveButtonText,
                                    { color: theme.buttonText },
                                ]}
                            >
                                Save Password
                            </Text>
                        )}
                    </Pressable>
                </View>

                <ConfirmAlert
                    visible={SuccessAlert}
                    title="Success"
                    Message="Password Updated Successfully"
                    onConfirm={() => {
                        SetSuccessAlert(false);
                        router.dismiss();
                    }}
                />
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },

    box: {
        width: "100%",
        maxWidth: 400,
        padding: 25,
        borderRadius: 15,
        alignItems: "center",
        elevation: 4,
    },

    title: {
        fontSize: 23,
        fontWeight: "bold",
        marginTop: 10,
        marginBottom: 25,
    },

    inputContainer: {
        width: "100%",
        position: "relative",
    },

    input: {
        width: "100%",
        height: 52,
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingRight: 45,
        fontSize: 15,
        marginBottom: 5,
    },

    eyeButton: {
        position: "absolute",
        right: 15,
        top: 15,
    },

    errorText: {
        color: "red",
        fontSize: 12,
        width: "100%",
        marginBottom: 12,
    },

    saveButton: {
        width: "100%",
        height: 52,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
    },

    saveButtonText: {
        fontSize: 16,
        fontWeight: "600",
    },
});