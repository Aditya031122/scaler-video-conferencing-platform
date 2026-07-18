import { api } from '../api'
import type {
  Meeting,
  MeetingList,
  MeetingCreate,
  MeetingSchedule,
  MeetingJoin,
} from '@/types/meeting'

export const meetingService = {
  async createMeeting(data: MeetingCreate): Promise<Meeting> {
    const response = await api.post<Meeting>('/api/meetings/new', data)
    return response.data
  },

  async scheduleMeeting(data: MeetingSchedule): Promise<Meeting> {
    const response = await api.post<Meeting>('/api/meetings/schedule', data)
    return response.data
  },

  async joinMeeting(data: MeetingJoin): Promise<Meeting> {
    const response = await api.post<Meeting>('/api/meetings/join', data)
    return response.data
  },

  async getUpcomingMeetings(skip = 0, limit = 10): Promise<MeetingList[]> {
    const response = await api.get<MeetingList[]>('/api/meetings/upcoming', {
      params: { skip, limit },
    })
    return response.data
  },

  async getRecentMeetings(skip = 0, limit = 10): Promise<MeetingList[]> {
    const response = await api.get<MeetingList[]>('/api/meetings/recent', {
      params: { skip, limit },
    })
    return response.data
  },

  async getMeeting(id: number): Promise<Meeting> {
    const response = await api.get<Meeting>(`/api/meetings/${id}`)
    return response.data
  },

  async deleteMeeting(id: number): Promise<void> {
    await api.delete(`/api/meetings/${id}`)
  },
}
