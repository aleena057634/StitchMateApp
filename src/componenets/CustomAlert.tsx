
import React, { useContext } from "react";
import {
  View,
  Text,
  Pressable,
  Modal,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ThemeContext from "@/context/ThemeContext";

type Props = {
  visible: boolean;
  title: string;
  Message: string;
  onCancel: () => void;
  onConfirm: () => void;
};

type Pops1 = {
  visible: boolean;
  title: string;
  Message: string;
  onConfirm: () => void;
};

export default function CustomAlert({
  visible,
  title,
  Message,
  onCancel,
  onConfirm,
}: Props) {
  const { theme } = useContext(ThemeContext);

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
    >
      <View style={styles.overlay}>
        <View
          style={[
            styles.alertBox,
            {
              backgroundColor: theme.card,
              borderColor: theme.border,
            },
          ]}
        >
          <Text
            style={[
              styles.title,
              { color: theme.text },
            ]}
          >
            {title}
          </Text>

          <Text
            style={[
              styles.message,
              { color: theme.secondaryText },
            ]}
          >
            {Message}
          </Text>

          <View style={styles.buttons}>
            <Pressable
              style={[
                styles.cancelButton,
                {
                  backgroundColor: theme.inputBackground,
                  borderColor: theme.border,
                },
              ]}
              onPress={onCancel}
            >
              <Text
                style={[
                  styles.cancelText,
                  { color: theme.text },
                ]}
              >
                Cancel
              </Text>
            </Pressable>

            <Pressable
              style={[
                styles.okButton,
                { backgroundColor: theme.primary },
              ]}
              onPress={onConfirm}
            >
              <Text
                style={[
                  styles.okText,
                  { color: theme.white },
                ]}
              >
                OK
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export function ConfirmAlert({
  visible,
  title,
  Message,
  onConfirm,
}: Pops1) {
  const { theme } = useContext(ThemeContext);

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
    >
      <View style={styles.overlay}>
        <View
          style={[
            styles.alertBox,
            {
              backgroundColor: theme.card,
              borderColor: theme.border,
            },
          ]}
        >
          <Text
            style={[
              styles.title,
              { color: theme.text },
            ]}
          >
            {title}
          </Text>

          <Text
            style={[
              styles.message,
              { color: theme.secondaryText },
            ]}
          >
            {Message}
          </Text>

          <View style={styles.confirmButtonContainer}>
            <Pressable
              style={[
                styles.okButton,
                {
                  backgroundColor: theme.primary,
                },
              ]}
              onPress={onConfirm}
            >
              <Text
                style={[
                  styles.okText,
                  { color: theme.white },
                ]}
              >
                OK
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

type ProfileImageModalProps = {
  visible: boolean;
  onClose: () => void;
  onCamera: () => void;
  onGallery: () => void;
};

export function ProfileImageModal({
  visible,
  onClose,
  onCamera,
  onGallery,
}: ProfileImageModalProps) {
  const { theme } = useContext(ThemeContext);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View
          style={[
            styles.modalBox,
            {
              backgroundColor: theme.card,
              borderColor: theme.border,
            },
          ]}
        >
          <Text
            style={[
              styles.title,
              { color: theme.text },
            ]}
          >
            Profile Picture
          </Text>

          <Text
            style={[
              styles.message,
              { color: theme.secondaryText },
            ]}
          >
            Choose an option
          </Text>

          <View style={styles.options}>
            <Pressable
              style={[
                styles.option,
                {
                  backgroundColor: theme.inputBackground,
                  borderColor: theme.border,
                },
              ]}
              onPress={onCamera}
            >
              <Ionicons
                name="camera"
                size={28}
                color={theme.primary}
              />

              <Text
                style={[
                  styles.optionText,
                  { color: theme.text },
                ]}
              >
                Camera
              </Text>
            </Pressable>

            <Pressable
              style={[
                styles.option,
                {
                  backgroundColor: theme.inputBackground,
                  borderColor: theme.border,
                },
              ]}
              onPress={onGallery}
            >
              <Ionicons
                name="images"
                size={28}
                color={theme.primary}
              />

              <Text
                style={[
                  styles.optionText,
                  { color: theme.text },
                ]}
              >
                Gallery
              </Text>
            </Pressable>
          </View>

          <Pressable
            style={[
              styles.cancelButton,
              {
                backgroundColor: theme.inputBackground,
                borderColor: theme.border,
              },
            ]}
            onPress={onClose}
          >
            <Text
              style={[
                styles.cancelText,
                { color: theme.text },
              ]}
            >
              Cancel
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.55)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  alertBox: {
    width: "88%",
    borderRadius: 18,
    padding: 22,
    borderWidth: 1,
    elevation: 8,
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 5,
    },
  },

  modalBox: {
    width: "88%",
    borderRadius: 18,
    padding: 22,
    borderWidth: 1,
    elevation: 8,
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    alignItems: "center",
  },

  title: {
    fontSize: 19,
    fontWeight: "700",
  },

  message: {
    fontSize: 14,
    marginTop: 9,
    lineHeight: 20,
  },

  buttons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
    marginTop: 22,
  },

  options: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 15,
    marginTop: 22,
  },

  option: {
    width: 105,
    height: 90,
    borderWidth: 1,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  optionText: {
    fontSize: 13,
    fontWeight: "600",
    marginTop: 7,
  },

  cancelButton: {
    minWidth: 80,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  cancelText: {
    fontSize: 13,
    fontWeight: "600",
  },

  okButton: {
    minWidth: 80,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  okText: {
    fontSize: 13,
    fontWeight: "700",
  },

  confirmButtonContainer: {
    alignItems: "flex-end",
    marginTop: 22,
  },
});
