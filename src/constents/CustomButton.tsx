import { Pressable, StyleSheet, Text } from "react-native";
import colors from "./colors";

type CustomButtonProps = {
  title: string;
  onPress: () => void;
};

export default function CustomSaveButton({
  title,
  onPress,
}: CustomButtonProps) {
  return (
    <Pressable
      style={styles.button}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 52,
    backgroundColor: colors.primary,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    paddingHorizontal: 15,
  },

  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "700",
  },
});