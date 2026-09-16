import { Ionicons } from "@expo/vector-icons";
import { useCallback, useState } from "react";

import FloatingButton from "@/componenets/FloatingButton";
import { router, useFocusEffect } from "expo-router";

import {
  Alert,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import colors from "@/constents/colors";
import * as OrderFunctions from "../../databse/order";

export default function OrderList() {
  const [orders, setOrders] = useState<any[]>([]);
  const [selectedFilter, setSelectedFilter] = useState("All");

  const filters = [
    "All",
    "Pending",
    "In Progress",
    "Ready",
    "Delivered",
  ];

  useFocusEffect(
    useCallback(() => {
      loadOrder();
    }, [])
  );

  async function loadOrder() {
    try {
      const data = await OrderFunctions.getAllOrders();
      setOrders(data);
    } catch (error) {
      console.log("Failed to load orders:", error);
    }
  }

  function selectedStatus() {
    if (selectedFilter === "All") {
      return orders;
    }

    return orders.filter(
      (item) => item.ORDER_STAUS === selectedFilter
    );
  }

  const filteredOrders = selectedStatus();

  function getFilterCount(filter: string) {
    if (filter === "All") {
      return orders.length;
    }

    return orders.filter(
      (item) => item.ORDER_STAUS === filter
    ).length;
  }

  function handleDelete(orderId: number) {
    Alert.alert(
      "Delete Order",
      "Are you sure you want to delete this order?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await OrderFunctions.deleteOrder(orderId);
              loadOrder();
            } catch (error) {
              Alert.alert(
                "Error",
                "Order could not be deleted."
              );
            }
          },
        },
      ]
    );
  }

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
        },
      ]}
    >
      {/* HEADER */}

      <View style={styles.header}>
        <View>
          <Text
            style={[
              styles.title,
              { color: colors.text },
            ]}
          >
            Orders
          </Text>

          <Text
            style={[
              styles.subtitle,
              { color: colors.secondaryText },
            ]}
          >
            Manage your customer orders
          </Text>
        </View>

        <View
          style={[
            styles.totalBox,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
            },
          ]}
        >
          <Text
            style={[
              styles.totalNumber,
              { color: colors.text },
            ]}
          >
            {orders.length}
          </Text>

          <Text
            style={[
              styles.totalText,
              { color: colors.secondaryText },
            ]}
          >
            Total
          </Text>
        </View>
      </View>

      {/* FILTER TITLE */}

      <Text
        style={[
          styles.filterTitle,
          { color: colors.text },
        ]}
      >
        Order Status
      </Text>

      {/* FILTER BUTTONS */}

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterScroll}
        contentContainerStyle={styles.filterContainer}
      >
        {filters.map((filter) => (
          <Pressable
            key={filter}
            onPress={() => setSelectedFilter(filter)}
            style={[
              styles.filterButton,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
              },
            ]}
          >
            <Text
              style={[
                styles.filterText,
                { color: colors.text },
              ]}
            >
              {filter}
            </Text>

            <Text
              style={[
                styles.countText,
                { color: colors.primary },
              ]}
            >
              {getFilterCount(filter)}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* ORDERS LIST */}

      <FlatList
        data={filteredOrders}
        keyExtractor={(item) =>
          item.ORDER_ID.toString()
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Pressable
            style={[
              styles.card,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
                shadowColor: colors.text,
              },
            ]}
            onPress={() => {
              router.push({
                pathname: "/OrderDetaail",
                params: {
                  orderId: item.ORDER_ID.toString(),
                },
              });
            }}
          >
            {/* CARD HEADER */}

            <View style={styles.cardHeader}>
              <View style={styles.nameContainer}>
                <Text
                  style={[
                    styles.orderName,
                    { color: colors.text },
                  ]}
                >
                  {item.ORDER_NAME || "Unnamed Order"}
                </Text>

                <Text
                  style={[
                    styles.orderId,
                    { color: colors.secondaryText },
                  ]}
                >
                  Order #{item.ORDER_ID}
                </Text>
              </View>

              {/* DELETE */}

              <Pressable
                style={[
                  styles.deleteButton,
                  {
                    backgroundColor: colors.background,
                    borderColor: colors.border,
                  },
                ]}
                onPress={(event) => {
                  event.stopPropagation();
                  handleDelete(item.ORDER_ID);
                }}
              >
                <Ionicons
                  name="trash-outline"
                  size={19}
                  color={colors.danger}
                />
              </Pressable>
            </View>

            {/* STATUS + PRIORITY */}

            <View style={styles.badgesRow}>
              <View
                style={[
                  styles.statusBadge,
                  {
                    backgroundColor:
                      colors.inputBackground,
                    borderColor: colors.border,
                  },
                ]}
              >
                <View
                  style={[
                    styles.statusDot,
                    {
                      backgroundColor: colors.primary,
                    },
                  ]}
                />

                <Text
                  style={[
                    styles.statusText,
                    { color: colors.primary },
                  ]}
                >
                  {item.ORDER_STAUS}
                </Text>
              </View>

              <View
                style={[
                  styles.priorityBadge,
                  {
                    backgroundColor:
                      colors.inputBackground,
                    borderColor: colors.border,
                  },
                ]}
              >
                <Ionicons
                  name="flag-outline"
                  size={13}
                  color={colors.warning}
                />

                <Text
                  style={[
                    styles.priorityText,
                    { color: colors.warning },
                  ]}
                >
                  {item.ORDER_PIRIORITY} Priority
                </Text>
              </View>
            </View>

            {/* ORDER INFORMATION */}

            <View
              style={[
                styles.infoContainer,
                { borderTopColor: colors.border },
              ]}
            >
              <View style={styles.infoItem}>
                <Text
                  style={[
                    styles.infoLabel,
                    { color: colors.secondaryText },
                  ]}
                >
                  Quantity
                </Text>

                <Text
                  style={[
                    styles.infoValue,
                    { color: colors.text },
                  ]}
                >
                  {item.QUANTITY}
                </Text>
              </View>

              <View style={styles.infoItem}>
                <Text
                  style={[
                    styles.infoLabel,
                    { color: colors.secondaryText },
                  ]}
                >
                  Total
                </Text>

                <Text
                  style={[
                    styles.infoValue,
                    { color: colors.text },
                  ]}
                >
                  Rs. {item.ORDER_PAYMENT}
                </Text>
              </View>

              <View style={styles.infoItem}>
                <Text
                  style={[
                    styles.infoLabel,
                    { color: colors.secondaryText },
                  ]}
                >
                  Remaining
                </Text>

                <Text
                  style={[
                    styles.infoValue,
                    { color: colors.text },
                  ]}
                >
                  Rs. {item.ORDER_REMAINING}
                </Text>
              </View>
            </View>

            {/* DEPARTURE DATE */}

            <View
              style={[
                styles.departureContainer,
                { borderTopColor: colors.border },
              ]}
            >
              <View
                style={[
                  styles.departureIcon,
                  {
                    backgroundColor:
                      colors.inputBackground,
                  },
                ]}
              >
                <Ionicons
                  name="calendar-outline"
                  size={18}
                  color={colors.primary}
                />
              </View>

              <View>
                <Text
                  style={[
                    styles.dateLabel,
                    { color: colors.secondaryText },
                  ]}
                >
                  Departure Date
                </Text>

                <Text
                  style={[
                    styles.dateValue,
                    { color: colors.text },
                  ]}
                >
                  {item.ORDER_DEPARTURE_DATE}
                </Text>
              </View>
            </View>
          </Pressable>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <View
              style={[
                styles.emptyIcon,
                {
                  backgroundColor:
                    colors.inputBackground,
                },
              ]}
            >
              <Ionicons
                name="receipt-outline"
                size={52}
                color={colors.primary}
              />
            </View>

            <Text
              style={[
                styles.emptyTitle,
                { color: colors.text },
              ]}
            >
              No Orders Found
            </Text>

            <Text
              style={[
                styles.emptyText,
                { color: colors.secondaryText },
              ]}
            >
              Try another status.
            </Text>
          </View>
        }
      />

      {/* ADD ORDER */}

      <FloatingButton
        onPress={() => {
          router.push("/AddOrder");
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },

  title: {
    fontSize: 27,
    fontWeight: "700",
  },

  subtitle: {
    fontSize: 13,
    marginTop: 3,
  },

  totalBox: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    elevation: 2,
  },

  totalNumber: {
    fontSize: 20,
    fontWeight: "700",
  },

  totalText: {
    fontSize: 10,
    marginTop: 1,
  },

  filterTitle: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 10,
  },

  filterScroll: {
    flexGrow: 0,
  },

  filterContainer: {
    paddingBottom: 20,
    paddingRight: 10,
  },

  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 13,
    paddingVertical: 9,
    borderRadius: 10,
    marginRight: 10,
    borderWidth: 1,
  },

  filterText: {
    fontSize: 12,
    fontWeight: "600",
  },

  countText: {
    fontSize: 12,
    fontWeight: "700",
    marginLeft: 6,
  },

  list: {
    paddingTop: 5,
    paddingBottom: 30,
  },

  card: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    elevation: 3,
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  nameContainer: {
    flex: 1,
    paddingRight: 10,
  },

  orderName: {
    fontSize: 18,
    fontWeight: "700",
  },

  orderId: {
    fontSize: 11,
    marginTop: 3,
  },

  deleteButton: {
    width: 38,
    height: 38,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },

  badgesRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 14,
    gap: 8,
  },

  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 11,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
  },

  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    marginRight: 6,
  },

  statusText: {
    fontSize: 11,
    fontWeight: "600",
  },

  priorityBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 11,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
  },

  priorityText: {
    fontSize: 11,
    fontWeight: "600",
  },

  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 17,
    paddingTop: 14,
    borderTopWidth: 1,
  },

  infoItem: {
    flex: 1,
  },

  infoLabel: {
    fontSize: 10,
    marginBottom: 3,
  },

  infoValue: {
    fontSize: 13,
    fontWeight: "600",
  },

  departureContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    paddingTop: 13,
    borderTopWidth: 1,
  },

  departureIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  dateLabel: {
    fontSize: 10,
  },

  dateValue: {
    fontSize: 12,
    fontWeight: "600",
    marginTop: 3,
  },

  emptyContainer: {
    alignItems: "center",
    marginTop: 65,
    paddingHorizontal: 20,
  },

  emptyIcon: {
    width: 90,
    height: 90,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 8,
  },

  emptyText: {
    fontSize: 12,
    marginTop: 5,
  },
});