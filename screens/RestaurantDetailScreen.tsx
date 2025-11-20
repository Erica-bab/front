import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useRestaurantDetail } from '@/api/restaurants/useRestaurant';
import RestaurantStatusTag from '@/components/ui/RestaurantStatusTag';
import TextIconButton from '@/components/ui/TextIconButton';

type RestaurantTabType = 'home' | 'menu' | 'comments';

export default function RestaurantDetailScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const route = useRoute();
  const { restaurantId } = route.params as { restaurantId?: string };
  const [selectedTab, setSelectedTab] = useState<RestaurantTabType>('home');

  const { data: restaurant, isLoading, error } = useRestaurantDetail(Number(restaurantId));

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-white justify-center items-center">
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text className="mt-4 text-gray-600">로딩 중...</Text>
      </SafeAreaView>
    );
  }

  if (error || !restaurant) {
    return (
      <SafeAreaView className="flex-1 bg-white justify-center items-center px-5">
        <Text className="text-red-500 text-center">
          {error?.message || '레스토랑 정보를 불러올 수 없습니다.'}
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className='bg-gray-300 h-64 justify-center items-center'>
        <Text className="text-gray-600">📍 지도 위치 정보</Text>
        <Text className="text-gray-500 text-sm mt-2">
          {restaurant.location.address || '주소 정보 없음'}
        </Text>
      </View>
      <ScrollView className="flex-1">
        <View className='p-4'>
          <View className="flex-row items-center p-4">
            <Text className="text-lg text-blue-500">{restaurant.name}</Text>
            <Text className="ml-1">{restaurant.category}</Text>
          </View>
          <View className='ml-4'>
            <RestaurantStatusTag
              status={restaurant.status as '영업중' | '영업종료' | '브레이크타임'}
              rating={restaurant.rating.average}
            />
          </View>
        </View>
        <View className="border-t border-t-2 border-gray-200 mb-4">
          <View className="w-full flex-row justify-around border-b border-gray-200">
            <TextIconButton
              isOn={selectedTab === 'home'}
              onPress={() => setSelectedTab('home')}
              text="홈"
              baseBoxClass="-pb-4"
              offTextClass="text-[#000000] font-medium text-lg"
              onTextClass="text-[#2563EB] font-medium text-lg"
              onBoxClass="border-b-2 border-[#2563EB] -pb-2"
            />
            <TextIconButton
              isOn={selectedTab === 'menu'}
              onPress={() => setSelectedTab('menu')}
              text="메뉴"
              baseBoxClass="-pb-4"
              offTextClass="text-[#000000] font-medium text-lg"
              onTextClass="text-[#2563EB] font-medium text-lg"
              onBoxClass="border-b-2 border-[#2563EB] -pb-2"
            />
            <TextIconButton
              isOn={selectedTab === 'comments'}
              onPress={() => setSelectedTab('comments')}
              text="댓글"
              baseBoxClass="-pb-4"
              offTextClass="text-[#000000] font-medium text-lg"
              onTextClass="text-[#2563EB] font-medium text-lg"
              onBoxClass="border-b-2 border-[#2563EB] -pb-2"
            />
          </View>
        </View>

        {restaurant.menu_summary.popular_menus.length > 0 && (
          <View className="border-t border-gray-200 pt-4 mb-4">
            <Text className="text-lg font-semibold mb-2">인기 메뉴</Text>
            {restaurant.menu_summary.popular_menus.map((menu) => (
              <View key={menu.id} className="flex-row justify-between mb-2">
                <Text className="text-gray-700">{menu.name}</Text>
                {menu.price && (
                  <Text className="text-gray-600">₩{menu.price.toLocaleString()}</Text>
                )}
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
