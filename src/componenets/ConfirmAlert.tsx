import { useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import colors from "@/constents/colors";
import { Ionicons } from "@expo/vector-icons";
import { DeleteCustomer, getCustomers } from "../../databse/CustomerCru";
import ConfirmAlert from "../componenets/ConfirmAlert";
import SearchBox from "../componenets/SearchBox";

export default function CustomerList() {
  type Customer = {
    ID: number;
    NAME: string;
    PHONE: string;
    ADDRESS: string;
  };

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [showAlert, setShowAlert] = useState(false);

  async function LoadCustomer() {
    try {
      const data = await getCustomers();

      console.log("Customers:", data);

      setCustomers(data);
    } catch (error) {
      console.log("Failed to load Customer:", error);
    }
  }

  useEffect(() => {
    LoadCustomer();
  }, []);

  const handleDelete = (id: number) => {
    setSelectedId(id);
    setShowAlert(true);
  };

  const confirmDelete = async () => {
    if (selectedId === null) {
      return;
    }

    try {
      await DeleteCustomer(selectedId);

      setShowAlert(false);
      setSelectedId(null);

      await LoadCustomer();
    } catch (error) {
      console.log("Failed to delete customer:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>

      {/* Search Box */}
      <SearchBox
        value={search}
        onChangeText={(e) => {
          setSearch(e);
        }}
      />

      {/* Customer List */}
      <FlatList
        data={customers}
        keyExtractor={(item) => item.ID.toString()}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <View style={styles.card}>

            {/* Customer ka first letter */}
            <View style={styles.iconContainer}>
              <Text style={styles.iconText}>
                {item.NAME?.charAt(0).toUpperCase()}
              </Text>
            </View>

            {/* Customer Information */}
            <View style={styles.customerInfo}>
              <Text style={styles.name}>
                {item.NAME}
              </Text>

              <Text style={styles.phone}>
                {item.PHONE}
              </Text>

              <Text style={styles.address}>
                {item.ADDRESS}
              </Text>
            </View>

            {/* Actions */}
            <View style={styles.actionContainer}>

              {/* Edit */}
              <Pressable>
                <Ionicons
                  name="pencil-outline"
                  size={20}
                  color={colors.primary}
                />
              </Pressable>

              {/* Delete */}
              <Pressable
                onPress={() => {
                  handleDelete(item.ID);
                }}
              >
                <Ionicons
                  name="trash-outline"
                  size={20}
                  color={colors.danger}
                />
              </Pressable>

            </View>

          </View>
        )}

        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              No customers found
            </Text>
          </View>
        }
      />

      {/* Confirmation Alert */}
      <ConfirmAlert
        visible={showAlert}
        title="Delete Customer"
        message="Are you sure you want to delete this customer?"
        onCancel={() => {
          setShowAlert(false);
          setSelectedId(null);
        }}
        onConfirm={confirmDelete}
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 10,
  },

  card: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 15,
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
  },

  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  iconText: {
    color: colors.white,
    fontSize: 20,
    fontWeight: "700",
  },

  customerInfo: {
    flex: 1,
  },

  name: {
    color: colors.text,
    fontSize: 17,
    fontWeight: "700",
  },

  phone: {
    color: colors.secondaryText,
    fontSize: 14,
    marginTop: 5,
  },

  address: {
    color: colors.secondaryText,
    fontSize: 14,
    marginTop: 3,
  },

  actionContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 50,
  },

  emptyText: {
    color: colors.secondaryText,
    fontSize: 16,
  },
});