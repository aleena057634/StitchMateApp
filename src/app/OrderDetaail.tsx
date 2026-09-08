import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  Order_detail,
  updateOrderStatus,
} from "../../databse/order";

import colors from "@/constents/colors";

export default function OrderDetail() {


  const { orderId } = useLocalSearchParams();

  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  async function loadOrderDetail() {
    try {
      setLoading(true);

      const data = await Order_detail(Number(orderId));

      setOrder(data);
    } catch (error) {
      console.log("Failed to load order detail:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadOrderDetail();
  }, [orderId]);

  // UPDATE ORDER STATUS
  const handleStatusChange = async (status: string) => {
    // Agar same status dobara press kare to kuch nahi hoga
    if (order.ORDER_STAUS === status) {
      return;
    }

    try {
      setUpdatingStatus(true);

      const updated = await updateOrderStatus(
        Number(orderId),
        status
      );

      if (updated) {
        // Screen par new status foran show hoga
        setOrder((prev: any) => ({
          ...prev,
          ORDER_STAUS: status,
        }));

        Alert.alert(
          "Status Updated",
          `Order status has been changed to "${status}".`
        );
      } else {
        Alert.alert(
          "Update Failed",
          "Order status could not be updated."
        );
      }
    } catch (error) {
      console.log("Failed to update status:", error);

      Alert.alert(
        "Error",
        "Something went wrong while updating the order status."
      );
    } finally {
      setUpdatingStatus(false);
    }
  };

  // ================= LOADING =================

  if (loading) {
    return (
      <View
        style={[
          styles.loadingContainer,
          { backgroundColor: colors.background },
        ]}
      >
        <ActivityIndicator
          size="large"
          color={colors.primary}
        />

        <Text
          style={[
            styles.loadingText,
            { color: colors.secondaryText },
          ]}
        >
          Loading order details...
        </Text>
      </View>
    );
  }

  // ================= ORDER NOT FOUND =================

  if (!order) {
    return (
      <View
        style={[
          styles.emptyContainer,
          { backgroundColor: colors.background },
        ]}
      >
        <View
          style={[
            styles.emptyIcon,
            { backgroundColor: colors.inputBackground },
          ]}
        >
          <Ionicons
            name="receipt-outline"
            size={55}
            color={colors.primary}
          />
        </View>

        <Text
          style={[
            styles.emptyTitle,
            { color: colors.text },
          ]}
        >
          Order Not Found
        </Text>

        <Text
          style={[
            styles.emptyText,
            { color: colors.secondaryText },
          ]}
        >
          This order could not be found.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.content}
    >
      {/* ================= HEADER ================= */}

      <View style={styles.header}>
        <View style={styles.headerInfo}>
          <Text
            style={[
              styles.title,
              { color: colors.text },
            ]}
          >
            Order Details
          </Text>

          <Text
            style={[
              styles.subtitle,
              { color: colors.secondaryText },
            ]}
          >
            Order #{order.ORDER_ID}
          </Text>
        </View>

        <View
          style={[
            styles.orderIcon,
            {
              backgroundColor: colors.inputBackground,
              borderColor: colors.border,
            },
          ]}
        >
          <Ionicons
            name="receipt-outline"
            size={25}
            color={colors.primary}
          />
        </View>
      </View>

      {/* ================= ORDER CARD ================= */}

      <View
        style={[
          styles.mainCard,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
          },
        ]}
      >
        <View style={styles.orderTop}>
          <View style={styles.orderNameContainer}>
            <Text
              style={[
                styles.orderName,
                { color: colors.text },
              ]}
            >
              {order.ORDER_NAME || "Unnamed Order"}
            </Text>

            <Text
              style={[
                styles.orderNumber,
                { color: colors.secondaryText },
              ]}
            >
              Order #{order.ORDER_ID}
            </Text>
          </View>

          <View
            style={[
              styles.statusBadge,
              { backgroundColor: colors.inputBackground },
            ]}
          >
            <View
              style={[
                styles.statusDot,
                { backgroundColor: colors.primary },
              ]}
            />

            <Text
              style={[
                styles.statusText,
                { color: colors.primary },
              ]}
            >
              {order.ORDER_STAUS}
            </Text>
          </View>
        </View>

        {/* PRIORITY */}

        <View
          style={[
            styles.priorityBadge,
            { backgroundColor: colors.inputBackground },
          ]}
        >
          <Ionicons
            name="flag-outline"
            size={15}
            color={colors.warning}
          />

          <Text
            style={[
              styles.priorityText,
              { color: colors.warning },
            ]}
          >
            {order.ORDER_PIRIORITY} Priority
          </Text>
        </View>
      </View>

      {/* ================= STATUS ================= */}

      <Text
        style={[
          styles.sectionTitle,
          { color: colors.text },
        ]}
      >
        Order Status
      </Text>

      <View
        style={[
          styles.statusCard,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
          },
        ]}
      >
        {/* CURRENT STATUS */}

        <View
          style={[
            styles.currentStatusBox,
            { backgroundColor: colors.inputBackground },
          ]}
        >
          <View
            style={[
              styles.currentStatusIcon,
              { backgroundColor: colors.card },
            ]}
          >
            <Ionicons
              name="checkmark-circle"
              size={24}
              color={colors.primary}
            />
          </View>

          <View style={styles.currentStatusInfo}>
            <Text
              style={[
                styles.currentStatusLabel,
                { color: colors.secondaryText },
              ]}
            >
              Current Status
            </Text>

            <Text
              style={[
                styles.currentStatusValue,
                { color: colors.primary },
              ]}
            >
              {order.ORDER_STAUS}
            </Text>
          </View>
        </View>

        <Text
          style={[
            styles.statusHeading,
            { color: colors.secondaryText },
          ]}
        >
          Change Order Status
        </Text>

        <View style={styles.statusButtons}>
          {[
            "Pending",
            "In Progress",
            "Ready",
            "Delivered",
          ].map((status) => {
            const isActive = order.ORDER_STAUS === status;

            return (
              <Pressable
                key={status}
                disabled={updatingStatus}
                style={[
                  styles.statusButton,
                  {
                    backgroundColor:
                      colors.inputBackground,
                    borderColor: colors.border,
                  },
                  isActive && {
                    backgroundColor: colors.primary,
                    borderColor: colors.primary,
                  },
                  updatingStatus &&
                    styles.disabledStatusButton,
                ]}
                onPress={() => handleStatusChange(status)}
              >
                <View style={styles.statusButtonContent}>
                  {isActive && (
                    <Ionicons
                      name="checkmark-circle"
                      size={16}
                      color={colors.white}
                    />
                  )}

                  <Text
                    style={[
                      styles.statusButtonText,
                      { color: colors.secondaryText },
                      isActive && {
                        color: colors.white,
                      },
                    ]}
                  >
                    {status}
                  </Text>
                </View>
              </Pressable>
            );
          })}
        </View>

        {updatingStatus && (
          <View
            style={[
              styles.updatingBox,
              { borderTopColor: colors.border },
            ]}
          >
            <ActivityIndicator
              size="small"
              color={colors.primary}
            />

            <Text
              style={[
                styles.updatingText,
                { color: colors.secondaryText },
              ]}
            >
              Updating order status...
            </Text>
          </View>
        )}
      </View>

      {/* ================= PAYMENT ================= */}

      <Text
        style={[
          styles.sectionTitle,
          { color: colors.text },
        ]}
      >
        Payment Details
      </Text>

      <View
        style={[
          styles.paymentCard,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
          },
        ]}
      >
        <View style={styles.paymentItem}>
          <Text
            style={[
              styles.paymentLabel,
              { color: colors.secondaryText },
            ]}
          >
            Total
          </Text>

          <Text
            style={[
              styles.paymentValue,
              { color: colors.text },
            ]}
          >
            Rs. {order.ORDER_PAYMENT}
          </Text>
        </View>

        <View
          style={[
            styles.divider,
            { backgroundColor: colors.border },
          ]}
        />

        <View style={styles.paymentItem}>
          <Text
            style={[
              styles.paymentLabel,
              { color: colors.secondaryText },
            ]}
          >
            Advance
          </Text>

          <Text
            style={[
              styles.paymentValue,
              { color: colors.text },
            ]}
          >
            Rs. {order.ORDER_ADVANCEPAYMENT}
          </Text>
        </View>

        <View
          style={[
            styles.divider,
            { backgroundColor: colors.border },
          ]}
        />

        <View style={styles.paymentItem}>
          <Text
            style={[
              styles.paymentLabel,
              { color: colors.secondaryText },
            ]}
          >
            Remaining
          </Text>

          <Text
            style={[
              styles.remainingValue,
              { color: colors.warning },
            ]}
          >
            Rs. {order.ORDER_REMAINING}
          </Text>
        </View>
      </View>

      {/* ================= ORDER INFORMATION ================= */}

      <Text
        style={[
          styles.sectionTitle,
          { color: colors.text },
        ]}
      >
        Order Information
      </Text>

      <View
        style={[
          styles.infoCard,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
          },
        ]}
      >
        <View style={styles.infoRow}>
          <View
            style={[
              styles.infoIcon,
              { backgroundColor: colors.inputBackground },
            ]}
          >
            <Ionicons
              name="layers-outline"
              size={18}
              color={colors.primary}
            />
          </View>

          <View>
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
              {order.QUANTITY}
            </Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <View
            style={[
              styles.infoIcon,
              { backgroundColor: colors.inputBackground },
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
                styles.infoLabel,
                { color: colors.secondaryText },
              ]}
            >
              Arrival Date
            </Text>

            <Text
              style={[
                styles.infoValue,
                { color: colors.text },
              ]}
            >
              {order.ORDER_ARRIVAL_DATE}
            </Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <View
            style={[
              styles.infoIcon,
              { backgroundColor: colors.inputBackground },
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
                styles.infoLabel,
                { color: colors.secondaryText },
              ]}
            >
              Departure Date
            </Text>

            <Text
              style={[
                styles.infoValue,
                { color: colors.text },
              ]}
            >
              {order.ORDER_DEPARTURE_DATE}
            </Text>
          </View>
        </View>
      </View>

      {/* ================= RELATED INFORMATION ================= */}

      <Text
        style={[
          styles.sectionTitle,
          { color: colors.text },
        ]}
      >
        Related Information
      </Text>

      <View
        style={[
          styles.infoCard,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
          },
        ]}
      >
        <View style={styles.infoRow}>
          <View
            style={[
              styles.infoIcon,
              { backgroundColor: colors.inputBackground },
            ]}
          >
            <Ionicons
              name="person-outline"
              size={18}
              color={colors.primary}
            />
          </View>

          <View>
            <Text
              style={[
                styles.infoLabel,
                { color: colors.secondaryText },
              ]}
            >
              Customer ID
            </Text>

            <Text
              style={[
                styles.infoValue,
                { color: colors.text },
              ]}
            >
              {order.CUSTOMER_ID}
            </Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <View
            style={[
              styles.infoIcon,
              { backgroundColor: colors.inputBackground },
            ]}
          >
            <Ionicons
              name="resize-outline"
              size={18}
              color={colors.primary}
            />
          </View>

          <View style={styles.measurementInfo}>
            <Text
              style={[
                styles.infoLabel,
                { color: colors.secondaryText },
              ]}
            >
              Measurement
            </Text>

            <Text
              style={[
                styles.infoValue,
                { color: colors.text },
              ]}
            >
              Measurement #{order.MEASUREMENT_ID}
            </Text>
          </View>

          {/* MEASUREMENT BUTTON */}

          <Pressable
            style={[
              styles.viewButton,
              { backgroundColor: colors.inputBackground },
            ]}
            onPress={() => {
              router.push({
                pathname: "/MeasurementList",
                params: {
                  id: String(order.CUSTOMER_ID),
                },
              });
            }}
          >
            <Text
              style={[
                styles.viewButtonText,
                { color: colors.primary },
              ]}
            >
              View
            </Text>

            <Ionicons
              name="chevron-forward"
              size={16}
              color={colors.primary}
            />
          </Pressable>
        </View>
      </View>

      {/* ================= NOTES ================= */}

      {order.NOTES ? (
        <>
          <Text
            style={[
              styles.sectionTitle,
              { color: colors.text },
            ]}
          >
            Notes
          </Text>

          <View
            style={[
              styles.notesCard,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
              },
            ]}
          >
            <Ionicons
              name="document-text-outline"
              size={20}
              color={colors.primary}
            />

            <Text
              style={[
                styles.notesText,
                { color: colors.secondaryText },
              ]}
            >
              {order.NOTES}
            </Text>
          </View>
        </>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    padding: 16,
    paddingBottom: 35,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },

  headerInfo: {
    flex: 1,
  },

  title: {
    fontSize: 27,
    fontWeight: "700",
  },

  subtitle: {
    fontSize: 13,
    marginTop: 3,
  },

  orderIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },

  mainCard: {
    borderRadius: 18,
    padding: 17,
    borderWidth: 1,

    elevation: 3,
    shadowOpacity: 0.06,
    shadowRadius: 7,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  orderTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  orderNameContainer: {
    flex: 1,
    marginRight: 10,
  },

  orderName: {
    fontSize: 20,
    fontWeight: "700",
  },

  orderNumber: {
    fontSize: 11,
    marginTop: 4,
  },

  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 20,
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
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 20,
    marginTop: 13,
  },

  priorityText: {
    fontSize: 11,
    fontWeight: "600",
    marginLeft: 5,
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    marginTop: 20,
    marginBottom: 10,
  },

  /* STATUS */

  statusCard: {
    borderRadius: 16,
    padding: 15,
    borderWidth: 1,
  },

  currentStatusBox: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 13,
    padding: 12,
    marginBottom: 17,
  },

  currentStatusIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 11,
  },

  currentStatusInfo: {
    flex: 1,
  },

  currentStatusLabel: {
    fontSize: 11,
    marginBottom: 3,
  },

  currentStatusValue: {
    fontSize: 16,
    fontWeight: "700",
  },

  statusHeading: {
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 10,
  },

  statusButtons: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  statusButton: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
  },

  disabledStatusButton: {
    opacity: 0.6,
  },

  statusButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  statusButtonText: {
    fontSize: 12,
    fontWeight: "600",
  },

  updatingBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: 1,
  },

  updatingText: {
    fontSize: 12,
    marginLeft: 8,
  },

  /* PAYMENT */

  paymentCard: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
  },

  paymentItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
  },

  paymentLabel: {
    fontSize: 12,
  },

  paymentValue: {
    fontSize: 14,
    fontWeight: "600",
  },

  remainingValue: {
    fontSize: 14,
    fontWeight: "700",
  },

  divider: {
    height: 1,
    marginVertical: 8,
  },

  /* INFORMATION */

  infoCard: {
    borderRadius: 16,
    padding: 15,
    borderWidth: 1,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },

  infoIcon: {
    width: 38,
    height: 38,
    borderRadius: 11,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 11,
  },

  infoLabel: {
    fontSize: 10,
    marginBottom: 3,
  },

  infoValue: {
    fontSize: 13,
    fontWeight: "600",
  },

  measurementInfo: {
    flex: 1,
  },

  viewButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 9,
  },

  viewButtonText: {
    fontSize: 12,
    fontWeight: "600",
    marginRight: 2,
  },

  /* NOTES */

  notesCard: {
    flexDirection: "row",
    borderRadius: 16,
    padding: 15,
    borderWidth: 1,
  },

  notesText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 20,
    marginLeft: 10,
  },

  /* LOADING */

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    fontSize: 13,
    marginTop: 10,
  },

  /* EMPTY */

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 25,
  },

  emptyIcon: {
    width: 90,
    height: 90,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 12,
  },

  emptyText: {
    fontSize: 12,
    marginTop: 5,
  },
});