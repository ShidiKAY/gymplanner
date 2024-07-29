// components/ModalComponent.tsx
import React, { ReactNode } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Modal as RNModal,
  ScrollView,
} from "react-native";

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  title: string;
  children?: ReactNode;
  confirmText?: string;
  cancelText?: string;
}

const ModalComponent: React.FC<ModalProps> = ({
  visible,
  onClose,
  onConfirm,
  title,
  children,
  confirmText = "Confirmer",
  cancelText = "Annuler",
}) => {
  const modalOpacity = new Animated.Value(0);
  const modalTranslateY = new Animated.Value(300);

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(modalOpacity, {
        toValue: visible ? 1 : 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(modalTranslateY, {
        toValue: visible ? 0 : 300,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, [visible]);

  return (
    <RNModal transparent visible={visible}>
      <View style={styles.modalBackground}>
        <Animated.View
          style={[
            styles.modal,
            {
              opacity: modalOpacity,
              transform: [{ translateY: modalTranslateY }],
            },
          ]}
        >
          <Text style={styles.modalText}>{title}</Text>
          <ScrollView style={styles.modalScrollView}>{children}</ScrollView>
          <View style={styles.modalButtons}>
            {onConfirm && (
              <TouchableOpacity onPress={onConfirm} style={styles.modalButton}>
                <Text style={styles.modalButtonText}>{confirmText}</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={onClose} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>{cancelText}</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modal: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
  },
  modalButton: {
    backgroundColor: "#007bff",
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 5,
  },
  modalButtonText: {
    color: "#fff",
  },
  modalScrollView: {
    width: "100%",
  },
});

export default ModalComponent;
