import { View, Text, Pressable, Image, Alert } from 'react-native';
import Card from '@/components/ui/Card';
import RestaurantStatusTag from '@/components/ui/RestaurantStatusTag';
import Icon from '@/components/Icon';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RestaurantOperatingStatus } from '@/api/restaurants/types';
import { useRestaurantImages, useDeleteRestaurantImage } from '@/api/restaurants/useRestaurantImage';
import { useAuth, useCurrentUser } from '@/api/auth/useAuth';

interface RestaurantCardProps {
  name: string;
  category: string;
  operatingStatus?: RestaurantOperatingStatus | null;
  rating: number;
  comment?: string;
  restaurantId?: string;
  thumbnailUrls?: string[];
  onAddPhotoPress?: (restaurantId: string) => void;
}

export default function RestaurantCard({ name, category, operatingStatus, rating, comment, restaurantId, thumbnailUrls, onAddPhotoPress }: RestaurantCardProps) {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const { isAuthenticated, refreshAuthState } = useAuth();
  const { data: currentUser } = useCurrentUser();
  const displayComment = comment || null;
  
  // 식당 이미지 조회 (restaurantId가 있을 때만)
  const { data: imagesData, refetch: refetchImages } = useRestaurantImages(
    restaurantId ? Number(restaurantId) : 0
  );
  const { mutate: deleteImage } = useDeleteRestaurantImage(
    restaurantId ? Number(restaurantId) : 0
  );

  const resolveImageUri = (uri?: string) => {
    if (!uri) return null;
    const path = uri.startsWith('/') ? uri.slice(1) : uri;
    return `https://에리카밥.com/${path}`;
  };

  // 이미지 데이터에서 썸네일 가져오기 (최대 3개)
  const imageUrls = imagesData?.images?.map(img => resolveImageUri(img.image_url)).filter(Boolean) || [];
  const displayThumbnails = imageUrls.length > 0 
    ? imageUrls.slice(0, 3)
    : (thumbnailUrls?.slice(0, 3) || []).map(resolveImageUri).filter(Boolean) as string[];
  
  // 전체 이미지 개수
  const totalImageCount = imagesData?.total_count || imageUrls.length || thumbnailUrls?.length || 0;
  const hasMoreImages = totalImageCount > 3;

  // 본인이 업로드한 이미지인지 확인하는 함수
  const isMyImage = (imageIndex: number): boolean => {
    if (!isAuthenticated || !currentUser || !imagesData?.images) return false;
    const image = imagesData.images[imageIndex];
    if (!image) return false;
    
    // 현재 사용자 타입과 ID 확인
    const userType = currentUser.google_id ? 'google' : (currentUser.apple_id ? 'apple' : null);
    const userId = currentUser.google_id ? currentUser.id : (currentUser.apple_id ? currentUser.id : null);
    
    if (!userType || userId === null) return false;
    
    return image.uploaded_by_type === userType && image.uploaded_by === userId;
  };

  // 이미지 삭제 핸들러
  const handleDeleteImage = (imageIndex: number) => {
    if (!imagesData?.images || !restaurantId) return;
    
    const image = imagesData.images[imageIndex];
    if (!image) return;

    Alert.alert(
      '사진 삭제',
      '이 사진을 삭제하시겠습니까?',
      [
        {
          text: '취소',
          style: 'cancel',
        },
        {
          text: '삭제',
          style: 'destructive',
          onPress: () => {
            deleteImage(image.id, {
              onSuccess: () => {
                refetchImages();
              },
              onError: (error: any) => {
                Alert.alert('오류', error?.response?.data?.detail || '사진 삭제에 실패했습니다.');
              },
            });
          },
        },
      ]
    );
  };

  const handleRatingPress = () => {
    if (restaurantId) {
      navigation.navigate('RestaurantDetail', { restaurantId, initialTab: 'comments' });
    }
  };

  return (
    <Card className='bg-white border border-gray-100'>
      <View className="flex-row items-center">
        <Text className="text-lg text-blue-500">{name}</Text>
        <Text className="ml-1">{category}</Text>
      </View>
      <RestaurantStatusTag operatingStatus={operatingStatus} rating={rating} onRatingPress={handleRatingPress} />
      
      {/* 썸네일 표시 */}
      <View className="flex-row gap-2 h-[200px] bg-gray-100 mb-2">
        {[0, 1, 2].map(index => {
          const url = displayThumbnails[index];
          const isMyUpload = isMyImage(index);
          return url ? (
            <View key={index} className="flex-1 h-full rounded-lg overflow-hidden relative">
              <Image
                source={{ uri: url }}
                className="w-full h-full"
                resizeMode="cover"
              />
              {/* 본인이 업로드한 이미지에만 삭제 버튼 표시 */}
              {isMyUpload && (
                <Pressable
                  onPress={() => handleDeleteImage(index)}
                  className="absolute top-2 right-2 w-6 h-6 bg-black/50 rounded-full items-center justify-center"
                >
                  <Text className="text-white text-xs font-bold">×</Text>
                </Pressable>
              )}
              {/* 마지막 썸네일이고 더 많은 사진이 있을 때 "더보기" 오버레이 */}
              {index === 2 && hasMoreImages && (
                <Pressable
                  onPress={() => navigation.navigate('RestaurantDetail', { restaurantId })}
                  className="absolute inset-0 bg-black/40 items-center justify-center"
                >
                  <Text className="text-white font-bold text-sm">+{totalImageCount - 3}</Text>
                </Pressable>
              )}
            </View>
          ) : (
            <View key={index} className="flex-1 h-full rounded-lg bg-gray-200 items-center justify-center">
              <Text className="text-gray-500 text-xs">이미지가 없습니다</Text>
            </View>
          );
        })}
      </View>

      {/* 사진 추가하기 버튼 */}
      {restaurantId && (
        <Pressable
          onPress={() => {
            if (!isAuthenticated) {
              (navigation.navigate as any)('Login', { onSuccess: refreshAuthState });
            } else {
              onAddPhotoPress?.(restaurantId);
            }
          }}
          className="flex-row items-center justify-center gap-2 py-2 px-4 bg-gray-100 rounded-lg mb-2"
        >
          <Icon name="edit" width={16} height={16} />
          <Text className="text-gray-700 text-sm">사진 추가하기</Text>
        </Pressable>
      )}

      {displayComment && (
        <Pressable
          className='bg-gray-100 flex-row rounded-lg p-4 w-full justify-between items-center gap-2'
          onPress={() => navigation.navigate('RestaurantDetail', { restaurantId, initialTab: 'comments' })}
        >
          <Text className='text-gray-500 flex-1' numberOfLines={2}>
            {displayComment}
          </Text>
          <Icon name='rightAngle' width={8}/>
        </Pressable>
      )}
      <Pressable
        onPress={() => navigation.navigate('RestaurantDetail', { restaurantId })}
        className='w-full justify-center items-center bg-blue-500 p-1 rounded-lg'
      >
        <Text className='text-white font-bold p-1'>자세히보기</Text>
      </Pressable>
    </Card>
  );
}
