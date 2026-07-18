'use client'

import { useMeetings } from '@/lib/hooks/useMeetings'
import { Navbar } from '@/components/shared/navbar'
import { MeetingCard } from '@/components/dashboard/meeting-card'
import { MeetingCardSkeleton } from '@/components/dashboard/loading-skeleton'
import { Button } from '@/components/ui/button'
import { RefreshCw } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function HistoryPage() {
  const { recent, loading, error, refetch } = useMeetings()
  const router = useRouter()

  const handleMeetingClick = (meetingId: string) => {
    router.push(`/room/${meetingId}`)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Meeting History</h1>
          <p className="text-muted-foreground">
            View your past meetings
          </p>
        </div>

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Recent Meetings</h2>
          <Button variant="outline" size="sm" onClick={refetch}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <MeetingCardSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>{error}</p>
          </div>
        ) : recent.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>No recent meetings found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recent.map((meeting) => (
              <MeetingCard
                key={meeting.id}
                meeting={meeting}
                onClick={() => handleMeetingClick(meeting.meeting_id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
