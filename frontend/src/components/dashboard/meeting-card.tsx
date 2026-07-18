import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, Users } from 'lucide-react'
import type { MeetingList } from '@/types/meeting'
import { format } from 'date-fns'

interface MeetingCardProps {
  meeting: MeetingList
  onClick?: () => void
}

export function MeetingCard({ meeting, onClick }: MeetingCardProps) {
  const formatDate = (dateString?: string) => {
    if (!dateString) return null
    return format(new Date(dateString), 'MMM d, yyyy')
  }

  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={onClick}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg">{meeting.title}</CardTitle>
          <Badge variant={meeting.is_active ? 'default' : 'secondary'}>
            {meeting.is_active ? 'Active' : 'Ended'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center text-sm text-muted-foreground">
          <Users className="mr-2 h-4 w-4" />
          <span>Host: {meeting.host_name}</span>
        </div>
        {meeting.scheduled_date && (
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="mr-2 h-4 w-4" />
            <span>{formatDate(meeting.scheduled_date)}</span>
          </div>
        )}
        {meeting.scheduled_time && (
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="mr-2 h-4 w-4" />
            <span>{meeting.scheduled_time}</span>
          </div>
        )}
        <div className="text-xs text-muted-foreground mt-2">
          ID: {meeting.meeting_id}
        </div>
      </CardContent>
    </Card>
  )
}
