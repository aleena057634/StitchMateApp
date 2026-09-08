import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet } from "react-native";

import colors from "@/constents/colors";

type FloatingButtonProps = {
  onPress: () => void;
};

export default function FloatingButton({
  onPress,
}: FloatingButtonProps) {
  return (
    <Pressable
      style={styles.button}
      onPress={onPress}
    >
      <Ionicons
        name="add"
        size={30}
        color={colors.white}
      />
    </Pressable>
  );
}
const styles = StyleSheet.create({
  button: {
    position: "absolute",
    right: 20,
    bottom: 100,
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    zIndex: 999,
  },
});