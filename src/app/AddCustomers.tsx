import CustomButton from "@/constents/CustomButton";
import { ConfirmAlert } from "@/componenets/CustomAlert";
import ThemeContext from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
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

import {
  AddCustomer,
  updateCunstomer,
} from "../../databse/CustomerCru";

export default function AddCustomers() {
  const { theme } = useContext(ThemeContext);

  const { ID, NAME, PHONE, ADDRESS } = useLocalSearchParams();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [loader, setLoader] = useState(false);

  const [showAlert, setShowAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    if (ID) {
      console.log("Edit Customer Data:");
      console.log("ID:", ID);
      console.log("NAME:", NAME);
      console.log("PHONE:", PHONE);
      console.log("ADDRESS:", ADDRESS);

      setName(NAME?.toString() || "");
      setPhone(PHONE?.toString() || "");
      setAddress(ADDRESS?.toString() || "");
    }
  }, [ID, NAME, PHONE, ADDRESS]);

  function showError(title: string, message: string) {
    setAlertTitle(title);
    setAlertMessage(message);
    setShowAlert(true);
  }

  function handleValidation() {
    const CName = name.trim();
    const CPhone = phone.trim();
    const CAddress = address.trim();

    if (!CName) {
      showError("Name Required", "Name can't be empty");
      return false;
    }

    const namePattern = /^[A-Za-z ]+$/;

    if (!namePattern.test(CName)) {
      showError(
        "Invalid Name",
        "Name can contain letters only"
      );
      return false;
    }

    if (!CPhone) {
      showError("Phone Required", "Phone can't be empty");
      return false;
    }

    const phonePattern = /^03\d{9}$/;

    if (!phonePattern.test(CPhone)) {
      showError(
        "Invalid Phone",
        "Enter a valid phone number e.g. 03001234567"
      );
      return false;
    }

    if (!CAddress) {
      showError(
        "Address Required",
        "Address can't be empty"
      );
      return false;
    }

    return true;
  }

  async function handleSave() {
    if (!handleValidation()) {
      return;
    }

    try {
      setLoader(true);

      if (ID) {
        await updateCunstomer(
          Number(ID),
          name.trim(),
          phone.trim(),
          address.trim()
        );
      } else {
        await AddCustomer(
          name.trim(),
          phone.trim(),
          address.trim()
        );
      }

      router.back();
    } catch (error) {
      console.log("Customer save failed:", error);
      setLoader(false);

      showError(
        "Error",
        "Something went wrong"
      );
    }
  }

  return (
    <KeyboardAvoidingView
      style={[
        styles.keyboardView,
        { backgroundColor: theme.background },
      ]}
      behavior={
        Platform.OS === "ios"
          ? "padding"
          : "height"
      }
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.form}>

          {/* HEADER */}
          <View style={styles.header}>
            <View
              style={[
                styles.iconCircle,
                { backgroundColor: theme.primary },
              ]}
            >
              <Ionicons
                name={
                  ID
                    ? "create-outline"
                    : "person-add-outline"
                }
                size={28}
                color={theme.white}
              />
            </View>

            <Text
              style={[
                styles.title,
                { color: theme.text },
              ]}
            >
              {ID
                ? "Update Customer"
                : "Add Customer"}
            </Text>

            <Text
              style={[
                styles.subtitle,
                { color: theme.secondaryText },
              ]}
            >
              {ID
                ? "Update customer details"
                : "Enter customer details"}
            </Text>
          </View>

          {/* NAME */}
          <Text
            style={[
              styles.label,
              { color: theme.text },
            ]}
          >
            Name
          </Text>

          <View
            style={[
              styles.inputContainer,
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
              style={[
                styles.input,
                { color: theme.text },
              ]}
              placeholder="Enter customer name"
              placeholderTextColor={theme.placeholder}
              value={name}
              onChangeText={setName}
            />
          </View>

          {/* PHONE */}
          <Text
            style={[
              styles.label,
              { color: theme.text },
            ]}
          >
            Phone
          </Text>

          <View
            style={[
              styles.inputContainer,
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
              style={[
                styles.input,
                { color: theme.text },
              ]}
              placeholder="Enter phone number"
              placeholderTextColor={theme.placeholder}
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
          </View>

          {/* ADDRESS */}
          <Text
            style={[
              styles.label,
              { color: theme.text },
            ]}
          >
            Address
          </Text>

          <View
            style={[
              styles.addressContainer,
              {
                backgroundColor: theme.card,
                borderColor: theme.border,
              },
            ]}
          >
            <Ionicons
              name="location-outline"
              size={20}
              color={theme.primary}
            />

            <TextInput
              style={[
                styles.addressInput,
                { color: theme.text },
              ]}
              placeholder="Enter customer address"
              placeholderTextColor={theme.placeholder}
              value={address}
              onChangeText={setAddress}
              multiline
            />
          </View>

          {/* BUTTON */}
          {loader ? (
            <ActivityIndicator
              size="large"
              color={theme.primary}
              style={styles.loader}
            />
          ) : (
            <View style={styles.buttonContainer}>
              <CustomButton
                title={ID ? "Update" : "Add"}
                onPress={handleSave}
              />
            </View>
          )}
        </View>
      </ScrollView>

      {/* ALERT */}
      <ConfirmAlert
        visible={showAlert}
        title={alertTitle}
        Message={alertMessage}
        onConfirm={() => {
          setShowAlert(false);
        }}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
  },

  content: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 25,
    paddingBottom: 50,
  },

  form: {
    width: "100%",
    maxWidth: 450,
    alignSelf: "center",
  },

  header: {
    alignItems: "center",
    marginBottom: 30,
  },

  iconCircle: {
    width: 62,
    height: 62,
    borderRadius: 31,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
  },

  title: {
    fontSize: 26,
    fontWeight: "800",
  },

  subtitle: {
    fontSize: 14,
    marginTop: 6,
  },

  label: {
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 8,
  },

  inputContainer: {
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 14,
    marginBottom: 18,
  },

  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 15,
  },

  addressContainer: {
    minHeight: 100,
    flexDirection: "row",
    alignItems: "flex-start",
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingTop: 14,
  },

  addressInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 15,
    minHeight: 75,
    textAlignVertical: "top",
  },

  loader: {
    marginTop: 20,
  },

  buttonContainer: {
    marginTop: 20,
  },
});