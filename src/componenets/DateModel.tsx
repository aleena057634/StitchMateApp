import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState, useContext } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import ThemeContext from "@/context/ThemeContext";

export default function DateModel({date,setDate, minimumDate,}: any) {
  const { theme } = useContext(ThemeContext);
  const [openCalendar, setOpenCalendar] = useState(false);

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          setOpenCalendar(!openCalendar);
        }}
        style={{
          height: 50,
          borderWidth: 1,
          borderColor: theme.border,
          borderRadius: 12,
          paddingHorizontal: 13,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: theme.inputBackground,
        }}
      >
        <Text
          style={{
            fontSize: 14.5,
            color: theme.text,
          }}
        >
          {date.toLocaleDateString()}
        </Text>

        <Ionicons
          name={
            openCalendar
              ? "chevron-up"
              : "chevron-down"
          }
          size={20}
          color={theme.primary}
        />
      </TouchableOpacity>

      {openCalendar && (
        <DateTimePicker
          value={date}
          mode="date"
          display="calendar"
          minimumDate={minimumDate}
          onChange={(event, selectedDate) => {
            setOpenCalendar(false);

            if (selectedDate) {
              setDate(selectedDate);
            }
          }}
        />
      )}
    </View>
  );
}