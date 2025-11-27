import { useMemo } from 'react';
import { useMyComments, useMyReplies } from '@/api/user/useUserActivity';

export function useMyCommentIds(isAuthenticated: boolean) {
  const { data: myComments } = useMyComments(1, 100, isAuthenticated === true);
  const { data: myReplies } = useMyReplies(1, 100, isAuthenticated === true);

  const myCommentIds = useMemo(() => {
    if (!isAuthenticated) return new Set<number>();
    const commentIds = new Set<number>();
    if (myComments) {
      myComments.forEach(comment => commentIds.add(comment.id));
    }
    if (myReplies) {
      myReplies.forEach(reply => commentIds.add(reply.id));
    }
    return commentIds;
  }, [myComments, myReplies, isAuthenticated]);

  return myCommentIds;
}

