import { View, Text, Pressable, ScrollView } from 'react-native';
import Icon from '@/components/Icon';

const PROFILE_INFO = [
  { label: '유형', value: '학생' },
  { label: '학번', value: '25학번' },
  { label: '단과대', value: '소프트웨어융합대학' },
];

const MENU_ITEMS = [
  { icon: 'star' as const, label: '쓴 댓글 보기' },
  { icon: 'star' as const, label: '저장' },
  { icon: 'send' as const, label: '문의하기' },
  { icon: 'star' as const, label: '서비스 이용약관' },
  { icon: 'star' as const, label: '개인정보 처리방침' },
  { icon: 'star' as const, label: '만든사람' },
];

export default function ProfileScreen() {
  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1 p-4">
        <View className="items-center pt-10 pb-4">
          <Text className="text-xl font-bold">오늘도 한 끼 행복하게</Text>
          <Text className="text-xl font-bold">
            <Text className="text-blue-500 text-2xl">에푸</Text>
            <Text>가 함께 합니다!</Text>
          </Text>
        </View>


        <View className="px-4 gap-2">
          <View className="bg-gray-200 h-px" />
          {PROFILE_INFO.map((item) => (
            <View key={item.label} className=''>
              <View className="p-1">
                <View className="flex-row justify-between items-center">
                  <View className="flex-row flex-1 items-center">
                    <Text className="text-gray-500 w-20">{item.label}</Text>
                    <Text className="font-bold">{item.value}</Text>
                  </View>
                  <Pressable className="bg-blue-100 px-4 py-2 rounded-full">
                    <Text className="text-blue-500">수정</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          ))}
          <View className="bg-gray-200 h-px" />
        </View>
        <View>
          {MENU_ITEMS.map((item) => (
            <View key={item.label}>
              <Pressable className="flex-row items-center p-4 gap-2 justify-between">
                <View className="flex-row items-center gap-2">
                  <Icon name={item.icon} />
                  <Text>{item.label}</Text>
                </View>
                <Icon name="rightAngle" width={8} />
              </Pressable>
              <View className="bg-gray-200 h-px" />
            </View>
          ))}
        </View>

        <View className="flex-row justify-between p-2">
          <Text className="text-gray-400 text-sm">앱버전</Text>
          <Text className="text-gray-400 text-sm">3.1.5(43)</Text>
        </View>

        {/* 로그아웃 */}
        <View className="mt-4">
          <Pressable className="bg-blue-500 p-3 rounded-lg">
            <Text className="text-white text-center font-medium">로그아웃</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}
