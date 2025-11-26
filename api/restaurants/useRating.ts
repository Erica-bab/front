import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../client';
import { RatingItem } from './types';
import { useCurrentUser } from '../auth/useAuth';

interface RatingStatsResponse {
  average: number;
  count: number;
  distribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
  recent_ratings: RatingItem[];
}

// 별점 통계 조회 (사용자별 별점 포함)
export const useRatingStats = (restaurantId: number, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['ratingStats', restaurantId],
    queryFn: async () => {
      const { data } = await apiClient.get<RatingStatsResponse>(`/restaurants/${restaurantId}/ratings`);
      return data;
    },
    enabled: enabled && !!restaurantId,
  });
};

// 현재 사용자의 별점 조회 (recent_ratings에서 현재 사용자 찾기)
export const useMyRating = (restaurantId: number, enabled: boolean = true) => {
  const { data: ratingStats, refetch: refetchRatingStats } = useRatingStats(restaurantId, enabled);
  const { data: currentUser } = useCurrentUser();

  const myRating = ratingStats?.recent_ratings.find(
    (rating) => rating.user.id === currentUser?.id
  );

  return { myRating: myRating?.rating || 0, refetchRatingStats };
};

