// AsyncStorage se saved userId check karne ke liye import
import AsyncStorage from "@react-native-async-storage/async-storage";

import { router } from "expo-router";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import colors from "../constents/colors";

export default function Index() {

  // Get Started button ka function
  async function handleGetStarted() {

    // Check karo ke pehle se koi user login hai ya nahi
    const userId = await AsyncStorage.getItem("userId");

    // Agar userId mil gaya to user already logged in hai
    if (userId) {

      // Direct Dashboard par bhejo
      router.replace("/Dashbord");

    } else {

      // Agar userId nahi hai to SignIn par bhejo
      router.push("/SignIn");
    }
  }

  return (
    <View style={styles.container}>

      <View style={styles.imageContainer}>
        <Image
          source={require("../../assets/images/tailor1.jpg")}
          style={styles.image}
        />
      </View>

      {/* App Name */}
      <Text style={styles.appName}>
        StitchMate
      </Text>

      {/* Tagline */}
      <Text style={styles.tagline}>
        Your Smart Tailoring Companion
      </Text>

      {/* Main Heading */}
      <Text style={styles.title}>
        Your Style, Our Craft
      </Text>

      {/* Subtitle */}
      <Text style={styles.subtitle}>
        Perfect measurements.{"\n"}
        Perfect fitting.
      </Text>

      {/* Button */}
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

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 25,
  },

  // Illustration container
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

  // App name
  appName: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.accent,
    letterSpacing: 0.5,
    marginBottom: 4,
  },

  // App tagline
  tagline: {
    fontSize: 13,
    color: colors.secondaryText,
    marginBottom: 12,
    letterSpacing: 0.3,
  },

  // Main heading
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: colors.primary,
    textAlign: "center",
    marginBottom: 10,
  },

  // Subtitle
  subtitle: {
    fontSize: 16,
    color: colors.secondaryText,
    textAlign: "center",
    lineHeight: 25,
    marginBottom: 30,
  },

  // Button
  button: {
    width: "82%",
    height: 54,
    backgroundColor: colors.primary,
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
    color: colors.white,
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
});