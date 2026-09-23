
import { ConfirmAlert } from "@/componenets/CustomAlert";
import CustomButton from "@/constents/CustomButton";
import ThemeContext from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
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

  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [ AlertAll, setAlertALL]=useState(false);
  useEffect(() => {
    if (ID) {
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

  function validateName(value: string) {
    const CName = value.trim();

    if (!CName) {
      setNameError("Name can't be empty");
      return false;
    }

    if (!/^[A-Za-z ]+$/.test(CName)) {
      setNameError("Name can contain letters only");
      return false;
    }

    setNameError("");
    return true;
  }

  function validatePhone(value: string) {
    const CPhone = value.trim();

    if (!CPhone) {
      setPhoneError("Phone can't be empty");
      return false;
    }
    const phonePattern = /^(03\d{9}|\+92\d{10})$/;
    if (!phonePattern.test(CPhone)) {
      setPhoneError("Enter a valid phone number e.g.+9234748884, 03001234567and ");
      return false;
    }

    setPhoneError("");
    return true;
  }

  function validateAddress(value: string) {
    const CAddress = value.trim();

    if (!CAddress) {
      setAddressError("Address can't be empty");
      return false;
    }

    setAddressError("");
    return true;
  }

 function handleValidation() {
  if (!name.trim() && !phone.trim() && !address.trim()) {
    setAlertALL(true);
    return false;
  }

  const validName = validateName(name);
  const validPhone = validatePhone(phone);
  const validAddress = validateAddress(address);

  return validName && validPhone && validAddress;
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
              onChangeText={(value) => {
                setName(value);
                validateName(value);
              }}
            />
          </View>

          {nameError ? (
            <Text style={styles.errorText}>
              {nameError}
            </Text>
          ) : null}

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
              onChangeText={(value) => {
                setPhone(value);
                validatePhone(value);
              }}
              keyboardType="phone-pad"
            />
          </View>

          {phoneError ? (
            <Text style={styles.errorText}>
              {phoneError}
            </Text>
          ) : null}

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
              onChangeText={(value) => {
                setAddress(value);
                validateAddress(value);
              }}
              multiline
            />
          </View>

          {addressError ? (
            <Text style={styles.errorText}>
              {addressError}
            </Text>
          ) : null}

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
        <ConfirmAlert
        visible={AlertAll}
        title="required"
        Message="All fields required"
        onConfirm={()=>{
          setAlertALL(false)
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
    marginBottom: 5,
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

  errorText: {
    color: "#D32F2F",
    fontSize: 12,
    marginBottom: 14,
    marginLeft: 4,
  },

  loader: {
    marginTop: 20,
  },

  buttonContainer: {
    marginTop: 20,
  },
});
