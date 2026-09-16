import AsyncStorage from "@react-native-async-storage/async-storage";

import { router } from "expo-router";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";

export default function Index() {
  const { theme, isDark, toggleTheme } = useContext(ThemeContext);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 25,
    },

    imageContainer: {
      width: "100%",
      height: 310,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 10,
    },

    image: {
      width: 310,
      height: 310,
      resizeMode: "contain",
    },

    appName: {
      fontSize: 18,
      fontWeight: "700",
      color: theme.accent,
      letterSpacing: 0.5,
      marginBottom: 4,
    },

    tagline: {
      fontSize: 13,
      color: theme.secondaryText,
      marginBottom: 12,
      letterSpacing: 0.3,
    },

    title: {
      fontSize: 30,
      fontWeight: "800",
      color: theme.primary,
      textAlign: "center",
      marginBottom: 10,
    },

    subtitle: {
      fontSize: 16,
      color: theme.secondaryText,
      textAlign: "center",
      lineHeight: 25,
      marginBottom: 30,
    },

    button: {
      width: "82%",
      height: 54,
      backgroundColor: theme.primary,
      borderRadius: 16,
      justifyContent: "center",
      alignItems: "center",

      elevation: 5,

      shadowOffset: {
        width: 0,
        height: 3,
      },

      shadowOpacity: 0.2,
      shadowRadius: 5,
    },

    buttonText: {
      color: theme.white,
      fontSize: 17,
      fontWeight: "700",
      letterSpacing: 0.3,
    },
  });

  async function handleGetStarted() {
    const userId = await AsyncStorage.getItem("userId");

    if (userId) {
      router.replace("/Dashbord");
    } else {
      router.replace("/SignIn");
    }
  }

  return (
    <View style={styles.container}>

      <View style={styles.imageContainer}>
        <Image
          source={require("../../assets/images/tabIcons/tailor1.png")}
          style={styles.image}
        />
      </View>

      <Text style={styles.appName}>
        StitchMate
      </Text>

      <Text style={styles.tagline}>
        Your Smart Tailoring Companion
      </Text>

      <Text style={styles.title}>
        Your Style, Our Craft
      </Text>

      <Text style={styles.subtitle}>
        Perfect measurements.{"\n"}
        Perfect fitting.
      </Text>

      <Pressable
        style={styles.button}
        onPress={handleGetStarted}
      >
        <Text style={styles.buttonText}>
          Get Started
        </Text>
      </Pressable>

    </View>
  );
}