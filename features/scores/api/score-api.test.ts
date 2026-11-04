import { describe, expect, it, vi } from 'vitest';

import { apiClient } from '@/lib/api-client';
import { batchRecordScores, getScores } from './score-api';

describe('Score API client', () => {
  it('calls getScores with filters', async () => {
    const mockGet = vi.spyOn(apiClient, 'get').mockResolvedValue({
      success: true,
      data: [],
      meta: { page: 1, limit: 50, total: 0, totalPages: 0 },
    } as never);

    await getScores({ assessmentId: '6a939db4ea1f071b8b1f17e1' });
    expect(mockGet).toHaveBeenCalledWith('/scores?assessmentId=6a939db4ea1f071b8b1f17e1');
  });

  it('calls batchRecordScores with payload', async () => {
    const mockPost = vi.spyOn(apiClient, 'post').mockResolvedValue({
      success: true,
      data: [],
    } as never);

    const payload = {
      assessmentId: '6a939db4ea1f071b8b1f17e1',
      scores: [{ studentId: '123', scoreObtained: 90 }],
    };
    await batchRecordScores(payload);
    expect(mockPost).toHaveBeenCalledWith('/scores/batch', payload);
  });
});
