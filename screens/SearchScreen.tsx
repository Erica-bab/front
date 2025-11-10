import { View, Text } from 'react-native';

export default function SearchScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-2xl font-bold text-green-600">검색 화면</Text>
      <Text className="text-gray-600 mt-2">검색하세요</Text>
    </View>
  );
}
