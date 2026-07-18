export interface Participant {
  id: number
  meeting_id: number
  display_name: string
  is_muted: boolean
  is_camera_on: boolean
  joined_at: string
}

export interface Meeting {
  id: number
  meeting_id: string
  title: string
  description?: string
  host_name: string
  scheduled_date?: string
  scheduled_time?: string
  duration?: number
  is_active: boolean
  created_at: string
  updated_at?: string
  participants: Participant[]
}

export interface MeetingList {
  id: number
  meeting_id: string
  title: string
  host_name: string
  scheduled_date?: string
  scheduled_time?: string
  is_active: boolean
  created_at: string
}

export interface MeetingCreate {
  title: string
  description?: string
  host_name: string
  scheduled_date?: string
  scheduled_time?: string
  duration?: number
}

export interface MeetingSchedule {
  title: string
  description?: string
  host_name: string
  scheduled_date: string
  scheduled_time: string
  duration: number
}

export interface MeetingJoin {
  meeting_id: string
  display_name: string
}

export interface MeetingUpdate {
  title?: string
  description?: string
  scheduled_date?: string
  scheduled_time?: string
  duration?: number
  is_active?: boolean
}
