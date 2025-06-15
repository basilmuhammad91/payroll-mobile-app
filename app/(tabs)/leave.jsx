import { ScrollView, StyleSheet } from 'react-native';
import UserScreen from '../../screens/UserScreen';

export default function TabTwoScreen() {
  return (
    <ScrollView style={{ backgroundColor: '#fff', marginTop: 30, padding: 24 }}>
        <UserScreen />
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
