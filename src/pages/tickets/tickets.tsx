import { useEffect, useMemo, useState } from 'react';

import { useSearchParams } from 'react-router-dom';

import { PAGE_SIZE } from '@/app-constants';
import { SORTING_PARAM, TRANSFER_PARAM, ISortingParam } from '@/app-constants';
import { useGetTickets } from '@/pages/hooks/query-hooks';
import { ITicket } from '@/services/ticket-validation-scheme';

import { ShowMoreTickets } from '../show-more-tickets';

import { OneTicket } from './one-ticket';
import cssStyles from './tickets.module.css';

export function Tickets() {
  const [showMoreTicketsIndex, setShowMoreTicketsIndex] = useState<number>(0);
  const [searchParams] = useSearchParams();

  const result = useGetTickets();

  useEffect(() => {
    if (result.hasNextPage) {
      result.fetchNextPage();
    }
  }, [result]);

  const allPages = useMemo(() => {
    const arr: ITicket[] = [];

    for (const page of result.data?.pages ?? []) {
      arr.push(...page.tickets);
    }

    return arr;
  }, [result.data?.pages]);

  const transferParam000 = parseInt(searchParams.get(TRANSFER_PARAM) ?? '', 10);
  const transferParam = isNaN(transferParam000) ? -1 : transferParam000;
  const sortingParam = searchParams.get(SORTING_PARAM) ?? ISortingParam.cheep;

  const pagesSortedAndFiltered = useMemo(() => {
    return [...allPages]
      .filter((item) => {
        if (transferParam === -1) {
          return true;
        } else {
          const numberOfStops = item.segments[0].stops.length;

          return numberOfStops === transferParam;
        }
      })
      .sort((a, b) => {
        switch (sortingParam) {
          case ISortingParam.cheep:
            if (a.price > b.price) {
              return 1;
            } else {
              if (a.price < b.price) {
                return -1;
              } else {
                if (a.segments[0].duration > b.segments[0].duration) {
                  return 1;
                } else {
                  return -1;
                }
              }
            }

          case ISortingParam.speed:
            if (a.segments[0].duration > b.segments[0].duration) {
              return 1;
            } else {
              if (a.segments[0].duration < b.segments[0].duration) {
                return -1;
              } else {
                if (a.price > b.price) {
                  return 1;
                } else {
                  return -1;
                }
              }
            }
          case ISortingParam.optimal: {
            return 1;
          }
          default:
            return 1;
        }
      });
  }, [allPages, sortingParam, transferParam]);

  // const isLoading = result.isFetching || result.isFetchingNextPage;

  const ticketsToShow =
    pagesSortedAndFiltered?.slice(showMoreTicketsIndex, showMoreTicketsIndex + PAGE_SIZE) ?? [];

  const nextPageLength = Math.max(
    0,
    Math.min(PAGE_SIZE, pagesSortedAndFiltered.length - PAGE_SIZE - showMoreTicketsIndex),
  );

  return (
    <>
      {/* <div className={classNames('ticketsContainer', { 'animateLoading': isLoading })}> */}
      <div className={cssStyles.ticketsContainer}>
        {ticketsToShow.map((ticket) => (
          <OneTicket ticket={ticket} key={ticket.carrier} />
        ))}
      </div>
      <ShowMoreTickets
        showMoreTicketsIndex={showMoreTicketsIndex}
        setShowMoreTicketsIndex={setShowMoreTicketsIndex}
        nextPageLength={nextPageLength}
      />
    </>
  );
}
