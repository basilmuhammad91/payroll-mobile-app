import { themeConfig } from "@/config/appConfig";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function PayrollOperations() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Payment Operations</Text>

      <TouchableOpacity
        style={styles.moduleCard}
        onPress={() => navigation.navigate("LeaveScreen")}
      >
        <Ionicons name="paper-plane" size={24} color="#fff" />
        <Text style={styles.moduleText}>Leaves</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.moduleCard}
        onPress={() => navigation.navigate("DepartmentLeaveScreen")}
      >
        <Ionicons name="paper-plane" size={24} color="#fff" />
        <Text style={styles.moduleText}>Departments</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 20,
  },
  moduleCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: themeConfig.primary,
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
  },
  moduleText: {
    color: "#fff",
    fontSize: 18,
    marginLeft: 10,
  },
});
