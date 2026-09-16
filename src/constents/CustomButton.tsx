import { Ionicons } from "@expo/vector-icons";
import { useContext } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import ThemeContext from "@/context/ThemeContext";

type CustomButtonProps = {
  title: string;
  onPress: () => void;
};

export default function CustomSaveButton({
  title,
  onPress,
}: CustomButtonProps) {
  const { theme } = useContext(ThemeContext);

  return (
    <Pressable
      style={[
        styles.button,
        {
          backgroundColor: theme.primary,
        },
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.buttonText,
          {
            color: theme.white,
          },
        ]}
      >
        {title}
      </Text>

      <Ionicons
        name="arrow-forward"
        size={20}
        color={theme.white}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 52,
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginTop: 10,
    paddingHorizontal: 18,
    elevation: 3,
  },

  buttonText: {
    fontSize: 16,
    fontWeight: "800",
  },
});