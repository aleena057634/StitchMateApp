import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState, useContext } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  ToastAndroid,
} from "react-native";
import { Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import DateModel from "@/componenets/DateModel";
import { getCustomers } from "../../databse/CustomerCru";
import { getMeasurements } from "../../databse/MeasuremenrCruc";
import { addOrder } from "../../databse/order";
import ThemeContext from "@/context/ThemeContext";
import CustomAlert, { ConfirmAlert,ProfileImageModal } from "@/componenets/CustomAlert";
import {addOrderImage} from "../../databse/ImageCrud"

export default function OrderScreen() {
  const { theme, isDark, toggleTheme } = useContext(ThemeContext);

  const [orderName, setOrderName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [loader, setLoader] = useState(false);
  const [orderImages, setOrderImages] = useState<string[]>([]);

  const [customers, setCustomers] = useState<any[]>([]);
  const [customerOpen, setCustomerOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);

  const [measurements, setMeasurements] = useState<any[]>([]);
  const [measurementOpen, setMeasurementOpen] = useState(false);
  const [selectedMeasurement, setSelectedMeasurement] =
    useState<any>(null);

  const [arrivalDate, setArrivalDate] = useState(new Date());
  const [departureDate, setDepartureDate] = useState(new Date());

  const [statusOpen, setStatusOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");

  const [priorityOpen, setPriorityOpen] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState("");

  const [totalPayment, setTotalPayment] = useState("");
  const [advancePayment, setAdvancePayment] = useState("");

  const [customerAlert, setCustomerAlert] = useState(false);
  const [measurementAlert, setMeasurementAlert] = useState(false);
  const [alertQuantity, setAlertQuantity] = useState(false);
  const [alertStatus, setAlertStatus] = useState(false);
  const [alertPriority, setAlertPriority] = useState(false);
  const [alertAdvance, setAlertAdvance] = useState(false);
  const [alertTotalAmount, setAlertTotalAmount] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [orderImage,setOrderimage]=useState<string>("");
  const [ImageAlert,setImageAlert]=useState(false);
  const [deleteImage,setdeleteImage]=useState(false);

  const pickImage = async () => {
     const result = await ImagePicker.launchImageLibraryAsync({
       mediaTypes: ["images"],
      //  allowsEditing: true,
       aspect: [1, 1],
       quality: 1,
     });
 
     if (!result.canceled) {
       const imageUri = result.assets[0].uri;
            setOrderimage(imageUri);
            setImageAlert(false); 
     }
   };
 
   const takePhoto = async () => {
     const permission = await ImagePicker.requestCameraPermissionsAsync();
 
     if (!permission.granted) {
       return;
     }
 
     const result = await ImagePicker.launchCameraAsync({
        // allowsEditing: true,
       aspect: [1, 1],
       quality: 1,
     });
 
     if (!result.canceled) {
       const imageUri = result.assets[0].uri;
       setOrderimage(imageUri);
          setImageAlert(false);  
      //  await saveProfileImage(imageUri);
     }
   };
 

  const statuses = [
    "Pending",
    "In Progress",
    // "Ready",
    // "Delivered",
    // "Cancelled",
  ];

  const priorities = [
    "Low",
    "Normal",
    "High",
    "Urgent",
  ];

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

  function handleCustomerSelect(customer: any) {
    setSelectedCustomer(customer);
    setCustomerOpen(false);

    setSelectedMeasurement(null);

    loadMeasurements(Number(customer.ID));
  }
async function handleCreateOrder() {
  if (!selectedCustomer) {
    setCustomerAlert(true);
    return;
  }

  if (!selectedMeasurement) {
    setMeasurementAlert(true);
    return;
  }

  if (!quantity || Number(quantity) <= 0) {
    setAlertQuantity(true);
    return;
  }

  if (!selectedStatus) {
    setAlertStatus(true);
    return;
  }

  if (!selectedPriority) {
    setAlertPriority(true);
    return;
  }

  if (!totalPayment || Number(totalPayment) < 0) {
    setAlertTotalAmount(true);
    return;
  }

  if (Number(advancePayment) > Number(totalPayment)) {
    setAlertAdvance(true);
    return;
  }

  try {
    setLoader(true);

    const result = await addOrder(
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

    const orderId = result.lastInsertRowId;

    if (orderImage) {
      await addOrderImage(orderImage, orderId);
    }

    ToastAndroid.show(
      "Order added successfully",
      ToastAndroid.SHORT
    );

    setLoader(false);

    router.replace("/OrderList");

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
    setOrderimage("");

  } catch (error) {
    setLoader(false);

    console.log("Failed to create order:", error);

    setErrorAlert(true);
  }
}

  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: theme.background },
      ]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={true}
    >
      {/* HEADER */}
      <View style={styles.header}>
        <Text
          style={[
            styles.title,
            { color: theme.text },
          ]}
        >
          Create Order
        </Text>

        <Text
          style={[
            styles.subtitle,
            { color: theme.secondaryText },
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
            backgroundColor: theme.card,
            borderColor: theme.border,
          },
        ]}
      >
        <Text
          style={[
            styles.sectionTitle,
            { color: theme.text },
          ]}
        >
          Customer
        </Text>

        <Text
          style={[
            styles.label,
            { color: theme.text },
          ]}
        >
          Select Customer
        </Text>

        <Pressable
          style={[
            styles.dropdown,
            {
              backgroundColor: theme.inputBackground,
              borderColor: theme.border,
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
            color={theme.primary}
          />

          <Text
            style={[
              styles.dropdownText,
              {
                color: selectedCustomer
                  ? theme.text
                  : theme.placeholder,
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
            color={theme.primary}
          />
        </Pressable>

        {customerOpen && (
          <View
            style={[
              styles.dropdownList,
              {
                backgroundColor: theme.card,
                borderColor: theme.border,
              },
            ]}
          >
            {customers.length === 0 ? (
              <Text
                style={[
                  styles.noOption,
                  { color: theme.secondaryText },
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
                    { borderBottomColor: theme.border },
                  ]}
                  onPress={() =>
                    handleCustomerSelect(customer)
                  }
                >
                  <Text
                    style={[
                      styles.optionText,
                      { color: theme.text },
                    ]}
                  >
                    {customer.NAME}
                  </Text>

                  {customer.PHONE && (
                    <Text
                      style={[
                        styles.optionSubText,
                        { color: theme.secondaryText },
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
            backgroundColor: theme.card,
            borderColor: theme.border,
          },
        ]}
      >
        <Text
          style={[
            styles.sectionTitle,
            { color: theme.text },
          ]}
        >
          Order Details
        </Text>

        <Text
          style={[
            styles.label,
            { color: theme.text },
          ]}
        >
          Order Name
        </Text>

        <View
          style={[
            styles.inputContainer,
            {
              backgroundColor: theme.inputBackground,
              borderColor: theme.border,
            },
          ]}
        >
          <Ionicons
            name="document-text-outline"
            size={20}
            color={theme.secondaryText}
          />

          <TextInput
            style={[
              styles.input,
              { color: theme.text },
            ]}
            placeholder="Enter order name"
            placeholderTextColor={theme.placeholder}
            value={orderName}
            onChangeText={setOrderName}
          />
        </View>

        <Text
          style={[
            styles.label,
            { color: theme.text },
          ]}
        >
          Quantity
        </Text>

        <View
          style={[
            styles.inputContainer,
            {
              backgroundColor: theme.inputBackground,
              borderColor: theme.border,
            },
          ]}
        >
          <Ionicons
            name="layers-outline"
            size={20}
            color={theme.primary}
          />

          <TextInput
            style={[
              styles.input,
              { color: theme.text },
            ]}
            placeholder="Enter quantity"
            placeholderTextColor={theme.placeholder}
            keyboardType="numeric"
            value={quantity}
            onChangeText={setQuantity}
          />
        </View>

        <Text
          style={[
            styles.label,
            { color: theme.text },
          ]}
        >
          Arrival Date
        </Text>

        <DateModel
          date={arrivalDate}
          setDate={setArrivalDate}
        />

        <Text
          style={[
            styles.label,
            { color: theme.text },
          ]}
        >
          Departure Date
        </Text>

        <DateModel
          date={departureDate}
          setDate={setDepartureDate}
        />

        <Text
          style={[
            styles.label,
            { color: theme.text },
          ]}
        >
          Status
        </Text>

        <Pressable
          style={[
            styles.dropdown,
            {
              backgroundColor: theme.inputBackground,
              borderColor: theme.border,
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
            color={theme.secondaryText}
          />

          <Text
            style={[
              styles.dropdownText,
              {
                color: selectedStatus
                  ? theme.text
                  : theme.placeholder,
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
            color={theme.primary}
          />
        </Pressable>

        {statusOpen && (
          <View
            style={[
              styles.dropdownList,
              {
                backgroundColor: theme.card,
                borderColor: theme.border,
              },
            ]}
          >
            {statuses.map((status) => (
              <Pressable
                key={status}
                style={[
                  styles.option,
                  { borderBottomColor: theme.border },
                ]}
                onPress={() => {
                  setSelectedStatus(status);
                  setStatusOpen(false);
                }}
              >
                <Text
                  style={[
                    styles.optionText,
                    { color: theme.text },
                  ]}
                >
                  {status}
                </Text>
              </Pressable>
            ))}
          </View>
        )}

        <Text
          style={[
            styles.label,
            { color: theme.text },
          ]}
        >
          Priority
        </Text>

        <Pressable
          style={[
            styles.dropdown,
            {
              backgroundColor: theme.inputBackground,
              borderColor: theme.border,
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
            color={theme.secondaryText}
          />

          <Text
            style={[
              styles.dropdownText,
              {
                color: selectedPriority
                  ? theme.text
                  : theme.placeholder,
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
            color={theme.primary}
          />
        </Pressable>

        {priorityOpen && (
          <View
            style={[
              styles.dropdownList,
              {
                backgroundColor: theme.card,
                borderColor: theme.border,
              },
            ]}
          >
            {priorities.map((priority) => (
              <Pressable
                key={priority}
                style={[
                  styles.option,
                  { borderBottomColor: theme.border },
                ]}
                onPress={() => {
                  setSelectedPriority(priority);
                  setPriorityOpen(false);
                }}
              >
                <Text
                  style={[
                    styles.optionText,
                    { color: theme.text },
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
            backgroundColor: theme.card,
            borderColor: theme.border,
          },
        ]}
      >
        <Text
          style={[
            styles.sectionTitle,
            { color: theme.text },
          ]}
        >
          Measurement
        </Text>

        <Text
          style={[
            styles.label,
            { color: theme.text },
          ]}
        >
          Select Measurement
        </Text>

        <Pressable
          style={[
            styles.dropdown,
            {
              backgroundColor: theme.inputBackground,
              borderColor: theme.border,
            },
          ]}
          onPress={() => {
            if (!selectedCustomer) {
              setCustomerAlert(true);
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
            color={theme.secondaryText}
          />

          <Text
            style={[
              styles.dropdownText,
              {
                color: selectedMeasurement
                  ? theme.text
                  : theme.placeholder,
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
            color={theme.primary}
          />
        </Pressable>

        {measurementOpen && (
          <View
            style={[
              styles.dropdownList,
              {
                backgroundColor: theme.card,
                borderColor: theme.border,
              },
            ]}
          >
            {measurements.length === 0 ? (
              <Text
                style={[
                  styles.noOption,
                  { color: theme.secondaryText },
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
                    { borderBottomColor: theme.border },
                  ]}
                  onPress={() => {
                    setSelectedMeasurement(item);
                    setMeasurementOpen(false);
                  }}
                >
                  <Text
                    style={[
                      styles.optionText,
                      { color: theme.text },
                    ]}
                  >
                    {item.TYPE}
                  </Text>

                  <Text
                    style={[
                      styles.optionSubText,
                      { color: theme.secondaryText },
                    ]}
                  >
                    Measurement #{item.mEASUREMENT_ID}
                  </Text>
                </Pressable>
              ))
            )}
          </View>
        )}
      </View>
      <View>
        <></>
      </View>

      {/* PAYMENT */}
      <View
        style={[
          styles.card,
          {
            backgroundColor: theme.card,
            borderColor: theme.border,
          },
        ]}
      >
        <Text
          style={[
            styles.sectionTitle,
            { color: theme.text },
          ]}
        >
          Payment Details
        </Text>

        <Text
          style={[
            styles.label,
            { color: theme.text },
          ]}
        >
          Total Payment
        </Text>

        <View
          style={[
            styles.inputContainer,
            {
              backgroundColor: theme.inputBackground,
              borderColor: theme.border,
            },
          ]}
        >
          <Ionicons
            name="cash-outline"
            size={20}
            color={theme.secondaryText}
          />

          <TextInput
            style={[
              styles.input,
              { color: theme.text },
            ]}
            placeholder="Enter total payment"
            placeholderTextColor={theme.placeholder}
            keyboardType="numeric"
            value={totalPayment}
            onChangeText={setTotalPayment}
          />
        </View>

        <Text
          style={[
            styles.label,
            { color: theme.text },
          ]}
        >
          Advance Payment
        </Text>

        <View
          style={[
            styles.inputContainer,
            {
              backgroundColor: theme.inputBackground,
              borderColor: theme.border,
            },
          ]}
        >
          <Ionicons
            name="wallet-outline"
            size={20}
            color={theme.secondaryText}
          />

          <TextInput
            style={[
              styles.input,
              { color: theme.text },
            ]}
            placeholder="Enter advance payment"
            placeholderTextColor={theme.placeholder}
            keyboardType="numeric"
            value={advancePayment}
            onChangeText={setAdvancePayment}
          />
        </View>

        <View
          style={[
            styles.remainingBox,
            { backgroundColor: theme.background },
          ]}
        >
          <Text
            style={[
              styles.remainingLabel,
              { color: theme.secondaryText },
            ]}
          >
            Remaining Payment
          </Text>

          <Text
            style={[
              styles.remainingAmount,
              { color: theme.text },
            ]}
          >
            Rs. {remainingPayment}
          </Text>
        </View>

        <Text
          style={[
            styles.label,
            { color: theme.text },
          ]}
        >
          Notes
        </Text>

        <TextInput
          style={[
            styles.notesInput,
            {
              backgroundColor: theme.inputBackground,
              borderColor: theme.border,
              color: theme.text,
            },
          ]}
          placeholder="Enter any additional notes"
          placeholderTextColor={theme.placeholder}
          multiline
          value={notes}
          onChangeText={setNotes}
        />
      </View>
   <View style={styles.imageSection}>
  <Text
    style={[
      styles.sectionTitle,
      { color: theme.text },
    ]}
  >
    Add Design
  </Text>

  {!orderImage && (
    <Pressable
      style={[
        styles.addImageButton,
        {
          backgroundColor: theme.inputBackground,
          borderColor: theme.border,
        },
      ]}
      onPress={() => setImageAlert(true)}
    >
      <Ionicons
        name="image-outline"
        size={28}
        color={theme.primary}
      />

      <Text
        style={[
          styles.addImageText,
          { color: theme.text },
        ]}
      >
        Add Design Image
      </Text>

      <Ionicons
        name="add-circle-outline"
        size={24}
        color={theme.primary}
      />
    </Pressable>
  )}

  {orderImage && (
    <View style={styles.imagePreviewBox}>
      <Image
        source={{ uri: orderImage }}
        style={styles.orderImage}
      />

      <Pressable
        style={styles.deleteImageButton}
        onPress={() => {
          
         setdeleteImage(true);
        }}
      >
        <Ionicons
          name="trash-outline"
          size={20}
          color="white"
        />
      </Pressable>
    </View>
  )}
</View>

      {/* CREATE ORDER */}
      {loader ? (
        <ActivityIndicator
          size="large"
          color={theme.primary}
        />
      ) : (
        <Pressable
          style={[
            styles.button,
            { backgroundColor: theme.primary },
          ]}
          onPress={
            handleCreateOrder           
          }
        >
          <Text
            style={[
              styles.buttonText,
              { color: theme.white },
            ]}
          >
            Create Order
          </Text>

          <Ionicons
            name="arrow-forward"
            size={20}
            color={theme.white}
          />
        </Pressable>
        
      )}

      {/* ALERTS */}
<CustomAlert
visible={deleteImage}
onConfirm={()=>{
  setOrderimage("")
  setdeleteImage(false);
}}
onCancel={()=>{
  setdeleteImage(false)
}}
title="Delete Image Order"
Message="Are You sure you want to delete Order image?"

/>


      <ConfirmAlert
        visible={customerAlert}
        title="Customer Required"
        Message="Please select a customer first."
        onConfirm={() => {
          setCustomerAlert(false);
        }}
      />

      <ConfirmAlert
        visible={measurementAlert}
        title="Measurement Required"
        Message="Please select a measurement first."
        onConfirm={() => {
          setMeasurementAlert(false);
        }}
      />

      <ConfirmAlert
        visible={alertQuantity}
        title="Quantity Required"
        Message="Please enter a valid quantity."
        onConfirm={() => {
          setAlertQuantity(false);
        }}
      />

      <ConfirmAlert
        visible={alertStatus}
        title="Status Required"
        Message="Please select the order status."
        onConfirm={() => {
          setAlertStatus(false);
        }}
      />

      <ConfirmAlert
        visible={alertPriority}
        title="Priority Required"
        Message="Please select the order priority."
        onConfirm={() => {
          setAlertPriority(false);
        }}
      />

      <ConfirmAlert
        visible={alertTotalAmount}
        title="Payment Amount"
        Message="Please enter a valid total payment amount."
        onConfirm={() => {
          setAlertTotalAmount(false);
        }}
      />

      <ConfirmAlert
        visible={alertAdvance}
        title="Invalid Advance"
        Message="Advance payment cannot be greater than total payment."
        onConfirm={() => {
          setAlertAdvance(false);
        }}
      />

      <ConfirmAlert
        visible={errorAlert}
        title="Error"
        Message="Order could not be created."
        onConfirm={() => {
          setErrorAlert(false);
        }}
      />

      {/* OrderImage */}
      <ProfileImageModal
      visible={ImageAlert}
      onCamera={takePhoto}
      onGallery={pickImage}
      onClose={()=>{setImageAlert(false)}}

      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageSection: {
  marginBottom: 14,
},

addImageButton: {
  minHeight: 60,
  borderWidth: 1,
  borderRadius: 12,
  flexDirection: "row",
  alignItems: "center",
  paddingHorizontal: 15,
  gap: 12,
},

addImageText: {
  flex: 1,
  fontSize: 14.5,
  fontWeight: "600",
},

imagePreviewBox: {
  marginTop: 12,
  borderRadius: 12,
  overflow: "hidden",
  position: "relative",
},

orderImage: {
  width: "100%",
  height: 200,
  borderRadius: 12,
},

deleteImageButton: {
  position: "absolute",
  top: 10,
  right: 10,
  width: 38,
  height: 38,
  borderRadius: 19,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "red",
},
// imagePreviewBox: {
//   marginTop: 12,
//   borderRadius: 12,
//   overflow: "hidden",
//   position: "relative",
// },

// orderImage: {
//   width: "100%",
//   height: 200,
//   borderRadius: 12,
// },

// deleteImageButton: {
//   position: "absolute",
//   top: 10,
//   right: 10,
//   width: 38,
//   height: 38,
//   borderRadius: 19,
//   justifyContent: "center",
//   alignItems: "center",
//   backgroundColor: "red",
// },
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