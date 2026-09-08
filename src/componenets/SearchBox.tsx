import colors from "@/constents/colors";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TextInput, View } from "react-native";

type SearchBarProps = {
  value: string;
  onChangeText: (text: string) => void;
};

export default function SearchBar({
  value,
  onChangeText,
}: SearchBarProps) {
  return (
    <View style={styles.container}>

      <Ionicons
        name="search"
        size={20}
        color={colors.secondaryText}
      />

      <TextInput
        style={styles.input}
        placeholder="Search by Name..."
        placeholderTextColor={colors.placeholder}
        value={value}
        onChangeText={onChangeText}
      />

    </View>
  );
}

const styles = StyleSheet.create({
 container: {
  height: 48,
  backgroundColor: colors.inputBackground,
  borderWidth: 1,
  borderColor: colors.border,
  borderRadius: 14,

  flexDirection: "row",
  alignItems: "center",

  paddingHorizontal: 15,
  marginTop: 2,
},

  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: colors.text,
  },
});