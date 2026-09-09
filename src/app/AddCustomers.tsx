
import CustomButton from "@/constents/CustomButton";
import colors from "@/constents/colors";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { AddCustomer, updateCunstomer } from "../../databse/CustomerCru";

export default function AddCustomers() {
  const { ID, NAME, PHONE, ADDRESS } = useLocalSearchParams();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (ID) {
      setName(NAME?.toString() || "");
      setPhone(PHONE?.toString() || "");
      setAddress(ADDRESS?.toString() || "");
    }
  }, [ID, NAME, PHONE, ADDRESS]);

  async function handleSave() {
    if (ID) {
      await updateCunstomer(
        Number(ID),
        name,
        phone,
        address
      );
    } else {
      await AddCustomer(
        name,
        phone,
        address
      );
    }

    router.replace("/CustomerList");
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <View style={styles.header}>
        <Text style={styles.title}>
          {ID ? "Update Customer" : "Add Customer"}
        </Text>

        <Text style={styles.subtitle}>
          {ID ? "Update customer details" : "Enter customer details"}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Name</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter customer name"
          placeholderTextColor={colors.placeholder}
          value={name}
          onChangeText={(e)=>{setName(e)}}
        />

        <Text style={styles.label}>Phone</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter phone number"
          placeholderTextColor={colors.placeholder}
          value={phone}
          onChangeText={(e)=>{setPhone(e)}}
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>Address</Text>

        <TextInput
          style={styles.addressInput}
          placeholder="Enter customer address"
          placeholderTextColor={colors.placeholder}
          value={address}
           onChangeText={(e)=>{setAddress(e)}}
          multiline
        />
      </View>

      <CustomButton
        title={ID ? "Update" : "Add"}
        onPress={handleSave}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  content: {
    padding: 20,
    paddingBottom: 30,
  },

  header: {
    marginBottom: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.text,
  },

  subtitle: {
    fontSize: 13,
    marginTop: 5,
    color: colors.secondaryText,
  },

  card: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    padding: 16,
    marginBottom: 18,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 7,
  },

  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    backgroundColor: colors.inputBackground,
    color: colors.text,
    paddingHorizontal: 14,
    height: 50,
    marginBottom: 16,
    fontSize: 16,
  },

  addressInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    backgroundColor: colors.inputBackground,
    color: colors.text,
    padding: 14,
    height: 100,
    textAlignVertical: "top",
    fontSize: 16,
  },
});

