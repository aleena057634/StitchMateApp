import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useContext, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import ThemeContext from "../context/ThemeContext";
import CustomAlert, { ConfirmAlert } from "@/componenets/CustomAlert";

export default function Setting() {
  const { theme, isDark, toggleTheme } = useContext(ThemeContext);
const [showAlert, setShowAlert]=useState(false);
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.background },
      ]}
    >
      {/* HEADER */}
      <View style={styles.header}>
        <View>
          <Text
            style={[
              styles.heading,
              { color: theme.text },
            ]}
          >
            Settings
          </Text>

          <Text
            style={[
              styles.description,
              { color: theme.secondaryText },
            ]}
          >
            Customize your app appearance
          </Text>
        </View>

        <View
          style={[
            styles.headerIcon,
            { backgroundColor: theme.card },
          ]}
        >
          <Ionicons
            name="settings-outline"
            size={23}
            color={theme.primary}
          />
        </View>
      </View>

      {/* APPEARANCE */}
      <Text
        style={[
          styles.sectionTitle,
          { color: theme.text },
        ]}
      >
        Appearance
      </Text>

      <View
        style={[
          styles.themeCard,
          {
            backgroundColor: theme.card,
            borderColor: theme.border,
          },
        ]}
      >
        <View style={styles.themeHeader}>
          <View
            style={[
              styles.themeIcon,
              { backgroundColor: theme.background },
            ]}
          >
            <Ionicons
              name={isDark ? "moon" : "sunny"}
              size={22}
              color={theme.primary}
            />
          </View>

          <View>
            <Text
              style={[
                styles.themeTitle,
                { color: theme.text },
              ]}
            >
              App Theme
            </Text>

            <Text
              style={[
                styles.themeSubtitle,
                { color: theme.secondaryText },
              ]}
            >
              Choose your preferred theme
            </Text>
          </View>
        </View>

        {/* LIGHT / DARK BUTTONS */}
        <View style={styles.themeButtons}>
          {/* LIGHT */}
          <Pressable
            style={[
              styles.themeButton,
              {
                backgroundColor: !isDark
                  ? theme.primary
                  : theme.background,
                borderColor: theme.border,
              },
            ]}
            onPress={() => {
              if (isDark) {
                toggleTheme();
              }
            }}
          >
            <Ionicons
              name="sunny-outline"
              size={21}
              color={!isDark ? theme.white : theme.text}
            />

            <Text
              style={[
                styles.buttonText,
                {
                  color: !isDark
                    ? theme.white
                    : theme.text,
                },
              ]}
            >
              Light
            </Text>
          </Pressable>

          {/* DARK */}
          <Pressable
            style={[
              styles.themeButton,
              {
                backgroundColor: isDark
                  ? theme.primary
                  : theme.background,
                borderColor: theme.border,
              },
            ]}
            onPress={() => {
              if (!isDark) {
                toggleTheme();
              }
            }}
          >
            <Ionicons
              name="moon-outline"
              size={21}
              color={isDark ? theme.white : theme.text}
            />

            <Text
              style={[
                styles.buttonText,
                {
                  color: isDark
                    ? theme.white
                    : theme.text,
                },
              ]}
            >
              Dark
            </Text>
          </Pressable>
        </View>
      </View>

      {/* ACCOUNT */}
      <Text
        style={[
          styles.sectionTitle,
          { color: theme.text },
        ]}
      >
        Account
      </Text>

      {/* LOGOUT */}
      <Pressable
        style={[
          styles.logoutCard,
          {
            backgroundColor: theme.card,
            borderColor: theme.border,
          },
        ]}
        onPress={()=>{
          setShowAlert(true);
        } }
      >
        <View
          style={[
            styles.logoutIcon,
            { backgroundColor: theme.background },
          ]}
        >
          <Ionicons
            name="log-out-outline"
            size={22}
            color={theme.danger}
          />
        </View>

        <View style={styles.logoutTextContainer}>
          <Text
            style={[
              styles.logoutTitle,
              { color: theme.text },
            ]}
          >
            Logout
          </Text>

          <Text
            style={[
              styles.logoutSubtitle,
              { color: theme.secondaryText },
            ]}
          >
            Sign out from your account
          </Text>
        </View>

        <Ionicons
          name="chevron-forward-outline"
          size={20}
          color={theme.secondaryText}
        />
      </Pressable>

      <CustomAlert
  visible={showAlert}
  title="Logout"
  Message="Are You sure you want to Logout"
  onCancel={() => {
    setShowAlert(false);
  }}
  onConfirm={async () => {
    await AsyncStorage.removeItem("userId");
    setShowAlert(false);
    router.dismissAll();
    router.replace("/SignIn");
  }}
/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 25,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 28,
  },

  heading: {
    fontSize: 27,
    fontWeight: "800",
  },

  description: {
    fontSize: 13,
    marginTop: 5,
  },

  headerIcon: {
    width: 46,
    height: 46,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 10,
  },

  themeCard: {
    borderRadius: 19,
    borderWidth: 1,
    padding: 16,
  },

  themeHeader: {
    flexDirection: "row",
    alignItems: "center",
  },

  themeIcon: {
    width: 46,
    height: 46,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  themeTitle: {
    fontSize: 16,
    fontWeight: "700",
  },

  themeSubtitle: {
    fontSize: 12,
    marginTop: 4,
  },

  themeButtons: {
    flexDirection: "row",
    gap: 10,
    marginTop: 18,
  },

  themeButton: {
    flex: 1,
    height: 46,
    borderRadius: 13,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
  },

  buttonText: {
    fontSize: 13,
    fontWeight: "700",
  },

  logoutCard: {
    minHeight: 75,
    borderRadius: 18,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
  },

  logoutIcon: {
    width: 44,
    height: 44,
    borderRadius: 13,
    justifyContent: "center",
    alignItems: "center",
  },

  logoutTextContainer: {
    flex: 1,
    marginLeft: 12,
  },

  logoutTitle: {
    fontSize: 15,
    fontWeight: "700",
  },

  logoutSubtitle: {
    fontSize: 11,
    marginTop: 4,
  },
});