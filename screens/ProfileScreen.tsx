import { View, Text } from 'react-native';

export default function ProfileScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-2xl font-bold text-purple-600">프로필 화면</Text>
      <Text className="text-gray-600 mt-2">내 정보</Text>
    </View>
  );
}
