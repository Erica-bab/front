import { View, Text, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

export default function RestaurantDetailScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const route = useRoute();
  const { restaurantId } = route.params as { restaurantId?: string };

  return (
    <SafeAreaView className="flex-1 bg-white">
      
    </SafeAreaView>
  );
}
