
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import {
  Mark,
  Order_detail,
  Partial_Payment,
  updateOrderStatus,
} from "../../databse/order";

import CustomAlert, { ConfirmAlert } from "../componenets/CustomAlert";
import ThemeContext from "../context/ThemeContext";

export default function OrderDetail() {
  const { orderId } = useLocalSearchParams();

  const { theme } = useContext(ThemeContext);

  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [partialAmount, setPartialAmount] = useState("");

  const [ShowAlert, setShowAlert] = useState(false);
  const [PartialAlert, setPartialAlert] = useState(false);
  const [InvalidAmountAlert, setInvalidAmountAlert] = useState(false);
  const [markPaidlId, setMarkPaidId] = useState<number | null>(null);
  const [markAlert, setMarkAlert] = useState(false);
  const [MarkPaidAlert, setMarkPaidAlert] = useState(false);
  const [partialConfirmAlert, setPartialConfirmAlert] =
    useState(false);
  const [paymentAmount, setPaymentAmount] = useState(0);

  const onPartialConfirm = async () => {
    await Partial_Payment(
      Number(orderId),
      paymentAmount
    );

    setPartialAmount("");
    setPartialConfirmAlert(false);

    await loadOrderDetail();
  };

  const onConfirm = async () => {
    await Mark(Number(orderId));
    await loadOrderDetail();
    router.replace("/Payment");
  };

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

  const handleStatusChange = async (status: string) => {
    if (order.ORDER_STAUS === status) {
      return;
    }

    try {
      const updated = await updateOrderStatus(
        Number(orderId),
        status
      );

      if (updated) {
        setOrder({
          ...order,
          ORDER_STAUS: status,
        });
      }
    } catch (error) {
      console.log("Failed to update status:", error);
    }
  };

  const styles = createStyles(theme);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator
          size="large"
          color={theme.primary}
        />

        <Text style={styles.loadingText}>
          Loading order details...
        </Text>
      </View>
    );
  }

  if (!order) {
    return (
      <View style={styles.emptyContainer}>
        <View style={styles.emptyIcon}>
          <Ionicons
            name="receipt-outline"
            size={55}
            color={theme.primary}
          />
        </View>

        <Text style={styles.emptyTitle}>
          Order Not Found
        </Text>

        <Text style={styles.emptyText}>
          This order could not be found.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.content}
    >
      <View style={styles.header}>
        <View style={styles.headerInfo}>
          <Text style={styles.title}>
            Order Details
          </Text>

          <Text style={styles.subtitle}>
            Order #{order.ORDER_ID}
          </Text>
        </View>

        <View style={styles.orderIcon}>
          <Ionicons
            name="receipt-outline"
            size={25}
            color={theme.primary}
          />
        </View>
      </View>

      <View style={styles.mainCard}>
        <View style={styles.orderTop}>
          <View style={styles.orderNameContainer}>
            <Text style={styles.orderName}>
              {order.ORDER_NAME || "Unnamed Order"}
            </Text>

            <Text style={styles.orderNumber}>
              Order #{order.ORDER_ID}
            </Text>
          </View>

          <View style={styles.statusBadge}>
            <View style={styles.statusDot} />

            <Text style={styles.statusText}>
              {order.ORDER_STAUS}
            </Text>
          </View>
        </View>

        <View style={styles.priorityBadge}>
          <Ionicons
            name="flag-outline"
            size={15}
            color={theme.warning}
          />

          <Text style={styles.priorityText}>
            {order.ORDER_PIRIORITY} Priority
          </Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>
        Order Status
      </Text>

      <View style={styles.statusCard}>
        <View style={styles.currentStatusBox}>
          <View style={styles.currentStatusIcon}>
            <Ionicons
              name="checkmark-circle"
              size={24}
              color={theme.primary}
            />
          </View>

          <View style={styles.currentStatusInfo}>
            <Text style={styles.currentStatusLabel}>
              Current Status
            </Text>

            <Text style={styles.currentStatusValue}>
              {order.ORDER_STAUS}
            </Text>
          </View>
        </View>

        <Text style={styles.statusHeading}>
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
                style={[
                  styles.statusButton,
                  isActive && styles.activeStatusButton,
                ]}
                onPress={() => handleStatusChange(status)}
              >
                <Text
                  style={[
                    styles.statusButtonText,
                    isActive && styles.activeStatusButtonText,
                  ]}
                >
                  {status}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      <Text style={styles.sectionTitle}>
        Payment Details
      </Text>

      <View style={styles.paymentCard}>
        <View style={styles.paymentItem}>
          <Text style={styles.paymentLabel}>
            Total
          </Text>

          <Text style={styles.paymentValue}>
            Rs. {order.ORDER_PAYMENT}
          </Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.paymentItem}>
          <Text style={styles.paymentLabel}>
            Advance
          </Text>

          <Text style={styles.paymentValue}>
            Rs. {order.ORDER_ADVANCEPAYMENT}
          </Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.paymentItem}>
          <Text style={styles.paymentLabel}>
            Remaining
          </Text>

          <Text style={styles.remainingValue}>
            Rs. {order.ORDER_REMAINING}
          </Text>
        </View>

        <View style={styles.paymentActions}>
          <Text style={styles.actionTitle}>
            Payment Action
          </Text>

          <Pressable
            style={styles.paidButton}
            onPress={() => {
              if (Number(order.ORDER_REMAINING) <= 0) {
                setShowAlert(true);
                return;
              }

              setMarkPaidAlert(true);
            }}
          >
            <Ionicons
              name="checkmark-circle-outline"
              size={19}
              color={theme.white}
            />

            <Text style={styles.paidButtonText}>
              Mark as Paid
            </Text>
          </Pressable>

          <View style={styles.partialBox}>
            <Text style={styles.partialTitle}>
              Partial Payment
            </Text>

            <TextInput
              value={partialAmount}
              onChangeText={setPartialAmount}
              placeholder="Enter amount"
              placeholderTextColor={theme.placeholder}
              keyboardType="numeric"
              style={styles.amountInput}
            />

            <Pressable
              style={styles.partialButton}
              onPress={() => {
                const amount = Number(partialAmount);

                if (amount <= 0) {
                  setInvalidAmountAlert(true);
                  return;
                }

                if (
                  amount >
                  Number(order.ORDER_REMAINING)
                ) {
                  setPartialAlert(true);
                  return;
                }

                setPaymentAmount(amount);
                setPartialConfirmAlert(true);
              }}
            >
              <Text style={styles.partialButtonText}>
                Add Payment
              </Text>
            </Pressable>
          </View>
        </View>
      </View>

      <Text style={styles.sectionTitle}>
        Order Information
      </Text>

      <View style={styles.infoCard}>
        <View style={styles.infoRow}>
          <View style={styles.infoIcon}>
            <Ionicons
              name="layers-outline"
              size={18}
              color={theme.primary}
            />
          </View>

          <View>
            <Text style={styles.infoLabel}>
              Quantity
            </Text>

            <Text style={styles.infoValue}>
              {order.QUANTITY}
            </Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.infoIcon}>
            <Ionicons
              name="calendar-outline"
              size={18}
              color={theme.primary}
            />
          </View>

          <View>
            <Text style={styles.infoLabel}>
              Arrival Date
            </Text>

            <Text style={styles.infoValue}>
              {order.ORDER_ARRIVAL_DATE}
            </Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.infoIcon}>
            <Ionicons
              name="calendar-outline"
              size={18}
              color={theme.primary}
            />
          </View>

          <View>
            <Text style={styles.infoLabel}>
              Departure Date
            </Text>

            <Text style={styles.infoValue}>
              {order.ORDER_DEPARTURE_DATE}
            </Text>
          </View>
        </View>
      </View>

      <Text style={styles.sectionTitle}>
        Related Information
      </Text>

      <View style={styles.infoCard}>
        <View style={styles.infoRow}>
          <View style={styles.infoIcon}>
            <Ionicons
              name="person-outline"
              size={18}
              color={theme.primary}
            />
          </View>

          <View>
            <Text style={styles.infoLabel}>
              Customer ID
            </Text>

            <Text style={styles.infoValue}>
              {order.CUSTOMER_ID}
            </Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.infoIcon}>
            <Ionicons
              name="resize-outline"
              size={18}
              color={theme.primary}
            />
          </View>

          <View style={styles.measurementInfo}>
            <Text style={styles.infoLabel}>
              Measurement
            </Text>

            <Text style={styles.infoValue}>
              Measurement #{order.MEASUREMENT_ID}
            </Text>
          </View>

          <Pressable
            style={styles.viewButton}
            onPress={() => {
              router.push({
                pathname: "/MeasurementList",
                params: {
                  id: String(order.CUSTOMER_ID),
                },
              });
            }}
          >
            <Text style={styles.viewButtonText}>
              View
            </Text>

            <Ionicons
              name="chevron-forward"
              size={16}
              color={theme.primary}
            />
          </Pressable>
        </View>
      </View>

      {order.NOTES ? (
        <>
          <Text style={styles.sectionTitle}>
            Notes
          </Text>

          <View style={styles.notesCard}>
            <Ionicons
              name="document-text-outline"
              size={20}
              color={theme.primary}
            />

            <Text style={styles.notesText}>
              {order.NOTES}
            </Text>
          </View>
        </>
      ) : null}

      <ConfirmAlert
        visible={ShowAlert}
        title="Mark as Paid"
        Message="Amount Already Paid"
        onConfirm={() => {
          setShowAlert(false);
        }}
      />

      <ConfirmAlert
        visible={InvalidAmountAlert}
        title="Invalid Amount"
        Message="Please enter a valid amount."
        onConfirm={() => {
          setInvalidAmountAlert(false);
        }}
      />

      <ConfirmAlert
        visible={PartialAlert}
        title="Invalid Amount"
        Message="Amount cannot be greater than remaining."
        onConfirm={() => {
          setPartialAlert(false);
        }}
      />

      <CustomAlert
        visible={MarkPaidAlert}
        title="Mark as Paid"
        Message={`Pay remaining Rs. ${order.ORDER_REMAINING}?`}
        onCancel={() => {
          setMarkPaidAlert(false);
        }}
        onConfirm={() => {
          onConfirm();
        }}
      />

      <CustomAlert
        visible={partialConfirmAlert}
        title="Partial Payment"
        Message={`Pay Rs. ${paymentAmount}?`}
        onCancel={() => {
          setPartialConfirmAlert(false);
        }}
        onConfirm={onPartialConfirm}
      />
    </ScrollView>
  );
}

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      marginBottom:30
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
      color: theme.text,
    },

    subtitle: {
      fontSize: 13,
      marginTop: 3,
      color: theme.secondaryText,
    },

    orderIcon: {
      width: 48,
      height: 48,
      borderRadius: 14,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      backgroundColor: theme.inputBackground,
      borderColor: theme.border,
    },

    mainCard: {
      borderRadius: 18,
      padding: 17,
      borderWidth: 1,
      backgroundColor: theme.card,
      borderColor: theme.border,
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
      color: theme.text,
    },

    orderNumber: {
      fontSize: 11,
      marginTop: 4,
      color: theme.secondaryText,
    },

    statusBadge: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 10,
      paddingVertical: 7,
      borderRadius: 20,
      backgroundColor: theme.inputBackground,
    },

    statusDot: {
      width: 7,
      height: 7,
      borderRadius: 4,
      marginRight: 6,
      backgroundColor: theme.primary,
    },

    statusText: {
      fontSize: 11,
      fontWeight: "600",
      color: theme.primary,
    },

    priorityBadge: {
      flexDirection: "row",
      alignItems: "center",
      alignSelf: "flex-start",
      paddingHorizontal: 10,
      paddingVertical: 7,
      borderRadius: 20,
      marginTop: 13,
      backgroundColor: theme.inputBackground,
    },

    priorityText: {
      fontSize: 11,
      fontWeight: "600",
      marginLeft: 5,
      color: theme.warning,
    },

    sectionTitle: {
      fontSize: 15,
      fontWeight: "700",
      marginTop: 20,
      marginBottom: 10,
      color: theme.text,
    },

    statusCard: {
      borderRadius: 16,
      padding: 15,
      borderWidth: 1,
      backgroundColor: theme.card,
      borderColor: theme.border,
    },

    currentStatusBox: {
      flexDirection: "row",
      alignItems: "center",
      borderRadius: 13,
      padding: 12,
      marginBottom: 17,
      backgroundColor: theme.inputBackground,
    },

    currentStatusIcon: {
      width: 40,
      height: 40,
      borderRadius: 12,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 11,
      backgroundColor: theme.card,
    },

    currentStatusInfo: {
      flex: 1,
    },

    currentStatusLabel: {
      fontSize: 11,
      marginBottom: 3,
      color: theme.secondaryText,
    },

    currentStatusValue: {
      fontSize: 16,
      fontWeight: "700",
      color: theme.primary,
    },

    statusHeading: {
      fontSize: 12,
      fontWeight: "600",
      marginBottom: 10,
      color: theme.secondaryText,
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
      backgroundColor: theme.inputBackground,
      borderColor: theme.border,
    },

    activeStatusButton: {
      backgroundColor: theme.primary,
      borderColor: theme.primary,
    },

    statusButtonText: {
      fontSize: 12,
      fontWeight: "600",
      color: theme.secondaryText,
    },

    activeStatusButtonText: {
      color: theme.white,
    },

    paymentCard: {
      borderRadius: 16,
      padding: 16,
      borderWidth: 1,
      backgroundColor: theme.card,
      borderColor: theme.border,
    },

    paymentItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 5,
    },

    paymentLabel: {
      fontSize: 12,
      color: theme.secondaryText,
    },

    paymentValue: {
      fontSize: 14,
      fontWeight: "600",
      color: theme.text,
    },

    remainingValue: {
      fontSize: 14,
      fontWeight: "700",
      color: theme.warning,
    },

    divider: {
      height: 1,
      marginVertical: 8,
      backgroundColor: theme.border,
    },

    paymentActions: {
      marginTop: 18,
    },

    actionTitle: {
      fontSize: 14,
      fontWeight: "700",
      marginBottom: 10,
      color: theme.text,
    },

    paidButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 12,
      borderRadius: 11,
      backgroundColor: theme.primary,
    },

    paidButtonText: {
      fontSize: 13,
      fontWeight: "700",
      marginLeft: 7,
      color: theme.white,
    },

    partialBox: {
      marginTop: 12,
      padding: 13,
      borderRadius: 12,
      borderWidth: 1,
      backgroundColor: theme.inputBackground,
      borderColor: theme.border,
    },

    partialTitle: {
      fontSize: 13,
      fontWeight: "700",
      marginBottom: 8,
      color: theme.text,
    },

    amountInput: {
      height: 45,
      borderWidth: 1,
      borderRadius: 9,
      paddingHorizontal: 12,
      fontSize: 13,
      backgroundColor: theme.card,
      borderColor: theme.border,
      color: theme.text,
    },

    partialButton: {
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 11,
      borderRadius: 9,
      marginTop: 9,
      backgroundColor: theme.accent,
    },

    partialButtonText: {
      fontSize: 12,
      fontWeight: "700",
      color: theme.white,
    },

    infoCard: {
      borderRadius: 16,
      padding: 15,
      borderWidth: 1,
      backgroundColor: theme.card,
      borderColor: theme.border,
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
      backgroundColor: theme.inputBackground,
    },

    infoLabel: {
      fontSize: 10,
      marginBottom: 3,
      color: theme.secondaryText,
    },

    infoValue: {
      fontSize: 13,
      fontWeight: "600",
      color: theme.text,
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
      backgroundColor: theme.inputBackground,
    },

    viewButtonText: {
      fontSize: 12,
      fontWeight: "600",
      marginRight: 2,
      color: theme.primary,
    },

    notesCard: {
      flexDirection: "row",
      borderRadius: 16,
      padding: 15,
      borderWidth: 1,
      backgroundColor: theme.card,
      borderColor: theme.border,
    },

    notesText: {
      flex: 1,
      fontSize: 13,
      lineHeight: 20,
      marginLeft: 10,
      color: theme.secondaryText,
    },

    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.background,
    },

    loadingText: {
      fontSize: 13,
      marginTop: 10,
      color: theme.secondaryText,
    },

    emptyContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 25,
      backgroundColor: theme.background,
    },

    emptyIcon: {
      width: 90,
      height: 90,
      borderRadius: 28,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.inputBackground,
    },

    emptyTitle: {
      fontSize: 18,
      fontWeight: "700",
      marginTop: 12,
      color: theme.text,
    },

    emptyText: {
      fontSize: 12,
      marginTop: 5,
      color: theme.secondaryText,
    },
  });
