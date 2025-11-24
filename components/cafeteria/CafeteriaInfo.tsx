import { View, Text } from 'react-native';
import TextIconBox from '@/components/ui/TextIconBox';

type sortType = 'time' | 'location';

interface CafeteriaInfoProps {
  name?: string;
  price?: string;
  menu?: string[];
  location?: string;
  sortModeType: sortType;
}

export default function CafeteriaInfo({
  name = '',
  price = '',
  menu = [''],
  location = '',
  sortModeType,
}: CafeteriaInfoProps) {
  return (
    <View className="flex flex-col border border-[#E5E5EC] rounded-xl w-full min-w-[40vh] px-[35px] py-[20px] bg-white">
      {/* 상단: 메뉴 이름 + 가격 */}
      <View className="flex flex-row items-center mt-2">
        <Text className="text-[#3B82F6] font-semibold text-xl mr-[5px]">
          {name}
        </Text>
        <Text className="text-[#6B6B6B] text-base mt-1">{price}원</Text>
      </View>

      <View className="h-[1px] bg-gray-300 w-full my-[12px]" />

      {/* 메뉴 리스트 */}
      {menu.map((item, index) => (
        <Text key={index} className="text-lg mb-[3px]">
          {"• " + item}
        </Text>
      ))}

      {/* 장소 기준일 때만 하단 위치 뱃지 */}
      {sortModeType === 'time' && (
        <View className="mt-2 self-center w-full">
          <TextIconBox
            preset="blue"
            boxClass="bg-[#2563EB] justify-center"
            textClass="text-[#FFFFFF]"
            text={location}
            icon="location"
            iconColor="#FFFFFF"
            iconSize={16}
          />
        </View>
      )}
    </View>
  );
}