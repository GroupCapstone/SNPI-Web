'use client';

import { useQuery } from '@tanstack/react-query';

import { getHealth } from '../api/get-health';

export const useHealthQuery = () =>
  useQuery({
    queryKey: ['system-health'],
    queryFn: getHealth,
    refetchInterval: 60_000,
  });
