import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import colors from "@/constents/colors";
import { getCustomers } from "../../databse/CustomerCru";

export default function CustomerScreen() {
  const { id } = useLocalSearchParams();
  const [customer, setCustomer] = useState<any>(null);

  // Load selected customer
  useEffect(() => {
    loadCustomer();
  }, [id]);


async function loadCustomer() {
  try {
    const customers = await getCustomers();

    const customer = customers.find(
      (item: any) => item.ID == id
    );
    setCustomer(customer);

  } catch (error) {
    console.log("Failed to load customer:", error);
  }
}

return (
  <View style={styles.container}>

    <View style={styles.pageHeader}>
      <View>
        <Text style={styles.title}>
          Customer Details
        </Text>

        <Text style={styles.subtitle}>
          Customer information & services
        </Text>
      </View>

      <View style={styles.headerIcon}>
        <Ionicons
          name="person-outline"
          size={23}
          color={colors.primary}
        />
      </View>
    </View>

   {customer && (
  <View style={styles.customerCard}>

    <View style={styles.profileSection}>

      <View style={styles.customerIcon}>
        <Ionicons
          name="person"
          size={28}
          color={colors.primary}
        />
      </View>

      <View style={styles.customerInfo}>
        <Text style={styles.name}>
          {customer.NAME}
        </Text>

        <View style={styles.customerIdBox}>
          <Text style={styles.customerId}>
            Customer #{customer.ID}
          </Text>
        </View>
      </View>

    </View>

    <View style={styles.detailsContainer}>

      <View style={styles.detailRow}>
        <View style={styles.detailIcon}>
          <Ionicons
            name="call-outline"
            size={17}
            color={colors.primary}
          />
        </View>

        <View style={styles.detailContent}>
          <Text style={styles.detailLabel}>
            Phone
          </Text>

          <Text style={styles.detailValue}>
            {customer.PHONE || "No phone number"}
          </Text>
        </View>
      </View>

      <View style={styles.detailRow}>
        <View style={styles.detailIcon}>
          <Ionicons
            name="location-outline"
            size={17}
            color={colors.primary}
          />
        </View>

        <View style={styles.detailContent}>
          <Text style={styles.detailLabel}>
            Address
          </Text>

          <Text style={styles.detailValue}>
            {customer.ADDRESS || "No address"}
          </Text>
        </View>
      </View>

    </View>

  </View>
)}

    <View style={styles.sectionHeader}>
      <View>
        <Text style={styles.sectionTitle}>
          Customer Services
        </Text>

        <Text style={styles.sectionSubtitle}>
          Manage customer information
        </Text>
      </View>
    </View>

    <View style={styles.row}>

      <TouchableOpacity
        style={styles.serviceCard}
        onPress={() => {}}
        activeOpacity={0.8}
      >
        <View style={styles.serviceTop}>

          <View style={styles.iconCircle}>
            <Ionicons
              name="card-outline"
              size={25}
              color={colors.primary}
            />
          </View>

          <View style={styles.arrowCircle}>
            <Ionicons
              name="chevron-forward"
              size={16}
              color={colors.secondaryText}
            />
          </View>

        </View>

        <Text style={styles.serviceTitle}>
          Payment
        </Text>

        <Text style={styles.serviceSubtitle}>
          Manage payments
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.serviceCard}
        onPress={() => {
          router.push("/OrderList");
        }}
        activeOpacity={0.8}
      >
        <View style={styles.serviceTop}>

          <View style={styles.iconCircle}>
            <Ionicons
              name="receipt-outline"
              size={25}
              color={colors.primary}
            />
          </View>

          <View style={styles.arrowCircle}>
            <Ionicons
              name="chevron-forward"
              size={16}
              color={colors.secondaryText}
            />
          </View>

        </View>

        <Text style={styles.serviceTitle}>
          Orders
        </Text>

        <Text style={styles.serviceSubtitle}>
          Manage customer orders
        </Text>
      </TouchableOpacity>

    </View>
{/* yaha ma na id pass kr rai hoo meaasuement screen ma customer ki  */}
    <TouchableOpacity
      style={styles.measurementCard}
      onPress={() => {
        router.push({
          pathname: "/MeasurementList",
          params: {
            id: customer?.ID?.toString(),
          },
        });
      }}
      activeOpacity={0.8}
    >
      <View style={styles.measurementIcon}>
        <Ionicons
          name="body-outline"
          size={27}
          color={colors.primary}
        />
      </View>

      <View style={styles.measurementContent}>
        <Text style={styles.serviceTitle}>
          Measurement
        </Text>

        <Text style={styles.serviceSubtitle}>
          View or add customer measurements
        </Text>
      </View>

      <View style={styles.measurementArrow}>
        <Ionicons
          name="chevron-forward"
          size={19}
          color={colors.primary}
        />
      </View>

    </TouchableOpacity>

  </View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
  },

  /* PAGE HEADER */

  pageHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },

  title: {
    fontSize: 25,
    fontWeight: "700",
  },

  subtitle: {
    fontSize: 12,
    marginTop: 4,
  },

  headerIcon: {
    width: 46,
    height: 46,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },

  /* CUSTOMER CARD */

  customerCard: {
    borderRadius: 20,
    padding: 17,
    borderWidth: 1,

    elevation: 3,
    shadowOpacity: 0.07,
    shadowRadius: 7,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  profileSection: {
    flexDirection: "row",
    alignItems: "center",
  },

  customerIcon: {
    width: 62,
    height: 62,
    borderRadius: 31,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  customerInfo: {
    flex: 1,
  },

  name: {
    fontSize: 21,
    fontWeight: "700",
    marginBottom: 6,
  },

  customerIdBox: {
    alignSelf: "flex-start",
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 7,
  },

  customerId: {
    fontSize: 10,
    fontWeight: "600",
  },

  detailsContainer: {
    marginTop: 17,
    paddingTop: 15,
    borderTopWidth: 1,
  },

  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  detailIcon: {
    width: 34,
    height: 34,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  detailContent: {
    flex: 1,
  },

  detailLabel: {
    fontSize: 10,
    marginBottom: 2,
  },

  detailValue: {
    fontSize: 13,
    fontWeight: "500",
  },

  /* NOT FOUND */

  notFoundCard: {
    borderRadius: 18,
    padding: 30,
    alignItems: "center",
    borderWidth: 1,
  },

  notFound: {
    fontSize: 14,
    marginTop: 10,
  },

  /* SECTION */

  sectionHeader: {
    marginTop: 24,
    marginBottom: 11,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
  },

  sectionSubtitle: {
    fontSize: 11,
    marginTop: 3,
  },

  /* SERVICE CARDS */

  row: {
    flexDirection: "row",
    gap: 12,
  },

  serviceCard: {
    flex: 1,
    minHeight: 145,
    padding: 15,
    borderRadius: 18,
    borderWidth: 1,

    elevation: 2,
    shadowOpacity: 0.06,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  serviceTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 13,
  },

  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },

  arrowCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },

  serviceTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
  },

  serviceSubtitle: {
    fontSize: 12,
    lineHeight: 17,
  },

  /* MEASUREMENT */

  measurementCard: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 92,
    marginTop: 12,
    padding: 15,
    borderRadius: 18,
    borderWidth: 1,

    elevation: 2,
    shadowOpacity: 0.06,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  measurementIcon: {
    width: 53,
    height: 53,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 13,
  },

  measurementContent: {
    flex: 1,
  },

  measurementArrow: {
    width: 34,
    height: 34,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});