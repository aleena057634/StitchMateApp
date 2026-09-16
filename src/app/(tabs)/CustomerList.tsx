import FloatingButton from "@/componenets/FloatingButton";
import SearchBox from "@/componenets/SearchBox";
import { Ionicons } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ThemeContext from "../../context/ThemeContext"
import { useContext } from "react";
import colors from "@/constents/colors";
import CustomAlert from "@/componenets/CustomAlert";
import {
  DeleteCustomer,
  getCustomers,
} from "../../../databse/CustomerCru";

type customer = {
  ID: number;
  NAME: string;
  PHONE: string;
  ADDRESS: string;
};

export default function CustomerList() {
  const { theme, isDark, toggleTheme } = useContext(ThemeContext);
  const [search, setSearch] = useState("");
  const [CustomersData, setCustomerData] = useState<customer[]>([]);
  const [showAlert, setShowAlert] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const [editId,setEditId]=useState<number|null>(null);
  const [showEditAlert,setEditAlert]=useState(false)

  const filteredCustomers = CustomersData.filter((item) =>
    item.NAME.toLowerCase().includes(search.toLowerCase())
  );
  // Database se customers load karta hai
  async function LoadCustomer() {
    try {
      const data = await getCustomers();
      setCustomerData(data);
    } catch (error) {
      console.log("Failed To load customers");
    }
  }

  // Jab bhi CustomerList screen par wapas aayegi,
  // customers dobara database se load honge
  useFocusEffect(
    useCallback(() => {
      LoadCustomer();
    }, [])
  );

  // Customer delete karne ka function
  async function HandleDeletedCustomer(id: number) {
    try {
      await DeleteCustomer(id);

      LoadCustomer();
    } catch (error) {
      console.log("Error in deleteing customers...");
    }
  }

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: theme.background },
      ]}
    >
      {/* Search */}
      <View style={styles.searchContainer}>
        <SearchBox
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Customer List */}
      <FlatList
        data={filteredCustomers}
        keyExtractor={(item) => item.ID.toString()}
        contentContainerStyle={
          CustomersData.length === 0
            ? styles.emptyContainer
            : styles.listContainer
        }
        showsVerticalScrollIndicator={false}
        // Jab customer list empty hogi to ye UI show hoga
        ListEmptyComponent={
          <View style={styles.emptyContent}>
            <View
              style={[
                styles.emptyIcon,
                { backgroundColor: theme.inputBackground },
              ]}
            >
              <Ionicons
                name="people-outline"
                size={52}
                color={theme.primary}
              />
            </View>

            <Text
              style={[
                styles.emptyTitle,
                { color: theme.text },
              ]}
            >
              No Customers Found
            </Text>

            <Text
              style={[
                styles.emptyText,
                { color: theme.secondaryText },
              ]}
            >
              Add a customer to get started.
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <Pressable
            style={[
              styles.card,
              {
                backgroundColor: theme.card,
                borderColor: theme.border,
              },
            ]}
            onPress={() => {
              router.push({
                pathname: "/CustomerDetail",
                params: {
                  id: item.ID.toString(),
                },
              });
            }}
          >
            {/* Customer Initial */}
            <View
              style={[
                styles.iconContainer,
                { backgroundColor: theme.primary },
              ]}
            >
              <Text
                style={[
                  styles.iconText,
                  { color: theme.white },
                ]}
              >
                {item.NAME?.charAt(0).toUpperCase()}
              </Text>
            </View>

            {/* Customer Information */}
            <View style={styles.customerInfo}>
              <Text
                style={[
                  styles.name,
                  { color: theme.text },
                ]}
              >
                {item.NAME}
              </Text>

              <Text
                style={[
                  styles.phone,
                  { color: theme.secondaryText },
                ]}
              >
                {item.PHONE}
              </Text>

              <Text
                style={[
                  styles.address,
                  { color: theme.secondaryText },
                ]}
              >
                {item.ADDRESS}
              </Text>
            </View>
            <View style={styles.actions}>
              {/* DELETE */}
              <Pressable
                style={[
                  styles.actionButton,
                  { backgroundColor: theme.background },
                ]}
                onPress={() => {
                  setDeleteId(item.ID)
                  setShowAlert(true);

                }}
      >
                <Ionicons
                  name="trash-outline"
                  color={theme.primary}
                  size={19}
                />
              </Pressable>

              {/* EDIT */}
              <Pressable
                style={[
                  styles.actionButton,
                  { backgroundColor: theme.background },
                ]}
                onPress={() => {
                setEditAlert(true);
                setEditId(item.ID);
                }}
              >
                <Ionicons
                  name="create-outline"
                  color={theme.primary}
                  size={19}
                />
              </Pressable>
            </View>
          </Pressable>
        )}

      />
      <CustomAlert
        visible={showAlert}
        title="Delete Customer"
        Message="Are you sure you want to delete customer permanently?"
        onCancel={() => setShowAlert(false)}
        onConfirm={async () => {
          if (deleteId !== null) {
            await HandleDeletedCustomer(deleteId);
          }

          setShowAlert(false);
          setDeleteId(null);
        }}
      />
      {/* ya jo hai edit ka lia hai */}
<CustomAlert
visible={showEditAlert}
title="Edit CustomerInformation"
Message="Are You sure you want to edit Information"
onCancel={()=>{setEditAlert(false)}}
onConfirm={() => {
  const customer = CustomersData.find(
    (item) => item.ID === editId
  );

  if (customer) {
    router.push({
      pathname: "/AddCustomers",
      params: {
        ID: customer.ID.toString(),
        NAME: customer.NAME,
        PHONE: customer.PHONE,
        ADDRESS: customer.ADDRESS,
      },
    });
  }

  setEditAlert(false);
  setEditId(null);
}}
   

/>

      {/* Add Customer Floating Button */}
      <FloatingButton
        onPress={() => {
          router.push("/AddCustomers");
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // Main screen
  container: {
    flex: 1,
  },

  // Search box
  searchContainer: {
    marginHorizontal: 12,
    marginTop: 8,
    marginBottom: 8,
  },

  // Normal customer list
  listContainer: {
    paddingHorizontal: 12,
    paddingTop: 2,
    paddingBottom: 100,
  },

  // Empty list container
  emptyContainer: {
    flexGrow: 1,
    paddingHorizontal: 12,
  },

  // Empty state content
  emptyContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 25,
  },

  // Empty state icon background
  emptyIcon: {
    width: 90,
    height: 90,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },

  // Empty state heading
  emptyTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: 10,
  },

  // Empty state description
  emptyText: {
    fontSize: 14,
    marginTop: 6,
  },

  // Customer card
  card: {
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 13,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,

    elevation: 2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },

  // Customer initial circle
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  // Customer initial text
  iconText: {
    fontSize: 20,
    fontWeight: "700",
  },

  // Customer information
  customerInfo: {
    flex: 1,
    paddingRight: 8,
  },

  // Customer name
  name: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
  },

  // Customer phone
  phone: {
    fontSize: 13,
    marginBottom: 3,
  },

  // Customer address
  address: {
    fontSize: 13,
  },

  // Edit and delete buttons
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  // Action button
  actionButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: "center",
    alignItems: "center",
  },
});