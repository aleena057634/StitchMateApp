
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useContext, useState } from "react";
import ThemeContext from "../context/ThemeContext";

export default function EditInfo() {
  const { theme } = useContext(ThemeContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.background }}
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.header}>
        <View
          style={[
            styles.iconCircle,
            { backgroundColor: theme.primary },
          ]}
        >
          <Ionicons name="person-outline" size={30} color="#FFFFFF" />
        </View>

        <Text style={[styles.title, { color: theme.text }]}>
          Edit Information
        </Text>

        <Text style={[styles.subtitle, { color: theme.secondaryText }]}>
          Update your account information
        </Text>
      </View>

      {/* Name */}
      <View style={styles.field}>
        <Text style={[styles.label, { color: theme.text }]}>
          Name
        </Text>

        <View
          style={[
            styles.inputBox,
            {
              backgroundColor: theme.card,
              borderColor: theme.border,
            },
          ]}
        >
          <Ionicons
            name="person-outline"
            size={20}
            color={theme.primary}
          />

          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Enter your name"
            placeholderTextColor={theme.secondaryText}
            style={[styles.input, { color: theme.text }]}
          />
        </View>
      </View>

      {/* Email */}
      <View style={styles.field}>
        <Text style={[styles.label, { color: theme.text }]}>
          Email
        </Text>

        <View
          style={[
            styles.inputBox,
            {
              backgroundColor: theme.card,
              borderColor: theme.border,
            },
          ]}
        >
          <Ionicons
            name="mail-outline"
            size={20}
            color={theme.primary}
          />

          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            placeholderTextColor={theme.secondaryText}
            keyboardType="email-address"
            autoCapitalize="none"
            style={[styles.input, { color: theme.text }]}
          />
        </View>
      </View>

      {/* Phone */}
      <View style={styles.field}>
        <Text style={[styles.label, { color: theme.text }]}>
          Phone Number
        </Text>

        <View
          style={[
            styles.inputBox,
            {
              backgroundColor: theme.card,
              borderColor: theme.border,
            },
          ]}
        >
          <Ionicons
            name="call-outline"
            size={20}
            color={theme.primary}
          />

          <TextInput
            value={phone}
            onChangeText={setPhone}
            placeholder="Enter your phone number"
            placeholderTextColor={theme.secondaryText}
            keyboardType="phone-pad"
            style={[styles.input, { color: theme.text }]}
          />
        </View>
      </View>

      {/* Save */}
      <TouchableOpacity
        style={[
          styles.saveButton,
          { backgroundColor: theme.primary },
        ]}
        onPress={() => {}}
      >
        <Ionicons name="save-outline" size={21} color="#FFFFFF" />

        <Text style={styles.saveText}>Save Changes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
  },

  header: {
    alignItems: "center",
    marginTop: 15,
    marginBottom: 35,
  },

  iconCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
  },

  subtitle: {
    fontSize: 14,
    marginTop: 6,
  },

  field: {
    marginBottom: 22,
  },

  label: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 8,
  },

  inputBox: {
    height: 55,
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
  },

  input: {
    flex: 1,
    fontSize: 15,
    marginLeft: 10,
  },

  saveButton: {
    height: 55,
    borderRadius: 13,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },

  saveText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
});

