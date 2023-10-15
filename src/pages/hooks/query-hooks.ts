import { useInfiniteQuery } from 'react-query';

import { getTickets } from '@/services/requests';

export function useGetTickets() {
  // eslint-disable-next-line no-shadow
  const { data, error, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ['tickets'],
      queryFn: () => getTickets('systemId'),
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      getNextPageParam: (lastPage, _pages) => {
        return !lastPage?.stop;
      },
    });

  return { data, error, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, status };
}
