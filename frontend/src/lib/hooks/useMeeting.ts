'use client'

import { useState } from 'react'
import { meetingService } from '@/lib/services/meeting.service'
import type { Meeting, MeetingCreate, MeetingSchedule, MeetingJoin } from '@/types/meeting'
import { toast } from 'sonner'

export function useMeeting() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const createMeeting = async (data: MeetingCreate): Promise<Meeting | null> => {
    try {
      setLoading(true)
      setError(null)
      const meeting = await meetingService.createMeeting(data)
      toast.success('Meeting created successfully')
      return meeting
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create meeting'
      setError(message)
      toast.error(message)
      return null
    } finally {
      setLoading(false)
    }
  }

  const scheduleMeeting = async (data: MeetingSchedule): Promise<Meeting | null> => {
    try {
      setLoading(true)
      setError(null)
      const meeting = await meetingService.scheduleMeeting(data)
      toast.success('Meeting scheduled successfully')
      return meeting
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to schedule meeting'
      setError(message)
      toast.error(message)
      return null
    } finally {
      setLoading(false)
    }
  }

  const joinMeeting = async (data: MeetingJoin): Promise<Meeting | null> => {
    try {
      setLoading(true)
      setError(null)
      const meeting = await meetingService.joinMeeting(data)
      toast.success('Joined meeting successfully')
      return meeting
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to join meeting'
      setError(message)
      toast.error(message)
      return null
    } finally {
      setLoading(false)
    }
  }

  const deleteMeeting = async (id: number): Promise<boolean> => {
    try {
      setLoading(true)
      setError(null)
      await meetingService.deleteMeeting(id)
      toast.success('Meeting deleted successfully')
      return true
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete meeting'
      setError(message)
      toast.error(message)
      return false
    } finally {
      setLoading(false)
    }
  }

  return {
    createMeeting,
    scheduleMeeting,
    joinMeeting,
    deleteMeeting,
    loading,
    error,
  }
}
