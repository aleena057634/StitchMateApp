import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useContext, useEffect, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import {
  getCustomerName,
  getTotalCustomers,
  Measurement_table,
} from "../../../databse/table";
import { TotalOrders ,getUrgentOrders} from "../../../databse/order";
import ThemeContext from "../../context/ThemeContext";

export default function Dashbord() {
  const { theme } = useContext(ThemeContext);

  const [totalCustomers, setTotalCustomers] = useState(0);
  const [Name, setName] = useState("");
  const [TotalOrder, setTotalOrder] = useState(0);
  const [orders,setOrders]=useState<any[]>([]);

  const UrgentOrder = async () => {
  try {
    const data = await getUrgentOrders();
    setOrders(data);
  } catch (error) {
    console.log("Failed to load urgent orders:", error);
  }
};

useFocusEffect(
  useCallback(() => {
    UrgentOrder();
  }, [])
);
  const [animatedOrder, setAnimatedOrder] = useState(0);

  useEffect(() => {
    Measurement_table();

    const LoadName = async () => {
      const username = await getCustomerName();
      setName(username || "");
    };

    const loadCustomers = async () => {
      const count = await getTotalCustomers();
      setTotalCustomers(count);
    };

    const loadOrders = async () => {
      const count = await TotalOrders();

      setTotalOrder(count);

      if (count === 0) {
        setAnimatedOrder(0);
        return;
      }

      let current = 0;

      const interval = setInterval(() => {
        current++;

        setAnimatedOrder(current);

        if (current >= count) {
          clearInterval(interval);
        }
      }, 100);
    };

    loadCustomers();
    loadOrders();
    LoadName();
  }, []);

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: theme.background },
      ]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.headerText}>
            <Text
              style={[
                styles.smallText,
                { color: theme.secondaryText },
              ]}
            >
              Welcome back,
            </Text>

            <Text
              style={[
                styles.userName,
                { color: theme.text },
              ]}
            >
              {Name || "Tailor"}
            </Text>
          </View>

          <TouchableOpacity
            style={[
              styles.profileIcon,
              {
                backgroundColor: theme.card,
                borderColor: theme.border,
              },
            ]}
            onPress={() => {
              router.push("/Setting");
            }}
          >
            <Ionicons
              name="settings-outline"
              size={22}
              color={theme.primary}
            />
          </TouchableOpacity>
        </View>

        {/* WELCOME BANNER */}
        <View
          style={[
            styles.banner,
            { backgroundColor: theme.primary },
          ]}
        >
          <View style={styles.bannerText}>
            <Text style={styles.bannerSmall}>
              TAILOR MANAGEMENT
            </Text>

            <Text style={styles.bannerTitle}>
              Your Style,{"\n"}Your Stitch
            </Text>

            <Text style={styles.bannerSubtitle}>
              Manage customers, measurements
              {"\n"}and orders effortlessly.
            </Text>
          </View>

          <View style={styles.bannerImageContainer}>
            <Image
              source={require("../../../assets/images/t2.jpg")}
              style={styles.bannerImage}
              resizeMode="cover"
            />
          </View>
        </View>

        {/* OVERVIEW */}
        <View style={styles.sectionHeader}>
          <View>
            <Text
              style={[
                styles.sectionTitle,
                { color: theme.text },
              ]}
            >
              Overview
            </Text>

            <Text
              style={[
                styles.sectionSubTitle,
                { color: theme.secondaryText },
              ]}
            >
              Your business at a glance
            </Text>
          </View>
        </View>

        {/* STATISTICS */}
        <View style={styles.statsRow}>
          {/* CUSTOMERS */}
          <Pressable
            style={[
              styles.statCard,
              { backgroundColor: theme.primary },
            ]}
            onPress={() => {
              router.push("/CustomerList");
            }}
          >
            <View style={styles.statTop}>
              <View
                style={[
                  styles.statIcon,
                  { backgroundColor: theme.card },
                ]}
              >
                <Ionicons
                  name="people-outline"
                  size={21}
                  color={theme.primary}
                />
              </View>

              <Ionicons
                name="arrow-up-outline"
                size={18}
                color={theme.white}
              />
            </View>

            <Text style={styles.statNumber}>
              {totalCustomers}
            </Text>

            <Text style={styles.statTitle}>
              Customers
            </Text>

            <Text style={styles.statHint}>
              Total customers
            </Text>
          </Pressable>

          {/* ORDERS */}
          <Pressable
            style={[
              styles.statCard,
              { backgroundColor: theme.primary },
            ]}
            onPress={() => {
              router.push("/OrderList");
            }}
          >
            <View style={styles.statTop}>
              <View
                style={[
                  styles.statIcon,
                  { backgroundColor: theme.card },
                ]}
              >
                <Ionicons
                  name="receipt-outline"
                  size={21}
                  color={theme.primary}
                />
              </View>

              <Ionicons
                name="arrow-up-outline"
                size={18}
                color={theme.white}
              />
            </View>

            <Text style={styles.statNumber}>
              {animatedOrder}
            </Text>

            <Text style={styles.statTitle}>
              Orders
            </Text>

            <Text style={styles.statHint}>
              Total orders
            </Text>
          </Pressable>
        </View>

        {/* QUICK ACTIONS */}
        <View style={styles.sectionHeader}>
          <View>
            <Text
              style={[
                styles.sectionTitle,
                { color: theme.text },
              ]}
            >
              Quick Actions
            </Text>

            <Text
              style={[
                styles.sectionSubTitle,
                { color: theme.secondaryText },
              ]}
            >
              Common tasks
            </Text>
          </View>
        </View>

        {/* ACTION ROW 1 */}
        <View style={styles.actionRow}>
          {/* ADD CUSTOMER */}
          <Pressable
            style={[
              styles.actionCard,
              {
                backgroundColor: theme.card,
                borderColor: theme.border,
              },
            ]}
            onPress={() => {
              router.push("/AddCustomers");
            }}
          >
            <View style={styles.actionTop}>
              <View
                style={[
                  styles.actionIcon,
                  { backgroundColor: theme.background },
                ]}
              >
                <Ionicons
                  name="person-add-outline"
                  size={22}
                  color={theme.primary}
                />
              </View>

              <Ionicons
                name="arrow-forward-outline"
                size={18}
                color={theme.secondaryText}
              />
            </View>

            <Text
              style={[
                styles.actionTitle,
                { color: theme.text },
              ]}
            >
              Add Customer
            </Text>

            <Text
              style={[
                styles.actionSubText,
                { color: theme.secondaryText },
              ]}
            >
              Create new customer
            </Text>
          </Pressable>

          {/* ADD ORDER */}
          <Pressable
            style={[
              styles.actionCard,
              {
                backgroundColor: theme.card,
                borderColor: theme.border,
              },
            ]}
            onPress={() => {
              router.push("/AddOrder");
            }}
          >
            <View style={styles.actionTop}>
              <View
                style={[
                  styles.actionIcon,
                  { backgroundColor: theme.background },
                ]}
              >
                <Ionicons
                  name="add-circle-outline"
                  size={22}
                  color={theme.primary}
                />
              </View>

              <Ionicons
                name="arrow-forward-outline"
                size={18}
                color={theme.secondaryText}
              />
            </View>

            <Text
              style={[
                styles.actionTitle,
                { color: theme.text },
              ]}
            >
              Add Order
            </Text>

            <Text
              style={[
                styles.actionSubText,
                { color: theme.secondaryText },
              ]}
            >
              Create new order
            </Text>
          </Pressable>
        </View>

        {/* ACTION ROW 2 */}
        <View style={styles.actionRow}>
          {/* MEASUREMENT */}
          <Pressable
            style={[
              styles.actionCard,
              {
                backgroundColor: theme.card,
                borderColor: theme.border,
              },
            ]}
            onPress={() => {
              router.push("/Payment");
            }}
          >
            <View style={styles.actionTop}>
              <View
                style={[
                  styles.actionIcon,
                  { backgroundColor: theme.background },
                ]}
              >
                <Ionicons
                  name="book-outline"
                  size={22}
                  color={theme.primary}
                />
              </View>

              <Ionicons
                name="arrow-forward-outline"
                size={18}
                color={theme.secondaryText}
              />
            </View>

            <Text
              style={[
                styles.actionTitle,
                { color: theme.text },
              ]}
            >
             Payment
            </Text>

            <Text
              style={[
                styles.actionSubText,
                { color: theme.secondaryText },
              ]}
            >
             See Payment history
            </Text>
          </Pressable>

          {/* CUSTOMERS */}
          <Pressable
            style={[
              styles.actionCard,
              {
                backgroundColor: theme.card,
                borderColor: theme.border,
              },
            ]}
            onPress={() => {
              router.push("/CustomerList");
            }}
          >
            <View style={styles.actionTop}>
              <View
                style={[
                  styles.actionIcon,
                  { backgroundColor: theme.background },
                ]}
              >
                <Ionicons
                  name="people-outline"
                  size={22}
                  color={theme.primary}
                />
              </View>

              <Ionicons
                name="arrow-forward-outline"
                size={18}
                color={theme.secondaryText}
              />
            </View>

            <Text
              style={[
                styles.actionTitle,
                { color: theme.text },
              ]}
            >
              Customers
            </Text>

            <Text
              style={[
                styles.actionSubText,
                { color: theme.secondaryText },
              ]}
            >
              View all customers
            </Text>
          </Pressable>
        </View>

        {/* URGENT ORDERS */}
