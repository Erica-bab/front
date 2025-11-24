import { View, Text, ScrollView } from 'react-native';
import { useState } from 'react';
import { useCafeteria } from '@/api/cafeteria/useCafeteria';
import { CafeteriaResponse, CafeteriaParams } from '@/api/cafeteria/types';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CommentScreen() {
  
  // 테스트용 고정 값
  const [cafeteriaParams] = useState<CafeteriaParams>({
    year: 2025,
    month: 11,
    day: 24,
    meal_types: '2',
  });

  const { data, isLoading, error } = useCafeteria(cafeteriaParams);

  console.log(
    'CafeteriaList data full:\n',
    JSON.stringify(data, null, 2),);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text>불러오는 중...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 items-center justify-center bg-white px-4">
        <Text>에러 발생</Text>
        <Text>{String(error)}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView>
      <ScrollView className="flex-1 bg-white px-4 py-6">
        <Text className="text-xl font-bold mb-4">학식 API 테스트</Text>
        <Text selectable className="text-xs font-mono">
          {JSON.stringify(data)}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
