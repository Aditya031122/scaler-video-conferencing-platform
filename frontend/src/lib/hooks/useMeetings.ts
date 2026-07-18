'use client'

import { useState, useEffect } from 'react'
import { meetingService } from '@/lib/services/meeting.service'
import type { MeetingList } from '@/types/meeting'
import { toast } from 'sonner'

export function useMeetings() {
  const [upcoming, setUpcoming] = useState<MeetingList[]>([])
  const [recent, setRecent] = useState<MeetingList[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchMeetings = async () => {
    try {
      setLoading(true)
      setError(null)
      const [upcomingData, recentData] = await Promise.all([
        meetingService.getUpcomingMeetings(),
        meetingService.getRecentMeetings(),
      ])
      setUpcoming(upcomingData)
      setRecent(recentData)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch meetings'
      setError(message)
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMeetings()
  }, [])

  return {
    upcoming,
    recent,
    loading,
    error,
    refetch: fetchMeetings,
  }
}
