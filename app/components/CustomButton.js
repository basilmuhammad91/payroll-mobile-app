// components/CustomButton.js
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const CustomButton = ({ title, onPress, style }) => {
  return (
    <View style={styles.outerContainer}>
      <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    padding: 2,
    borderRadius: 8,
    backgroundColor: '#E82938',
  },
  button: {
    backgroundColor: '#E82938',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default CustomButton;
