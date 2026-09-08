import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import colors from "@/constents/colors";
import { getCustomers } from "../../databse/CustomerCru";
import { getMeasurements } from "../../databse/MeasuremenrCruc";
import { addOrder } from "../../databse/order";
export default function OrderScreen() {
  

  const [orderName, setOrderName] = useState("");
  const [quantity, setQuantity] = useState("");

  const [customers, setCustomers] = useState<any[]>([]);
  const [customerOpen, setCustomerOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);

  const [measurements, setMeasurements] = useState<any[]>([]);
  const [measurementOpen, setMeasurementOpen] = useState(false);
  const [selectedMeasurement, setSelectedMeasurement] =
    useState<any>(null);

  const [arrivalDate, setArrivalDate] = useState(new Date());
  const [departureDate, setDepartureDate] = useState(new Date());

  const [showArrivalCalendar, setShowArrivalCalendar] =
    useState(false);

  const [showDepartureCalendar, setShowDepartureCalendar] =
    useState(false);

  const [statusOpen, setStatusOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");

  const [priorityOpen, setPriorityOpen] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState("");

  const statuses = [
    "Pending",
    "In Progress",
    "Ready",
    "Delivered",
    "Cancelled",
  ];

  const priorities = [
    "Low",
    "Normal",
    "High",
    "Urgent",
  ];

  // PAYMENT STATES
  const [totalPayment, setTotalPayment] = useState("");
  const [advancePayment, setAdvancePayment] = useState("");

  const remainingPayment =
    (Number(totalPayment) || 0) -
    (Number(advancePayment) || 0);

  const [notes, setNotes] = useState("");

  useEffect(() => {
    loadCustomers();
  }, []);

  async function loadCustomers() {
    try {
      const data = await getCustomers();
      setCustomers(data);
    } catch (error) {
      console.log("Failed to load customers:", error);
    }
  }

  // Load Measurement
  async function loadMeasurements(customerId: number) {
    try {
      const data = await getMeasurements(customerId);
      setMeasurements(data);
    } catch (error) {
      console.log(
        "Failed to load customer measurements:",
        error
      );
    }
  }

  // CUSTOMER SELECT
  function handleCustomerSelect(customer: any) {
    setSelectedCustomer(customer);
    setCustomerOpen(false);

    // Purani measurement remove
    setSelectedMeasurement(null);

    // Selected customer ki measurements load
    loadMeasurements(Number(customer.ID));
  }

  // CREATE ORDER
  async function handleCreateOrder() {
    // Customer validation
    if (!selectedCustomer) {
      Alert.alert("Required", "Please select a customer.");
      return;
    }

    // Measurement validation
    if (!selectedMeasurement) {
      Alert.alert("Required", "Please select a measurement.");
      return;
    }

    // Quantity validation
    if (!quantity || Number(quantity) <= 0) {
      Alert.alert("Required", "Please enter a valid quantity.");
      return;
    }

    // Status validation
    if (!selectedStatus) {
      Alert.alert("Required", "Please select order status.");
      return;
    }

    // Priority validation
    if (!selectedPriority) {
      Alert.alert("Required", "Please select order priority.");
      return;
    }

    // Payment validation
    if (!totalPayment || Number(totalPayment) < 0) {
      Alert.alert("Required", "Please enter total payment.");
      return;
    }

    if (Number(advancePayment) > Number(totalPayment)) {
      Alert.alert(
        "Invalid Payment",
        "Advance payment cannot be greater than total payment."
      );
      return;
    }

    try {
      await addOrder(
        orderName,
        Number(quantity),
        selectedStatus,
        selectedPriority,
        arrivalDate.toISOString().split("T")[0],
        departureDate.toISOString().split("T")[0],
        Number(totalPayment),
        Number(advancePayment) || 0,
        remainingPayment,
        Number(selectedCustomer.ID),
        Number(selectedMeasurement.mEASUREMENT_ID),
        notes
      );

      Alert.alert(
        "Success",
        "Order added successfully."
      );

      router.replace("/OrderList");

      // Form clear
      setOrderName("");
      setQuantity("");
      setSelectedCustomer(null);
      setSelectedMeasurement(null);
      setMeasurements([]);
      setSelectedStatus("");
      setSelectedPriority("");
      setTotalPayment("");
      setAdvancePayment("");
      setNotes("");
    } catch (error) {
      console.log("Failed to create order:", error);

      Alert.alert(
        "Error",
        "Order could not be created."
      );
    }
  }

  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={true}
    >
      {/* HEADER */}
      <View style={styles.header}>
        <Text
          style={[
            styles.title,
            { color: colors.text },
          ]}
        >
          Create Order
        </Text>

        <Text
          style={[
            styles.subtitle,
            { color: colors.secondaryText },
          ]}
        >
          Enter order details
        </Text>
      </View>

      {/* CUSTOMER */}
      <View
        style={[
          styles.card,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
          },
        ]}
      >
        <Text
          style={[
            styles.sectionTitle,
            { color: colors.text },
          ]}
        >
          Customer
        </Text>

        <Text
          style={[
            styles.label,
            { color: colors.text },
          ]}
        >
          Select Customer
        </Text>

        <Pressable
          style={[
            styles.dropdown,
            {
              backgroundColor: colors.inputBackground,
              borderColor: colors.border,
            },
          ]}
          onPress={() => {
            setCustomerOpen(!customerOpen);

            setMeasurementOpen(false);
            setStatusOpen(false);
            setPriorityOpen(false);
          }}
        >
          <Ionicons
            name="person-outline"
            size={20}
            color={colors.primary}
          />

          <Text
            style={[
              styles.dropdownText,
              {
                color: selectedCustomer
                  ? colors.text
                  : colors.placeholder,
              },
            ]}
          >
            {selectedCustomer?.NAME ||
              "Select customer"}
          </Text>

          <Ionicons
            name={
              customerOpen
                ? "chevron-up"
                : "chevron-down"
            }
            size={20}
            color={colors.primary}
          />
        </Pressable>

        {customerOpen && (
          <View
            style={[
              styles.dropdownList,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
              },
            ]}
          >
            {customers.length === 0 ? (
              <Text
                style={[
                  styles.noOption,
                  { color: colors.secondaryText },
                ]}
              >
                No customers found
              </Text>
            ) : (
              customers.map((customer) => (
                <Pressable
                  key={customer.ID}
                  style={[
                    styles.option,
                    { borderBottomColor: colors.border },
                  ]}
                  onPress={() =>
                    handleCustomerSelect(customer)
                  }
                >
                  <Text
                    style={[
                      styles.optionText,
                      { color: colors.text },
                    ]}
                  >
                    {customer.NAME}
                  </Text>

                  {customer.PHONE && (
                    <Text
                      style={[
                        styles.optionSubText,
                        { color: colors.secondaryText },
                      ]}
                    >
                      {customer.PHONE}
                    </Text>
                  )}
                </Pressable>
              ))
            )}
          </View>
        )}
      </View>

      {/* ORDER DETAILS */}
      <View
        style={[
          styles.card,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
          },
        ]}
      >
        <Text
          style={[
            styles.sectionTitle,
            { color: colors.text },
          ]}
        >
          Order Details
        </Text>

        {/* ORDER NAME */}
        <Text
          style={[
            styles.label,
            { color: colors.text },
          ]}
        >
          Order Name
        </Text>

        <View
          style={[
            styles.inputContainer,
            {
              backgroundColor: colors.inputBackground,
              borderColor: colors.border,
            },
          ]}
        >
          <Ionicons
            name="document-text-outline"
            size={20}
            color={colors.secondaryText}
          />

          <TextInput
            style={[
              styles.input,
              { color: colors.text },
            ]}
            placeholder="Enter order name"
            placeholderTextColor={colors.placeholder}
            value={orderName}
            onChangeText={setOrderName}
          />
        </View>

        {/* QUANTITY */}
        <Text
          style={[
            styles.label,
            { color: colors.text },
          ]}
        >
          Quantity
        </Text>

        <View
          style={[
            styles.inputContainer,
            {
              backgroundColor: colors.inputBackground,
              borderColor: colors.border,
            },
          ]}
        >
          <Ionicons
            name="layers-outline"
            size={20}
            color={colors.primary}
          />

          <TextInput
            style={[
              styles.input,
              { color: colors.text },
            ]}
            placeholder="Enter quantity"
            placeholderTextColor={colors.placeholder}
            keyboardType="numeric"
            value={quantity}
            onChangeText={setQuantity}
          />
        </View>

        {/* ARRIVAL DATE */}
        <Text
          style={[
            styles.label,
            { color: colors.text },
          ]}
        >
          Arrival Date
        </Text>

        <Pressable
          style={[
            styles.dateContainer,
            {
              backgroundColor: colors.inputBackground,
              borderColor: colors.border,
            },
          ]}
          onPress={() =>
            setShowArrivalCalendar(true)
          }
        >
          <Ionicons
            name="calendar-outline"
            size={20}
            color={colors.secondaryText}
          />

          <Text
            style={[
              styles.dateText,
              { color: colors.text },
            ]}
          >
            {arrivalDate.toLocaleDateString()}
          </Text>

          <Ionicons
            name="chevron-down"
            size={20}
            color={colors.secondaryText}
            style={styles.rightIcon}
          />
        </Pressable>

        {showArrivalCalendar && (
          <DateTimePicker
            value={arrivalDate}
            mode="date"
            onChange={(event, selectedDate) => {
              setShowArrivalCalendar(false);

              if (selectedDate) {
                setArrivalDate(selectedDate);
              }
            }}
          />
        )}

        {/* DEPARTURE DATE */}
        <Text
          style={[
            styles.label,
            { color: colors.text },
          ]}
        >
          Departure Date
        </Text>

        <Pressable
          style={[
            styles.dateContainer,
            {
              backgroundColor: colors.inputBackground,
              borderColor: colors.border,
            },
          ]}
          onPress={() =>
            setShowDepartureCalendar(true)
          }
        >
          <Ionicons
            name="calendar-outline"
            size={20}
            color={colors.secondaryText}
          />

          <Text
            style={[
              styles.dateText,
              { color: colors.text },
            ]}
          >
            {departureDate.toLocaleDateString()}
          </Text>

          <Ionicons
            name="chevron-down"
            size={20}
            color={colors.secondaryText}
            style={styles.rightIcon}
          />
        </Pressable>

        {showDepartureCalendar && (
          <DateTimePicker
            value={departureDate}
            mode="date"
            onChange={(event, selectedDate) => {
              setShowDepartureCalendar(false);

              if (selectedDate) {
                setDepartureDate(selectedDate);
              }
            }}
          />
        )}

        {/* STATUS */}
        <Text
          style={[
            styles.label,
            { color: colors.text },
          ]}
        >
          Status
        </Text>

        <Pressable
          style={[
            styles.dropdown,
            {
              backgroundColor: colors.inputBackground,
              borderColor: colors.border,
            },
          ]}
          onPress={() => {
            setStatusOpen(!statusOpen);

            setCustomerOpen(false);
            setMeasurementOpen(false);
            setPriorityOpen(false);
          }}
        >
          <Ionicons
            name="checkmark-circle-outline"
            size={20}
            color={colors.secondaryText}
          />

          <Text
            style={[
              styles.dropdownText,
              {
                color: selectedStatus
                  ? colors.text
                  : colors.placeholder,
              },
            ]}
          >
            {selectedStatus || "Select status"}
          </Text>

          <Ionicons
            name={
              statusOpen
                ? "chevron-up"
                : "chevron-down"
            }
            size={20}
            color={colors.primary}
          />
        </Pressable>

        {statusOpen && (
          <View
            style={[
              styles.dropdownList,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
              },
            ]}
          >
            {statuses.map((status) => (
              <Pressable
                key={status}
                style={[
                  styles.option,
                  { borderBottomColor: colors.border },
                ]}
                onPress={() => {
                  setSelectedStatus(status);
                  setStatusOpen(false);
                }}
              >
                <Text
                  style={[
                    styles.optionText,
                    { color: colors.text },
                  ]}
                >
                  {status}
                </Text>
              </Pressable>
            ))}
          </View>
        )}

        {/* PRIORITY */}
        <Text
          style={[
            styles.label,
            { color: colors.text },
          ]}
        >
          Priority
        </Text>

        <Pressable
          style={[
            styles.dropdown,
            {
              backgroundColor: colors.inputBackground,
              borderColor: colors.border,
            },
          ]}
          onPress={() => {
            setPriorityOpen(!priorityOpen);

            setCustomerOpen(false);
            setMeasurementOpen(false);
            setStatusOpen(false);
          }}
        >
          <Ionicons
            name="flag-outline"
            size={20}
            color={colors.secondaryText}
          />

          <Text
            style={[
              styles.dropdownText,
              {
                color: selectedPriority
                  ? colors.text
                  : colors.placeholder,
              },
            ]}
          >
            {selectedPriority || "Select priority"}
          </Text>

          <Ionicons
            name={
              priorityOpen
                ? "chevron-up"
                : "chevron-down"
            }
            size={20}
            color={colors.primary}
          />
        </Pressable>

        {priorityOpen && (
          <View
            style={[
              styles.dropdownList,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
              },
            ]}
          >
            {priorities.map((priority) => (
              <Pressable
                key={priority}
                style={[
                  styles.option,
                  { borderBottomColor: colors.border },
                ]}
                onPress={() => {
                  setSelectedPriority(priority);
                  setPriorityOpen(false);
                }}
              >
                <Text
                  style={[
                    styles.optionText,
                    { color: colors.text },
                  ]}
                >
                  {priority}
                </Text>
              </Pressable>
            ))}
          </View>
        )}
      </View>

      {/* MEASUREMENT */}
      <View
        style={[
          styles.card,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
          },
        ]}
      >
        <Text
          style={[
            styles.sectionTitle,
            { color: colors.text },
          ]}
        >
          Measurement
        </Text>

        <Text
          style={[
            styles.label,
            { color: colors.text },
          ]}
        >
          Select Measurement
        </Text>

        <Pressable
          style={[
            styles.dropdown,
            {
              backgroundColor: colors.inputBackground,
              borderColor: colors.border,
            },
          ]}
          onPress={() => {
            if (!selectedCustomer) {
              Alert.alert(
                "Select Customer",
                "Please select a customer first."
              );
              return;
            }

            setMeasurementOpen(!measurementOpen);

            setCustomerOpen(false);
            setStatusOpen(false);
            setPriorityOpen(false);
          }}
        >
          <Ionicons
            name="body-outline"
            size={20}
            color={colors.secondaryText}
          />

          <Text
            style={[
              styles.dropdownText,
              {
                color: selectedMeasurement
                  ? colors.text
                  : colors.placeholder,
              },
            ]}
          >
            {selectedMeasurement?.TYPE ||
              "Select customer measurement"}
          </Text>

          <Ionicons
            name={
              measurementOpen
                ? "chevron-up"
                : "chevron-down"
            }
            size={20}
            color={colors.primary}
          />
        </Pressable>

        {measurementOpen && (
          <View
            style={[
              styles.dropdownList,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
              },
            ]}
          >
            {measurements.length === 0 ? (
              <Text
                style={[
                  styles.noOption,
                  { color: colors.secondaryText },
                ]}
              >
                No measurements found for this customer
              </Text>
            ) : (
              measurements.map((item) => (
                <Pressable
                  key={item.mEASUREMENT_ID}
                  style={[
                    styles.option,
                    { borderBottomColor: colors.border },
                  ]}
                  onPress={() => {
                    setSelectedMeasurement(item);
                    setMeasurementOpen(false);
                  }}
                >
                  <Text
                    style={[
                      styles.optionText,
                      { color: colors.text },
                    ]}
                  >
                    {item.TYPE}
                  </Text>

                  <Text
                    style={[
                      styles.optionSubText,
                      { color: colors.secondaryText },
                    ]}
                  >
                    Measurement #
                    {item.mEASUREMENT_ID}
                  </Text>
                </Pressable>
              ))
            )}
          </View>
        )}
      </View>

      {/* PAYMENT */}
      <View
        style={[
          styles.card,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
          },
        ]}
      >
        <Text
          style={[
            styles.sectionTitle,
            { color: colors.text },
          ]}
        >
          Payment Details
        </Text>

        {/* TOTAL PAYMENT */}
        <Text
          style={[
            styles.label,
            { color: colors.text },
          ]}
        >
          Total Payment
        </Text>

        <View
          style={[
            styles.inputContainer,
            {
              backgroundColor: colors.inputBackground,
              borderColor: colors.border,
            },
          ]}
        >
          <Ionicons
            name="cash-outline"
            size={20}
            color={colors.secondaryText}
          />

          <TextInput
            style={[
              styles.input,
              { color: colors.text },
            ]}
            placeholder="Enter total payment"
            placeholderTextColor={colors.placeholder}
            keyboardType="numeric"
            value={totalPayment}
            onChangeText={setTotalPayment}
          />
        </View>

        {/* ADVANCE PAYMENT */}
        <Text
          style={[
            styles.label,
            { color: colors.text },
          ]}
        >
          Advance Payment
        </Text>

        <View
          style={[
            styles.inputContainer,
            {
              backgroundColor: colors.inputBackground,
              borderColor: colors.border,
            },
          ]}
        >
          <Ionicons
            name="wallet-outline"
            size={20}
            color={colors.secondaryText}
          />

          <TextInput
            style={[
              styles.input,
              { color: colors.text },
            ]}
            placeholder="Enter advance payment"
            placeholderTextColor={colors.placeholder}
            keyboardType="numeric"
            value={advancePayment}
            onChangeText={setAdvancePayment}
          />
        </View>

        {/* REMAINING */}
        <View
          style={[
            styles.remainingBox,
            { backgroundColor: colors.background },
          ]}
        >
          <Text
            style={[
              styles.remainingLabel,
              { color: colors.secondaryText },
            ]}
          >
            Remaining Payment
          </Text>

          <Text
            style={[
              styles.remainingAmount,
              { color: colors.text },
            ]}
          >
            Rs. {remainingPayment}
          </Text>
        </View>

        {/* NOTES */}
        <Text
          style={[
            styles.label,
            { color: colors.text },
          ]}
        >
          Notes
        </Text>

        <TextInput
          style={[
            styles.notesInput,
            {
              backgroundColor: colors.inputBackground,
              borderColor: colors.border,
              color: colors.text,
            },
          ]}
          placeholder="Enter any additional notes"
          placeholderTextColor={colors.placeholder}
          multiline
          numberOfLines={4}
          value={notes}
          onChangeText={setNotes}
        />
      </View>

      {/* CREATE ORDER */}
      <Pressable
        style={[
          styles.button,
          { backgroundColor: colors.primary },
        ]}
        onPress={handleCreateOrder}
      >
        <Text
          style={[
            styles.buttonText,
            { color: colors.white },
          ]}
        >
          Create Order
        </Text>

        <Ionicons
          name="arrow-forward"
          size={20}
          color={colors.white}
        />
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    paddingHorizontal: 18,
    paddingTop: 10,
    paddingBottom: 35,
  },

  header: {
    marginBottom: 18,
  },

  title: {
    fontSize: 27,
    fontWeight: "800",
    letterSpacing: 0.2,
  },

  subtitle: {
    fontSize: 13.5,
    marginTop: 4,
    letterSpacing: 0.1,
  },

  card: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,

    elevation: 2,
    shadowOpacity: 0.07,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 13,
    letterSpacing: 0.1,
  },

  label: {
    fontSize: 13.5,
    fontWeight: "600",
    marginBottom: 7,
    marginTop: 9,
  },

  inputContainer: {
    height: 50,
    borderWidth: 1,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 13,
  },

  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14.5,
  },

  dateContainer: {
    height: 50,
    borderWidth: 1,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 13,
  },

  dateText: {
    marginLeft: 10,
    fontSize: 14.5,
  },

  rightIcon: {
    marginLeft: "auto",
  },

  dropdown: {
    height: 50,
    borderWidth: 1,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 13,
  },

  dropdownText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14.5,
  },

  dropdownList: {
    borderWidth: 1,
    borderRadius: 12,
    marginTop: 6,
    overflow: "hidden",
  },

  option: {
    padding: 13,
    borderBottomWidth: 1,
  },

  optionText: {
    fontSize: 14.5,
  },

  optionSubText: {
    fontSize: 12,
    marginTop: 3,
  },

  noOption: {
    padding: 15,
    fontSize: 14,
    textAlign: "center",
  },

  remainingBox: {
    marginTop: 17,
    padding: 14,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  remainingLabel: {
    fontSize: 13.5,
    fontWeight: "600",
  },

  remainingAmount: {
    fontSize: 17,
    fontWeight: "800",
  },

  notesInput: {
    minHeight: 100,
    borderWidth: 1,
    borderRadius: 12,
    padding: 13,
    fontSize: 14.5,
    textAlignVertical: "top",
  },

  button: {
    height: 52,
    borderRadius: 14,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginTop: 2,

    elevation: 3,
    shadowOpacity: 0.12,
    shadowRadius: 6,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  buttonText: {
    fontSize: 15.5,
    fontWeight: "700",
  },
});