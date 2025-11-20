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
      <View className="p-5">
        <Pressable onPress={() => navigation.goBack()}>
          <Text className="text-blue-500 text-lg">←</Text>
        </Pressable>
      </View>

      <ScrollView className="flex-1 px-5">
        <Text className="text-3xl font-bold mb-4">식당 상세</Text>
        <Text className="text-gray-500">Restaurant ID: {restaurantId}</Text>

        {/* 여기에 상세 정보를 추가하세요 */}
      </ScrollView>
    </SafeAreaView>
  );
}
