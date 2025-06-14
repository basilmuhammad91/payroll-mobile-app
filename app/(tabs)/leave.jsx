import { ScrollView, StyleSheet } from 'react-native';
import FormScreen from '../../screens/FormScreen';

export default function TabTwoScreen() {
  return (
    <ScrollView>
        <FormScreen />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
