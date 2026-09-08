import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  getCustomerName,
  getTotalCustomers,
  Measurement_table,
} from "../../databse/table";

import colors from "@/constents/colors";

export default function Dashbord() {
  
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [Name, setName] = useState("");

  useEffect(() => {
    Measurement_table();

    const loadCustomers = async () => {
      const count = await getTotalCustomers();
      setTotalCustomers(count);
    };

    const LoadName = async () => {
      const username = await getCustomerName();
      setName(username || "");
    };

    loadCustomers();
    LoadName();
  }, []);

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: colors.background },
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
                { color: colors.secondaryText },
              ]}
            >
              Welcome back
            </Text>

            <Text
              style={[
                styles.userName,
                { color: colors.text },
              ]}
            >
              {Name || "Tailor"}
            </Text>
          </View>

          <View
            style={[
              styles.profileIcon,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
              },
            ]}
          >
            <Ionicons
              name="person-outline"
              size={22}
              color={colors.primary}
            />
          </View>
        </View>

        {/* WELCOME BANNER */}
        <View
          style={[
            styles.banner,
            { backgroundColor: colors.primary },
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
              source={require("../../assets/images/t2.jpg")}
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
                { color: colors.text },
              ]}
            >
              Overview
            </Text>

            <Text
              style={[
                styles.sectionSubTitle,
                { color: colors.secondaryText },
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
              { backgroundColor: colors.primary },
            ]}
            onPress={() => {
              router.push("/CustomerList");
            }}
          >
            <View style={styles.statTop}>
              <View
                style={[
                  styles.statIcon,
                  { backgroundColor: colors.card },
                ]}
              >
                <Ionicons
                  name="people-outline"
                  size={22}
                  color={colors.primary}
                />
              </View>

              <View style={styles.statArrow}>
                <Ionicons
                  name="chevron-forward"
                  size={15}
                  color="#FFFFFF"
                />
              </View>
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
              { backgroundColor: colors.primary },
            ]}
            onPress={() => {
              router.push("/AddOrder");
            }}
          >
            <View style={styles.statTop}>
              <View
                style={[
                  styles.statIcon,
                  { backgroundColor: colors.card },
                ]}
              >
                <Ionicons
                  name="receipt-outline"
                  size={22}
                  color={colors.primary}
                />
              </View>

              <View style={styles.statArrow}>
                <Ionicons
                  name="chevron-forward"
                  size={15}
                  color="#FFFFFF"
                />
              </View>
            </View>

            <Text style={styles.statNumber}>
              12
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
                { color: colors.text },
              ]}
            >
              Quick Actions
            </Text>

            <Text
              style={[
                styles.sectionSubTitle,
                { color: colors.secondaryText },
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
                backgroundColor: colors.card,
                borderColor: colors.border,
              },
            ]}
            onPress={() => {
              router.push("/AddCustomer");
            }}
          >
            <View style={styles.actionTop}>
              <View
                style={[
                  styles.actionIcon,
                  { backgroundColor: colors.background },
                ]}
              >
                <Ionicons
                  name="person-add-outline"
                  size={23}
                  color={colors.primary}
                />
              </View>

              <View
                style={[
                  styles.actionArrow,
                  { backgroundColor: colors.background },
                ]}
              >
                <Ionicons
                  name="arrow-forward-outline"
                  size={16}
                  color={colors.secondaryText}
                />
              </View>
            </View>

            <Text
              style={[
                styles.actionTitle,
                { color: colors.text },
              ]}
            >
              Add Customer
            </Text>

            <Text
              style={[
                styles.actionSubText,
                { color: colors.secondaryText },
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
                backgroundColor: colors.card,
                borderColor: colors.border,
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
                  { backgroundColor: colors.background },
                ]}
              >
                <Ionicons
                  name="add-circle-outline"
                  size={23}
                  color={colors.primary}
                />
              </View>

              <View
                style={[
                  styles.actionArrow,
                  { backgroundColor: colors.background },
                ]}
              >
                <Ionicons
                  name="arrow-forward-outline"
                  size={16}
                  color={colors.secondaryText}
                />
              </View>
            </View>

            <Text
              style={[
                styles.actionTitle,
                { color: colors.text },
              ]}
            >
              Add Order
            </Text>

            <Text
              style={[
                styles.actionSubText,
                { color: colors.secondaryText },
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
                backgroundColor: colors.card,
                borderColor: colors.border,
              },
            ]}
            onPress={() => {
              router.push("/AddMeasurement");
            }}
          >
            <View style={styles.actionTop}>
              <View
                style={[
                  styles.actionIcon,
                  { backgroundColor: colors.background },
                ]}
              >
                <Ionicons
                  name="body-outline"
                  size={23}
                  color={colors.primary}
                />
              </View>

              <View
                style={[
                  styles.actionArrow,
                  { backgroundColor: colors.background },
                ]}
              >
                <Ionicons
                  name="arrow-forward-outline"
                  size={16}
                  color={colors.secondaryText}
                />
              </View>
            </View>

            <Text
              style={[
                styles.actionTitle,
                { color: colors.text },
              ]}
            >
              Measurement
            </Text>

            <Text
              style={[
                styles.actionSubText,
                { color: colors.secondaryText },
              ]}
            >
              Add measurements
            </Text>
          </Pressable>

          {/* CUSTOMERS */}
          <Pressable
            style={[
              styles.actionCard,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
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
                  { backgroundColor: colors.background },
                ]}
              >
                <Ionicons
                  name="people-outline"
                  size={23}
                  color={colors.primary}
                />
              </View>

              <View
                style={[
                  styles.actionArrow,
                  { backgroundColor: colors.background },
                ]}
              >
                <Ionicons
                  name="arrow-forward-outline"
                  size={16}
                  color={colors.secondaryText}
                />
              </View>
            </View>

            <Text
              style={[
                styles.actionTitle,
                { color: colors.text },
              ]}
            >
              Customers
            </Text>

            <Text
              style={[
                styles.actionSubText,
                { color: colors.secondaryText },
              ]}
            >
              View all customers
            </Text>
          </Pressable>
        </View>

        {/* RECENT ORDERS */}
        <View style={styles.sectionHeader}>
          <View>
            <Text
              style={[
                styles.sectionTitle,
                { color: colors.text },
              ]}
            >
              Recent Orders
            </Text>

            <Text
              style={[
                styles.sectionSubTitle,
                { color: colors.secondaryText },
              ]}
            >
              Latest customer orders
            </Text>
          </View>

          <Pressable>
            <Text
              style={[
                styles.viewAll,
                { color: colors.primary },
              ]}
            >
              View all
            </Text>
          </Pressable>
        </View>

        {/* ORDER 1 */}
        <View
          style={[
            styles.orderCard,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
            },
          ]}
        >
          <View
            style={[
              styles.orderIcon,
              { backgroundColor: colors.background },
            ]}
          >
            <Ionicons
              name="shirt-outline"
              size={22}
              color={colors.primary}
            />
          </View>

          <View style={styles.orderInfo}>
            <Text
              style={[
                styles.orderName,
                { color: colors.text },
              ]}
            >
              Muhammad Ali
            </Text>

            <Text
              style={[
                styles.orderDetail,
                { color: colors.secondaryText },
              ]}
            >
              Shalwar Qameez • #1024
            </Text>
          </View>

          <View style={styles.pendingStatus}>
            <View
              style={[
                styles.statusDot,
                { backgroundColor: colors.warning },
              ]}
            />

            <Text
              style={[
                styles.statusText,
                { color: colors.warning },
              ]}
            >
              Pending
            </Text>
          </View>
        </View>

        {/* ORDER 2 */}
        <View
          style={[
            styles.orderCard,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
            },
          ]}
        >
          <View
            style={[
              styles.orderIcon,
              { backgroundColor: colors.background },
            ]}
          >
            <Ionicons
              name="shirt-outline"
              size={22}
              color={colors.primary}
            />
          </View>

          <View style={styles.orderInfo}>
            <Text
              style={[
                styles.orderName,
                { color: colors.text },
              ]}
            >
              Ahmed Raza
            </Text>

            <Text
              style={[
                styles.orderDetail,
                { color: colors.secondaryText },
              ]}
            >
              Pant • #1023
            </Text>
          </View>

          <View style={styles.readyStatus}>
            <View
              style={[
                styles.statusDot,
                { backgroundColor: colors.success },
              ]}
            />

            <Text
              style={[
                styles.statusText,
                { color: colors.success },
              ]}
            >
              Ready
            </Text>
          </View>
        </View>

        {/* LOGOUT */}
        <Pressable
          style={[
            styles.logoutButton,
            {
              backgroundColor: colors.card,
              borderColor: colors.danger,
            },
          ]}
          onPress={async () => {
            await AsyncStorage.removeItem("userId");
            router.replace("/SignIn");
          }}
        >
          <Ionicons
            name="log-out-outline"
            size={19}
            color={colors.danger}
          />

          <Text
            style={[
              styles.logoutText,
              { color: colors.danger },
            ]}
          >
            Logout
          </Text>
        </Pressable>
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
    paddingTop: 7,
    paddingBottom: 35,
  },

  /* HEADER */

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },

  headerText: {
    flex: 1,
  },

  smallText: {
    fontSize: 13,
  },

  userName: {
    fontSize: 26,
    fontWeight: "800",
    marginTop: 3,
  },

  profileIcon: {
    width: 46,
    height: 46,
    borderRadius: 14,
    justifyContent: "center",
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

  /* BANNER */

  banner: {
    height: 178,
    borderRadius: 20,
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
    paddingLeft: 18,
    paddingRight: 5,
    justifyContent: "center",
  },

  bannerSmall: {
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 1,
    color: "#FFFFFF",
    opacity: 0.75,
    marginBottom: 6,
  },

  bannerTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#FFFFFF",
    lineHeight: 28,
  },

  bannerSubtitle: {
    fontSize: 11,
    color: "#FFFFFF",
    opacity: 0.9,
    lineHeight: 16,
    marginTop: 9,
  },

  bannerImageContainer: {
    width: "42%",
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
    marginTop: 25,
    marginBottom: 11,
  },

  sectionTitle: {
    fontSize: 18,
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

  /* STATISTICS */

  statsRow: {
    flexDirection: "row",
    gap: 12,
  },

  statCard: {
    flex: 1,
    borderRadius: 18,
    padding: 15,
    minHeight: 153,

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
    width: 45,
    height: 45,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },

  statArrow: {
    width: 27,
    height: 27,
    borderRadius: 9,
    backgroundColor: "rgba(255,255,255,0.18)",
    justifyContent: "center",
    alignItems: "center",
  },

  statNumber: {
    fontSize: 29,
    fontWeight: "800",
    color: "#FFFFFF",
    marginTop: 13,
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
    marginTop: 3,
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
    marginBottom: 15,
  },

  actionIcon: {
    width: 47,
    height: 47,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },

  actionArrow: {
    width: 28,
    height: 28,
    borderRadius: 9,
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

  /* RECENT ORDERS */

  orderCard: {
    borderRadius: 16,
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
    borderRadius: 13,
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

  pendingStatus: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF5E8",
    paddingHorizontal: 9,
    paddingVertical: 7,
    borderRadius: 9,
  },

  readyStatus: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EAF7EF",
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
    borderRadius: 14,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginTop: 16,
    marginBottom: 10,
  },

  logoutText: {
    fontSize: 14,
    fontWeight: "700",
  },
});