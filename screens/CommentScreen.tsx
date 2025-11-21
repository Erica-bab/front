import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NaverMapWebView from '../components/NaverMapWebView';

// 서울시청 좌표
const SEOUL_CITY_HALL = {
  latitude: 37.5666805,
  longitude: 126.9784147,
};

export default function CommentScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <Text className="text-xl font-bold p-4">지도 테스트 (서울시청)</Text>
      <View className="flex-1">
        <NaverMapWebView
          latitude={SEOUL_CITY_HALL.latitude}
          longitude={SEOUL_CITY_HALL.longitude}
          name="서울시청"
        />
      </View>
    </SafeAreaView>
  );
}
