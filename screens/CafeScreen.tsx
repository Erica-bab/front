import { View, Text } from 'react-native';

export default function CafeScreen() {
    return (
        <View className="flex-1 items-center justify-center bg-white">
            <Text className="text-2xl font-bold text-blue-600">카페 화면</Text>
            <Text className="text-gray-600 mt-2">카페카페</Text>
        </View>
    );
}