<View style={styles.sectionHeader}>
  <View>
    <Text
      style={[
        styles.sectionTitle,
        { color: theme.text },
      ]}
    >
      Urgent Orders
    </Text>

    <Text
      style={[
        styles.sectionSubTitle,
        { color: theme.secondaryText },
      ]}
    >
      Orders that need attention
    </Text>
  </View>

  <Pressable
    onPress={() => {
      router.push("/OrderList");
    }}
  >
    <Text
      style={[
        styles.viewAll,
        { color: theme.primary },
      ]}
    >
      View all
    </Text>
  </Pressable>
</View>

{orders.length === 0 ? (
  <View
    style={[
      styles.orderCard,
      {
        backgroundColor: theme.card,
        borderColor: theme.border,
      },
    ]}
  >
    <Text
      style={[
        styles.orderDetail,
        {
          color: theme.secondaryText,
          textAlign: "center",
          flex: 1,
        },
      ]}
    >
      No urgent orders
    </Text>
  </View>
) : (
  orders.map((order) => (
    <Pressable
      key={order.ORDER_ID}
      style={[
        styles.orderCard,
        {
          backgroundColor: theme.card,
          borderColor: theme.border,
        },
      ]}
      onPress={() => {
        router.push({
          pathname: "/OrderDetaail",
          params: {
            ORDER_ID: order.ORDER_ID,
          },
        });
      }}
    >
      <View
        style={[
          styles.orderIcon,
          { backgroundColor: theme.background },
        ]}
      >
        <Ionicons
          name="shirt-outline"
          size={21}
          color={theme.primary}
        />
      </View>

      <View style={styles.orderInfo}>
        <Text
          style={[
            styles.orderName,
            { color: theme.text },
          ]}
        >
          {order.NAME || "Customer"}
        </Text>

        <Text
          style={[
            styles.orderDetail,
            { color: theme.secondaryText },
          ]}
        >
          {order.ORDER_NAME || "Order"} • #{order.ORDER_ID}
        </Text>
      </View>

      <View
        style={[
          styles.statusBox,
          { backgroundColor: theme.background },
        ]}
      >
        <View
          style={[
            styles.statusDot,
            { backgroundColor: theme.danger },
          ]}
        />

        <Text
          style={[
            styles.statusText,
            { color: theme.danger },
          ]}
        >
          Urgent
        </Text>
      </View>
    </Pressable>
  ))
)}

        
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  scrollContainer: {
    paddingHorizontal: 18,
    paddingTop: 10,
    paddingBottom: 35,
  },

  /* HEADER */
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  headerText: {
    flex: 1,
  },

  smallText: {
    fontSize: 13,
    fontWeight: "500",
  },

  userName: {
    fontSize: 27,
    fontWeight: "800",
    marginTop: 2,
  },

  profileIcon: {
    width: 45,
    height: 45,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },

  /* BANNER */
  banner: {
    height: 180,
    borderRadius: 22,
    flexDirection: "row",
    overflow: "hidden",
    elevation: 4,
    shadowOpacity: 0.12,
    shadowRadius: 7,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },

  bannerText: {
    flex: 1,
    paddingLeft: 19,
    paddingRight: 5,
    justifyContent: "center",
  },

  bannerSmall: {
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 1.2,
    color: "#FFFFFF",
    opacity: 0.75,
    marginBottom: 7,
  },

  bannerTitle: {
    fontSize: 23,
    fontWeight: "800",
    color: "#FFFFFF",
    lineHeight: 29,
  },

  bannerSubtitle: {
    fontSize: 11,
    color: "#FFFFFF",
    opacity: 0.85,
    lineHeight: 16,
    marginTop: 9,
  },

  bannerImageContainer: {
    width: "41%",
    height: "100%",
  },

  bannerImage: {
    width: "100%",
    height: "100%",
  },

  /* SECTION */
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginTop: 27,
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: "800",
  },

  sectionSubTitle: {
    fontSize: 11,
    marginTop: 3,
  },

  viewAll: {
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 2,
  },

  /* STAT CARDS */
  statsRow: {
    flexDirection: "row",
    gap: 12,
  },

  statCard: {
    flex: 1,
    borderRadius: 19,
    padding: 16,
    minHeight: 155,
    elevation: 3,
    shadowOpacity: 0.12,
    shadowRadius: 6,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  statTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  statIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },

  statNumber: {
    fontSize: 30,
    fontWeight: "800",
    color: "#FFFFFF",
    marginTop: 14,
  },

  statTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFFFFF",
    marginTop: 1,
  },

  statHint: {
    fontSize: 10,
    color: "#FFFFFF",
    opacity: 0.7,
    marginTop: 4,
  },

  /* QUICK ACTIONS */
  actionRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 12,
  },

  actionCard: {
    flex: 1,
    borderRadius: 18,
    padding: 15,
    minHeight: 145,
    borderWidth: 1,
    elevation: 2,
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  actionTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },

  actionIcon: {
    width: 46,
    height: 46,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },

  actionTitle: {
    fontSize: 15,
    fontWeight: "700",
  },

  actionSubText: {
    fontSize: 11,
    marginTop: 5,
    lineHeight: 16,
  },

  /* ORDERS */
  orderCard: {
    borderRadius: 17,
    padding: 13,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    elevation: 2,
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  orderIcon: {
    width: 46,
    height: 46,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },

  orderInfo: {
    flex: 1,
    marginLeft: 11,
  },

  orderName: {
    fontSize: 14,
    fontWeight: "700",
  },

  orderDetail: {
    fontSize: 11,
    marginTop: 4,
  },

  statusBox: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 9,
    paddingVertical: 7,
    borderRadius: 9,
  },

  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 5,
  },

  statusText: {
    fontSize: 10,
    fontWeight: "700",
  },

  /* LOGOUT */
  logoutButton: {
    height: 50,
    borderWidth: 1,
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginTop: 17,
    marginBottom: 10,
  },

  logoutText: {
    fontSize: 14,
    fontWeight: "700",
  },
});