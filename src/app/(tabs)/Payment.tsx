
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Pressable,
  Alert,
} from "react-native";

import ThemeContext from "@/context/ThemeContext";

import { useContext, useState } from "react";

import {
  Payment_Show,
  ClearPaymentHistory,
} from "../../../databse/payment";

import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
import SearchBar from "@/componenets/SearchBox";
import CustomAlert, { ConfirmAlert } from "@/componenets/CustomAlert";

export default function Payment() {
  const { theme } = useContext(ThemeContext);

  const [payments, setPayments] = useState<any[]>([]);
  const [search, setSearch] = useState("");
 
 const [showAlert,setAlert]  =useState(false);
  const [IshowAlert,IsetAlert]  =useState(false);
  const filteredPayments = payments.filter((item) =>
    JSON.stringify(item)
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  useFocusEffect(
    useCallback(() => {
      getPayments();
    }, [])
  );

  const getPayments = async () => {
    const data = await Payment_Show();

    setPayments(data);
  };

  const handleClearHistory = () => {
    if (payments.length === 0) {
     IsetAlert(true)
      return;
    }

   setAlert(true)
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.background },
      ]}
    >
      <View style={styles.header}>
        <Text
          style={[
            styles.title,
            { color: theme.text },
          ]}
        >
          Payment History
        </Text>

        <Pressable
          onPress={handleClearHistory}
          style={[
            styles.clearButton,
            {
              backgroundColor: theme.inputBackground,
              borderColor: theme.border,
            },
          ]}
        >
          <Text
            style={[
              styles.clearText,
              { color: theme.danger },
            ]}
          >
            Clear
          </Text>
        </Pressable>
      </View>

      <SearchBar
        value={search}
        onChangeText={setSearch}
      />

      <FlatList
        data={filteredPayments}
        keyExtractor={(item) =>
          String(item.PAYMENT_ID)
        }
        renderItem={({ item }) => (
          <View
            style={[
              styles.card,
              {
                backgroundColor: theme.card,
                borderColor: theme.border,
              },
            ]}
          >
            <View>
              <Text
                style={[
                  styles.orderName,
                  { color: theme.text },
                ]}
              >
                {item.ORDER_NAME}
              </Text>

              <Text
                style={[
                  styles.orderId,
                  { color: theme.secondaryText },
                ]}
              >
                Order #{item.ORDER_ID}
              </Text>

              <Text
                style={[
                  styles.date,
                  { color: theme.secondaryText },
                ]}
              >
                {item.PAYMENT_DATE}
              </Text>
            </View>

            <Text
              style={[
                styles.amount,
                { color: theme.primary },
              ]}
            >
              Rs. {item.PAYMENT_AMOUNT}
            </Text>
          </View>
        )}
      />
<ConfirmAlert
visible={IshowAlert}
title="Payment History, "
Message="There is no Payment History"
onConfirm={()=>{
  IsetAlert(false)
}}
/>
<CustomAlert
visible={showAlert}
title="Clear Payment History,"
Message="Are You sure You want Peranntly delete Payemt history?"
onCancel={()=>{setAlert(false)}}
onConfirm={async () => {
            await ClearPaymentHistory();
            setPayments([]);
            setAlert(false);
          }}
/>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
  },

  clearButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 9,
    borderWidth: 1,
  },

  clearText: {
    fontSize: 12,
    fontWeight: "700",
  },

  card: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  orderName: {
    fontSize: 15,
    fontWeight: "700",
  },

  orderId: {
    fontSize: 12,
    marginTop: 4,
  },

  date: {
    fontSize: 11,
    marginTop: 5,
  },

  amount: {
    fontSize: 15,
    fontWeight: "700",
  },
});

